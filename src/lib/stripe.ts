/**
 * Stripe Payment Integration
 * Handles Checkout Sessions, webhook verification, and booking storage
 */

import Stripe from "stripe";
import { Redis } from "@upstash/redis";
import { DEPOSIT_PERCENT, DEPOSIT_LABEL } from "./constants";

// Initialize Stripe (lazy initialization to handle missing keys in build)
let stripe: Stripe | null = null;

function getStripeInstance(): Stripe {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY environment variable not configured");
    }
    stripe = new Stripe(key, {});
  }
  return stripe;
}

// Initialize Redis for storing booking data
const redis = Redis.fromEnv();

export interface BookingRecord {
  id: string;
  checkoutSessionId: string;
  productId: string;
  tier: string;
  upsells: string[];
  totalPrice: number;
  paymentType: "deposit" | "full";
  amountPaid: number;
  email: string;
  name: string;
  phone: string;
  eventDate: string;
  eventType: string;
  venue: string;
  specialRequests?: string;
  altDate?: string;
  cartItems: Array<{ productId: string; tier: string; hours: number }>;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

/**
 * Create a Stripe Checkout Session for a booking
 */
export async function createCheckoutSession(
  booking: Omit<BookingRecord, "id" | "checkoutSessionId" | "status" | "createdAt">,
): Promise<{ checkoutUrl: string; sessionId: string }> {
  const stripeInstance = getStripeInstance();

  const amountInPence = formatPriceForStripe(booking.amountPaid);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.funloading360.co.uk";

  const paymentLabel = booking.paymentType === "deposit"
    ? `Photo Booth Booking - ${DEPOSIT_LABEL} Deposit`
    : `Photo Booth Booking - Full Payment`;

  const session = await stripeInstance.checkout.sessions.create({
    mode: "payment",
    customer_email: booking.email,
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: paymentLabel,
            description: `${booking.name} — ${booking.eventDate} at ${booking.venue}`,
          },
          unit_amount: amountInPence,
        },
        quantity: 1,
      },
    ],
    metadata: {
      bookingId: booking.email + ":" + booking.eventDate,
      // Store full booking as JSON so webhook can send emails even if Redis unavailable
      bookingData: JSON.stringify({
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        productId: booking.productId,
        tier: booking.tier,
        upsells: booking.upsells,
        totalPrice: booking.totalPrice,
        amountPaid: booking.amountPaid,
        paymentType: booking.paymentType,
        eventDate: booking.eventDate,
        altDate: booking.altDate,
        eventType: booking.eventType,
        venue: booking.venue,
        specialRequests: booking.specialRequests,
      }),
    },
    success_url: `${baseUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/book?cancelled=true`,
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL");
  }

  return {
    checkoutUrl: session.url,
    sessionId: session.id,
  };
}

/**
 * Store booking data in Redis
 * Key format: booking:{checkoutSessionId}
 * TTL: 30 days
 * NOTE: Fails gracefully if Redis unavailable (logs warning but doesn't block checkout)
 */
export async function storeBooking(booking: BookingRecord): Promise<void> {
  try {
    const key = `booking:${booking.checkoutSessionId}`;
    const ttl = 30 * 24 * 60 * 60;
    await redis.setex(key, ttl, JSON.stringify(booking));
  } catch (error) {
    // Redis unavailable — log warning but allow checkout to proceed
    // In production with Redis available, this will store the booking for webhook processing
    console.warn("[storeBooking] Redis unavailable, booking not stored:", error);
  }
}

/**
 * Retrieve booking by checkout session ID
 */
export async function getBooking(
  checkoutSessionId: string
): Promise<BookingRecord | null> {
  const key = `booking:${checkoutSessionId}`;
  const data = await redis.get(key);

  if (!data) return null;

  if (typeof data === "string") {
    return JSON.parse(data);
  }

  return data as BookingRecord;
}

/**
 * Update booking status
 */
export async function updateBookingStatus(
  checkoutSessionId: string,
  status: "pending" | "completed" | "failed"
): Promise<void> {
  const booking = await getBooking(checkoutSessionId);

  if (booking) {
    booking.status = status;
    await storeBooking(booking);
  }
}

/**
 * Verify webhook signature from Stripe
 */
export function verifyWebhookSignature(
  body: string,
  signature: string
): {
  valid: boolean;
  event?: Stripe.Event;
  error?: string;
} {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return {
      valid: false,
      error: "STRIPE_WEBHOOK_SECRET not configured",
    };
  }

  try {
    const stripeInstance = getStripeInstance();
    const event = stripeInstance.webhooks.constructEvent(body, signature, webhookSecret);
    return { valid: true, event };
  } catch (error: any) {
    return {
      valid: false,
      error: error.message || "Invalid webhook signature",
    };
  }
}

/**
 * Calculate 15% deposit from total price
 */
export function calculateDeposit(totalPrice: number): number {
  return Math.round(totalPrice * DEPOSIT_PERCENT * 100) / 100;
}

/**
 * Format price for Stripe (GBP in pence)
 */
export function formatPriceForStripe(priceInPounds: number): number {
  return Math.round(priceInPounds * 100);
}

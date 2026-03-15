/**
 * Stripe Payment Integration
 * Handles payment intents, webhook verification, and booking storage
 */

import Stripe from "stripe";
import { Redis } from "@upstash/redis";

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
  paymentIntentId: string;
  productId: string;
  tier: string;
  upsells: string[];
  totalPrice: number;
  email: string;
  name: string;
  phone: string;
  eventDate: string;
  eventType: string;
  venue: string;
  specialRequests?: string;
  altDate?: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

/**
 * Create a payment intent for a booking
 */
export async function createPaymentIntent(
  booking: Omit<BookingRecord, "id" | "paymentIntentId" | "status" | "createdAt">,
  idempotencyKey?: string
): Promise<{ clientSecret: string; paymentIntentId: string }> {
  // Amount in pence (15% deposit)
  const depositAmount = Math.round(booking.totalPrice * 0.15 * 100);

  const stripeInstance = getStripeInstance();
  const intent = await stripeInstance.paymentIntents.create(
    {
      amount: depositAmount,
      currency: "gbp",
      description: `Photo Booth Booking - ${booking.name}`,
      metadata: {
        bookingId: booking.email,
        productId: booking.productId,
        eventDate: booking.eventDate,
      },
      receipt_email: booking.email,
    },
    idempotencyKey ? { idempotencyKey } : undefined
  );

  return {
    clientSecret: intent.client_secret || "",
    paymentIntentId: intent.id,
  };
}

/**
 * Store booking data in Redis
 * Key format: booking:{paymentIntentId}
 * TTL: 30 days (to keep history)
 */
export async function storeBooking(booking: BookingRecord): Promise<void> {
  const key = `booking:${booking.paymentIntentId}`;
  // 30 days in seconds
  const ttl = 30 * 24 * 60 * 60;

  await redis.setex(
    key,
    ttl,
    JSON.stringify(booking)
  );
}

/**
 * Retrieve booking by payment intent ID
 */
export async function getBooking(
  paymentIntentId: string
): Promise<BookingRecord | null> {
  const key = `booking:${paymentIntentId}`;
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
  paymentIntentId: string,
  status: "pending" | "completed" | "failed"
): Promise<void> {
  const booking = await getBooking(paymentIntentId);

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
  return Math.round(totalPrice * 0.15 * 100) / 100; // Convert back to pounds
}

/**
 * Format price for Stripe (GBP in pence)
 */
export function formatPriceForStripe(priceInPounds: number): number {
  return Math.round(priceInPounds * 100);
}

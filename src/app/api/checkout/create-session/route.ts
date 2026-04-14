/**
 * POST /api/checkout/create-session
 * Create a Stripe Checkout Session for a booking
 */

import { NextRequest } from "next/server";
import { z } from "zod";
import { CheckoutSessionSchema } from "@/lib/schemas";
import {
  createCheckoutSession,
  storeBooking,
  calculateDeposit,
  type BookingRecord,
} from "@/lib/stripe";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { allProducts, getPriceForTierAndHours, type PricingTier } from "@/lib/services";
import { ADDONS } from "@/lib/constants";

// Rate limiting: 10 requests per minute per IP
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  analytics: true,
  prefix: "checkout-create-session",
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting (fail-open — if Redis unavailable, allow the request)
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    try {
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        return Response.json(
          {
            ok: false,
            error: {
              message: "Rate limit exceeded. Please try again later.",
              code: "RATE_LIMITED",
            },
          },
          { status: 429 }
        );
      }
    } catch (rateLimitError) {
      // Redis unavailable — log but allow the request (fail-open)
      console.warn("Rate limiting unavailable:", rateLimitError);
    }

    // Parse and validate request
    const body = await request.json();
    const data = CheckoutSessionSchema.parse(body);

    // Server-side price recalculation — never trust client-supplied totalPrice
    const cartItemsTotal = data.cartItems.reduce((sum, item) => {
      const product = allProducts.find((p) => p.id === item.productId);
      if (!product) return sum;
      return sum + getPriceForTierAndHours(product, item.tier as PricingTier, item.hours);
    }, 0);

    const upsellsTotal = data.upsells.reduce((sum, upsellId) => {
      const addon = ADDONS.find((a) => a.id === upsellId);
      return sum + (addon?.price ?? 0);
    }, 0);

    const serverTotalPrice = cartItemsTotal + upsellsTotal;

    if (serverTotalPrice <= 0) {
      return Response.json(
        { ok: false, error: { message: "Invalid cart: total price must be greater than zero", code: "INVALID_PRICE" } },
        { status: 400 }
      );
    }

    if (Math.abs(data.totalPrice - serverTotalPrice) > 0.01) {
      return Response.json(
        { ok: false, error: { message: "Price mismatch", code: "PRICE_MISMATCH" } },
        { status: 400 }
      );
    }

    // Calculate amount to pay (using server-verified price)
    const amountPaid =
      data.paymentType === "deposit"
        ? calculateDeposit(serverTotalPrice)
        : serverTotalPrice;

    // Prepare booking data (without id/sessionId — will be set after session creation)
    const bookingData: Omit<BookingRecord, "id" | "checkoutSessionId" | "status" | "createdAt"> = {
      productId: data.productId,
      tier: data.tier,
      upsells: data.upsells,
      totalPrice: serverTotalPrice,
      paymentType: data.paymentType,
      amountPaid,
      email: data.email,
      name: data.name,
      phone: data.phone,
      eventDate: data.eventDate,
      eventType: data.eventType,
      venue: data.venue,
      specialRequests: data.specialRequests || undefined,
      altDate: data.altDate || undefined,
      cartItems: data.cartItems,
    };

    // Create Stripe Checkout Session
    const { checkoutUrl, sessionId } = await createCheckoutSession(bookingData);

    // Store booking in Redis with pending status
    const booking: BookingRecord = {
      ...bookingData,
      id: sessionId,
      checkoutSessionId: sessionId,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    await storeBooking(booking);

    return Response.json(
      {
        ok: true,
        data: { checkoutUrl },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Create checkout session error:", error);

    if (error instanceof z.ZodError) {
      return Response.json(
        {
          ok: false,
          error: {
            message: "Validation error",
            code: "VALIDATION_ERROR",
            details: error.errors,
          },
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        ok: false,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Failed to create checkout session",
          code: "INTERNAL_ERROR",
        },
      },
      { status: 500 }
    );
  }
}

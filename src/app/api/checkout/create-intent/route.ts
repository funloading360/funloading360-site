/**
 * POST /api/checkout/create-intent
 * Create a Stripe payment intent for a booking
 */

import { NextRequest } from "next/server";
import { z } from "zod";
import {
  createPaymentIntent,
  storeBooking,
  BookingRecord,
} from "@/lib/stripe";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const requestSchema = z.object({
  productId: z.string().min(1),
  tier: z.enum(["essential", "signature", "luxury"]),
  upsells: z.array(z.string()).optional().default([]),
  totalPrice: z.number().positive(),
  email: z.string().email(),
  name: z.string().min(2),
  phone: z.string().min(10),
  eventDate: z.string(),
  eventType: z.string(),
  venue: z.string().min(2),
  specialRequests: z.string().optional(),
  altDate: z.string().optional(),
});

type CreateIntentRequest = z.infer<typeof requestSchema>;

// Rate limiting: 10 requests per minute per IP
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  analytics: true,
  prefix: "checkout-create-intent",
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "anonymous";

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

    // Parse and validate request
    const body = await request.json();
    const validatedData = requestSchema.parse(body);

    // Generate idempotency key from email + eventDate to prevent duplicate payments
    const idempotencyKey = `${validatedData.email}:${validatedData.eventDate}:${Date.now()}`;

    // Create payment intent
    const { clientSecret, paymentIntentId } = await createPaymentIntent(
      validatedData,
      idempotencyKey
    );

    // Store booking record (status: pending)
    const booking: BookingRecord = {
      id: paymentIntentId,
      paymentIntentId,
      productId: validatedData.productId,
      tier: validatedData.tier,
      upsells: validatedData.upsells || [],
      totalPrice: validatedData.totalPrice,
      email: validatedData.email,
      name: validatedData.name,
      phone: validatedData.phone,
      eventDate: validatedData.eventDate,
      eventType: validatedData.eventType,
      venue: validatedData.venue,
      specialRequests: validatedData.specialRequests,
      altDate: validatedData.altDate,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    await storeBooking(booking);

    return Response.json(
      {
        ok: true,
        data: {
          clientSecret,
          paymentIntentId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Create payment intent error:", error);

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
              : "Failed to create payment intent",
          code: "INTERNAL_ERROR",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/checkout/verify-session?session_id=...
 * Fallback: verifies payment and triggers emails when webhook hasn't fired yet.
 * Called by the thank-you page on mount.
 */

import { NextRequest } from "next/server";
import Stripe from "stripe";
import { getBooking, updateBookingStatus } from "@/lib/stripe";
import { sendConfirmationEmail, sendAdminBookingEmail, generateBookingRef, type BookingEmailData } from "@/lib/email";
import { getProductById } from "@/lib/services";
import { notifyN8nPaymentCompleted } from "@/lib/n8n";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  analytics: true,
  prefix: "checkout-verify-session",
});

const redis = Redis.fromEnv();

let stripe: Stripe | null = null;
function getStripeInstance(): Stripe {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY not configured");
    stripe = new Stripe(key, {});
  }
  return stripe;
}

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return Response.json(
        { ok: false, error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    const sessionId = request.nextUrl.searchParams.get("session_id");
    if (!sessionId || typeof sessionId !== "string" || sessionId.length > 200) {
      return Response.json(
        { ok: false, error: "Missing or invalid session_id" },
        { status: 400 }
      );
    }

    // Retrieve session from Stripe
    const stripeInstance = getStripeInstance();
    const session = await stripeInstance.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return Response.json(
        { ok: true, status: "unpaid" },
        { status: 200 }
      );
    }

    // Check booking in Redis
    const booking = await getBooking(sessionId);
    if (!booking) {
      return Response.json(
        { ok: true, status: "not_found" },
        { status: 200 }
      );
    }

    // Idempotency guard — prevent duplicate processing if webhook already handled this
    const idempotencyKey = `processed:${sessionId}`;
    const isNew = await redis.set(idempotencyKey, 1, { nx: true, ex: 300 });
    if (isNew === null) {
      return Response.json({ ok: true, status: "already_completed" }, { status: 200 });
    }

    // Update status and send emails (webhook hasn't fired yet)
    await updateBookingStatus(sessionId, "completed");

    const product = getProductById(booking.productId);
    const upsellMap: Record<string, { name: string; price: number }> = {
      "guest-book": { name: "Guest Book", price: 40 },
      "extra-hour": { name: "Extra Hour", price: 75 },
      "highlight-reel": { name: "Highlight Reel", price: 79 },
    };

    const emailData: BookingEmailData = {
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      productName: product?.name || booking.productId,
      tier: product
        ? (product.tiers[booking.tier as keyof typeof product.tiers]?.name || booking.tier)
        : booking.tier,
      date: booking.eventDate,
      altDate: booking.altDate,
      venue: booking.venue,
      eventType: booking.eventType,
      totalPrice: booking.totalPrice,
      depositPrice: booking.amountPaid,
      paymentType: booking.paymentType,
      amountPaid: booking.amountPaid,
      upsells: booking.upsells.map((id) => upsellMap[id] || { name: id, price: 0 }),
    };

    // Send emails (non-blocking)
    sendConfirmationEmail(emailData).catch((err) => {
      console.error("[VERIFY] Customer email failed:", err);
    });

    sendAdminBookingEmail(emailData, booking).catch((err) => {
      console.error("[VERIFY] Admin email failed:", err);
    });

    // Notify n8n for paid bookings sheet (fallback path)
    notifyN8nPaymentCompleted({
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      eventType: booking.eventType,
      eventDate: booking.eventDate,
      altDate: booking.altDate,
      venue: booking.venue,
      productName: emailData.productName,
      tier: emailData.tier,
      upsells: booking.upsells,
      totalPrice: booking.totalPrice,
      createdAt: booking.createdAt,
      bookingRef: generateBookingRef(booking.name, booking.eventDate),
      amountPaid: booking.amountPaid,
      paymentType: booking.paymentType,
      status: "completed",
      checkoutSessionId: sessionId,
    }).catch((err) => {
      console.error("[VERIFY] n8n payment webhook failed:", err);
    });

    return Response.json(
      { ok: true, status: "confirmed" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify session error:", error);
    return Response.json(
      { ok: false, error: "Failed to verify session" },
      { status: 500 }
    );
  }
}

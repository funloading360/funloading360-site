/**
 * POST /api/webhooks/stripe
 * Handle Stripe webhook events
 *
 * Events handled:
 * - checkout.session.completed
 * - checkout.session.expired
 */

import { NextRequest } from "next/server";
import { verifyWebhookSignature, updateBookingStatus, getBooking } from "@/lib/stripe";
import { sendConfirmationEmail, sendAdminBookingEmail, generateBookingRef, type BookingEmailData } from "@/lib/email";
import { getProductById } from "@/lib/services";
import { notifyN8nPaymentCompleted } from "@/lib/n8n";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") || "";

  // Verify webhook signature
  const { valid, event, error } = verifyWebhookSignature(body, signature);

  if (!valid || !event) {
    console.error("Webhook signature verification failed:", error);
    return Response.json(
      { ok: false, error: "Webhook signature verification failed" },
      { status: 401 }
    );
  }

  try {
    const session = event.data.object as any;

    // Idempotency guard — prevent duplicate processing if webhook fires more than once
    const idempotencyKey = `processed:${session.id}`;
    const isNew = await redis.set(idempotencyKey, 1, { nx: true, ex: 300 });
    if (isNew === null) {
      // Already processed
      return Response.json({ ok: true, message: "Already processed" }, { status: 200 });
    }

    switch (event.type) {
      case "checkout.session.completed": {
        console.log(`Checkout session completed: ${session.id}`);

        // Update booking status to completed
        await updateBookingStatus(session.id, "completed").catch((err) => {
          console.warn("[WEBHOOK] updateBookingStatus failed:", err);
        });

        // Fetch booking from Redis, OR fall back to Stripe metadata if Redis unavailable
        let booking = await getBooking(session.id).catch((err) => {
          console.warn("[WEBHOOK] getBooking failed:", err);
          return null;
        });

        // Fall back to Stripe metadata if Redis retrieval failed
        if (!booking && session.metadata?.bookingData) {
          try {
            const bookingData = JSON.parse(session.metadata.bookingData);
            booking = {
              id: session.id,
              checkoutSessionId: session.id,
              status: "completed",
              createdAt: new Date().toISOString(),
              ...bookingData,
            };
            console.log("[WEBHOOK] Using booking data from Stripe metadata (Redis unavailable)");
          } catch (parseError) {
            console.error("[WEBHOOK] Failed to parse booking from Stripe metadata:", parseError);
          }
        }

        if (booking) {
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

          // Send customer confirmation email (async, don't block webhook)
          sendConfirmationEmail(emailData).catch((err) => {
            console.error("[WEBHOOK] Customer email failed:", err);
          });

          // Send admin notification email
          sendAdminBookingEmail(emailData, booking).catch((err) => {
            console.error("[WEBHOOK] Admin email failed:", err);
          });

          // Notify n8n for paid bookings sheet
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
            checkoutSessionId: session.id,
          }).catch((err) => {
            console.error("[WEBHOOK] n8n payment webhook failed:", err);
          });
        }

        break;
      }

      case "checkout.session.expired": {
        console.log(`Checkout session expired: ${session.id}`);
        await updateBookingStatus(session.id, "failed");
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return Response.json(
      { ok: true, message: "Webhook processed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook processing error:", error);
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Webhook processing failed",
      },
      { status: 500 }
    );
  }
}

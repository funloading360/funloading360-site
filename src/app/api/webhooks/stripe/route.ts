/**
 * POST /api/webhooks/stripe
 * Handle Stripe webhook events
 *
 * Events handled:
 * - payment_intent.succeeded
 * - payment_intent.failed
 * - payment_intent.canceled
 */

import { NextRequest } from "next/server";
import type Stripe from "stripe";
import { verifyWebhookSignature, updateBookingStatus, getBooking } from "@/lib/stripe";

/**
 * Send confirmation email after successful payment
 * (Stub for now - integrate with Resend later)
 */
async function sendPaymentConfirmationEmail(
  email: string,
  name: string,
  eventDate: string
): Promise<void> {
  try {
    // TODO: Integrate with Resend API
    // const result = await resend.emails.send({
    //   from: "bookings@funloading360.co.uk",
    //   to: email,
    //   subject: "Payment Confirmed - Your Photo Booth Booking",
    //   html: `...`,
    // });
    console.log(`[STUB] Payment confirmation email sent to ${email}`);
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    // Don't throw - webhook should succeed even if email fails
  }
}

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
    const paymentIntent = event.data.object as any;

    switch (event.type) {
      case "payment_intent.succeeded":
        console.log(`Payment succeeded: ${paymentIntent.id}`);

        // Update booking status to completed
        await updateBookingStatus(paymentIntent.id, "completed");

        // Fetch booking and send confirmation email
        const booking = await getBooking(paymentIntent.id);
        if (booking) {
          await sendPaymentConfirmationEmail(
            booking.email,
            booking.name,
            booking.eventDate
          );
        }

        break;

      case "payment_intent.payment_failed":
        console.log(`Payment failed: ${paymentIntent.id}`);
        await updateBookingStatus(paymentIntent.id, "failed");
        break;

      case "payment_intent.canceled":
        console.log(`Payment canceled: ${paymentIntent.id}`);
        await updateBookingStatus(paymentIntent.id, "failed");
        break;

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

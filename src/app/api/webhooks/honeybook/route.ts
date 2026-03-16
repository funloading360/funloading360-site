/**
 * POST /api/webhooks/honeybook
 * HoneyBook CRM integration stub
 *
 * HoneyBook events handled:
 * - booking.created  — new enquiry submitted
 * - booking.signed   — contract signed
 * - payment.received — payment received
 * - booking.completed — event completed
 *
 * When HoneyBook is configured, set HONEYBOOK_WEBHOOK_SECRET in .env.local
 * and replace the stub handlers with actual CRM calls.
 */

import { NextRequest } from "next/server";

const HONEYBOOK_SECRET = process.env.HONEYBOOK_WEBHOOK_SECRET;

interface HoneybookWebhookPayload {
  event: string;
  timestamp: string;
  data: {
    bookingId?: string;
    clientName?: string;
    clientEmail?: string;
    eventDate?: string;
    totalAmount?: number;
    projectTitle?: string;
  };
}

/**
 * Verify HoneyBook webhook signature
 * HoneyBook sends a shared secret in the Authorization header
 */
function verifySignature(request: NextRequest): boolean {
  if (!HONEYBOOK_SECRET) {
    // No secret configured — allow in dev, reject in production
    if (process.env.NODE_ENV === "production") {
      console.error("[HoneyBook] HONEYBOOK_WEBHOOK_SECRET not configured");
      return false;
    }
    console.warn("[HoneyBook] Running without signature verification (dev mode)");
    return true;
  }

  const authHeader = request.headers.get("authorization");
  const expectedAuth = `Bearer ${HONEYBOOK_SECRET}`;
  return authHeader === expectedAuth;
}

/**
 * Sync booking to internal systems when HoneyBook confirms
 */
async function handleBookingCreated(data: HoneybookWebhookPayload["data"]) {
  console.log(`[HoneyBook] New booking: ${data.projectTitle} for ${data.clientName}`);
  // TODO: Sync to internal database
  // TODO: Trigger calendar hold
  // TODO: Send internal Slack/email alert
}

async function handleBookingSigned(data: HoneybookWebhookPayload["data"]) {
  console.log(`[HoneyBook] Contract signed: ${data.bookingId}`);
  // TODO: Mark booking as confirmed in internal DB
  // TODO: Send confirmation SMS to client
  // TODO: Add to Google Calendar as confirmed
}

async function handlePaymentReceived(data: HoneybookWebhookPayload["data"]) {
  console.log(`[HoneyBook] Payment received: £${data.totalAmount} for booking ${data.bookingId}`);
  // TODO: Update payment status in DB
  // TODO: Send receipt email
}

async function handleBookingCompleted(data: HoneybookWebhookPayload["data"]) {
  console.log(`[HoneyBook] Booking completed: ${data.bookingId}`);
  // TODO: Trigger review request email
  // TODO: Add to testimonials pipeline
}

export async function POST(request: NextRequest) {
  if (!verifySignature(request)) {
    return Response.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  let payload: HoneybookWebhookPayload;
  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  const { event, data } = payload;

  try {
    switch (event) {
      case "booking.created":
        await handleBookingCreated(data);
        break;
      case "booking.signed":
        await handleBookingSigned(data);
        break;
      case "payment.received":
        await handlePaymentReceived(data);
        break;
      case "booking.completed":
        await handleBookingCompleted(data);
        break;
      default:
        console.log(`[HoneyBook] Unhandled event: ${event}`);
    }

    return Response.json({ ok: true, event });
  } catch (error) {
    console.error(`[HoneyBook] Error handling ${event}:`, error);
    return Response.json(
      { ok: false, error: "Internal error processing webhook" },
      { status: 500 }
    );
  }
}

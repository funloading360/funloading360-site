/**
 * n8n Webhook Integration
 * Fire-and-forget notifications to n8n for CRM automation
 */

export interface N8nBookingPayload {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  altDate?: string;
  venue: string;
  productName: string;
  tier: string;
  upsells: string[];
  totalPrice: number;
  createdAt: string;
  bookingRef: string;
}

export interface N8nPaymentPayload extends N8nBookingPayload {
  amountPaid: number;
  paymentType: "deposit" | "full";
  status: string;
  checkoutSessionId: string;
}

/**
 * Notify n8n that a new booking was submitted (before payment).
 * Used by the unpaid recovery pipeline.
 */
export async function notifyN8nBookingSubmitted(
  data: N8nBookingPayload
): Promise<void> {
  const url = process.env.N8N_WEBHOOK_BOOKING;
  if (!url) return;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.error(`[N8N] Booking webhook returned ${res.status}`);
    }
  } catch (err) {
    console.error("[N8N] Booking webhook error:", err instanceof Error ? err.message : err);
  }
}

/**
 * Notify n8n that a payment was completed.
 * Used to log paid bookings to Google Sheet.
 */
export async function notifyN8nPaymentCompleted(
  data: N8nPaymentPayload
): Promise<void> {
  const url = process.env.N8N_WEBHOOK_PAYMENT;
  if (!url) return;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.error(`[N8N] Payment webhook returned ${res.status}`);
    }
  } catch (err) {
    console.error("[N8N] Payment webhook error:", err instanceof Error ? err.message : err);
  }
}

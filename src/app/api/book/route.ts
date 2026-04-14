import { NextRequest } from "next/server";
import { Resend } from "resend";
import { BookingSchema } from "@/lib/schemas";
import { validatePhone } from "@/lib/validation";
import { checkRateLimit } from "@/lib/ratelimit";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  rateLimitResponse,
  serverErrorResponse,
} from "@/lib/apiResponse";
import {
  sendConfirmationEmail,
  sendAdminAlert,
  triggerQuoteGeneration,
  type BookingEmailData,
} from "@/lib/email";
import { sendConfirmationSMSWithRetry, type BookingSMSData } from "@/lib/sms";
import { getProductById } from "@/lib/services";
import { alertBookingSubmissionFailed, alertNewBooking, alertRateLimitExceeded } from "@/lib/monitoring";
import { notifyN8nBookingSubmitted } from "@/lib/n8n";
import { generateBookingRef } from "@/lib/email";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_EMAIL ?? "FunLoading360@gmail.com";

// Retry confirmation email up to 3 times
async function sendEmailWithRetry(booking: BookingEmailData, bookingRef: string, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await sendConfirmationEmail(booking);
      return; // success
    } catch (err) {
      if (attempt === maxRetries) {
        // All retries failed — send admin alert
        try {
          await sendAdminAlert(booking, bookingRef, err);
        } catch {
          // ignore alert failure — don't block the booking response
        }
        console.error(`Email failed after ${maxRetries} attempts:`, err);
        return; // don't throw — booking was successful, email is secondary
      }
      // Exponential backoff: 1s, 2s, 4s
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt - 1)));
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting — max 5 requests per 10 minutes per IP
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const rateLimit = await checkRateLimit(ip);
    if (!rateLimit.success) {
      alertRateLimitExceeded(ip, "/api/book").catch(() => {});
      return rateLimitResponse();
    }

    const body = await req.json();

    // Honeypot check — bots fill hidden fields, humans don't
    if (body._hp) {
      return successResponse({ bookingId: "pending" }); // silent discard
    }

    // Double-check phone validation server-side
    const phoneValidation = validatePhone(body.phone);
    if (!phoneValidation.valid) {
      return errorResponse(phoneValidation.error || "Invalid phone number", "phone");
    }

    const result = BookingSchema.safeParse(body);
    if (!result.success) {
      return validationErrorResponse(result.error.flatten().fieldErrors);
    }

    const {
      packageId,
      productId,
      tier,
      name,
      email,
      phone,
      eventType,
      eventDate,
      altDate,
      venue,
      specialRequests,
      upsells = [],
      totalPrice = 0,
    } = result.data;

    // Support both old packageId and new productId format
    const selectedProductId = productId || packageId;
    if (!selectedProductId) {
      return errorResponse("Invalid product selected", "productId");
    }

    // Get product details for email (only if using new format)
    let product = null;
    if (productId) {
      product = getProductById(productId);
      if (!product) {
        return errorResponse("Invalid product selected", "productId");
      }
    }

    // Prepare email data (only for new format with product details)
    if (product && tier) {
      const depositPrice = Math.round(totalPrice * 0.15);
      const emailData: BookingEmailData = {
        name,
        email,
        phone,
        productName: product.name,
        tier: product.tiers[tier as keyof typeof product.tiers]?.name || tier,
        date: eventDate,
        altDate,
        venue,
        eventType,
        totalPrice,
        depositPrice,
        paymentType: "deposit",
        amountPaid: depositPrice,
        upsells: upsells.map((id) => {
          const upsellMap: Record<string, { name: string; price: number }> = {
            "guest-book": { name: "Guest Book", price: 40 },
            "extra-hour": { name: "Extra Hour", price: 75 },
            "highlight-reel": { name: "Highlight Reel", price: 79 },
          };
          return upsellMap[id] || { name: id, price: 0 };
        }),
      };

      // Prepare SMS data
      const smsData: BookingSMSData = {
        phone,
        name,
        productName: product.name,
        tier: emailData.tier,
        date: eventDate,
        totalPrice,
      };

      // Send confirmation email to customer with retry (async, non-blocking)
      sendEmailWithRetry(emailData, generateBookingRef(name, eventDate)).catch((err) => {
        console.error("[EMAIL] Customer confirmation failed after all retries:", err);
      });

      // Send SMS confirmation with retry logic (async, non-blocking)
      sendConfirmationSMSWithRetry(smsData).catch((err) => {
        console.error("[SMS] Confirmation failed:", err);
      });

      // Trigger quote generation via Zapier (async, non-blocking)
      triggerQuoteGeneration(emailData).catch((err) => {
        console.error("[ZAPIER] Quote trigger failed:", err);
      });

      // Notify n8n for unpaid recovery pipeline (async, non-blocking)
      notifyN8nBookingSubmitted({
        name,
        email,
        phone,
        eventType,
        eventDate,
        altDate,
        venue,
        productName: product.name,
        tier: emailData.tier,
        upsells: upsells,
        totalPrice,
        createdAt: new Date().toISOString(),
        bookingRef: generateBookingRef(name, eventDate),
      }).catch((err) => {
        console.error("[N8N] Booking webhook failed:", err);
      });
    }

    // Send admin notification (existing flow)
    await resend.emails.send({
      from: "Website Booking <noreply@funloading360.co.uk>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `New Booking Request — ${name} (${eventType})`,
      text: [
        product ? `Service: ${product.name}` : `Package: ${packageId}`,
        tier ? `Package: ${tier}` : null,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Event Type: ${eventType}`,
        `Preferred Date: ${eventDate}`,
        altDate ? `Alternative Date: ${altDate}` : null,
        `Venue: ${venue}`,
        totalPrice > 0 ? `Total Price: £${totalPrice}` : null,
        upsells.length > 0 ? `Add-ons: ${upsells.join(", ")}` : null,
        `Special Requests: ${specialRequests || "—"}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    // Alert on new booking (async, non-blocking)
    if (product && totalPrice > 0) {
      alertNewBooking({ name, email, eventDate, productId: product.id, totalPrice }).catch(() => {});
    }

    return successResponse({ bookingId: "pending", email });
  } catch (err) {
    console.error("[/api/book]", err);
    alertBookingSubmissionFailed(
      err instanceof Error ? err.message : "Unknown error",
      {}
    ).catch(() => {});
    return serverErrorResponse("Failed to send booking request");
  }
}

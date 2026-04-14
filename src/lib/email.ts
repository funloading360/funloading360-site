/**
 * Email Templates & Functions
 * Integration with Resend API for confirmation emails
 */

import { Resend } from "resend";
import type { BookingRecord } from "./stripe";
import { ADMIN_ALERT_EMAIL } from "./constants";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.CONTACT_EMAIL ?? "FunLoading360@gmail.com";

export interface BookingEmailData {
  name: string;
  email: string;
  phone: string;
  productName: string;
  tier: string;
  date: string;
  altDate?: string;
  venue: string;
  eventType: string;
  totalPrice: number;
  depositPrice: number;
  paymentType: "deposit" | "full";
  amountPaid: number;
  upsells: Array<{ name: string; price: number }>;
}

/**
 * Generate a booking reference from name and date
 * Format: #FL360-YYYY-MMDD-NAME (first 4 letters uppercase)
 */
export function generateBookingRef(name: string, date: string): string {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const nameTag = name
    .replace(/[^a-zA-Z]/g, "")
    .substring(0, 4)
    .toUpperCase()
    .padEnd(4, "X");
  return `#FL360-${yyyy}-${mm}${dd}-${nameTag}`;
}

/**
 * Generate confirmation email HTML — premium branded template
 */
export function generateConfirmationEmail(data: BookingEmailData): string {
  const formattedDate = new Date(data.date).toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const altDateFormatted = data.altDate
    ? new Date(data.altDate).toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const paymentLabel =
    data.paymentType === "deposit" ? "Deposit (15%)" : "Full Payment";

  const remaining =
    data.paymentType === "deposit" ? data.totalPrice - data.amountPaid : 0;

  const bookingRef = generateBookingRef(data.name, data.date);

  const upsellTotal = data.upsells.reduce((s, u) => s + u.price, 0);
  const basePrice = data.totalPrice - upsellTotal;

  // --- build upsell rows ---
  const upsellRows = data.upsells
    .map(
      (u) => `
        <tr>
          <td style="padding:8px 0;color:#555555;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;border-bottom:1px solid #eeeeee;">${u.name}</td>
          <td style="padding:8px 0;color:#333333;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;text-align:right;border-bottom:1px solid #eeeeee;">+&pound;${u.price}</td>
        </tr>`
    )
    .join("");

  // --- build add-ons section for booking details ---
  const addonsSection =
    data.upsells.length > 0
      ? `
        <tr>
          <td colspan="2" style="padding:16px 0 8px 0;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:13px;color:#f5a623;font-weight:bold;text-transform:uppercase;letter-spacing:0.5px;">Selected Add-ons</td>
        </tr>
        ${data.upsells.map((u) => `
        <tr>
          <td style="padding:8px 0;color:#555555;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;border-bottom:1px solid #eeeeee;">${u.name}</td>
          <td style="padding:8px 0;color:#333333;font-weight:600;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;text-align:right;border-bottom:1px solid #eeeeee;">&pound;${u.price}</td>
        </tr>`).join("")}`
      : "";

  // --- remaining balance row in pricing ---
  const remainingRow =
    remaining > 0
      ? `
        <tr>
          <td style="padding:8px 0;color:#555555;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;">Remaining Balance</td>
          <td style="padding:8px 0;color:#c0392b;font-weight:600;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;text-align:right;">&pound;${remaining}</td>
        </tr>`
      : "";

  // --- what's next step 2 ---
  const step2Text =
    remaining > 0
      ? `The remaining balance of <strong>&pound;${remaining}</strong> is due at least 14 days before your event. We'll send you a reminder.`
      : `Your booking is fully paid &mdash; no further action needed!`;

  // --- payment box text ---
  const paymentSubText =
    remaining > 0
      ? `<br style="line-height:24px;"><span style="font-size:13px;color:#2e7d32;">Remaining balance of <strong>&pound;${remaining}</strong> is due 14 days before your event.</span>`
      : `<br style="line-height:24px;"><span style="font-size:13px;color:#2e7d32;">Your booking is fully paid. No further payment required.</span>`;

  // --- alt date row ---
  const altDateRow = altDateFormatted
    ? `
        <tr>
          <td style="padding:10px 0;color:#888888;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;border-bottom:1px solid #eeeeee;width:140px;">Alternative Date</td>
          <td style="padding:10px 0;color:#222222;font-weight:600;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;border-bottom:1px solid #eeeeee;">${altDateFormatted}</td>
        </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Booking Confirmed - FunLoading360</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f0f0f0;-webkit-font-smoothing:antialiased;">

<!-- Outer wrapper -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f0f0;">
  <tr>
    <td align="center" style="padding:24px 16px;">

      <!-- Main container 600px -->
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- ============ HEADER ============ -->
        <tr>
          <td style="background:linear-gradient(135deg,#0a0a0e 0%,#1a1a24 60%,#0a0a0e 100%);padding:40px 30px 32px 30px;text-align:center;">
            <!-- Logo circle -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
              <tr>
                <td style="width:64px;height:64px;border-radius:50%;border:3px solid #f5a623;text-align:center;vertical-align:middle;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:22px;font-weight:bold;color:#f5a623;line-height:64px;">360</td>
              </tr>
            </table>
            <!-- Brand name -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
              <tr>
                <td style="padding-top:14px;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">FunLoading360</td>
              </tr>
            </table>
            <!-- Confirmed line -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
              <tr>
                <td style="padding-top:20px;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:22px;font-weight:600;color:#ffffff;">&#10003; Booking Confirmed</td>
              </tr>
            </table>
            <!-- Booking ref -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
              <tr>
                <td style="padding-top:10px;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:13px;color:#aaaaaa;letter-spacing:1px;">${bookingRef}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ============ GREETING ============ -->
        <tr>
          <td style="background-color:#ffffff;padding:32px 36px 8px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:16px;color:#333333;line-height:1.6;">
                  Hi ${escapeHtml(data.name)},
                  <br><br>
                  Thank you for choosing FunLoading360 for your <strong>${escapeHtml(data.eventType)}</strong>! Your payment has been processed and your date is secured.
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ============ PAYMENT CONFIRMATION BOX ============ -->
        <tr>
          <td style="background-color:#ffffff;padding:20px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#e8f5e9;border:1px solid #4caf50;border-radius:8px;">
              <tr>
                <td style="padding:18px 20px;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;">
                  <span style="font-size:16px;font-weight:700;color:#2e7d32;">&#10003; Payment Confirmed</span>
                  <br style="line-height:28px;">
                  <span style="font-size:14px;color:#2e7d32;">${paymentLabel}: <strong>&pound;${data.amountPaid}</strong> received</span>
                  ${paymentSubText}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ============ YOUR BOOKING ============ -->
        <tr>
          <td style="background-color:#ffffff;padding:24px 36px 8px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:13px;color:#f5a623;font-weight:bold;text-transform:uppercase;letter-spacing:1px;padding-bottom:14px;border-bottom:2px solid #f5a623;">Your Booking</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:#ffffff;padding:4px 36px 24px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:10px 0;color:#888888;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;border-bottom:1px solid #eeeeee;width:140px;">Service</td>
                <td style="padding:10px 0;color:#222222;font-weight:600;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;border-bottom:1px solid #eeeeee;">${escapeHtml(data.productName)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#888888;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;border-bottom:1px solid #eeeeee;width:140px;">Package</td>
                <td style="padding:10px 0;color:#222222;font-weight:600;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;border-bottom:1px solid #eeeeee;">${escapeHtml(data.tier)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#888888;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;border-bottom:1px solid #eeeeee;width:140px;">Date</td>
                <td style="padding:10px 0;color:#222222;font-weight:600;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;border-bottom:1px solid #eeeeee;">${formattedDate}</td>
              </tr>
              ${altDateRow}
              <tr>
                <td style="padding:10px 0;color:#888888;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;border-bottom:1px solid #eeeeee;width:140px;">Venue</td>
                <td style="padding:10px 0;color:#222222;font-weight:600;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;border-bottom:1px solid #eeeeee;">${escapeHtml(data.venue)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#888888;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;border-bottom:1px solid #eeeeee;width:140px;">Event Type</td>
                <td style="padding:10px 0;color:#222222;font-weight:600;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;border-bottom:1px solid #eeeeee;">${escapeHtml(data.eventType)}</td>
              </tr>
              ${addonsSection}
            </table>
          </td>
        </tr>

        <!-- ============ PRICING BREAKDOWN ============ -->
        <tr>
          <td style="background-color:#ffffff;padding:24px 36px 8px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:13px;color:#f5a623;font-weight:bold;text-transform:uppercase;letter-spacing:1px;padding-bottom:14px;border-bottom:2px solid #f5a623;">Pricing Breakdown</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:#ffffff;padding:4px 36px 24px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:8px 0;color:#555555;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;border-bottom:1px solid #eeeeee;">${escapeHtml(data.productName)} (${escapeHtml(data.tier)})</td>
                <td style="padding:8px 0;color:#333333;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;text-align:right;border-bottom:1px solid #eeeeee;">&pound;${basePrice}</td>
              </tr>
              ${upsellRows}
              <!-- Separator -->
              <tr>
                <td colspan="2" style="padding:0;border-bottom:2px solid #f5a623;"></td>
              </tr>
              <!-- Total -->
              <tr>
                <td style="padding:14px 0 8px 0;color:#f5a623;font-weight:700;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:18px;">Total</td>
                <td style="padding:14px 0 8px 0;color:#f5a623;font-weight:700;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:18px;text-align:right;">&pound;${data.totalPrice}</td>
              </tr>
              <!-- Amount paid -->
              <tr>
                <td style="padding:6px 0;color:#555555;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;">Amount Paid (${paymentLabel})</td>
                <td style="padding:6px 0;color:#2e7d32;font-weight:600;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;text-align:right;">&pound;${data.amountPaid}</td>
              </tr>
              ${remainingRow}
            </table>
          </td>
        </tr>

        <!-- ============ WHAT'S NEXT ============ -->
        <tr>
          <td style="background-color:#faf8f5;padding:24px 36px 8px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:13px;color:#f5a623;font-weight:bold;text-transform:uppercase;letter-spacing:1px;padding-bottom:14px;border-bottom:2px solid #f5a623;">What's Next</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color:#faf8f5;padding:16px 36px 32px 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <!-- Step 1 -->
              <tr>
                <td style="width:36px;vertical-align:top;padding:12px 0;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="width:30px;height:30px;border-radius:50%;background-color:#f5a623;text-align:center;vertical-align:middle;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;font-weight:700;color:#ffffff;line-height:30px;">1</td>
                    </tr>
                  </table>
                </td>
                <td style="vertical-align:top;padding:12px 0 12px 12px;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;color:#444444;line-height:1.6;">
                  Our team will contact you within <strong>24 hours</strong> to discuss logistics and finalise the details for your event &mdash; including overlays, photo templates, and your song playlist.
                </td>
              </tr>
              <!-- Step 2 -->
              <tr>
                <td style="width:36px;vertical-align:top;padding:12px 0;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="width:30px;height:30px;border-radius:50%;background-color:#f5a623;text-align:center;vertical-align:middle;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;font-weight:700;color:#ffffff;line-height:30px;">2</td>
                    </tr>
                  </table>
                </td>
                <td style="vertical-align:top;padding:12px 0 12px 12px;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;color:#444444;line-height:1.6;">
                  ${step2Text}
                </td>
              </tr>
              <!-- Step 3 -->
              <tr>
                <td style="width:36px;vertical-align:top;padding:12px 0;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="width:30px;height:30px;border-radius:50%;background-color:#f5a623;text-align:center;vertical-align:middle;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;font-weight:700;color:#ffffff;line-height:30px;">3</td>
                    </tr>
                  </table>
                </td>
                <td style="vertical-align:top;padding:12px 0 12px 12px;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;color:#444444;line-height:1.6;">
                  On the day, we'll arrive <strong>60&ndash;90 minutes</strong> before your event starts to set up. All you need to do is enjoy!
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ============ CONTACT BAR ============ -->
        <tr>
          <td style="background-color:#f9f9f9;padding:24px 36px;text-align:center;border-top:1px solid #eeeeee;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;color:#666666;line-height:1.8;text-align:center;">
                  <strong style="color:#333333;">Questions? We're here to help.</strong>
                  <br>
                  <a href="tel:+447482112110" style="color:#f5a623;text-decoration:none;">+44 7482 112110</a>
                  &nbsp;&nbsp;&#8226;&nbsp;&nbsp;
                  <a href="mailto:FunLoading360@gmail.com" style="color:#f5a623;text-decoration:none;">FunLoading360@gmail.com</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ============ FOOTER ============ -->
        <tr>
          <td style="background-color:#0a0a0e;padding:24px 36px;text-align:center;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:12px;color:#777777;line-height:1.8;text-align:center;">
                  &copy; 2026 FunLoading360. All rights reserved.
                  <br>
                  Please keep this email for your records.
                  <br>
                  <a href="https://funloading360.co.uk/terms" style="color:#f5a623;text-decoration:underline;font-size:12px;">View our Terms &amp; Conditions</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
      <!-- /Main container -->

    </td>
  </tr>
</table>
<!-- /Outer wrapper -->

</body>
</html>`;
}

/**
 * Send confirmation email to customer via Resend
 */
export async function sendConfirmationEmail(data: BookingEmailData): Promise<void> {
  try {
    const bookingRef = generateBookingRef(data.name, data.date);
    const html = generateConfirmationEmail(data);

    await resend.emails.send({
      from: "FunLoading360 <noreply@funloading360.co.uk>",
      to: data.email,
      subject: `Booking Confirmed ${bookingRef} - FunLoading360`,
      html,
    });

    console.log(`[EMAIL] Confirmation email sent to ${data.email}`);
  } catch (error) {
    console.error("[EMAIL ERROR]", error);
    throw new Error("Failed to send confirmation email");
  }
}

/**
 * Send admin notification email about a new paid booking
 */
export async function sendAdminBookingEmail(
  data: BookingEmailData,
  booking: BookingRecord
): Promise<void> {
  try {
    await resend.emails.send({
      from: "Website Booking <noreply@funloading360.co.uk>",
      to: ADMIN_EMAIL,
      replyTo: data.email,
      subject: `Paid Booking - ${data.name} (${booking.eventType}) - ${data.paymentType === "deposit" ? "15% Deposit" : "Full Payment"}`,
      text: [
        `Service: ${data.productName}`,
        `Package: ${data.tier}`,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Event Type: ${booking.eventType}`,
        `Preferred Date: ${data.date}`,
        data.altDate ? `Alternative Date: ${data.altDate}` : null,
        `Venue: ${data.venue}`,
        ``,
        `--- Payment ---`,
        `Total Price: \u00a3${data.totalPrice}`,
        `Payment Type: ${data.paymentType === "deposit" ? "15% Deposit" : "Full Payment"}`,
        `Amount Paid: \u00a3${data.amountPaid}`,
        data.paymentType === "deposit"
          ? `Remaining Balance: \u00a3${data.totalPrice - data.amountPaid}`
          : null,
        ``,
        booking.upsells.length > 0 ? `Add-ons: ${booking.upsells.join(", ")}` : null,
        booking.specialRequests ? `Special Requests: ${booking.specialRequests}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    console.log(`[EMAIL] Admin notification sent for ${data.name}`);
  } catch (error) {
    console.error("[EMAIL] Admin notification failed:", error);
    throw new Error("Failed to send admin email");
  }
}

/**
 * Send admin alert when all confirmation email retries have failed
 */
export async function sendAdminAlert(
  booking: BookingEmailData,
  bookingRef: string,
  err: unknown
): Promise<void> {
  await resend.emails.send({
    from: "FunLoading360 <noreply@funloading360.co.uk>",
    to: ADMIN_ALERT_EMAIL,
    subject: `[ACTION REQUIRED] Confirmation email failed — ${bookingRef}`,
    text: [
      `Confirmation email could not be delivered after 3 attempts.`,
      ``,
      `Booking Ref: ${bookingRef}`,
      `Customer Name: ${booking.name}`,
      `Customer Email: ${booking.email}`,
      `Event Date: ${booking.date}`,
      ``,
      `Error: ${err instanceof Error ? err.message : String(err)}`,
      ``,
      `Please contact the customer manually to confirm their booking.`,
    ].join("\n"),
  });
}

/**
 * Send quote notification (async via Zapier)
 */
export async function triggerQuoteGeneration(data: BookingEmailData): Promise<void> {
  try {
    console.log(`[ZAPIER] Quote generation triggered for ${data.email}`);
    return Promise.resolve();
  } catch (error) {
    console.error("[ZAPIER ERROR]", error);
    console.warn("Quote generation failed, but booking was still processed");
  }
}

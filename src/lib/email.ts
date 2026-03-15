/**
 * Email Templates & Functions
 * Integration with Resend API for confirmation emails
 */

export interface BookingEmailData {
  name: string;
  email: string;
  phone: string;
  productName: string;
  tier: string;
  date: string;
  altDate?: string;
  venue: string;
  totalPrice: number;
  depositPrice: number;
  upsells: Array<{ name: string; price: number }>;
}

/**
 * Generate confirmation email HTML
 */
export function generateConfirmationEmail(data: BookingEmailData): string {
  const formattedDate = new Date(data.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const altDateFormatted = data.altDate
    ? new Date(data.altDate).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation - FunLoading360</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #0a0a0e 0%, #1a1a24 100%);
      color: white;
      padding: 40px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: bold;
    }
    .content {
      padding: 40px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      color: #f5a623;
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 15px;
      text-transform: uppercase;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    .detail-row.total {
      font-weight: bold;
      font-size: 18px;
      color: #f5a623;
      border-top: 2px solid #f5a623;
      padding-top: 15px;
      margin-top: 15px;
    }
    .detail-label {
      color: #666;
    }
    .detail-value {
      color: #000;
      font-weight: 500;
    }
    .footer {
      background: #f9f9f9;
      padding: 20px;
      text-align: center;
      color: #666;
      font-size: 12px;
      border-top: 1px solid #eee;
    }
    .cta-button {
      display: inline-block;
      background: #f5a623;
      color: white;
      padding: 12px 30px;
      border-radius: 25px;
      text-decoration: none;
      font-weight: bold;
      margin-top: 20px;
    }
    .info-box {
      background: #f5a623;
      color: white;
      padding: 15px;
      border-radius: 6px;
      margin: 20px 0;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✓ Your Booking Has Been Received!</h1>
    </div>

    <div class="content">
      <p>Hi ${data.name},</p>

      <p>Thank you for booking with <strong>FunLoading360</strong>. We've received your request and you'll receive a detailed quote within the next 5 minutes.</p>

      <div class="info-box">
        <strong>🚀 Next Step:</strong><br>
        Our team will review availability and contact you within 2 hours to confirm your date and discuss details.
      </div>

      <div class="section">
        <div class="section-title">Booking Summary</div>
        <div class="detail-row">
          <span class="detail-label">Service:</span>
          <span class="detail-value">${data.productName}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Package:</span>
          <span class="detail-value">${data.tier}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date:</span>
          <span class="detail-value">${formattedDate}</span>
        </div>
        ${altDateFormatted
          ? `<div class="detail-row">
          <span class="detail-label">Alternative Date:</span>
          <span class="detail-value">${altDateFormatted}</span>
        </div>`
          : ""}
        <div class="detail-row">
          <span class="detail-label">Event Venue:</span>
          <span class="detail-value">${data.venue}</span>
        </div>
      </div>

      ${
        data.upsells.length > 0
          ? `<div class="section">
        <div class="section-title">Selected Add-ons</div>
        ${data.upsells.map((u) => `<div class="detail-row"><span class="detail-label">${u.name}:</span><span class="detail-value">£${u.price}</span></div>`).join("")}
      </div>`
          : ""
      }

      <div class="section">
        <div class="section-title">Pricing</div>
        <div class="detail-row">
          <span class="detail-label">Total Price:</span>
          <span class="detail-value">£${data.totalPrice}</span>
        </div>
        <div class="detail-row total">
          <span>Deposit (15%):</span>
          <span>£${data.depositPrice}</span>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 10px;">
          The remaining £${data.totalPrice - data.depositPrice} will be paid before your event.
        </p>
      </div>

      <div class="section">
        <div class="section-title">Contact Details</div>
        <div class="detail-row">
          <span class="detail-label">Phone:</span>
          <span class="detail-value">${data.phone}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Email:</span>
          <span class="detail-value">${data.email}</span>
        </div>
      </div>

      <p style="color: #666; font-size: 14px;">
        <strong>Contact us if you have questions:</strong><br>
        📞 +44 7482 112110<br>
        ✉️ hello@funloading360.co.uk
      </p>
    </div>

    <div class="footer">
      <p>© 2026 FunLoading360. All rights reserved.</p>
      <p>This email contains your booking details. Please keep it for your records.</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Send confirmation email (Resend)
 * Currently stubbed - integrate with Resend API
 */
export async function sendConfirmationEmail(data: BookingEmailData): Promise<void> {
  try {
    const html = generateConfirmationEmail(data);

    // TODO: Integrate with Resend API
    // const response = await resend.emails.send({
    //   from: 'booking@funloading360.co.uk',
    //   to: data.email,
    //   subject: 'Booking Confirmation - FunLoading360',
    //   html,
    // });

    console.log(`[EMAIL] Confirmation email queued for ${data.email}`);
    // For now, just log that it would be sent
    return Promise.resolve();
  } catch (error) {
    console.error("[EMAIL ERROR]", error);
    throw new Error("Failed to send confirmation email");
  }
}

/**
 * Send quote notification (async via Zapier)
 * Webhook triggers PDF generation and email
 */
export async function triggerQuoteGeneration(data: BookingEmailData): Promise<void> {
  try {
    // TODO: Integrate with Zapier webhook
    // const zapierWebhookUrl = process.env.ZAPIER_QUOTE_WEBHOOK_URL;
    // if (!zapierWebhookUrl) throw new Error('Zapier webhook not configured');
    //
    // await fetch(zapierWebhookUrl, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });

    console.log(`[ZAPIER] Quote generation triggered for ${data.email}`);
    return Promise.resolve();
  } catch (error) {
    console.error("[ZAPIER ERROR]", error);
    // Don't throw - quote generation failure shouldn't block booking
    console.warn("Quote generation failed, but booking was still processed");
  }
}

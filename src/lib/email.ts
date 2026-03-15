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
  const formattedDate = new Date(data.date).toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const altDateFormatted = data.altDate
    ? new Date(data.altDate).toLocaleDateString("ro-RO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return `
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmarea Rezervării - FunLoading360</title>
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
      <h1>✓ Rezervarea ta a fost primită!</h1>
    </div>

    <div class="content">
      <p>Bună, ${data.name}!</p>

      <p>Mulțumim pentru rezervarea la <strong>FunLoading360</strong>. Am primit cererea ta și vei primi o ofertă detaliată în următoarele 5 minute.</p>

      <div class="info-box">
        <strong>🚀 Pasul următor:</strong><br>
        Echipa noastră va revizui disponibilitatea și te va contacta în maxim 2 ore pentru a confirma data și a discuta detalii.
      </div>

      <div class="section">
        <div class="section-title">Rezumatul Rezervării</div>
        <div class="detail-row">
          <span class="detail-label">Serviciu:</span>
          <span class="detail-value">${data.productName}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Pachet:</span>
          <span class="detail-value">${data.tier}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Data:</span>
          <span class="detail-value">${formattedDate}</span>
        </div>
        ${altDateFormatted
          ? `<div class="detail-row">
          <span class="detail-label">Dată alternativă:</span>
          <span class="detail-value">${altDateFormatted}</span>
        </div>`
          : ""}
        <div class="detail-row">
          <span class="detail-label">Locul evenimentului:</span>
          <span class="detail-value">${data.venue}</span>
        </div>
      </div>

      ${
        data.upsells.length > 0
          ? `<div class="section">
        <div class="section-title">Îmbunătățiri Selectate</div>
        ${data.upsells.map((u) => `<div class="detail-row"><span class="detail-label">${u.name}:</span><span class="detail-value">£${u.price}</span></div>`).join("")}
      </div>`
          : ""
      }

      <div class="section">
        <div class="section-title">Preț</div>
        <div class="detail-row">
          <span class="detail-label">Preț total:</span>
          <span class="detail-value">£${data.totalPrice}</span>
        </div>
        <div class="detail-row total">
          <span>Depozit (15%):</span>
          <span>£${data.depositPrice}</span>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 10px;">
          Restul de £${data.totalPrice - data.depositPrice} se va plăti înainte de eveniment.
        </p>
      </div>

      <div class="section">
        <div class="section-title">Datele de Contact</div>
        <div class="detail-row">
          <span class="detail-label">Telefon:</span>
          <span class="detail-value">${data.phone}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Email:</span>
          <span class="detail-value">${data.email}</span>
        </div>
      </div>

      <p style="color: #666; font-size: 14px;">
        <strong>Contactează-ne dacă ai întrebări:</strong><br>
        📞 +44 7482 112110<br>
        ✉️ hello@funloading360.co.uk
      </p>
    </div>

    <div class="footer">
      <p>© 2026 FunLoading360. Toate drepturile rezervate.</p>
      <p>Acest email conține detaliile rezervării tale. Te rugăm să o păstrezi pentru referință.</p>
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
    //   subject: 'Confirmarea Rezervării - FunLoading360',
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

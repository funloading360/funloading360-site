/**
 * Monitoring & Alerting
 *
 * Lightweight error + business event monitoring.
 * Sends critical alerts via email (Resend) and logs to GA4.
 *
 * To add Sentry: npm install @sentry/nextjs and run `npx @sentry/wizard`
 */

const ALERT_EMAIL = process.env.ALERT_EMAIL || "FunLoading360@gmail.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

export type AlertSeverity = "info" | "warning" | "critical";

export interface AlertEvent {
  title: string;
  message: string;
  severity: AlertSeverity;
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Send an alert email for critical events (booking failures, API errors, etc.)
 * Fail-open: monitoring should never block the user flow.
 */
async function sendAlertEmail(event: AlertEvent): Promise<void> {
  if (!RESEND_API_KEY) return; // No-op in dev without API key

  const emoji = { info: "ℹ️", warning: "⚠️", critical: "🚨" }[event.severity];

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "alerts@funloading360.co.uk",
        to: ALERT_EMAIL,
        subject: `${emoji} [${event.severity.toUpperCase()}] ${event.title}`,
        html: `
          <h2>${emoji} ${event.title}</h2>
          <p>${event.message}</p>
          ${
            event.metadata
              ? `<pre style="background:#f5f5f5;padding:12px;border-radius:6px">${JSON.stringify(
                  event.metadata,
                  null,
                  2
                )}</pre>`
              : ""
          }
          <hr/>
          <small>FunLoading360 Monitoring • ${new Date().toISOString()}</small>
        `,
      }),
    });
  } catch {
    // Never let monitoring failures propagate
  }
}

/**
 * Track event in GA4 (server-side via Measurement Protocol is complex;
 * this function logs server-side and is intended to be paired with
 * client-side GA4 tracking in analytics.ts)
 */
function logMonitoringEvent(event: AlertEvent): void {
  const prefix =
    event.severity === "critical"
      ? "🚨 CRITICAL"
      : event.severity === "warning"
      ? "⚠️  WARNING"
      : "ℹ️  INFO";

  console.log(
    `[Monitor] ${prefix}: ${event.title} — ${event.message}`,
    event.metadata ?? ""
  );
}

/**
 * Main alert function — logs + emails for critical events
 */
export async function alert(event: AlertEvent): Promise<void> {
  logMonitoringEvent(event);

  // Only email for warning and critical to avoid noise
  if (event.severity !== "info") {
    await sendAlertEmail(event);
  }
}

/**
 * Send instant alert to Slack/Discord webhook.
 * Dual-channel with email — much faster for on-call awareness.
 */
export async function sendSlackAlert(
  severity: AlertSeverity,
  message: string,
  metadata?: Record<string, string | number | boolean>
): Promise<void> {
  if (!SLACK_WEBHOOK_URL) return;
  const emoji = { info: "ℹ️", warning: "⚠️", critical: "🚨" }[severity];
  try {
    await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `${emoji} **[${severity.toUpperCase()}]** ${message}`,
        embeds: metadata
          ? [
              {
                color: severity === "critical" ? 0xff0000 : severity === "warning" ? 0xffa500 : 0x0099ff,
                fields: Object.entries(metadata).map(([k, v]) => ({
                  name: k,
                  value: String(v),
                  inline: true,
                })),
                timestamp: new Date().toISOString(),
              },
            ]
          : undefined,
      }),
    });
  } catch {
    // Never let monitoring failures propagate
  }
}

// ── Predefined alert helpers ─────────────────────────────────────────────────

export async function alertBookingSubmissionFailed(
  error: string,
  formData: { email?: string; name?: string }
): Promise<void> {
  await alert({
    title: "Booking Submission Failed",
    message: `A booking form submission failed with error: ${error}`,
    severity: "critical",
    metadata: {
      error,
      clientEmail: formData.email ?? "unknown",
      clientName: formData.name ?? "unknown",
      timestamp: new Date().toISOString(),
    },
  });
}

export async function alertApiError(
  route: string,
  error: string,
  statusCode: number
): Promise<void> {
  await alert({
    title: `API Error on ${route}`,
    message: `HTTP ${statusCode}: ${error}`,
    severity: statusCode >= 500 ? "critical" : "warning",
    metadata: { route, error, statusCode },
  });
}

export async function alertRateLimitExceeded(
  ip: string,
  route: string
): Promise<void> {
  await alert({
    title: "Rate Limit Exceeded",
    message: `IP ${ip} hit rate limit on ${route}`,
    severity: "warning",
    metadata: { ip, route, timestamp: new Date().toISOString() },
  });
}

export async function alertCalendarSyncFailed(
  bookingDate: string,
  error: string
): Promise<void> {
  await alert({
    title: "Google Calendar Sync Failed",
    message: `Could not sync booking for ${bookingDate}: ${error}`,
    severity: "warning",
    metadata: { bookingDate, error },
  });
}

export async function alertNewBooking(booking: {
  name: string;
  email: string;
  eventDate: string;
  productId: string;
  totalPrice: number;
}): Promise<void> {
  await alert({
    title: "New Booking Request",
    message: `${booking.name} requested a ${booking.productId} for ${booking.eventDate}`,
    severity: "info",
    metadata: {
      ...booking,
      totalPrice: `£${booking.totalPrice}`,
    },
  });
}

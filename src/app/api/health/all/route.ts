import { NextRequest } from "next/server";
import { sendSlackAlert } from "@/lib/monitoring";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.funloading360.co.uk";
const TOKEN = process.env.HEALTH_CHECK_TOKEN;

async function checkService(name: string, path: string) {
  const start = Date.now();
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: TOKEN ? { "x-health-token": TOKEN } : {},
      signal: AbortSignal.timeout(8000),
    });
    const data = await res.json();
    return { name, ok: res.ok, latencyMs: Date.now() - start, ...(data as object) };
  } catch (err) {
    return {
      name,
      ok: false,
      status: "unhealthy",
      error: err instanceof Error ? err.message : "Timeout or network error",
      latencyMs: Date.now() - start,
    };
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("x-health-token");
  if (TOKEN && authHeader !== TOKEN) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const start = Date.now();

  const [stripe, email, redis, calendar, booking] = await Promise.allSettled([
    checkService("stripe", "/api/health/stripe"),
    checkService("email", "/api/health/email"),
    checkService("redis", "/api/health/redis"),
    checkService("calendar", "/api/health/calendar"),
    checkService("booking", "/api/health/booking"),
  ]);

  const services = {
    stripe: stripe.status === "fulfilled" ? stripe.value : { ok: false, error: "Check failed" },
    email: email.status === "fulfilled" ? email.value : { ok: false, error: "Check failed" },
    redis: redis.status === "fulfilled" ? redis.value : { ok: false, error: "Check failed" },
    calendar: calendar.status === "fulfilled" ? calendar.value : { ok: false, error: "Check failed" },
    booking: booking.status === "fulfilled" ? booking.value : { ok: false, error: "Check failed" },
  };

  // booking warnings (stuck pending) don't count as fatal — just alert
  const criticalServices = Object.entries(services).filter(([name]) => name !== "booking");
  const allHealthy = criticalServices.every(([, s]) => s.ok);
  const anyUnhealthy = criticalServices.some(([, s]) => !s.ok);
  const hasBookingWarning = !services.booking.ok;

  const overallStatus = allHealthy
    ? hasBookingWarning ? "warning" : "healthy"
    : anyUnhealthy ? "degraded" : "unhealthy";

  const failedCritical = criticalServices
    .filter(([, s]) => !s.ok)
    .map(([name]) => name);

  // Alert on critical failures
  if (failedCritical.length > 0) {
    await sendSlackAlert("critical", `🚨 Service down: ${failedCritical.join(", ")}`, {
      overallStatus,
      failedServices: failedCritical.join(", "),
      timestamp: new Date().toISOString(),
    }).catch(() => {});
  }

  // Separate alert for stuck bookings (actionable: check Stripe dashboard)
  if (hasBookingWarning) {
    const bookingData = services.booking as Record<string, unknown>;
    await sendSlackAlert("warning", `⚠️ Stuck bookings detected — check Stripe dashboard`, {
      stuckCount: String(bookingData.stuckCount ?? "?"),
      note: String(bookingData.note ?? ""),
      timestamp: new Date().toISOString(),
    }).catch(() => {});
  }

  return Response.json(
    {
      ok: allHealthy,
      overallStatus,
      services,
      totalLatencyMs: Date.now() - start,
      timestamp: new Date().toISOString(),
    },
    { status: allHealthy ? 200 : 503 }
  );
}

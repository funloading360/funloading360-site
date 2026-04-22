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

  const [stripe, email, redis, calendar] = await Promise.allSettled([
    checkService("stripe", "/api/health/stripe"),
    checkService("email", "/api/health/email"),
    checkService("redis", "/api/health/redis"),
    checkService("calendar", "/api/health/calendar"),
  ]);

  const services = {
    stripe: stripe.status === "fulfilled" ? stripe.value : { ok: false, error: "Check failed" },
    email: email.status === "fulfilled" ? email.value : { ok: false, error: "Check failed" },
    redis: redis.status === "fulfilled" ? redis.value : { ok: false, error: "Check failed" },
    calendar: calendar.status === "fulfilled" ? calendar.value : { ok: false, error: "Check failed" },
  };

  const allHealthy = Object.values(services).every((s) => s.ok);
  const anyUnhealthy = Object.values(services).some((s) => !s.ok);

  const overallStatus = allHealthy ? "healthy" : anyUnhealthy ? "degraded" : "unhealthy";

  // Auto-alert on degraded/unhealthy (fires when called by Vercel cron)
  if (!allHealthy) {
    const failedServices = Object.entries(services)
      .filter(([, s]) => !s.ok)
      .map(([name]) => name)
      .join(", ");

    await sendSlackAlert("critical", `Health check failed: ${failedServices}`, {
      overallStatus,
      failedServices,
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

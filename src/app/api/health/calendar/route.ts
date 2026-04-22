/**
 * GET /api/health/calendar
 * Tests the Google Calendar connection and returns status.
 *
 * Use this for:
 * - Uptime monitoring (e.g. UptimeRobot pinging every 5 minutes)
 * - Manual debugging when calendar doesn't update
 *
 * Returns 200 if calendar is reachable, 503 if not.
 */

import { NextRequest } from "next/server";
import { getUnavailableDates } from "@/lib/googleCalendar";

export async function GET(request: NextRequest) {
  // Restrict to internal calls (optional: protect with a secret header)
  const authHeader = request.headers.get("x-health-token");
  const expectedToken = process.env.HEALTH_CHECK_TOKEN;
  if (expectedToken && authHeader !== expectedToken) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const start = Date.now();

  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const { merged } = await getUnavailableDates(year, month);

    return Response.json(
      {
        ok: true,
        status: "healthy",
        calendar: {
          reachable: true,
          unavailableDatesThisMonth: merged.length,
          checkedMonth: `${year}-${String(month).padStart(2, "0")}`,
          responseTimeMs: Date.now() - start,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[HEALTH][CALENDAR] Check failed:", message);

    return Response.json(
      {
        ok: false,
        status: "unhealthy",
        calendar: {
          reachable: false,
          error: message,
          responseTimeMs: Date.now() - start,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}

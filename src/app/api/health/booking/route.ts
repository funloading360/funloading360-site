/**
 * GET /api/health/booking
 * Scans Redis for booking sessions stuck in "pending" for more than 2 hours.
 *
 * A booking is "stuck" when:
 *   - Stripe checkout session was created (booking stored in Redis)
 *   - Payment was never completed or session never expired
 *   - Google Calendar event was never written → date appears free to new customers
 *
 * Healthy:  no stuck bookings, or Redis unavailable (fail-open)
 * Warning:  1+ bookings pending > 2h
 */

import { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";
import type { BookingRecord } from "@/lib/stripe";

const STUCK_THRESHOLD_MS = 2 * 60 * 60 * 1000; // 2 hours

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("x-health-token");
  const expectedToken = process.env.HEALTH_CHECK_TOKEN;
  if (expectedToken && authHeader !== expectedToken) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const start = Date.now();

  // If Redis is not configured, report healthy (no data = no problem to detect)
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return Response.json({
      ok: true,
      status: "healthy",
      note: "Redis not configured — booking check skipped",
      stuckBookings: [],
      latencyMs: Date.now() - start,
      timestamp: new Date().toISOString(),
    });
  }

  try {
    const redis = Redis.fromEnv();
    const now = Date.now();
    const stuckBookings: Array<{
      sessionId: string;
      email: string;
      eventDate: string;
      pendingSinceMinutes: number;
    }> = [];

    // Scan all booking:* keys in batches
    let cursor = 0;
    do {
      const [nextCursor, keys] = await redis.scan(cursor, {
        match: "booking:*",
        count: 100,
      });
      cursor = typeof nextCursor === "number" ? nextCursor : Number(nextCursor);

      for (const key of keys) {
        const raw = await redis.get<BookingRecord | string>(key);
        if (!raw) continue;

        const booking: BookingRecord =
          typeof raw === "string" ? JSON.parse(raw) : raw;

        if (booking.status !== "pending") continue;

        const ageMs = now - new Date(booking.createdAt).getTime();
        if (ageMs > STUCK_THRESHOLD_MS) {
          stuckBookings.push({
            sessionId: booking.checkoutSessionId,
            email: booking.email,
            eventDate: booking.eventDate,
            pendingSinceMinutes: Math.round(ageMs / 60000),
          });
        }
      }
    } while (cursor !== 0);

    const healthy = stuckBookings.length === 0;

    return Response.json(
      {
        ok: healthy,
        status: healthy ? "healthy" : "warning",
        stuckBookings,
        stuckCount: stuckBookings.length,
        note: healthy
          ? "No stuck bookings"
          : `${stuckBookings.length} booking(s) pending >2h — check Stripe dashboard`,
        latencyMs: Date.now() - start,
        timestamp: new Date().toISOString(),
      },
      { status: healthy ? 200 : 207 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[HEALTH][BOOKING]", message);

    // Redis error: fail-open, don't block deployments
    return Response.json({
      ok: true,
      status: "healthy",
      note: `Redis check failed (fail-open): ${message}`,
      stuckBookings: [],
      latencyMs: Date.now() - start,
      timestamp: new Date().toISOString(),
    });
  }
}

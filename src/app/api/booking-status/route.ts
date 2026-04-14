/**
 * GET /api/booking-status?email=X&date=Y
 * Used by n8n to check if a booking has been paid.
 * Returns { paid: boolean } — no PII exposed.
 */

import { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";
import type { BookingRecord } from "@/lib/stripe";

const redis = Redis.fromEnv();

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email");
    const date = request.nextUrl.searchParams.get("date");

    if (!email || !date) {
      return Response.json(
        { paid: false, error: "Missing email or date parameter" },
        { status: 400 }
      );
    }

    // Scan Redis for booking keys matching this email + date + completed
    let cursor = 0;
    let paid = false;

    do {
      const [nextCursor, keys] = await redis.scan(cursor, {
        match: "booking:*",
        count: 50,
      });
      cursor = typeof nextCursor === "number" ? nextCursor : Number(nextCursor);

      for (const key of keys) {
        const booking = await redis.get<BookingRecord>(key);
        if (
          booking &&
          booking.email === email &&
          booking.eventDate === date &&
          booking.status === "completed"
        ) {
          paid = true;
          break;
        }
      }

      if (paid) break;
    } while (cursor !== 0);

    return Response.json({ paid }, { status: 200 });
  } catch (error) {
    console.error("[booking-status] Error:", error);
    return Response.json({ paid: false }, { status: 200 });
  }
}

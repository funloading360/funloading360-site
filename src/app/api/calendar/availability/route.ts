/**
 * GET /api/calendar/availability
 * Returns unavailable dates for a given month, optionally per-product
 *
 * Query params:
 *   - year: number (e.g., 2026)
 *   - month: number (1-12)
 *   - productIds: comma-separated product IDs (optional)
 *
 * Response:
 *   {
 *     ok: true,
 *     data: {
 *       unavailableDates: ["2026-03-20", ...],
 *       perProduct: { "360-slow-motion": ["2026-03-20"], "glam-vintage": [] },
 *       month: 3,
 *       year: 2026
 *     }
 *   }
 */

import { NextRequest } from "next/server";
import { getUnavailableDates } from "@/lib/googleCalendar";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Rate limiting: 10 requests per minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  analytics: true,
  prefix: "calendar-availability",
});

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    try {
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        return Response.json(
          {
            ok: false,
            error: {
              message: "Rate limit exceeded. Please try again later.",
              code: "RATE_LIMITED",
            },
          },
          { status: 429 }
        );
      }
    } catch (rateLimitError) {
      // Redis unavailable — fail-open (allow request, skip rate limiting)
      console.warn("[calendar/availability] Rate limiting unavailable:", rateLimitError);
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const yearParam = searchParams.get("year");
    const monthParam = searchParams.get("month");
    const productIdsParam = searchParams.get("productIds");

    if (!yearParam || !monthParam) {
      return Response.json(
        {
          ok: false,
          error: {
            message: "Missing required parameters: year and month",
            code: "MISSING_PARAMS",
          },
        },
        { status: 400 }
      );
    }

    const year = parseInt(yearParam, 10);
    const month = parseInt(monthParam, 10);

    // Validate inputs
    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
      return Response.json(
        {
          ok: false,
          error: {
            message: "Invalid year or month. Month must be 1-12.",
            code: "INVALID_PARAMS",
          },
        },
        { status: 400 }
      );
    }

    // Only allow queries for current and future months (prevent abuse)
    const now = new Date();
    const requestedDate = new Date(year, month - 1, 1);

    if (requestedDate < new Date(now.getFullYear(), now.getMonth(), 1)) {
      return Response.json(
        {
          ok: false,
          error: {
            message: "Can only query current or future months",
            code: "PAST_MONTH",
          },
        },
        { status: 400 }
      );
    }

    // Parse product IDs if provided
    const productIds = productIdsParam
      ? productIdsParam.split(",").filter(Boolean)
      : undefined;

    // Fetch unavailable dates from Google Calendar
    const { merged, perProduct } = await getUnavailableDates(year, month, productIds);

    return Response.json(
      {
        ok: true,
        data: {
          unavailableDates: merged,
          perProduct,
          month,
          year,
          cachedAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Calendar availability endpoint error:", error);

    return Response.json(
      {
        ok: false,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Failed to fetch calendar availability",
          code: "INTERNAL_ERROR",
        },
      },
      { status: 500 }
    );
  }
}

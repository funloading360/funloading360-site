/**
 * Date reservation — prevents double bookings.
 *
 * Flow:
 *   1. create-session: tryReserveDate() — checks Google Calendar + acquires Redis NX lock
 *   2. stripe webhook expired: releaseDateReservation() — releases lock
 *   3. stripe webhook completed: Google Calendar event created (permanent block); lock expires via TTL
 *
 * Fails open on any infrastructure error so a Redis outage never blocks bookings.
 * Google Calendar is the authoritative source; Redis is the short-term reservation layer.
 */

import { Redis } from "@upstash/redis";
import { isDateAvailable } from "./googleCalendar";

// Match Stripe's default 24h session window, plus 1h buffer
const LOCK_TTL_SECONDS = 25 * 60 * 60;

function lockKey(eventDate: string) {
  return `date-reserved:${eventDate}`;
}

function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  try {
    return Redis.fromEnv();
  } catch {
    return null;
  }
}

export type ReservationResult =
  | { reserved: true }
  | { reserved: false; reason: "DATE_UNAVAILABLE" | "DATE_RESERVED" };

/**
 * Check availability and atomically claim a date.
 * Returns { reserved: true } on success, or { reserved: false, reason } if taken.
 */
export async function tryReserveDate(
  eventDate: string,
  sessionId: string
): Promise<ReservationResult> {
  // 1. Google Calendar check (server-side — never trust the client)
  try {
    const available = await isDateAvailable(eventDate);
    if (!available) {
      return { reserved: false, reason: "DATE_UNAVAILABLE" };
    }
  } catch (err) {
    console.warn("[dateReservation] Google Calendar check failed — failing open:", err);
  }

  // 2. Redis NX lock — prevents the race window between two concurrent sessions
  const redis = getRedis();
  if (!redis) {
    // No Redis configured — skip lock, Google Calendar is the only guard
    console.warn("[dateReservation] Redis not configured — skipping reservation lock");
    return { reserved: true };
  }

  try {
    const result = await redis.set(lockKey(eventDate), sessionId, {
      nx: true,
      ex: LOCK_TTL_SECONDS,
    });
    // SET NX returns "OK" if acquired, null if key already exists
    if (result === null) {
      return { reserved: false, reason: "DATE_RESERVED" };
    }
    return { reserved: true };
  } catch (err) {
    console.warn("[dateReservation] Redis lock failed — failing open:", err);
    return { reserved: true };
  }
}

/**
 * Release the lock when a Stripe session expires without payment.
 * Safe to call even if the lock no longer exists.
 */
export async function releaseDateReservation(eventDate: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;

  try {
    await redis.del(lockKey(eventDate));
  } catch (err) {
    console.warn("[dateReservation] Failed to release lock — will expire via TTL:", err);
  }
}

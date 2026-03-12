import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

// 5 requests per 10 minutes per IP
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  analytics: true,
});

export async function checkRateLimit(ip: string | null) {
  if (!ip) return { success: true }; // local testing without IP

  try {
    const result = await ratelimit.limit(ip);
    return result;
  } catch (err) {
    console.error("[ratelimit]", err);
    // Fail open — don't block if rate limiting fails
    return { success: true };
  }
}

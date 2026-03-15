/**
 * Cart Abandonment Tracking
 * Detects abandoned carts and prepares data for recovery email campaigns
 */

import { Redis } from "@upstash/redis";

interface AbandonedCart {
  id: string;
  email?: string;
  phone?: string;
  items: Array<{
    productId: string;
    tier: string;
    quantity: number;
    price: number;
  }>;
  cartTotal: number;
  abandonedAt: string;
  lastUpdatedAt: string;
  recoverySent?: boolean;
  recoveryClickedAt?: string;
}

/**
 * Record cart abandonment
 * Called when user navigates away from /cart or /book without completing booking
 */
export async function recordCartAbandonment(
  sessionId: string,
  email: string | undefined,
  phone: string | undefined,
  items: Array<{
    productId: string;
    tier: string;
    quantity: number;
    price: number;
  }>,
  cartTotal: number
): Promise<void> {
  try {
    const redis = Redis.fromEnv();
    const cartId = `abandoned_cart_${sessionId}`;
    const ttl = 7 * 24 * 60 * 60; // 7 days

    const cart: AbandonedCart = {
      id: cartId,
      email: email || undefined,
      phone: phone || undefined,
      items,
      cartTotal,
      abandonedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      recoverySent: false,
    };

    await redis.setex(cartId, ttl, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to record cart abandonment:", error);
    // Don't throw - abandonment tracking shouldn't break the app
  }
}

/**
 * Get abandoned cart by session ID
 */
export async function getAbandonedCart(
  sessionId: string
): Promise<AbandonedCart | null> {
  try {
    const redis = Redis.fromEnv();
    const cartId = `abandoned_cart_${sessionId}`;
    const data = await redis.get(cartId);

    if (!data) return null;

    if (typeof data === "string") {
      return JSON.parse(data);
    }

    return data as AbandonedCart;
  } catch (error) {
    console.error("Failed to get abandoned cart:", error);
    return null;
  }
}

/**
 * Mark cart recovery email as sent
 */
export async function markRecoverySent(
  sessionId: string
): Promise<void> {
  try {
    const redis = Redis.fromEnv();
    const cartId = `abandoned_cart_${sessionId}`;
    const cart = await getAbandonedCart(sessionId);

    if (cart) {
      cart.recoverySent = true;
      cart.lastUpdatedAt = new Date().toISOString();
      const ttl = 7 * 24 * 60 * 60; // 7 days
      await redis.setex(cartId, ttl, JSON.stringify(cart));
    }
  } catch (error) {
    console.error("Failed to mark recovery sent:", error);
  }
}

/**
 * Track recovery email click (when user clicks link from recovery email)
 */
export async function trackRecoveryClick(sessionId: string): Promise<void> {
  try {
    const redis = Redis.fromEnv();
    const cartId = `abandoned_cart_${sessionId}`;
    const cart = await getAbandonedCart(sessionId);

    if (cart) {
      cart.recoveryClickedAt = new Date().toISOString();
      const ttl = 7 * 24 * 60 * 60; // 7 days
      await redis.setex(cartId, ttl, JSON.stringify(cart));
    }
  } catch (error) {
    console.error("Failed to track recovery click:", error);
  }
}

/**
 * Get all abandoned carts with emails (for recovery campaign)
 * Returns carts that haven't had recovery email sent yet
 */
export async function getAbandonedCartsForRecovery(): Promise<
  AbandonedCart[]
> {
  try {
    // TODO: Implement scanning of all abandoned carts
    // This requires listing keys from Redis, which isn't available in REST API
    // Solution: Store a separate index of abandoned carts or use Upstash KV
    // For now, this is a stub for future implementation
    return [];
  } catch (error) {
    console.error("Failed to get abandoned carts for recovery:", error);
    return [];
  }
}

/**
 * Calculate abandonment recovery metrics
 */
export interface AbandonmentMetrics {
  totalAbandoned: number;
  withEmail: number;
  recoveryEmailsSent: number;
  emailsClicked: number;
  clickThroughRate: number; // percentage
  recoveryConversionRate: number; // percentage
  totalAbandonedValue: number; // GBP
}

export function calculateMetrics(
  abandonedCarts: AbandonedCart[]
): AbandonmentMetrics {
  const totalAbandoned = abandonedCarts.length;
  const withEmail = abandonedCarts.filter((c) => c.email).length;
  const recoveryEmailsSent = abandonedCarts.filter(
    (c) => c.recoverySent
  ).length;
  const emailsClicked = abandonedCarts.filter(
    (c) => c.recoveryClickedAt
  ).length;

  const clickThroughRate =
    recoveryEmailsSent > 0
      ? Math.round((emailsClicked / recoveryEmailsSent) * 100)
      : 0;

  const recoveryConversionRate =
    totalAbandoned > 0
      ? Math.round((emailsClicked / totalAbandoned) * 100)
      : 0;

  const totalAbandonedValue = abandonedCarts.reduce(
    (sum, cart) => sum + cart.cartTotal,
    0
  );

  return {
    totalAbandoned,
    withEmail,
    recoveryEmailsSent,
    emailsClicked,
    clickThroughRate,
    recoveryConversionRate,
    totalAbandonedValue,
  };
}

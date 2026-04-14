import { Redis } from '@upstash/redis';

// ─── Event type definitions ────────────────────────────────────────────────

interface BaseEvent {
  type: CrmEventType;
  sessionId: string;
  timestamp: string; // ISO 8601
}

export type CrmEventType =
  | 'lead.partial'
  | 'lead.captured'
  | 'booking.abandoned'
  | 'booking.initiated'
  | 'booking.completed';

export interface LeadPartialEvent extends BaseEvent {
  type: 'lead.partial';
  email: string;
}

export interface LeadCapturedEvent extends BaseEvent {
  type: 'lead.captured';
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  venue: string;
  tier: string;
  altDate?: string;
}

export interface BookingAbandonedEvent extends BaseEvent {
  type: 'booking.abandoned';
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  venue: string;
  tier: string;
  altDate?: string;
  cartTotal: number;
  upsells: string[];
}

export interface BookingInitiatedEvent extends BaseEvent {
  type: 'booking.initiated';
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  venue: string;
  tier: string;
  altDate?: string;
  totalPrice: number;
  depositAmount: number;
  paymentType: 'deposit' | 'full';
  upsells: string[];
}

export interface BookingCompletedEvent extends BaseEvent {
  type: 'booking.completed';
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  venue: string;
  tier: string;
  altDate?: string;
  totalPrice: number;
  amountPaid: number;
  paymentType: 'deposit' | 'full';
  upsells: string[];
  bookingRef: string;
  checkoutSessionId: string;
}

export type CrmEvent =
  | LeadPartialEvent
  | LeadCapturedEvent
  | BookingAbandonedEvent
  | BookingInitiatedEvent
  | BookingCompletedEvent;

// ─── Queue payload ──────────────────────────────────────────────────────────

export interface QueuedCrmEvent {
  event: CrmEvent;
  retryCount: number;
  queuedAt: string;
}

export const CRM_QUEUE_KEY = 'crm:queue';

// ─── Emit function (server-side only) ──────────────────────────────────────

/**
 * Writes a CRM event to the Redis queue for async delivery to n8n.
 * Non-throwing: Redis failures are logged but never propagate to callers.
 */
export async function emitCrmEvent(event: CrmEvent): Promise<void> {
  try {
    const redis = Redis.fromEnv();
    const payload: QueuedCrmEvent = {
      event,
      retryCount: 0,
      queuedAt: new Date().toISOString(),
    };
    await redis.rpush(CRM_QUEUE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error('[CRM] Failed to enqueue event:', event.type, err);
  }
}

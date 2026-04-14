import { Redis } from '@upstash/redis';
import { CRM_QUEUE_KEY, type QueuedCrmEvent } from './crmEvents';

const MAX_RETRIES = 3;
const BATCH_SIZE = 50;

async function sendToN8n(event: QueuedCrmEvent['event']): Promise<boolean> {
  const webhookUrl = process.env.N8N_CRM_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn('[CRM Queue] N8N_CRM_WEBHOOK_URL not set — skipping delivery');
    return true; // Don't re-queue when env var is missing
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-crm-secret': process.env.N8N_CRM_SECRET || '',
      },
      body: JSON.stringify(event),
      // @ts-expect-error — Node 18+ fetch supports signal
      signal: AbortSignal.timeout(5000),
    });
    return res.ok;
  } catch (err) {
    console.error('[CRM Queue] n8n delivery failed:', err);
    return false;
  }
}

export interface CrmQueueResult {
  processed: number;
  failed: number;
}

/**
 * Drain the CRM event queue and deliver events to n8n.
 * Called by /api/crm/flush (Vercel Cron).
 * Retries failed events up to MAX_RETRIES times before dropping.
 */
export async function processCrmQueue(): Promise<CrmQueueResult> {
  const redis = Redis.fromEnv();
  let processed = 0;
  let failed = 0;

  for (let i = 0; i < BATCH_SIZE; i++) {
    const raw = await redis.lpop<string>(CRM_QUEUE_KEY);
    if (!raw) break; // Queue empty

    let queued: QueuedCrmEvent;
    try {
      queued = typeof raw === 'string' ? JSON.parse(raw) : (raw as unknown as QueuedCrmEvent);
    } catch {
      console.error('[CRM Queue] Failed to parse queued event:', raw);
      continue;
    }

    const success = await sendToN8n(queued.event);

    if (success) {
      processed++;
    } else if (queued.retryCount >= MAX_RETRIES) {
      console.error('[CRM Queue] Dropping event after max retries:', queued.event.type, queued.event.sessionId);
      failed++;
    } else {
      const requeued: QueuedCrmEvent = {
        ...queued,
        retryCount: queued.retryCount + 1,
      };
      await redis.rpush(CRM_QUEUE_KEY, JSON.stringify(requeued));
    }
  }

  return { processed, failed };
}

import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@upstash/redis', () => ({
  Redis: {
    fromEnv: vi.fn(),
  },
}));

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

import { processCrmQueue } from '../crmQueue';
import { Redis } from '@upstash/redis';
import type { QueuedCrmEvent } from '../crmEvents';

function makeQueuedEvent(overrides?: Partial<QueuedCrmEvent>): string {
  const base: QueuedCrmEvent = {
    event: {
      type: 'lead.partial',
      sessionId: 'sess-1',
      timestamp: '2026-04-14T10:00:00.000Z',
      email: 'test@example.com',
    },
    retryCount: 0,
    queuedAt: '2026-04-14T10:00:00.000Z',
    ...overrides,
  };
  return JSON.stringify(base);
}

describe('processCrmQueue', () => {
  let mockLpop: ReturnType<typeof vi.fn>;
  let mockRpush: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockLpop = vi.fn();
    mockRpush = vi.fn().mockResolvedValue(1);
    (Redis.fromEnv as ReturnType<typeof vi.fn>).mockReturnValue({
      lpop: mockLpop,
      rpush: mockRpush,
    });
    process.env.N8N_CRM_WEBHOOK_URL = 'https://n8n.example.com/webhook/crm';
    process.env.N8N_CRM_SECRET = 'test-secret';
  });

  it('processes one event and returns processed: 1', async () => {
    mockLpop.mockResolvedValueOnce(makeQueuedEvent()).mockResolvedValue(null);
    mockFetch.mockResolvedValue({ ok: true });

    const result = await processCrmQueue();

    expect(result.processed).toBe(1);
    expect(result.failed).toBe(0);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://n8n.example.com/webhook/crm',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'x-crm-secret': 'test-secret' }),
      })
    );
  });

  it('re-queues failed event with retryCount + 1 when n8n returns non-ok', async () => {
    mockLpop.mockResolvedValueOnce(makeQueuedEvent({ retryCount: 1 })).mockResolvedValue(null);
    mockFetch.mockResolvedValue({ ok: false, status: 500 });

    const result = await processCrmQueue();

    expect(result.processed).toBe(0);
    expect(mockRpush).toHaveBeenCalledWith(
      'crm:queue',
      expect.stringContaining('"retryCount":2')
    );
  });

  it('drops event and counts as failed after retryCount >= 3', async () => {
    mockLpop.mockResolvedValueOnce(makeQueuedEvent({ retryCount: 3 })).mockResolvedValue(null);
    mockFetch.mockResolvedValue({ ok: false, status: 500 });

    const result = await processCrmQueue();

    expect(result.failed).toBe(1);
    expect(mockRpush).not.toHaveBeenCalled();
  });

  it('returns early with 0 processed when queue is empty', async () => {
    mockLpop.mockResolvedValue(null);

    const result = await processCrmQueue();

    expect(result.processed).toBe(0);
    expect(result.failed).toBe(0);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('skips n8n call when N8N_CRM_WEBHOOK_URL is not set and counts as processed', async () => {
    delete process.env.N8N_CRM_WEBHOOK_URL;
    mockLpop.mockResolvedValueOnce(makeQueuedEvent()).mockResolvedValue(null);

    const result = await processCrmQueue();

    expect(result.processed).toBe(1);
    expect(mockFetch).not.toHaveBeenCalled();
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock @upstash/redis before importing module under test
vi.mock('@upstash/redis', () => ({
  Redis: {
    fromEnv: vi.fn(() => ({
      rpush: vi.fn().mockResolvedValue(1),
    })),
  },
}));

import { emitCrmEvent, type CrmEvent } from '../crmEvents';
import { Redis } from '@upstash/redis';

describe('emitCrmEvent', () => {
  let mockRpush: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRpush = vi.fn().mockResolvedValue(1);
    (Redis.fromEnv as ReturnType<typeof vi.fn>).mockReturnValue({ rpush: mockRpush });
  });

  it('pushes a lead.partial event to crm:queue', async () => {
    const event: CrmEvent = {
      type: 'lead.partial',
      sessionId: 'sess-123',
      timestamp: '2026-04-14T10:00:00.000Z',
      email: 'test@example.com',
    };

    await emitCrmEvent(event);

    expect(mockRpush).toHaveBeenCalledWith(
      'crm:queue',
      expect.stringContaining('"type":"lead.partial"')
    );
  });

  it('pushes a booking.completed event with all fields', async () => {
    const event: CrmEvent = {
      type: 'booking.completed',
      sessionId: 'sess-456',
      timestamp: '2026-04-14T10:00:00.000Z',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '07700123456',
      eventDate: '2026-08-01',
      eventType: 'Wedding',
      venue: 'The Grand Hotel',
      tier: 'signature',
      totalPrice: 799,
      amountPaid: 120,
      paymentType: 'deposit',
      upsells: ['guest-book'],
      bookingRef: 'FL360-JANE-0801',
      checkoutSessionId: 'cs_test_abc123',
    };

    await emitCrmEvent(event);

    const [queueKey, payload] = mockRpush.mock.calls[0];
    expect(queueKey).toBe('crm:queue');
    const parsed = JSON.parse(payload);
    expect(parsed.event.type).toBe('booking.completed');
    expect(parsed.event.bookingRef).toBe('FL360-JANE-0801');
    expect(parsed.retryCount).toBe(0);
  });

  it('does not throw when Redis fails — emitCrmEvent is fire-and-forget', async () => {
    mockRpush.mockRejectedValue(new Error('Redis down'));

    const event: CrmEvent = {
      type: 'lead.partial',
      sessionId: 'sess-789',
      timestamp: '2026-04-14T10:00:00.000Z',
      email: 'fail@example.com',
    };

    await expect(emitCrmEvent(event)).resolves.not.toThrow();
  });
});

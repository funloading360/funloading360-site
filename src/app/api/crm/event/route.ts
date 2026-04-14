import { NextRequest } from 'next/server';
import { z } from 'zod';
import { emitCrmEvent, type CrmEvent } from '@/lib/crmEvents';

const CrmEventSchema = z.object({
  type: z.enum(['lead.partial', 'lead.captured', 'booking.abandoned', 'booking.initiated', 'booking.completed']),
  sessionId: z.string().min(1),
  timestamp: z.string().datetime(),
  email: z.string().email().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  eventDate: z.string().optional(),
  eventType: z.string().optional(),
  venue: z.string().optional(),
  tier: z.string().optional(),
  altDate: z.string().optional(),
  cartTotal: z.number().optional(),
  totalPrice: z.number().optional(),
  depositAmount: z.number().optional(),
  amountPaid: z.number().optional(),
  paymentType: z.enum(['deposit', 'full']).optional(),
  upsells: z.array(z.string()).optional(),
  bookingRef: z.string().optional(),
  checkoutSessionId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = CrmEventSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: parsed.error.flatten() }, { status: 422 });
  }

  await emitCrmEvent(parsed.data as CrmEvent);

  return Response.json({ ok: true }, { status: 202 });
}

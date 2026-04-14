import { NextRequest } from 'next/server';
import { processCrmQueue } from '@/lib/crmQueue';

export async function GET(request: NextRequest) {
  // Protect the endpoint — only Vercel Cron or n8n (with secret) can call it
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const result = await processCrmQueue();

  console.log(`[CRM Flush] processed=${result.processed} failed=${result.failed}`);

  return Response.json({ ok: true, ...result });
}

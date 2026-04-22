import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("x-health-token");
  const expectedToken = process.env.HEALTH_CHECK_TOKEN;
  if (expectedToken && authHeader !== expectedToken) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const start = Date.now();
  try {
    const res = await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    });
    if (!res.ok) throw new Error(`Resend API returned ${res.status}`);
    return Response.json({
      ok: true,
      status: "healthy",
      reachable: true,
      latencyMs: Date.now() - start,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return Response.json(
      {
        ok: false,
        status: "unhealthy",
        reachable: false,
        error: err instanceof Error ? err.message : "Unknown error",
        latencyMs: Date.now() - start,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { BookingSchema } from "@/lib/schemas";
import { validatePhone } from "@/lib/validation";
import { checkRateLimit } from "@/lib/ratelimit";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_EMAIL ?? "hello@funloading360.co.uk";

export async function POST(req: NextRequest) {
  try {
    // Rate limiting — max 5 requests per 10 minutes per IP
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const rateLimit = await checkRateLimit(ip);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Honeypot check — bots fill hidden fields, humans don't
    if (body._hp) {
      return NextResponse.json({ ok: true }); // silent discard
    }

    // Double-check phone validation server-side
    const phoneValidation = validatePhone(body.phone);
    if (!phoneValidation.valid) {
      return NextResponse.json(
        { error: phoneValidation.error },
        { status: 400 }
      );
    }

    const result = BookingSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", fields: result.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { packageId, name, email, phone, eventType, eventDate, altDate, venue, specialRequests } =
      result.data;

    await resend.emails.send({
      from: "Website Booking <noreply@funloading360.co.uk>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `New Booking Enquiry — ${name} (${eventType})`,
      text: [
        `Package: ${packageId}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Event Type: ${eventType}`,
        `Preferred Date: ${eventDate}`,
        altDate ? `Alternative Date: ${altDate}` : null,
        `Venue: ${venue}`,
        `Special Requests: ${specialRequests || "—"}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/book]", err);
    return NextResponse.json({ error: "Failed to send booking request" }, { status: 500 });
  }
}

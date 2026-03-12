import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { EnquirySchema } from "@/lib/schemas";
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

    // Double-check phone validation server-side (only if provided)
    if (body.phone) {
      const phoneValidation = validatePhone(body.phone);
      if (!phoneValidation.valid) {
        return NextResponse.json(
          { error: phoneValidation.error },
          { status: 400 }
        );
      }
    }

    const result = EnquirySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", fields: result.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { company, name, email, phone, eventType, guestCount, eventDate, message } =
      result.data;

    await resend.emails.send({
      from: "Website Enquiry <noreply@funloading360.co.uk>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `Corporate Enquiry — ${company || name}`,
      text: [
        `Company: ${company || "—"}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "—"}`,
        `Event Type: ${eventType}`,
        `Guest Count: ${guestCount}`,
        `Event Date: ${eventDate || "—"}`,
        `Message: ${message || "—"}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/enquiry]", err);
    return NextResponse.json({ error: "Failed to send enquiry" }, { status: 500 });
  }
}

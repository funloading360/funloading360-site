import { NextRequest } from "next/server";
import { Resend } from "resend";
import { EnquirySchema } from "@/lib/schemas";
import { validatePhone } from "@/lib/validation";
import { checkRateLimit } from "@/lib/ratelimit";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  rateLimitResponse,
  serverErrorResponse,
} from "@/lib/apiResponse";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_EMAIL ?? "FunLoading360@gmail.com";

export async function POST(req: NextRequest) {
  try {
    // Rate limiting — max 5 requests per 10 minutes per IP
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const rateLimit = await checkRateLimit(ip);
    if (!rateLimit.success) {
      return rateLimitResponse();
    }

    const body = await req.json();

    // Honeypot check — bots fill hidden fields, humans don't
    if (body._hp) {
      return successResponse({ enquiryId: "pending" }); // silent discard
    }

    // Double-check phone validation server-side (only if provided)
    if (body.phone) {
      const phoneValidation = validatePhone(body.phone);
      if (!phoneValidation.valid) {
        return errorResponse(phoneValidation.error || "Invalid phone number", "phone");
      }
    }

    const result = EnquirySchema.safeParse(body);
    if (!result.success) {
      return validationErrorResponse(result.error.flatten().fieldErrors);
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

    return successResponse({ enquiryId: "pending", email });
  } catch (err) {
    console.error("[/api/enquiry]", err);
    return serverErrorResponse("Failed to send enquiry");
  }
}

import { z } from "zod";
import { validatePhone } from "./validation";

const ukDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const BookingSchema = z.object({
  // Support both old packageId and new productId/tier format
  packageId: z.string().min(1).max(50).optional(),
  productId: z.string().min(1).max(50).optional(),
  tier: z.enum(["essential", "signature", "luxury"]).optional(),
  upsells: z.array(z.string()).optional(),
  totalPrice: z.number().positive().optional(),

  name: z.string().min(2, "Name must be at least 2 characters").max(200),
  email: z.string().email("Invalid email address").max(254),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (val) => validatePhone(val).valid,
      (val) => ({ message: validatePhone(val).error || "Invalid phone number" })
    ),
  eventType: z.string().min(1).max(100),
  eventDate: z
    .string()
    .regex(ukDateRegex, "Invalid date format")
    .refine((d) => new Date(d) > new Date(), "Event date must be in the future"),
  altDate: z
    .string()
    .regex(ukDateRegex, "Invalid date format")
    .refine((d) => new Date(d) > new Date(), "Alt date must be in the future")
    .optional()
    .or(z.literal("")),
  venue: z.string().min(2, "Venue must be at least 2 characters").max(500),
  specialRequests: z.string().max(3000).optional().or(z.literal("")),
  _hp: z.literal("").optional(), // honeypot — must be empty
}).refine(
  (data) => data.packageId || data.productId, // Must have either old or new format
  { message: "Must provide either packageId or productId" }
);

export const EnquirySchema = z.object({
  company: z.string().max(200).optional().or(z.literal("")),
  name: z.string().min(2, "Name must be at least 2 characters").max(200),
  email: z.string().email("Invalid email address").max(254),
  phone: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || validatePhone(val).valid,
      (val) => ({ message: !val ? "Invalid phone number" : validatePhone(val).error || "Invalid phone number" })
    ),
  eventType: z.string().min(1).max(100),
  guestCount: z.string().min(1).max(50),
  eventDate: z
    .string()
    .regex(ukDateRegex, "Invalid date format")
    .refine((d) => new Date(d) > new Date(), "Event date must be in the future")
    .optional()
    .or(z.literal("")),
  message: z.string().max(3000).optional().or(z.literal("")),
  _hp: z.literal("").optional(), // honeypot — must be empty
});

export type BookingInput = z.infer<typeof BookingSchema>;
export type EnquiryInput = z.infer<typeof EnquirySchema>;

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
  phone: z.string()
    .min(1, "Phone number is required")
    .regex(
      /^(\+44[\s\-]?|0044[\s\-]?|0)(7\d{9}|[1-9]\d{8,9}|\d{2}[\s\-]?\d{4}[\s\-]?\d{4})$/,
      "Please enter a valid UK phone number (e.g. 07700 123456 or +44 7700 123456)"
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

export const CheckoutSessionSchema = z.object({
  productId: z.string().min(1).max(50),
  tier: z.enum(["essential", "signature", "luxury"]),
  upsells: z.array(z.string()).optional().default([]),
  totalPrice: z.number().positive(),
  paymentType: z.enum(["deposit", "full"]),
  cartItems: z.array(
    z.object({
      productId: z.string().min(1),
      tier: z.string().min(1),
      hours: z.number().positive(),
    })
  ).min(1),
  name: z.string().min(2, "Name must be at least 2 characters").max(200),
  email: z.string().email("Invalid email address").max(254),
  phone: z.string()
    .min(1, "Phone number is required")
    .regex(
      /^(\+44[\s\-]?|0044[\s\-]?|0)(7\d{9}|[1-9]\d{8,9}|\d{2}[\s\-]?\d{4}[\s\-]?\d{4})$/,
      "Please enter a valid UK phone number (e.g. 07700 123456 or +44 7700 123456)"
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
});

export type BookingInput = z.infer<typeof BookingSchema>;
export type EnquiryInput = z.infer<typeof EnquirySchema>;
export type CheckoutSessionInput = z.infer<typeof CheckoutSessionSchema>;

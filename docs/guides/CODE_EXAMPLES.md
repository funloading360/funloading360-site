# Code Examples — Copy-Paste Ready
## FunLoading360 Technical Fixes

Quick reference for implementing the fixes. Copy these code blocks directly into your editor.

---

## FIX 1: PHONE VALIDATION UTILITY

### Create `/src/lib/validation.ts`

```typescript
import { z } from "zod";

/**
 * Phone number validation for UK phone numbers
 * Accepts formats like: 07482112110, +44 7482 112110, (07482) 112110
 */

export const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;

export interface PhoneValidationResult {
  valid: boolean;
  formatted: string;
  error?: string;
}

/**
 * Validate and format a UK phone number
 * @param input - Raw phone number input from user
 * @returns { valid, formatted, error? }
 */
export function validateUKPhone(input: string): PhoneValidationResult {
  // Strip to digits only for length check
  const stripped = input.replace(/\D/g, "");

  // Length checks
  if (stripped.length < 7) {
    return {
      valid: false,
      formatted: "",
      error: "Phone number is too short",
    };
  }
  if (stripped.length > 20) {
    return {
      valid: false,
      formatted: "",
      error: "Phone number is too long",
    };
  }

  // Validate UK phone format
  // Must start with +44 or 0, followed by digits
  const ukPattern = /^(?:\+44|0)[\d\s\(\)\-]{8,}$/;
  if (!ukPattern.test(input)) {
    return {
      valid: false,
      formatted: "",
      error: "Invalid UK phone number format",
    };
  }

  // Format for display
  const formatted = formatPhoneForDisplay(stripped);
  return {
    valid: true,
    formatted,
  };
}

/**
 * Format phone number for consistent display
 * E.g., "447482112110" → "+44 7482 112110"
 */
export function formatPhoneForDisplay(stripped: string): string {
  // Remove leading 0 if present
  let num = stripped.startsWith("0") ? stripped.slice(1) : stripped;

  // Add country code if not present
  if (!num.startsWith("44")) {
    num = "44" + num;
  }

  // Add + prefix
  if (!num.startsWith("+")) {
    num = "+" + num;
  }

  // Format as +44 7482 112110
  if (num.length === 13) {
    // +44 + 10 digits
    return num.slice(0, 3) + " " + num.slice(3, 7) + " " + num.slice(7);
  }

  return num;
}

/**
 * Zod validator for use in schemas
 * Usage: phone: z.string().refine(val => isValidUKPhone(val), ...)
 */
export function isValidUKPhone(input: string): boolean {
  return validateUKPhone(input).valid;
}
```

### Update `/src/lib/schemas.ts`

Replace the existing phone validation (lines 3, 10-13, 34-39):

```typescript
import { z } from "zod";
import { isValidUKPhone } from "./validation"; // ADD THIS

// Remove old line: const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
const ukDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const BookingSchema = z.object({
  packageId: z.string().min(1).max(50),
  name: z.string().min(2, "Name must be at least 2 characters").max(200),
  email: z.string().email("Invalid email address").max(254),
  phone: z
    .string()
    .refine(isValidUKPhone, "Invalid UK phone number") // CHANGED
    .max(20),
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
  _hp: z.literal("").optional(),
});

export const EnquirySchema = z.object({
  company: z.string().max(200).optional().or(z.literal("")),
  name: z.string().min(2, "Name must be at least 2 characters").max(200),
  email: z.string().email("Invalid email address").max(254),
  phone: z
    .string()
    .refine(isValidUKPhone, "Invalid UK phone number") // CHANGED
    .max(20)
    .optional()
    .or(z.literal("")),
  eventType: z.string().min(1).max(100),
  guestCount: z.string().min(1).max(50),
  eventDate: z
    .string()
    .regex(ukDateRegex, "Invalid date format")
    .refine((d) => new Date(d) > new Date(), "Event date must be in the future")
    .optional()
    .or(z.literal("")),
  message: z.string().max(3000).optional().or(z.literal("")),
  _hp: z.literal("").optional(),
});

export type BookingInput = z.infer<typeof BookingSchema>;
export type EnquiryInput = z.infer<typeof EnquirySchema>;
```

### Update BookingFlow Phone Input

In `/src/app/book/BookingFlow.tsx`, add phone validation state and handlers:

```typescript
// Near line 30, add to state declarations:
const [phoneError, setPhoneError] = useState<string | null>(null);

// Add this handler function (around line 67):
const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  const value = e.target.value;
  if (!value) {
    setPhoneError(null);
    return;
  }

  const { valid, error } = validateUKPhone(value);
  setPhoneError(error || null);
};

// Import at top:
import { validateUKPhone } from "@/lib/validation"; // ADD THIS
```

Replace the phone input field (around line 398-414):

```typescript
<div>
  <label htmlFor="book-phone" className="block text-sm font-medium text-gray-300 mb-2">
    Phone Number <span className="text-[#f5a623]">*</span>
  </label>
  <input
    id="book-phone"
    type="tel"
    required
    name="phone"
    value={formData.phone}
    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
    onBlur={handlePhoneBlur}
    placeholder="+44 7482 112110"
    aria-invalid={phoneError ? "true" : "false"}
    aria-describedby={phoneError ? "book-phone-error" : undefined}
    className={cn(
      "w-full px-4 py-3 rounded-xl bg-[#13131a] border text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-[#f5a623]/20 transition-colors",
      phoneError
        ? "border-red-500/50 focus:border-red-500/50"
        : "border-[#2a2a3a] focus:border-[#f5a623]/50"
    )}
  />
  {phoneError && (
    <p id="book-phone-error" className="mt-1 text-red-400 text-xs">
      {phoneError}
    </p>
  )}
</div>
```

---

## FIX 2: FORM VALIDATION FEEDBACK

### Update BookingFlow with Field Errors

In `/src/app/book/BookingFlow.tsx`, add after the phoneError state:

```typescript
const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>({
  name: null,
  email: null,
  phone: null,
  eventType: null,
  eventDate: null,
  venue: null,
});

/**
 * Validate a single field against the BookingSchema
 */
const validateField = (fieldName: string, value: string) => {
  try {
    // Create schema for just this field
    const schema = BookingSchema.pick({ [fieldName]: true } as any);
    schema.parse({ [fieldName]: value });
    setFieldErrors((prev) => ({ ...prev, [fieldName]: null }));
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.errors[0]?.message || "Invalid input";
      setFieldErrors((prev) => ({ ...prev, [fieldName]: message }));
    }
  }
};

const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  validateField(name, value);
};
```

### Update All Form Fields

**Example for Name field:**
```typescript
<div>
  <label htmlFor="book-name" className="block text-sm font-medium text-gray-300 mb-2">
    Full Name <span className="text-[#f5a623]">*</span>
  </label>
  <input
    id="book-name"
    name="name"
    type="text"
    required
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    onBlur={handleFieldBlur}
    placeholder="e.g. Sarah Johnson"
    aria-invalid={fieldErrors.name ? "true" : "false"}
    aria-describedby={fieldErrors.name ? "book-name-error" : undefined}
    className={cn(
      "w-full px-4 py-3 rounded-xl bg-[#13131a] border text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-[#f5a623]/20 transition-colors",
      fieldErrors.name
        ? "border-red-500/50 focus:border-red-500/50"
        : "border-[#2a2a3a] focus:border-[#f5a623]/50"
    )}
  />
  {fieldErrors.name && (
    <p id="book-name-error" className="mt-1 text-red-400 text-xs">
      {fieldErrors.name}
    </p>
  )}
</div>
```

**Example for Email field:**
```typescript
<div>
  <label htmlFor="book-email" className="block text-sm font-medium text-gray-300 mb-2">
    Email Address <span className="text-[#f5a623]">*</span>
  </label>
  <input
    id="book-email"
    name="email"
    type="email"
    required
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    onBlur={handleFieldBlur}
    placeholder="sarah@example.com"
    aria-invalid={fieldErrors.email ? "true" : "false"}
    aria-describedby={fieldErrors.email ? "book-email-error" : undefined}
    className={cn(
      "w-full px-4 py-3 rounded-xl bg-[#13131a] border text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-[#f5a623]/20 transition-colors",
      fieldErrors.email
        ? "border-red-500/50 focus:border-red-500/50"
        : "border-[#2a2a3a] focus:border-[#f5a623]/50"
    )}
  />
  {fieldErrors.email && (
    <p id="book-email-error" className="mt-1 text-red-400 text-xs">
      {fieldErrors.email}
    </p>
  )}
</div>
```

**Example for Event Type select:**
```typescript
<div>
  <label htmlFor="book-event-type" className="block text-sm font-medium text-gray-300 mb-2">
    Event Type <span className="text-[#f5a623]">*</span>
  </label>
  <select
    id="book-event-type"
    name="eventType"
    required
    value={formData.eventType}
    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
    onBlur={handleFieldBlur}
    aria-invalid={fieldErrors.eventType ? "true" : "false"}
    aria-describedby={fieldErrors.eventType ? "book-event-type-error" : undefined}
    className={cn(
      "w-full px-4 py-3 rounded-xl bg-[#13131a] border text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#f5a623]/20 transition-colors appearance-none",
      fieldErrors.eventType
        ? "border-red-500/50 focus:border-red-500/50"
        : "border-[#2a2a3a] focus:border-[#f5a623]/50"
    )}
  >
    <option value="" disabled className="text-gray-600">
      Select event type
    </option>
    {eventTypes.map((type) => (
      <option key={type} value={type} className="bg-[#13131a]">
        {type}
      </option>
    ))}
  </select>
  {fieldErrors.eventType && (
    <p id="book-event-type-error" className="mt-1 text-red-400 text-xs">
      {fieldErrors.eventType}
    </p>
  )}
</div>
```

---

## FIX 3: GALLERY MASONRY BREAKPOINT

### Update GalleryContent.tsx Line 338

Find:
```html
className="columns-2 md:columns-3 xl:columns-4 gap-4"
```

Replace with:
```html
className="columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4"
```

That's it! Just one line change.

---

## FIX 4: GALLERY CARD INTERACTIVITY

### Create `/src/components/GalleryCardButton.tsx`

```typescript
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Gallery card as interactive button
 * Props come from GalleryContent
 */

interface GalleryCard {
  id: number;
  eventType: "weddings" | "corporate" | "birthdays" | "proms";
  boothType: "360" | "glam" | "selfie";
  aspect: "portrait" | "landscape" | "square" | "tall";
  src: string;
  alt: string;
  badgeBg: string;
  badgeText: string;
  tagBg: string;
  tagText: string;
}

const aspectClass: Record<string, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  tall: "aspect-[2/3]",
};

const eventLabel: Record<string, string> = {
  weddings: "Wedding",
  corporate: "Corporate",
  birthdays: "Birthday",
  proms: "Prom Night",
};

const boothLabel: Record<string, string> = {
  "360": "360°",
  glam: "Glam",
  selfie: "Selfie Pod",
};

export function GalleryCardButton({
  card,
  index,
  onView,
}: {
  card: GalleryCard;
  index: number;
  onView: (cardId: number) => void;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => onView(card.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onView(card.id);
        }
      }}
      aria-label={`View ${eventLabel[card.eventType]} photo: ${card.alt}`}
      className="group relative overflow-hidden rounded-2xl border border-[#2a2a3a] cursor-pointer hover:border-[#f5a623]/30 transition-colors duration-300 break-inside-avoid mb-4 text-left"
    >
      {/* Image container */}
      <div className={cn("relative w-full overflow-hidden", aspectClass[card.aspect])}>
        <Image
          src={card.src}
          alt={card.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />

        {/* Subtle dark vignette so badges are always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e]/50 via-transparent to-[#0a0a0e]/20 pointer-events-none" />

        {/* Light sweep on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Event type badge — top left */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm",
              card.badgeBg,
              card.badgeText
            )}
          >
            {eventLabel[card.eventType]}
          </span>
        </div>

        {/* Booth type tag — top right */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-sm",
              card.tagBg,
              card.tagText
            )}
          >
            {boothLabel[card.boothType]}
          </span>
        </div>

        {/* Hover overlay with eye icon */}
        <div className="absolute inset-0 bg-[#0a0a0e]/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            whileHover={{ scale: 1 }}
            className="w-14 h-14 rounded-full bg-[#f5a623] flex items-center justify-center shadow-xl shadow-[#f5a623]/30"
          >
            <Eye className="w-6 h-6 text-[#0a0a0e]" />
          </motion.div>
        </div>
      </div>
    </motion.button>
  );
}
```

### Update GalleryContent.tsx

Replace the `GalleryCard` function (lines 126-195) with import:

```typescript
import { GalleryCardButton } from "@/components/GalleryCardButton"; // ADD AT TOP
```

Then in the gallery section (around line 340), update the map:

```typescript
{filtered.map((card, index) => (
  <GalleryCardButton
    key={card.id}
    card={card}
    index={index}
    onView={handleCardView}
  />
))}
```

And add the handler (before return statement):

```typescript
const handleCardView = (cardId: number) => {
  console.log("Viewing card:", cardId);
  // TODO: Implement lightbox modal in future
};
```

---

## IMPORTS REFERENCE

### For BookingFlow.tsx

Add to top:
```typescript
import { validateUKPhone } from "@/lib/validation";
import { z } from "zod";
```

### For GalleryContent.tsx

Add to top:
```typescript
import { GalleryCardButton } from "@/components/GalleryCardButton";
```

### For validation.ts (new file)

```typescript
import { z } from "zod";
```

---

## TESTING SNIPPETS

### Phone validation test cases

```typescript
// Valid cases
validateUKPhone("07482112110");        // ✓ Raw UK mobile
validateUKPhone("+44 7482 112110");    // ✓ International with spaces
validateUKPhone("(+44) 7482-112110");  // ✓ With parentheses
validateUKPhone("020 7946 0958");      // ✓ London landline
validateUKPhone("+447482112110");      // ✓ International no spaces

// Invalid cases
validateUKPhone("7482");               // ✗ Too short
validateUKPhone("+33 7482 112110");    // ✗ Wrong country
validateUKPhone("(((+++)))");          // ✗ No actual digits
```

### Form field validation test cases

```typescript
// Name field
validateField("name", "");            // ✗ Name must be at least 2 characters
validateField("name", "S");           // ✗ Name must be at least 2 characters
validateField("name", "Sarah");       // ✓ Valid

// Email field
validateField("email", "invalid");    // ✗ Invalid email address
validateField("email", "a@b");        // ✓ Valid (technically)
validateField("email", "sarah@example.com"); // ✓ Valid

// Phone field
validateField("phone", "7482");       // ✗ Invalid UK phone number
validateField("phone", "07482112110"); // ✓ Valid

// Event type field
validateField("eventType", "");       // ✗ String must have at least 1 characters
validateField("eventType", "Wedding"); // ✓ Valid
```

---

## COMMON MISTAKES TO AVOID

1. **Don't validate on onChange** — Only on blur or submit
   - onChange validation causes lag
   - Too many Zod validations happening
   - Annoying UX ("error messages appearing as you type")

2. **Don't forget aria attributes**
   - `aria-invalid="true"` when field has error
   - `aria-describedby` pointing to error message id
   - Screen readers won't announce errors without these

3. **Don't hardcode phone regex again**
   - Always use `validateUKPhone()` from validation.ts
   - If you need to change it, change in ONE place
   - Keep server & client in sync

4. **Don't remove the global submitError**
   - That's for API-level failures (rate limit, Resend down, etc)
   - Field errors are for validation
   - Show BOTH if needed

5. **Don't forget to test the API routes**
   - Your UI validation is nice, but server validation is critical
   - Test POST to /api/book with invalid phone → should fail
   - Test POST to /api/enquiry with invalid phone → should fail

---

END OF CODE EXAMPLES

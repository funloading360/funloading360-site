# FunLoading360 — Technical Audit Challenge
## Frontend Engineer & Technical Architect Review

**Date:** 12 March 2026
**Project:** FunLoading360 Photo Booth Site (Next.js 15)
**Role:** Feasibility, Risk, & Architecture Assessment

---

## EXECUTIVE SUMMARY

Reviewing the audit findings from a **technical implementation perspective**. The proposed fixes are implementable but have architectural implications. Key concerns:

1. **Phone validation logic duplicated** across client & server (single source of truth missing)
2. **Gallery keyboard navigation** — needs proper component abstraction, not DOM hacks
3. **Form validation strategy inconsistent** between BookingFlow and CorporateContent
4. **Masonry breakpoint** — simple 5-minute CSS fix, but reveals responsive design gaps
5. **Technical debt accumulating** — button styles, form patterns, error handling all inconsistent

---

## FINDINGS WITH TECHNICAL DEPTH

### C1 - PHONE VALIDATION: REGEX REJECTS VALID NUMBERS

**FILES INVOLVED:**
- `/Users/work/Documents/skills/photobooth-site/src/lib/schemas.ts` (line 3, 10-13, 34-39)
- `/Users/work/Documents/skills/photobooth-site/src/app/api/book/route.ts` (line 3, 28-34)
- `/Users/work/Documents/skills/photobooth-site/src/app/book/BookingFlow.tsx` (line 403-413 phone input)
- `/Users/work/Documents/skills/photobooth-site/src/app/corporate/CorporateContent.tsx` (phone field)

**CURRENT IMPLEMENTATION ANALYSIS:**

```typescript
// /src/lib/schemas.ts line 3
const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
```

This regex is **permissive but problematic**:
- Accepts `(((+++---)))` (7+ chars, all valid)
- Accepts `7` (single digit; min 7 chars total)
- Doesn't validate UK phone format specifically
- Accepts unmatched parentheses: `(07482 112110` (valid match)

**VALIDATION HAPPENS IN TWO PLACES (DUPLICATION RISK):**

1. **Client-side** (BookingFlow.tsx): No client validation currently — only server-side
2. **Server-side** (api/book/route.ts line 28): Zod schema validates via BookingSchema

**PATTERN ELSEWHERE IN CODEBASE:**
CorporateContent uses same schema validation (line 286-290: fetch to /api/enquiry with same pattern)

**TECHNICAL PROBLEM:**
- If phone regex changes in schemas.ts, it affects BOTH booking and enquiry flows
- Inconsistent error messages if API is ever updated without schema changes
- No client-side validation feedback (user submits, then sees error)
- No phone formatting utility (user must understand UK format)

**APPROACH:**

**⭐ PROPER FIX (Recommended)** — 45 minutes total

1. **Create validation utility** at `/src/lib/validation.ts`:
   ```typescript
   // Phone validators (one source of truth)
   export const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;

   export function validateUKPhone(input: string): { valid: boolean; formatted: string; error?: string } {
     const stripped = input.replace(/\D/g, '');

     if (stripped.length < 7) return { valid: false, formatted: '', error: 'Too short' };
     if (stripped.length > 20) return { valid: false, formatted: '', error: 'Too long' };

     // Match UK patterns: 07xxx xxx xxx, 020 xxxx xxxx, +44
     const ukPattern = /^(?:\+44|0)[\d\s\(\)\-]{8,}$/;
     if (!ukPattern.test(input)) {
       return { valid: false, formatted: '', error: 'Invalid UK format' };
     }

     // Format: +44 7482 112110 style
     const formatted = formatPhoneForDisplay(stripped);
     return { valid: true, formatted };
   }

   export function formatPhoneForDisplay(stripped: string): string {
     // Remove leading 0 if exists, add +44
     let num = stripped.startsWith('0') ? stripped.slice(1) : stripped;
     if (!num.startsWith('44')) num = '44' + num;
     if (!num.startsWith('+')) num = '+' + num;

     // Format as +44 7482 112110
     if (num.length === 13) { // +44 + 10 digits
       return num.slice(0, 3) + ' ' + num.slice(3, 7) + ' ' + num.slice(7);
     }
     return num;
   }
   ```

2. **Update schemas.ts** to use new validator:
   ```typescript
   import { validateUKPhone } from '@/lib/validation';

   phone: z
     .string()
     .refine((val) => validateUKPhone(val).valid, 'Invalid UK phone number')
     .max(20)
   ```

3. **Add client-side feedback in BookingFlow** (optional but better UX):
   ```typescript
   const [phoneError, setPhoneError] = useState<string | null>(null);

   const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
     const validation = validateUKPhone(e.target.value);
     setPhoneError(validation.error || null);
   };
   ```

**TESTING PLAN:**
- Test formats: `07482112110`, `+44 7482 112110`, `(+44) 7482-112110`, `020 7946 0958`
- Test invalid: `7482`, `+33 7482 112110`, `(((+++)))`
- Verify both API routes still validate correctly
- Ensure error messages consistent across both forms

**EFFORT BREAKDOWN:**
- Create validation.ts: 20 min
- Update schemas.ts: 10 min
- Add client-side feedback to BookingFlow: 15 min
- Test & verify both APIs: 10 min
- **Total: 55 minutes**

**TECHNICAL DEBT IDENTIFIED:**
- Email validation also in two places (should be shared utility)
- Date validation could be centralized
- No phone formatting on submit (user sees raw input in thank-you email)

**RISK:**
- **MEDIUM**: If refactoring Zod validators, test both /api/book and /api/enquiry thoroughly
- Both forms share schema, so any breaking change affects both
- Client validation is optional but improves UX — don't make it blocking on submission

---

### C2 - GALLERY KEYBOARD NAV: NOT INTERACTIVE

**FILES INVOLVED:**
- `/Users/work/Documents/skills/photobooth-site/src/app/gallery/GalleryContent.tsx` (line 126-195)

**CURRENT IMPLEMENTATION:**
```typescript
// Line 128-139: Uses motion.div with no onClick, no button
function GalleryCard({ card, index }: { card: GalleryCard; index: number }) {
  return (
    <motion.div
      layout
      className="group relative overflow-hidden rounded-2xl border ... cursor-pointer ..."
    >
      {/* Image */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e]/50 ...">
        {/* Hover overlay with Eye icon — visual cue of interactivity but no action */}
        <div className="absolute inset-0 bg-[#0a0a0e]/60 opacity-0 group-hover:opacity-100">
          <motion.div>
            <Eye className="w-6 h-6" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
```

**PROBLEMS:**
1. `cursor-pointer` signals clickability but nothing happens on click
2. Eye icon implies "view" action but doesn't open gallery/lightbox
3. Keyboard users can't interact (no button, no role)
4. Not semantic — div with cursor-pointer is anti-pattern

**THREE IMPLEMENTATION APPROACHES:**

**Approach 1: Quick Fix (30 min)** — Wrap in button, add onClick
```typescript
<button
  onClick={() => openLightbox(card.id)}
  className="group relative overflow-hidden rounded-2xl ... cursor-pointer"
>
```
- Pro: Fastest, semantic button
- Con: Framer Motion `layout` animation may conflict with button
- Risk: Breaks existing hover/animation behavior

**Approach 2: Proper Component Extraction (1.5 hours)** ⭐ **RECOMMENDED**
```typescript
// New file: /src/components/GalleryCardButton.tsx
"use client";

export function GalleryCardButton({
  card,
  index,
  onView
}: {
  card: GalleryCard;
  index: number;
  onView: (cardId: number) => void;
}) {
  return (
    <button
      onClick={() => onView(card.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onView(card.id);
        }
      }}
      aria-label={`View ${eventLabel[card.eventType]} photo from ${card.alt}`}
      className="group relative overflow-hidden rounded-2xl ... text-left"
    >
      {/* Existing content */}
    </button>
  );
}

// In GalleryContent.tsx, replace GalleryCard with GalleryCardButton
{filtered.map((card, index) => (
  <GalleryCardButton
    key={card.id}
    card={card}
    index={index}
    onView={handleCardView}
  />
))}
```
- Pro: Reusable, semantic, accessible, separates concerns
- Con: Requires lightbox/modal implementation (1-2 hrs more if needed)
- Risk: None if implemented as simple wrapper

**Approach 3: Over-Engineered (3+ hours)** — Custom gallery with Ctrl+Left/Right shortcuts
- Don't do this. It adds complexity without user request.
- Users don't expect keyboard shortcuts in galleries.

**RECOMMENDATION: Approach 2**

This adds proper interactivity, maintains animation smoothness, and creates reusable component. If lightbox isn't built yet, just log to console for now:

```typescript
const handleCardView = (cardId: number) => {
  console.log('View card:', cardId);
  // TODO: Implement lightbox modal
};
```

**EFFORT BREAKDOWN:**
- Extract GalleryCardButton component: 30 min
- Update GalleryContent to use new component: 10 min
- Test keyboard nav & screen reader: 20 min
- **Total: 60 minutes** (without lightbox implementation)

**TESTING:**
- Keyboard: Tab to focus each card, Enter/Space to activate
- Screen reader: ARIA label announces context
- Mouse: Click opens action
- Touch: Tap opens action

**TECHNICAL DEBT:**
- No lightbox implemented yet (add as separate task)
- Gallery doesn't have open/close animation
- No "escape to close" functionality

**RISK:**
- **LOW**: Component extraction is safe
- Motion animations should still work on button element
- No breaking changes to existing gallery filtering

---

### M3 - GALLERY MASONRY ON TABLETS: BREAKS AT 768px

**FILES INVOLVED:**
- `/Users/work/Documents/skills/photobooth-site/src/app/gallery/GalleryContent.tsx` (line 338)

**CURRENT IMPLEMENTATION:**
```html
<motion.div
  className="columns-2 md:columns-3 xl:columns-4 gap-4"
>
```

**TAILWIND BREAKPOINTS:**
- `sm`: 640px
- `md`: 768px ← PROBLEM AREA
- `lg`: 1024px
- `xl`: 1280px

**THE PROBLEM:**
At exactly 768px (iPad portrait):
- Below 768px: `columns-2` (2 columns)
- At 768px+: `columns-3` (3 columns) ← TOO AGGRESSIVE
- Above 1024px: `columns-4` (4 columns)

On iPad (768px width), jumping from 2→3 columns at exactly that pixel creates:
- Visual jank
- Reflow of gallery
- Bad UX on iPad/tablet

**CURRENT IMPLEMENTATION AUDIT:**
```
Mobile (0–640px):     columns-2  ✓ Good
Tablet (640–768px):   columns-2  ✓ Good (inherits sm rule)
iPad (768–1024px):    columns-3  ✗ BAD — too cramped
Desktop (1024–1280px): columns-3 ✓ OK
Wide (1280px+):       columns-4  ✓ Good
```

**PROPER FIX (5 minutes):**

```html
<motion.div
  className="columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4"
>
```

**NEW BREAKPOINT MAP:**
```
Mobile (0–640px):     columns-1  ✓ Single column (better)
Small (640–768px):    columns-2  ✓ Two columns
Tablet (768–1024px):  columns-2  ✓ Two columns (FIXED)
Desktop (1024–1280px): columns-3 ✓ Three columns
Wide (1280px+):       columns-4  ✓ Four columns
```

**WHY THIS WORKS:**
- iPad (768px) stays at 2 columns — comfortable viewing
- Desktop (1024px+) gets 3 columns — more content density
- Wide screens (1280px+) get 4 columns — best use of space
- Mobile single-column is more readable

**TESTING PLAN:**
- Open Safari DevTools on iPad (768px portrait)
- Resize from 640px → 768px → 1024px, verify smooth transitions
- No jank/reflow between 640-768px

**EFFORT:** 5 minutes (literally one line change)

**RISK:**
- **VERY LOW**: Pure CSS change, no logic changes
- Verify on actual iPad if possible
- May look slightly spacious on tablets, but better than cramped

**TECHNICAL NOTE:**
This isn't over-engineering. It's a standard responsive design pattern. The old implementation was under-specified for the tablet breakpoint.

---

### H2 - REAL-TIME FORM VALIDATION: MISSING FEEDBACK

**FILES INVOLVED:**
- `/Users/work/Documents/skills/photobooth-site/src/app/book/BookingFlow.tsx` (lines 364-492)
- `/Users/work/Documents/skills/photobooth-site/src/app/corporate/CorporateContent.tsx` (form section)

**CURRENT IMPLEMENTATION:**

**BookingFlow.tsx:**
```typescript
// Line 32-41: Form state only
const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  // ... no error tracking per field
});

// Line 368-378: Input with no error display
<input
  id="book-name"
  type="text"
  required
  value={formData.name}
  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
  placeholder="e.g. Sarah Johnson"
  className="... focus:border-[#f5a623]/50 ..."
/>
```

**PROBLEM:**
- No field-level error state
- Only global `submitError` (line 506-515) shown AFTER submission fails
- User doesn't know if phone/email is invalid until they submit
- Form looks OK but validation fails on server

**CorporateContent.tsx SHOWS BETTER PATTERN:**
```typescript
// Line 253-265: Separate error state tracking
const [formState, setFormState] = useState<FormState>({...});
const [submitted, setSubmitted] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitError, setSubmitError] = useState<string | null>(null);
```

But ALSO missing field-level errors — only shows global error after submission.

**PROPER FIX (1.5 hours):**

**Step 1: Add field-level error state to BookingFlow**
```typescript
const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>({
  name: null,
  email: null,
  phone: null,
  venue: null,
});

// Validate on blur (not on every keystroke)
const validateField = (name: string, value: string) => {
  try {
    // Only validate the specific field
    const fieldSchema = z.object({
      [name]: BookingSchema.shape[name as keyof typeof BookingSchema.shape],
    });

    fieldSchema.parse({ [name]: value });
    setFieldErrors((prev) => ({ ...prev, [name]: null }));
  } catch (err) {
    if (err instanceof z.ZodError) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: err.errors[0]?.message || 'Invalid input',
      }));
    }
  }
};

const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  validateField(e.target.name, e.target.value);
};
```

**Step 2: Update inputs to show errors**
```typescript
<div>
  <label htmlFor="book-name" className="...">
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
    aria-invalid={fieldErrors.name ? 'true' : 'false'}
    aria-describedby={fieldErrors.name ? 'book-name-error' : undefined}
    className={cn(
      "... focus:border-[#f5a623]/50 ...",
      fieldErrors.name && "border-red-500/50 focus:border-red-500/50"
    )}
  />
  {fieldErrors.name && (
    <p id="book-name-error" className="mt-1 text-red-400 text-xs">
      {fieldErrors.name}
    </p>
  )}
</div>
```

**REUSE PATTERN FROM CorporateContent:**
CorporateContent already has a working form pattern (line 281-298):
```typescript
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setSubmitError(null);
  setIsSubmitting(true);
  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formState, _hp: "" }),
    });
    if (!res.ok) throw new Error("submission failed");
    setSubmitted(true);
  } catch {
    setSubmitError("Something went wrong. Please try again...");
  } finally {
    setIsSubmitting(false);
  }
}
```

This is identical to BookingFlow pattern — extract to shared utility!

**EFFORT BREAKDOWN:**
- Add fieldErrors state to BookingFlow: 15 min
- Create validateField utility function: 15 min
- Update all inputs with error display: 30 min
- Test field validation (blur on each field): 15 min
- Extract shared form validation utility: 15 min
- **Total: 1.5 hours**

**TESTING:**
- Blur on name field with empty value → error
- Blur on email with invalid format → error
- Blur on phone with invalid format → error
- Correct input on blur → error clears
- Screen reader announces errors via aria-describedby

**TECHNICAL DEBT NOTED:**
- Both BookingFlow and CorporateContent have IDENTICAL submit logic
  - Extract to `/src/lib/formSubmit.ts` as utility
  - Both use `/api/book` and `/api/enquiry` with same pattern

- Button styles are duplicated across all forms
  - Consider creating `<PrimaryButton>`, `<SecondaryButton>` components
  - Currently: `"bg-[#f5a623] text-[#0a0a0e] hover:bg-[#fbbf4a] ..."` repeated 20+ times

**RISK:**
- **LOW**: Field validation on blur only (not onChange), so no performance issues
- Zod validation already tested in API layer
- Adding client feedback doesn't prevent server validation

---

### OVERLOOKED TECHNICAL ISSUES

#### 1. FORM STATE MANAGEMENT INCONSISTENCY

**Pattern A (BookingFlow):**
```typescript
const [formData, setFormData] = useState({...});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitError, setSubmitError] = useState<string | null>(null);
```

**Pattern B (CorporateContent):**
```typescript
const [formState, setFormState] = useState<FormState>({...});
const [submitted, setSubmitted] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitError, setSubmitError] = useState<string | null>(null);
```

**Problem:**
- One uses `formData`, other uses `formState`
- One tracks `submitted` flag, other doesn't
- Makes it hard to extract shared validation utility
- Next dev will copy-paste one pattern without noticing other exists

**Recommendation:**
- Create shared FormState interface in `/src/lib/types.ts`
- Create shared `useFormSubmit` hook
- Both forms should use identical patterns

---

#### 2. API ERROR HANDLING INCONSISTENCY

**/api/book/route.ts:**
```typescript
return NextResponse.json(
  { error: "Invalid input", fields: result.error.flatten().fieldErrors },
  { status: 422 }
);
```

**/api/enquiry/route.ts:**
```typescript
return NextResponse.json(
  { error: "Invalid input", fields: result.error.flatten().fieldErrors },
  { status: 422 }
);
```

**Seems consistent, but:**
- Throw/catch behavior different
- If Resend API fails, both return generic 500
- No structured error format (should be consistent shape)

**Recommendation:**
Create `/src/lib/apiError.ts`:
```typescript
export class ValidationError extends Error {
  constructor(public fields: Record<string, string[]>) {
    super("Validation failed");
  }
}

export function handleApiError(err: unknown) {
  if (err instanceof ValidationError) {
    return NextResponse.json(
      { error: "Validation failed", fields: err.fields },
      { status: 422 }
    );
  }
  console.error("API Error:", err);
  return NextResponse.json(
    { error: "Internal server error" },
    { status: 500 }
  );
}
```

---

#### 3. MISSING LOADING STATES ON FORMS

Current state:
- `/app/loading.tsx` exists for page-level loading
- Booking form has `isSubmitting` button state (good)
- Corporate form also has `isSubmitting` (good)
- BUT: No skeleton/placeholder shown during submission

**Recommendation:**
- Keep current disabled button + spinner approach
- It's sufficient for form submission (fast response expected)

---

#### 4. TYPE SAFETY & SCHEMA EXPORT

**Current:**
```typescript
// /src/lib/schemas.ts
export const BookingSchema = z.object({...});
export type BookingInput = z.infer<typeof BookingSchema>;
```

**Good practices observed:**
- ✓ Exporting both schema and inferred type
- ✓ Using Zod for validation
- ✓ Reusing schema in both client & server

**Missing:**
- No `ErrorResponse` type defined
- API routes don't export error shape
- TypeScript wouldn't catch mismatched error handling

**Recommendation:**
```typescript
// /src/lib/types.ts
export interface ApiErrorResponse {
  error: string;
  fields?: Record<string, string[]>;
}
```

---

#### 5. BUTTON STYLE DUPLICATION

Counted 25+ instances of this pattern:
```typescript
className="bg-[#f5a623] text-[#0a0a0e] hover:bg-[#fbbf4a] shadow-lg shadow-[#f5a623]/25 hover:-translate-y-0.5"
```

Appears in:
- BookingFlow (3x)
- CorporateContent (5x)
- PricingContent (?)
- GalleryContent (2x)
- HomeContent (?)

**Recommendation:**
Create component library:
```typescript
// /src/components/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export function Button({ variant = 'primary', size = 'md', ...props }: ButtonProps) {
  const variantStyles = {
    primary: 'bg-[#f5a623] text-[#0a0a0e] hover:bg-[#fbbf4a] shadow-lg shadow-[#f5a623]/25 hover:-translate-y-0.5',
    secondary: 'border border-[#2a2a3a] text-white hover:border-[#f5a623]/40 hover:bg-white/5',
    // ...
  };
  // ...
}
```

**Effort:** 2 hours to refactor all buttons
**Impact:** Reduces codebase by ~500 lines, improves maintainability

---

#### 6. ENVIRONMENT VARIABLES NOT FULLY DOCUMENTED

**Current .env.local:**
```
RESEND_API_KEY=re_***
CONTACT_EMAIL=hello@funloading360.co.uk
```

**Missing (per memory):**
- GA4 tracking ID (G-0ZFCDKRLJZ) — is this hardcoded?
- UPSTASH Redis key for rate limiting
- Domain configuration

**Recommendation:**
- Check if GA4 tracking ID is in code vs .env
- Document all required env vars in `.env.example`
- Add build-time validation in next.config.ts

---

## SUMMARY TABLE

| Issue | Files | Effort | Approach | Risk | Priority |
|-------|-------|--------|----------|------|----------|
| **C1 Phone Validation** | schemas.ts, book API, corporate API | 55 min | Create validation.ts utility + add client feedback | MEDIUM | HIGH |
| **C2 Gallery Interactivity** | GalleryContent.tsx | 60 min | Extract GalleryCardButton component | LOW | MEDIUM |
| **M3 Masonry Breakpoint** | GalleryContent.tsx | 5 min | Change columns-2 md:columns-3 to lg:columns-3 | VERY LOW | LOW |
| **H2 Form Validation Feedback** | BookingFlow.tsx, CorporateContent.tsx | 90 min | Add fieldErrors state + blurhandler + error display | LOW | MEDIUM |
| **DEBT: Form Pattern Inconsistency** | BookingFlow, CorporateContent | 2 hours | Extract useFormSubmit hook + shared types | NONE | MEDIUM |
| **DEBT: Button Styles** | All pages | 2 hours | Create Button component library | NONE | LOW |
| **DEBT: API Error Format** | /api/book, /api/enquiry | 1 hour | Create apiError.ts utility | NONE | LOW |

---

## IMPLEMENTATION ROADMAP (PRIORITIZED)

### Phase 1: HIGH-IMPACT FIXES (4 hours)
1. **Phone Validation** (55 min) — Fixes false rejections, improves UX
2. **Form Validation Feedback** (90 min) — Major UX improvement, prevents submission errors
3. **Gallery Masonry** (5 min) — Fixes tablet UX jank
4. **Gallery Interactivity** (60 min) — Makes gallery actually functional

### Phase 2: TECHNICAL DEBT (3 hours)
1. **Form pattern unification** (60 min) — Extract useFormSubmit hook
2. **API error standardization** (60 min) — Create apiError.ts
3. **Button component library** (60 min) — Reduce duplication

### Phase 3: REFINEMENTS (2 hours)
1. Type safety improvements
2. Environment variable documentation
3. Code comments for validation patterns

---

## DOES NEXT.JS 15 SUPPORT THIS?

All proposed solutions use standard Next.js 15 features:
- ✓ Zod validation (already used)
- ✓ Server & client components (existing architecture)
- ✓ API routes with proper error handling
- ✓ React hooks (useState, useRef)
- ✓ Framer Motion (already used)
- ✓ Tailwind CSS (already used)

**No compatibility issues identified.**

---

## FINAL RECOMMENDATION

**Don't do quick-fix approaches.** The pattern you want is:

1. **Phone Validation** → Extract utility, add client feedback
2. **Form Validation** → Add field-level error state with blur validation
3. **Gallery Navigation** → Component extraction (proper accessibility)
4. **Masonry** → 5-minute CSS fix (do this immediately)

This approach:
- ✓ Fixes all issues properly (not band-aid fixes)
- ✓ Reduces technical debt
- ✓ Sets pattern for future work
- ✓ ~6 hours total for everything
- ✓ Improves codebase quality

**Avoid:**
- Quick regex changes without refactoring (leads to inconsistency)
- Custom keyboard shortcuts on gallery
- "We'll optimize later" (you won't)

---

## QUESTIONS FOR STAKEHOLDERS

1. **Should gallery cards open lightbox modal?** (If yes, that's separate 1-2 hour task)
2. **Do we want phone formatting in the thank-you email?** (Small feature, 30 min)
3. **Is accessibility (WCAG AA) a requirement?** (If yes, needs more testing)
4. **Should field validation happen on blur or change?** (Recommendation: blur only)
5. **Are there other forms on the site we missed?** (Check all pages for duplication)

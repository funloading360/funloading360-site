# Implementation Checklist — Technical Fixes
## FunLoading360 Website (Next.js 15)

**Track progress here as you implement fixes. Each section is independent and can be completed in any order (except dependencies noted).**

---

## PHASE 1: HIGH-IMPACT FIXES

### ✅ Fix 1: Phone Validation Utility (55 min)

**Dependency:** None

**Step 1: Create validation utility** (20 min)
- [ ] Create `/src/lib/validation.ts`
- [ ] Export `phoneRegex` constant
- [ ] Export `validateUKPhone()` function with UK format checking
- [ ] Export `formatPhoneForDisplay()` utility for formatting
- [ ] Test locally with these inputs:
  - Valid: `07482112110`, `+44 7482 112110`, `(+44) 7482-112110`, `020 7946 0958`
  - Invalid: `7482`, `+33 7482 112110`, `(((+++)))`

**Step 2: Update schemas.ts** (10 min)
- [ ] Import `validateUKPhone` from new validation.ts
- [ ] Replace phone regex validation with `.refine((val) => validateUKPhone(val).valid, 'Invalid UK phone number')`
- [ ] Keep max length at 20
- [ ] Test that both /api/book and /api/enquiry still work

**Step 3: Add client-side feedback in BookingFlow** (15 min)
- [ ] Add `const [phoneError, setPhoneError] = useState<string | null>(null);`
- [ ] Create `handlePhoneBlur` handler that validates on blur
- [ ] Add phone input `onBlur={handlePhoneBlur}`
- [ ] Add error message display below phone input: `{phoneError && <p className="text-red-400 text-xs mt-1">{phoneError}</p>}`
- [ ] Test: Blur empty phone field → should show error, blur valid number → error clears

**Step 4: Verify both APIs** (10 min)
- [ ] Test POST to `/api/book` with invalid phone → should reject with 422
- [ ] Test POST to `/api/enquiry` with invalid phone → should reject with 422
- [ ] Test POST to `/api/book` with valid phone → should accept
- [ ] Confirm error messages are consistent

**Testing checklist:**
- [ ] Can submit with: `+44 7482 112110` (spaced format)
- [ ] Can submit with: `07482112110` (no formatting)
- [ ] Rejected: `7482` (too short)
- [ ] Rejected: `+33 7482 112110` (wrong country)
- [ ] Email sent correctly with formatted phone
- [ ] Field error shows on blur before submission

**Status:** ⬜ Not started

---

### ✅ Fix 2: Real-Time Form Validation Feedback (90 min)

**Dependency:** Fix 1 (uses phone validation utility)

**Step 1: Add field-level error state to BookingFlow** (20 min)
- [ ] Add state: `const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>({...})`
- [ ] Initialize with all form fields set to null
- [ ] Create `validateField` function that validates single field using Zod
- [ ] Create `handleFieldBlur` callback that calls validateField

**Step 2: Update all form inputs with error display** (50 min)
- [ ] For each input field (name, email, phone, event-type, venue, requests):
  - [ ] Add `onBlur={handleFieldBlur}`
  - [ ] Add `aria-invalid={fieldErrors.fieldName ? 'true' : 'false'}`
  - [ ] Add conditional className for error border color
  - [ ] Add error message display below input
  - [ ] Pattern: See Full Name example in Form Validation section of TECHNICAL_AUDIT_ANALYSIS.md
- [ ] Test blur on each field individually

**Step 3: Update select field (Event Type)** (10 min)
- [ ] Apply same validation pattern to `<select>` element
- [ ] Verify Zod validates enum properly
- [ ] Test blur on empty selection → shows error

**Step 4: Keep global submitError (10 min)**
- [ ] Don't remove existing `submitError` state
- [ ] This handles API errors (rate limit, Resend failure, etc)
- [ ] Shown AFTER submission, field errors shown on blur (different purposes)

**Testing checklist:**
- [ ] Name: Blur with empty → "Name must be at least 2 characters"
- [ ] Email: Blur with "invalid" → "Invalid email address"
- [ ] Phone: Blur with "7482" → "Invalid UK phone number" (from validation.ts)
- [ ] Phone: Blur with "+44 7482 112110" → error clears
- [ ] Venue: Blur with empty → "Venue must be at least 2 characters"
- [ ] All fields: Type valid value → error clears on blur
- [ ] Screen reader: Can hear error message when focused on field

**Status:** ⬜ Not started

---

### ✅ Fix 3: Gallery Masonry Tablet Breakpoint (5 min)

**Dependency:** None

**Step 1: Update columns class** (5 min)
- [ ] Open `/src/app/gallery/GalleryContent.tsx`
- [ ] Find line 338: `className="columns-2 md:columns-3 xl:columns-4 gap-4"`
- [ ] Change to: `className="columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4"`
- [ ] Save & build

**Testing checklist:**
- [ ] Mobile (0-640px): 1 column ✓
- [ ] Tablet (640-768px): 2 columns ✓
- [ ] iPad (768px): 2 columns (not 3) ✓
- [ ] Desktop (1024px+): 3 columns ✓
- [ ] Wide (1280px+): 4 columns ✓
- [ ] Resize browser from 768px → 1024px: No jank, smooth transition

**Status:** ⬜ Not started

---

### ✅ Fix 4: Gallery Card Interactivity (60 min)

**Dependency:** None (optional dependency on lightbox implementation)

**Step 1: Extract GalleryCardButton component** (30 min)
- [ ] Create new file: `/src/components/GalleryCardButton.tsx`
- [ ] Copy `GalleryCard` function content
- [ ] Change `<motion.div>` to `<button>`
- [ ] Add `onClick` handler
- [ ] Add `onKeyDown` handler for Enter/Space (already handled by button element)
- [ ] Add `aria-label` with context (e.g., "View Wedding photo from Couple dancing")
- [ ] Keep all existing styling and motion animations

**Step 2: Update GalleryContent.tsx** (20 min)
- [ ] Remove old `GalleryCard` function
- [ ] Import `GalleryCardButton` from components
- [ ] Create `handleCardView` callback (can be placeholder for now)
- [ ] Update map to use `<GalleryCardButton onView={handleCardView} />`
- [ ] Log card ID when clicked: `const handleCardView = (id: number) => console.log('View:', id);`

**Step 3: Verify keyboard accessibility** (10 min)
- [ ] Open gallery page
- [ ] Tab through cards: Can you focus each card?
- [ ] Press Enter on focused card: Does it trigger action? (console.log visible?)
- [ ] Press Space on focused card: Same behavior?
- [ ] Open screen reader: Does aria-label read out context?

**Testing checklist:**
- [ ] Mouse: Click card → triggers onView
- [ ] Keyboard: Tab to card → Enter/Space triggers onView
- [ ] Screen reader: Announces "View [type] photo from [description]"
- [ ] Hover state still works (eye icon appears)
- [ ] Motion animations still work on button element
- [ ] All 34 cards are interactive

**FUTURE WORK:** (Don't implement now, just note)
- [ ] Add lightbox modal to show full image
- [ ] Add keyboard navigation (Escape to close, Arrow keys to prev/next)
- [ ] Add touch swipe navigation on mobile

**Status:** ⬜ Not started

---

## PHASE 2: TECHNICAL DEBT (OPTIONAL BUT RECOMMENDED)

### ✅ Debt 1: Form Pattern Unification (60 min)

**Dependency:** Fixes 1 & 2 (phone validation and form error handling should be complete first)

**Step 1: Create shared form hook** (40 min)
- [ ] Create `/src/lib/useFormSubmit.ts`
- [ ] Export hook that handles submit logic
- [ ] Extract from both BookingFlow and CorporateContent
- [ ] Should handle:
  - [ ] POST to API endpoint
  - [ ] Error handling (setSubmitError)
  - [ ] Loading state (isSubmitting)
  - [ ] Success state (redirect or callback)
  - [ ] Honeypot field (_hp)

```typescript
export function useFormSubmit(endpoint: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submit = async (data: Record<string, any>) => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _hp: "" }),
      });
      if (!res.ok) throw new Error("submission failed");
      return { success: true };
    } catch {
      setSubmitError("Something went wrong. Please try again or email hello@funloading360.co.uk");
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, isSubmitting, submitError };
}
```

**Step 2: Update BookingFlow to use hook** (10 min)
- [ ] Import `useFormSubmit` from lib
- [ ] Replace current submit logic with hook
- [ ] Remove duplicate state variables
- [ ] Test form submission still works

**Step 3: Update CorporateContent to use hook** (10 min)
- [ ] Import `useFormSubmit` from lib
- [ ] Replace current submit logic with hook
- [ ] Remove duplicate state variables
- [ ] Test form submission still works

**Testing checklist:**
- [ ] BookingFlow: Submit valid booking → redirect to /thank-you
- [ ] BookingFlow: Submit with invalid data → shows error message
- [ ] CorporateContent: Submit valid enquiry → shows success state
- [ ] CorporateContent: Submit with invalid data → shows error message
- [ ] Both forms: Submission button disabled while submitting
- [ ] Both forms: Spinner/loading text shows

**Status:** ⬜ Not started

---

### ✅ Debt 2: API Error Standardization (60 min)

**Dependency:** None

**Step 1: Create API error utility** (30 min)
- [ ] Create `/src/lib/apiError.ts`
- [ ] Define `ValidationError` class
- [ ] Define `ApiErrorResponse` type
- [ ] Export `handleApiError` function
- [ ] Export `toErrorResponse` for consistency

**Step 2: Update /api/book/route.ts** (15 min)
- [ ] Import error utilities
- [ ] Replace try-catch with consistent error handling
- [ ] Ensure validation errors return { error, fields } format
- [ ] Ensure Resend errors return generic message

**Step 3: Update /api/enquiry/route.ts** (15 min)
- [ ] Import error utilities
- [ ] Replace try-catch with consistent error handling
- [ ] Same format as /api/book

**Testing checklist:**
- [ ] Invalid booking data → { error: "...", fields: {...} }
- [ ] Invalid enquiry data → { error: "...", fields: {...} }
- [ ] Resend API failure → { error: "Failed to send..." }
- [ ] Rate limit hit → { error: "Too many requests" }

**Status:** ⬜ Not started

---

### ✅ Debt 3: Button Component Library (120 min)

**Dependency:** None (optional refactor)

**Step 1: Create Button component** (40 min)
- [ ] Create `/src/components/Button.tsx`
- [ ] Define variants: primary, secondary, tertiary
- [ ] Define sizes: sm, md, lg
- [ ] Extract all existing button classes
- [ ] Support icons, disabled state, loading state

**Step 2: Replace buttons in BookingFlow** (20 min)
- [ ] Replace 3 instances with `<Button variant="primary">` etc
- [ ] Test all button states work

**Step 3: Replace buttons in CorporateContent** (20 min)
- [ ] Replace 5+ instances
- [ ] Test all button states

**Step 4: Replace buttons in other pages** (40 min)
- [ ] GalleryContent (2 buttons)
- [ ] PricingContent (multiple buttons)
- [ ] HomeContent (multiple buttons)
- [ ] Test all pages

**Testing checklist:**
- [ ] All buttons look visually identical to before
- [ ] Hover states work
- [ ] Disabled states work
- [ ] Loading spinner shows when needed
- [ ] Icon alignment is correct

**Status:** ⬜ Not started

---

## PHASE 3: TESTING & VERIFICATION

### ✅ Cross-Browser Testing

**Desktop (Chrome, Firefox, Safari):**
- [ ] All form validations work
- [ ] Phone field accepts valid formats
- [ ] Gallery responds correctly at all breakpoints
- [ ] Gallery cards are interactive
- [ ] No console errors

**Mobile (iOS Safari, Chrome):**
- [ ] Form inputs are keyboard-accessible
- [ ] Touch targets are adequate (48px minimum)
- [ ] Gallery single-column layout works
- [ ] No horizontal scroll

**Tablet (iPad Pro 11", iPad 10.2"):**
- [ ] Gallery shows 2 columns (not cramped 3)
- [ ] Forms are usable
- [ ] No layout shift when resizing

**Accessibility (Screen Reader):**
- [ ] Form labels are associated with inputs
- [ ] Error messages announced
- [ ] Gallery card labels read out
- [ ] Button purposes clear

**Status:** ⬜ Not started

---

## ROLLOUT PLAN

### Option A: All Fixes at Once (6 hours, comprehensive)
1. Complete all Phase 1 fixes (Fixes 1-4: 4 hours)
2. Run full testing suite (1 hour)
3. Deploy to staging
4. UAT with client
5. Deploy to production

### Option B: Staged Rollout (better for risk management)

**Week 1:** Fix 3 (Masonry — 5 min) + Fix 1 (Phone Validation — 55 min)
- [ ] Test both APIs thoroughly
- [ ] Get feedback on validation messages
- [ ] Deploy to production

**Week 2:** Fix 4 (Gallery Interactivity — 60 min) + Fix 2 (Form Feedback — 90 min)
- [ ] More complex changes
- [ ] Test on multiple devices
- [ ] Deploy to production

**Week 3+:** Technical debt (optional, lower priority)

### Recommendation: **Option B (Staged)**
- Reduces risk of introducing new bugs
- Allows time for QA testing between deployments
- Easier to revert if issues found
- Client gets some improvements immediately (masonry + phone)

---

## TRACKING

| Fix | Status | Started | Completed | Notes |
|-----|--------|---------|-----------|-------|
| 1. Phone Validation | ⬜ | — | — | |
| 2. Form Validation Feedback | ⬜ | — | — | Depends on Fix 1 |
| 3. Gallery Masonry | ⬜ | — | — | Quick 5-min fix |
| 4. Gallery Interactivity | ⬜ | — | — | Can do anytime |
| Debt 1: Form Hook | ⬜ | — | — | Optional |
| Debt 2: API Errors | ⬜ | — | — | Optional |
| Debt 3: Button Lib | ⬜ | — | — | Optional |

---

## NOTES FOR NEXT DEVELOPER

- All validation happens in TWO places: client (Zod in schemas.ts) and server (API routes)
- Keep them in sync!
- Phone validation must work with: `07482112110`, `+44 7482 112110`, `(+44) 7482-112110`
- Gallery has 34 images across 8 filter categories
- Both /api/book and /api/enquiry use Honeypot field `_hp` for bot protection
- Tailwind breakpoints: sm=640, md=768, lg=1024, xl=1280

---

## GIT COMMIT MESSAGES (DRAFT)

When you commit these changes, use clear messages:

```
refactor(validation): extract phone validation to shared utility

- Create src/lib/validation.ts with UK phone validators
- Update BookingSchema and EnquirySchema to use new validator
- Add client-side phone validation feedback in BookingFlow
- Ensures consistent validation across both booking forms
```

```
feat(forms): add field-level validation feedback

- Add fieldErrors state to BookingFlow
- Validate on blur (not onChange) to avoid performance issues
- Display error messages under each field
- Add aria-invalid and aria-describedby for accessibility
```

```
fix(gallery): fix masonry layout on 768px tablet breakpoint

- Change columns-2 md:columns-3 to columns-2 md:columns-2 lg:columns-3
- iPad (768px) now shows 2 columns instead of jumping to 3
- Improves tablet viewing experience
```

```
feat(gallery): make cards interactive with proper keyboard navigation

- Extract GalleryCard → GalleryCardButton component
- Cards now use <button> element instead of <div>
- Added aria-label for screen reader context
- Keyboard users can now tab and press Enter/Space to view cards
```

---

## TIMELINE ESTIMATE

**If implementing all Phase 1 fixes back-to-back:**
- Fix 1 (Phone): 55 minutes
- Fix 2 (Form Feedback): 90 minutes
- Fix 3 (Masonry): 5 minutes
- Fix 4 (Gallery): 60 minutes
- Testing & QA: 60 minutes
- **Total: ~4.5 hours** for all Phase 1 fixes

**Plus Phase 2 (Technical Debt): +3 hours** (optional)

---

END OF CHECKLIST

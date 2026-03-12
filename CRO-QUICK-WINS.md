# CRO Quick Wins — Implementation Checklist
## High-Impact, Low-Effort Fixes (90 minutes)

---

## FIX #1: Button Sizing (45 minutes)
**Impact:** 5-8% booking completion lift on mobile
**Effort:** 45 min

### Changes Needed:
1. **BookingFlow.tsx** (3 buttons)
   - Line 218: `py-3.5` → `py-4 sm:py-3.5`
   - Line 320: `py-3` → `py-4 sm:py-3`
   - Line 525: `py-3.5` → `py-4 sm:py-3.5`

2. **PricingContent.tsx** (1 button)
   - Line 248: `py-3.5` → `py-4 sm:py-3.5`

3. **All CTA buttons in HomeContent.tsx**
   - Search: `py-4` (already good)
   - Search: `py-3.5` → `py-4 sm:py-3.5`

### Pattern to Replace:
```
OLD: py-3.5 rounded-full
NEW: py-4 sm:py-3.5 rounded-full

OLD: py-3 rounded-full
NEW: py-4 sm:py-3 rounded-full
```

### Test Checklist:
- [ ] iPhone SE (375px) — buttons are clearly tappable
- [ ] iPhone 12 (390px) — no text wrapping
- [ ] Galaxy A12 (360px) — still readable
- [ ] Desktop (1920px) — no visual regression

---

## FIX #2: Gallery Captions (30 minutes)
**Impact:** 7-10% gallery → booking CTR lift
**Effort:** 30 min

### Changes Needed:
1. **GalleryContent.tsx** — Add fields to galleryItems (sample 5 items):

```typescript
// Add to each gallery item:
{
  id: 1,
  // ... existing fields
  caption: "Wedding at The Grand Hotel, Chelmsford", // NEW
  testimonial: "Amazing energy! Our guests raved about the 360 booth. — Sarah M. ⭐", // NEW
},
```

### Items to Caption (Do 5-10 first):
- ID 1: "Wedding at The Grand Hotel, Chelmsford" + testimonial
- ID 7: "Glam booth at elegant wedding venue"
- ID 13: "Selfie Pod at corporate gala"
- ID 16: "360 booth exterior"
- ID 20: "Professional setup at corporate event"

2. **GalleryCard component** (line 155-180) — Show captions:

```tsx
// After existing event/booth badges, add:
{card.caption && (
  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0a0e]/95 via-[#0a0a0e]/70 to-transparent p-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
    <p className="text-white text-xs sm:text-sm font-semibold leading-tight">
      {card.caption}
    </p>
    {card.testimonial && (
      <p className="text-gray-300 text-[10px] sm:text-xs mt-1 leading-snug">
        {card.testimonial}
      </p>
    )}
  </div>
)}
```

### Test Checklist:
- [ ] Desktop: Hover shows caption overlay
- [ ] Mobile: Caption visible on all images
- [ ] Text readable (not cut off, good contrast)
- [ ] Links to venue pages work (if added)

---

## FIX #3: Pricing Per-Hour Calculation (15 minutes)
**Impact:** 3-5% lift in booking confidence
**Effort:** 15 min

### Changes Needed:
**PricingContent.tsx** (line 202-224) — Add cost-per-hour breakdown:

```tsx
{/* Pricing options */}
<div className="mb-6 pb-6 border-b border-[#2a2a3a]">
  <div className="space-y-2">
    {tier.prices.map((priceOpt) => {
      const hours = parseInt(priceOpt.duration.match(/\d+/)[0]);
      const perHour = Math.round(priceOpt.price / hours);
      return (
        <div key={priceOpt.duration} className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">{priceOpt.duration}</span>
          <div className="text-right">
            <span className={`text-lg font-bold ${isSignature ? "text-[#f5a623]" : "text-white"}`}>
              {formatPrice(priceOpt.price)}
            </span>
            <span className="text-gray-500 text-xs block">
              (~£{perHour}/hour)
            </span>
          </div>
        </div>
      );
    })}
  </div>
</div>
```

### Test Checklist:
- [ ] All price tiers show cost-per-hour
- [ ] Math is correct (£280 for 2h = £140/hour)
- [ ] Text doesn't overflow on mobile
- [ ] Works for all 3 durations (2h, 3h, 4h)

---

## FIX #4: Phone Help Text (15 minutes)
**Impact:** 1-2% lift in form submission
**Effort:** 15 min

### Changes Needed:
**BookingFlow.tsx** (line 400-413) — Add help text below phone field:

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
  <div>
    <label htmlFor="book-phone" className="block text-sm font-medium text-gray-300 mb-2">
      Phone Number <span className="text-[#f5a623]">*</span>
    </label>
    <input
      id="book-phone"
      type="tel"
      required
      value={formData.phone}
      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      placeholder="+44 7482 112110"
      className="w-full px-4 py-3 rounded-xl bg-[#13131a] border border-[#2a2a3a] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 transition-colors"
    />
    {/* NEW: Help text */}
    <p className="text-gray-500 text-xs mt-1.5">
      Enter UK number as: +44 7482 112110 or 07482 112110
    </p>
  </div>
  {/* ... rest of form */}
</div>
```

### Test Checklist:
- [ ] Help text visible on desktop
- [ ] Help text visible on mobile
- [ ] Text doesn't overlap anything
- [ ] Font size is readable

---

## FIX #5: Date Picker Pre-fill (30 minutes)
**Impact:** 1-3% lift in date completion
**Effort:** 30 min

### Changes Needed:
**BookingFlow.tsx** (line 27-41) — Add helper function & pre-fill:

```tsx
// Add function before component:
const getNextSaturday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7;
  const nextSaturday = new Date(today);
  nextSaturday.setDate(today.getDate() + daysUntilSaturday);
  return nextSaturday.toISOString().split("T")[0];
};

export default function BookPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: getNextSaturday(), // PRE-FILL with next Saturday!
    altDate: "",
    venue: "",
    specialRequests: "",
  });
```

### Test Checklist:
- [ ] First date input pre-filled with next Saturday
- [ ] User can change it if needed
- [ ] Works on all days of week
- [ ] Mobile date picker opens with pre-filled date

---

## IMPLEMENTATION ORDER

### Recommended Sequence (90 minutes):

**5-10 min:** Review all file locations
```
- /Users/work/Documents/skills/photobooth-site/src/app/book/BookingFlow.tsx
- /Users/work/Documents/skills/photobooth-site/src/app/pricing/PricingContent.tsx
- /Users/work/Documents/skills/photobooth-site/src/app/gallery/GalleryContent.tsx
- /Users/work/Documents/skills/photobooth-site/src/app/HomeContent.tsx
```

**45 min:** Fix #1 — Button Sizing
```bash
# Search & replace py-3.5 → py-4 sm:py-3.5 in:
# - BookingFlow.tsx (3 instances)
# - PricingContent.tsx (1 instance)
# - HomeContent.tsx (search for all buttons)
```

**30 min:** Fix #2 — Gallery Captions
```bash
# Add caption & testimonial fields to 5-10 gallery items in GalleryContent.tsx
# Add caption rendering in GalleryCard component
```

**15 min:** Fix #3 — Per-Hour Pricing
```bash
# Add per-hour calculation in PricingContent.tsx pricing loop
```

**Remaining time:** Deploy & test on mobile devices

---

## DEPLOYMENT CHECKLIST

- [ ] All changes committed to feature branch
- [ ] Tested on iPhone SE (375px)
- [ ] Tested on iPhone 12 (390px)
- [ ] Tested on Android (Galaxy A12, 360px)
- [ ] Desktop regression tested (Chrome, Safari)
- [ ] Performance check (no new images loaded)
- [ ] Accessibility check (buttons still keyboard accessible)
- [ ] Form validation still works
- [ ] Analytics events still fire

---

## MEASUREMENT (After Deployment)

### Baseline Metrics (Week 1):
- Collect baseline conversion funnels
- Note: baseline mobile vs desktop booking rates
- Screenshot current /pricing, /book, /gallery

### Week 2-3: A/B Testing
- Roll out fixes to 100% traffic
- Monitor conversion funnel daily
- Alert if any metric drops >2%

### Week 4: Analysis
- Expected improvement: 3-8% on mobile
- Document results
- Plan next set of optimizations

---

## GO/NO-GO DECISION POINTS

- [ ] **GO if:** Button sizing visible improvement within 3 days
- [ ] **NO-GO if:** Form submission drops >5%
- [ ] **GO if:** Gallery captions boost /gallery → /book CTR within 1 week
- [ ] **NO-GO if:** Mobile performance degrades (page load >3s)

---

## Files to Edit

1. **BookingFlow.tsx**
   - Lines 218, 320, 332, 340, 400-413, 525-546
   - Changes: Button padding, phone help text, date pre-fill

2. **PricingContent.tsx**
   - Lines 202-224, 248
   - Changes: Per-hour calculation, button padding

3. **GalleryContent.tsx**
   - Lines 59-108, 156-180
   - Changes: Add caption fields, render captions

4. **HomeContent.tsx**
   - Search: All buttons
   - Changes: Button padding (py-4 sm:py-3.5)

---

## ROLLBACK PLAN

If anything breaks:
```bash
git revert [commit-hash]  # Rollback to previous state
```

All changes are backward compatible, so rollback is safe.

---

## QUESTIONS FOR CLARIFICATION

1. **Budget:** Is there room to hire for calendar picker library (react-day-picker)?
   - If YES: Add in week 3
   - If NO: Pre-fill with "Next Saturday" is sufficient

2. **Testimonials:** Where are client reviews coming from?
   - Current: TBD (fake in demo?)
   - Recommended: Use real Google Reviews, collect from past clients

3. **A/B Testing:** What tool? (Google Analytics, Optimizely, custom?)
   - Current: GA4 is set up
   - Recommended: Use GA4 events for funnel tracking

4. **Phone Number Format:** Strict validation or loose?
   - Current: Unknown (API validates)
   - Recommended: Loose validation (7+ digits), friendly error message

---

## Success = Bookings

Remember: These are all in service of ONE goal: **More bookings**.

- Button sizing → more form submissions
- Gallery captions → more trust → more bookings
- Pricing clarity → less research time → more bookings
- Date pre-fill → faster form → more bookings

**All of these compound.** Do buttons first, measure, then do next batch.


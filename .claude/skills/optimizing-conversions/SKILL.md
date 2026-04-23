---
name: optimizing-conversions
description: Converts SEO traffic into bookings. Audits quote form friction, CTA placement, trust signals, mobile UX, and designs A/B tests via src/lib/abTesting.ts. Without this, every ranking gain leaks.
---

## Workflow

```
CRO Sprint:
- [ ] Step 1: Pull GA4 funnel
- [ ] Step 2: Friction inventory
- [ ] Step 3: Hypothesis prioritization
- [ ] Step 4: A/B test design
- [ ] Step 5: Ship + monitor
- [ ] Step 6: Decide (ship winner / revert loser) + log
```

## Step 1: Pull GA4 funnel

Via `seo-orchestrator` webhook `/webhook/ga4-digest`:

```json
{
  "dateRange": { "startDate": "30daysAgo", "endDate": "yesterday" },
  "metrics": ["sessions", "formStarts", "formCompletions", "bookings", "payments"],
  "dimensions": ["pagePath", "sessionSource", "deviceCategory"]
}
```

Calculate drop-off rate per stage:

```
Session → /book or /corporate           :  X%
/book view → form start                 :  X%
form start → form complete              :  X%
form complete → booking confirmation    :  X%
booking → deposit payment               :  X%
```

Any stage with drop-off >60% is a priority candidate.

## Step 2: Friction inventory per conversion surface

For each of: `/book`, `/corporate`, `/cart`, `/pricing`, city pages, `/weddings`:

**Form factors**:
- Number of fields on first step (target: ≤6)
- Required vs. optional ratio
- Inline validation present? (`aria-invalid`, error messages on blur)
- Auto-focus first field? (saves a tap on mobile)
- Smart defaults? (date picker defaults to Saturday, guests defaults to 80)
- Submit button state (disabled-when-invalid vs. always-clickable-with-errors)

**Visual factors**:
- Time to first CTA above fold (<2s on 4G mobile)
- CTA contrast ratio (≥4.5:1 against background)
- Primary CTA width on mobile (≥44px tall)
- Number of competing CTAs above fold (target: 1 primary, 1 secondary max)

**Trust factors**:
- GBP rating + review count visible? (`4.9★ — 48+ reviews`)
- Insurance badge? (`£5M public liability`)
- Years trading? (`Since 2023`)
- Testimonial quote above fold?
- Secure payment badges near form?

## Step 3: Hypothesis prioritization (ICE framework)

For each hypothesis, score:
- **Impact** (1-10): expected % lift
- **Confidence** (1-10): how sure based on precedent / user research
- **Effort** (1-10): dev time in hours (inverse — lower = better)

Rank by (Impact × Confidence) / Effort.

Starter backlog:

| Hypothesis | I | C | E | Score |
|---|---|---|---|---|
| Sticky mobile CTA on city pages | 8 | 7 | 2 | 28 |
| Trust bar above fold on `/weddings` | 7 | 8 | 2 | 28 |
| 2-step form with 3 fields first | 9 | 6 | 4 | 13.5 |
| Exit-intent offer on `/corporate` | 5 | 5 | 3 | 8.3 |
| Live "X bookings this month" counter | 6 | 4 | 5 | 4.8 |

## Step 4: A/B test design

Every test needs:

**File**: `docs/seo/ab-tests/<test-name>.md`

```markdown
# Test: sticky-mobile-cta-city-pages

## Hypothesis
Mobile visitors on city pages scroll past the hero CTA. A sticky bottom CTA "Get Free Quote" will capture more form opens.

## Variants
- **Control (A)**: no sticky CTA
- **Variant (B)**: sticky bottom CTA "Get Free Quote" linking to /book?city=<slug>

## Traffic split
50/50 via `src/lib/abTesting.ts`

## Primary metric
Form-start rate on /book (sessions where user reaches /book AND clicks any form field)

## Guardrail metrics
- Bounce rate (+5% max)
- CLS (no regression)
- Mobile viewport coverage (sticky must not cover content)

## Sample size
Min 200 conversions per arm (≈4 weeks at current mobile traffic)

## Decision rules
- p<0.05 + positive lift → ship
- p<0.05 + negative lift → revert
- p≥0.05 after 4 weeks → kill, document learning

## Pre-register date: YYYY-MM-DD
## Decision date: YYYY-MM-DD
## Result: [filled post-test]
```

## Step 5: Ship + monitor

Add variant to `src/lib/abTesting.ts`:

```ts
export const AB_TESTS = {
  STICKY_MOBILE_CTA: {
    id: 'sticky-mobile-cta-v1',
    variants: ['control', 'sticky'],
    enabledPaths: ['/locations/', '/weddings/'],
  },
};
```

Wire component to variant check, dispatch GA4 event on exposure AND on conversion:

```ts
gtag('event', 'ab_exposure', { test_id: 'sticky-mobile-cta-v1', variant });
gtag('event', 'ab_conversion', { test_id: 'sticky-mobile-cta-v1', variant });
```

Monitor daily via GA4 Explorer filtered by test_id.

## Step 6: Decide + log

At decision date, run statistical test (two-proportion z-test via online calculator or simple chi-square). Log decision in the test markdown file:

```markdown
## Result — 2026-05-21
- Control conversion rate: 3.2% (n=650)
- Variant conversion rate: 4.8% (n=620)
- p = 0.012
- Lift: +50% (CI 15-85%)
- Decision: SHIP to 100%
- Follow-up: consider same pattern on /weddings spoke pages
```

## Hard rules

- Never run 2 A/B tests on the same element simultaneously (invalidates both).
- Never ship a "winning" test without confirming guardrails held.
- Never change a CTA visual without A/B testing — tiny changes have outsized effects.
- Never remove trust signals to "clean up the page". Trust beats minimalism.
- Never cover content with a popup that can't be dismissed (Google intrusive interstitial penalty).
- Never block the form with a modal on first view.
- Always leave analytics room: every A/B test must fire GA4 events at exposure AND conversion.

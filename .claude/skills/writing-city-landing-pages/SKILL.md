---
name: writing-city-landing-pages
description: Produces a substantive, unique, keyword-optimized city landing page. Used both for existing 9 cities (enrichment from 250→400+ words) and for any new city added to src/lib/cities.ts.
---

## Workflow

```
City Landing Page:
- [ ] Step 1: Local research
- [ ] Step 2: Keyword mapping
- [ ] Step 3: Content structure
- [ ] Step 4: Schema additions
- [ ] Step 5: Internal linking
- [ ] Step 6: Verification
```

## Step 1: Local research (30 min per city)

For the target city, gather:

- **Postcodes served** — exact postcode districts within service radius (e.g., Chelmsford = CM1, CM2, CM3)
- **5+ named venues** where photo booths are hired — Google "wedding venues {city}" + "event venues {city}" + check local wedding directories
- **Local landmarks and events** — cathedral, racecourse, Saturday market, Christmas fair — these localize the copy
- **Travel time from HQ** — Google Maps drive time from CM3 5NF
- **Local competitors** — search "photo booth hire {city}" and note top 3 competitor domains
- **Local events calendar 2026** — proms, weddings, corporate seasons relevant to the city

Output: `docs/seo/cities/{slug}-research.md`

## Step 2: Keyword mapping

For each city, target this keyword ladder:

- **Primary**: "photo booth hire {city}"
- **Secondary**: "wedding photo booth hire {city}", "360 photo booth {city}", "{city} photo booth prices"
- **Long-tail**: "cheap photo booth hire {city}", "photo booth hire {postcode area}", "{city} wedding photo booth packages"
- **Venue-specific**: "photo booth hire {venue name}" for 3+ top venues

## Step 3: Content structure (target 600-900 words)

Every city page follows this structure:

```
H1: [Exact primary keyword, one variant, with modifier]
  e.g., "360 Photo Booth Hire Chelmsford | Weddings & Events from £280"

<AEO-extractable opening paragraph (40-80 words)>
  "FunLoading360 offers 360 photo booth hire in Chelmsford, Essex, covering CM1, CM2, and CM3, from £280 for 2 hours. Free delivery within 25 miles of our South Woodham Ferrers base. Trusted by 48+ couples and event planners across Essex."

H2: Photo Booth Hire in {City} — What's Included
  [120-150 words covering booths offered, hours, delivery, setup, operator]

H2: Popular {City} Venues We've Booked
  [Named list of 5+ venues with short notes]

H2: Pricing for {City} Events
  [Tier table pulled from src/lib/services.ts, plus any city supplement]

H2: Why Choose FunLoading360 for Your {City} Event
  [3-5 differentiators specific to this city — e.g., short travel time, known venues]

H2: Frequently Asked Questions
  [5+ postcode/city-specific FAQs]
  - Do you deliver to {postcode}?
  - How much is photo booth hire for a {city} wedding?
  - Can you set up at {named venue}?
  - What's your earliest available date in {city}?
  - Do you provide props for {city} corporate events?

H2: Book Your {City} Photo Booth
  [CTA with primary + secondary action]
```

## Step 4: Schema additions

Every city page must have:

1. **LocalBusiness** (site-wide, extended with `areaServed` for this city)
2. **BreadcrumbList** — Home → Locations → {City}
3. **Event** — at least 3 upcoming availability slots (from cities.ts → upcomingEvents)
4. **Review** — 3+ city-tagged testimonials from `src/lib/testimonials.ts` filtered by cityId
5. **FAQPage** — mark up the 5+ city-specific FAQs
6. **AggregateRating** — calculated from city-tagged reviews

Use builders from `src/lib/structured-data.ts`. Never hand-roll.

## Step 5: Internal linking

Each city page links to:

- `/` (home — anchor: "FunLoading360 photo booth hire")
- `/locations` (hub — anchor: "other UK cities we serve")
- 2 neighboring city pages (anchor: "photo booth hire in {neighbor}")
- `/weddings/{this-city}` (when Phase 3 ships — anchor: "{city} wedding photo booths")
- `/corporate` (anchor: "corporate photo booth hire")
- `/pricing` (anchor: "photo booth packages & prices")
- `/book` (CTA — anchor: "book your {city} photo booth")
- 1-2 relevant blog posts (e.g., wedding guide if wedding-focused city)

## Step 6: Verification

Before shipping:
- Rich Results Test passes for LocalBusiness + Event + Review + FAQPage + BreadcrumbList
- Lighthouse SEO score ≥ 95
- Word count ≥ 600, unique vs. other city pages (run diff tool)
- First paragraph passes AEO extractability test (ask: can ChatGPT answer "photo booth hire {city}" from this paragraph alone?)
- Mobile render check: H1 not cut off, CTAs thumb-reachable
- Request indexing in GSC

## Hard rules

- Never template >30% of copy across cities. The 70% that varies is postcodes, venues, travel notes, local events.
- Never list a venue you haven't actually worked at (without permission). Google Local Pack flags fake venue claims.
- Never use fake city-tagged testimonials. Source only from GBP/Bark/Poptop with `verifiedUrl`.
- Every city page must be in the sitemap and have `<link rel="canonical">` pointing to self.

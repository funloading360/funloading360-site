---
name: optimizing-local-presence
description: Manages Google Business Profile, 20+ NAP citations, Bing Places, Apple Maps, and map embeds. Ensures NAP consistency across the web, which is the second-biggest local ranking lever after GBP itself.
---

## Workflow

```
Local Presence Optimization:
- [ ] Step 1: GBP audit + optimization
- [ ] Step 2: NAP consistency check across 20 directories
- [ ] Step 3: Citation submissions for missing directories
- [ ] Step 4: Map embed integration
- [ ] Step 5: Review response cadence
- [ ] Step 6: Monthly GBP insights report
```

## Step 1: GBP audit

Required state for the FunLoading360 GBP at CM3 5NF:

| Field | Required value |
|---|---|
| Business name | FunLoading360 (no location suffix, no keyword stuffing) |
| Primary category | Photo booth |
| Secondary categories | Event planner, Wedding service, Video production service |
| Hours | 7 days/week (we're on-call for events) |
| Phone | +44 7482 112110 (match site exactly) |
| Website | https://funloading360.co.uk (with https, no trailing slash) |
| Service areas | All 9 (→10) cities from `src/lib/cities.ts` |
| Services | Every entry from `src/lib/services.ts` with description + price |
| Products | Every package from pricing pages |
| Attributes | Online booking, wheelchair accessible entrance (if true), LGBTQ+ friendly |
| Description | 750 characters, keyword-optimized, with USPs |
| Photos | ≥20, ≥1200px wide, filename-keyword-optimized (e.g., `360-photo-booth-wedding-chelmsford.jpg`) |
| Logo | Square, transparent PNG |
| Cover | 1024×576, brand-consistent |

Audit output: `docs/seo/gbp-audit-<YYYY-MM-DD>.md` with current state → target state diff.

## Step 2: NAP consistency check

Target state: exact match of
```
Name: FunLoading360
Address: Guys Farm Rd, South Woodham Ferrers, Chelmsford, CM3 5NF
Phone: +44 7482 112110
Website: https://funloading360.co.uk
```

on all 20 citation sources (see list below). For each, record:
- URL of listing
- Current NAP state
- Discrepancy (if any)
- Action: fix / claim / submit

Output: `docs/seo/nap-audit-<YYYY-MM-DD>.md` as a table.

## Step 3: Citation sources (priority order)

**Tier 1 (must-have)**:
1. Google Business Profile — primary
2. Bing Places for Business
3. Apple Maps Connect
4. Facebook Business Page
5. Instagram Business profile
6. Yell.com

**Tier 2 (UK event/wedding verticals)**:
7. Bark.com
8. Poptop.uk
9. Add-to-Event
10. Hitched (wedding supplier directory)
11. Bridebook (wedding supplier directory)
12. UKbride
13. For a Day
14. Wedding Wire UK

**Tier 3 (general UK directories)**:
15. Thomson Local
16. Scoot
17. FreeIndex
18. Cylex UK
19. FindABusinessPro
20. BrownBook

## Step 4: Map embed integration

On every city page `src/app/locations/[city]/CityContent.tsx`, add an iframe embed pointing to the GBP listing with the service area circle visible:

```tsx
<iframe
  src={`https://www.google.com/maps/embed/v1/place?key=${MAPS_EMBED_KEY}&q=FunLoading360&center=${city.lat},${city.lng}&zoom=11`}
  width="100%"
  height="300"
  loading="lazy"
  title={`FunLoading360 service area for ${city.name}`}
  className="rounded-lg"
/>
```

Alternative (privacy-preserving, no API key needed): static OpenStreetMap embed. If Maps Embed API quota becomes a concern, switch.

## Step 5: Review response cadence

Respond to every Google Business Profile review within 48 hours, including 5-star reviews. Template:

**5-star response**: Thank by name, reference event type, mention one specific detail from their review, invite them back.

**4-star or below**: Thank for feedback, acknowledge specific concern, invite to contact directly to resolve.

Never copy-paste identical responses across reviews. Google flags response templates.

## Step 6: Monthly GBP insights

First working day of each month, pull from GBP Insights:
- Direct searches (brand name) vs. discovery searches (category/keyword)
- Calls, messages, direction requests, website clicks
- Photo views vs. views per photo
- Top queries that triggered the listing

Report to `seo-orchestrator` for inclusion in monthly dashboard.

## Hard rules

- Never create a secondary GBP for a city you don't physically serve from. Google penalizes fake locations.
- Never change the primary business name to include keywords (e.g., "FunLoading360 Photo Booth Hire Chelmsford" is a violation).
- Never upload stock photos. Google detects via reverse image search.
- Never incentivize reviews ("£10 off for a review"). Google removes and penalizes.
- Never edit NAP without updating all 20+ citations in the same week.

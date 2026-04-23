---
name: optimizing-on-page-content
description: Rewrites existing page titles, H1s, H2s, meta descriptions, first paragraphs, body copy, alt text, and internal anchor text so they are keyword-optimized and AEO-extractable without becoming keyword-stuffed or unnatural. The Phase 2.5 workhorse skill.
---

## Why this skill matters most

70% of SEO gains from this plan come from rewriting what already exists, not from publishing new content. Every existing page has latent ranking potential being wasted by under-optimized copy.

## Workflow

```
On-Page Rewrite:
- [ ] Step 1: Pull GSC query data for this URL
- [ ] Step 2: Validate primary + 3 secondary keywords
- [ ] Step 3: Rewrite title + description + H1
- [ ] Step 4: Rewrite first paragraph for AEO
- [ ] Step 5: Rewrite H2/H3 hierarchy
- [ ] Step 6: Rewrite body copy with entity saturation
- [ ] Step 7: Rewrite internal anchors
- [ ] Step 8: Rewrite alt text
- [ ] Step 9: Update dateModified + request re-crawl
- [ ] Step 10: Log before/after
```

## Step 1: Pull GSC query data

For the target URL, ask `seo-orchestrator` to run:
```
GET /searchanalytics/query?url=<url>&timeframe=90d
```

Note top 20 queries by impressions. These are the terms Google already associates with this page — you want to reinforce them, not contradict them.

## Step 2: Validate keyword targets

Cross-check GSC top queries against:
- Google Keyword Planner (free): monthly search volume, competition
- Firecrawl scrape of Google PAA for the top 3 queries
- Current ranking position for each query (from GSC data)

Pick:
- **1 primary keyword** — the term you want to own (usually top GSC query that's still on page 2-3)
- **3 secondary keywords** — related long-tails
- **5-10 entity terms** — naturally occurring in body (booth types, venues, cities, event types)

## Step 3: Meta title + description + H1

**Meta title** template (≤60 chars):
```
[Primary keyword] [Modifier/USP] | [Brand]
```
- Good: `"Wedding Photo Booth Hire Essex | From £280 | FunLoading360"` (58 chars)
- Bad: `"FunLoading360 - Photo Booth Hire - Weddings, Corporate, Birthdays, Proms - UK"` (no keyword-first, keyword salad)

**Meta description** template (≤155 chars):
```
[Primary keyword] [Unique offer]. [Specific differentiator]. [Soft CTA].
```
- Good: `"Wedding photo booth hire in Essex from £280. 360°, glam, and selfie pods for 2026 weddings. Free delivery within 25 miles. Book your free quote today."` (152 chars)

**H1** (one per page, ≤70 chars):
```
[Primary keyword] [Context modifier] [Benefit/Number]
```
- Good: `"Wedding Photo Booth Hire in Essex — 360°, Glam & Selfie Pods from £280"` (68 chars)

## Step 4: First paragraph (AEO-extractable)

40-80 words, declarative prose, answers the page's primary intent with specific numbers and facts.

Template:
```
[Brand] offers [service] in [location/context], [scope details].
[Specific price or range]. [Differentiator]. [Next step].
```

Example for `/weddings`:
> "FunLoading360 provides wedding photo booth hire across Essex, Kent, and London — including 360° slow-motion, glam vintage, and selfie pod booths. Packages start at £280 for 2 hours, with free delivery within 25 miles of Chelmsford. Trusted by 48+ couples in 2025-2026. Book a free quote and hold your date in under a minute."

## Step 5: H2/H3 hierarchy

Rules:
- Every H2 is a long-tail keyword OR a "People Also Ask" question
- Max 6 H2s per page (else it fragments topical authority)
- H3s only inside H2 sections, never standalone
- No skipping levels (H1 → H2 → H3; never H1 → H3)

Example for `/weddings`:
- H1: Wedding Photo Booth Hire in Essex — 360°, Glam & Selfie Pods from £280
- H2: How Much Does a Wedding Photo Booth Cost? (PAA)
- H2: What's Included in Our Wedding Photo Booth Packages
- H2: Popular Wedding Venues We've Booked
- H2: 360 Booth vs Glam Booth vs Selfie Pod — Which for Your Wedding?
- H2: Frequently Asked Questions from Essex Couples
- H2: Book Your Wedding Photo Booth

## Step 6: Body copy — entity saturation

Every commercial page should naturally mention:
- **Booth types**: 360 photo booth, glam vintage booth, selfie pod, magic mirror (if offered)
- **Event types**: weddings, corporate events, birthday parties, proms, engagement parties, brand activations
- **Geographic entities**: Essex, Kent, London, specific cities served, key postcodes
- **Brand**: FunLoading360 (1-2x per 300 words — not more)
- **Trust entities**: £5M public liability insurance, PAT-tested, DBS-checked (if true)

Target keyword density: primary 1-2%, secondary 0.5-1%. Measure with a simple word counter, not by eye.

## Step 7: Internal anchors

Replace generic anchors:
- ❌ "click here", "learn more", "our services", "read more"
- ✅ "wedding photo booth packages", "corporate photo booth hire London", "booth pricing for Essex weddings"

Every page should have 5-10 internal links using keyword-rich anchors.

## Step 8: Alt text

Replace generic alt text:
- ❌ `alt="photo booth"`, `alt="image"`, `alt=""` (for content images)
- ✅ `alt="360 photo booth setup at Channels Estate wedding in Chelmsford"`
- ✅ `alt="Glam vintage photo booth with print strips at corporate event in London"`

Rules:
- Describe the image factually
- Include primary keyword if it fits naturally
- Include location or context if visible
- ≤125 chars
- Decorative images: `alt=""` (empty, not missing)

## Step 9: Update dateModified + request re-crawl

- Bump `dateModified` in Article schema to today's date
- Submit URL to GSC URL Inspection → Request Indexing
- IndexNow ping via `workflow-8-publish-hooks` if auto-triggered

## Step 10: Log before/after

In `docs/seo/on-page-rewrite-log-<YYYY-MM-DD>.md`, record:
- URL
- Old title → new title
- Old H1 → new H1
- Old first paragraph → new first paragraph
- GSC impressions baseline (7-day)
- Target improvement
- Agent owner
- Re-crawl requested: yes/no + date

## Hard rules

- Never keyword-stuff. If a paragraph has your keyword >3 times, rewrite.
- Never change URL slugs on existing indexed pages (breaks backlinks, creates 301 chains).
- Never delete existing content you don't understand — someone may have written it for a specific purpose.
- Never rewrite without first pulling GSC data; you'd be guessing.
- Never ship a rewrite without co-approval from `seo-technical-aeo` that schema remains valid.
- Always preserve `<link rel="canonical">` pointing to self.

---
name: auditing-technical-seo
description: Runs a full technical SEO audit on funloading360.co.uk — schema validation, crawlability, sitemap vs. live pages diff, robots policy per bot, Core Web Vitals field data, broken links, redirect chains. Produces docs/seo/tech-audit-<date>.md.
---

## Workflow

Copy this checklist and track progress:

```
Technical SEO Audit:
- [ ] Step 1: Snapshot sitemap + live URLs
- [ ] Step 2: Validate JSON-LD schema per page type
- [ ] Step 3: Test robots.txt policy per bot
- [ ] Step 4: Pull CrUX field data
- [ ] Step 5: Check canonicals, hreflang, redirects
- [ ] Step 6: Inventory broken links + 404s
- [ ] Step 7: Write audit report + prioritized fixes
```

## Step 1: Sitemap vs. live URLs

```bash
curl -s https://funloading360.co.uk/sitemap.xml | grep -oP '<loc>\K[^<]+' > /tmp/sitemap-urls.txt
# Compare against src/app/ routes
grep -rh "page.tsx" src/app/ | # ... produce live URL list
diff /tmp/sitemap-urls.txt /tmp/live-urls.txt
```

Flag: URLs in sitemap not live (404 risk) AND live URLs not in sitemap (missing indexation).

## Step 2: Schema validation

For each page type (home, city, blog, pricing detail, corporate, /weddings):

1. Fetch HTML: `curl -s <url> | grep -oP 'application/ld\+json[^<]*'`
2. Extract JSON-LD, pipe through Google's Rich Results API or Schema Markup Validator
3. Confirm required properties: LocalBusiness (address, telephone, openingHoursSpecification, geo), Event (startDate, location, offers), Review (reviewRating, author, datePublished, itemReviewed)
4. Flag missing or malformed schemas in a matrix (page × schema types)

## Step 3: Robots policy

Test each bot's access with curl:
```bash
curl -s https://funloading360.co.uk/robots.txt | grep -A3 "User-agent: GPTBot"
curl -s https://funloading360.co.uk/robots.txt | grep -A3 "User-agent: ClaudeBot"
# repeat for: PerplexityBot, Google-Extended, CCBot, Googlebot, Bingbot
```

Required state: explicit Allow for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Googlebot, Bingbot. Explicit Disallow for AhrefsBot, SemrushBot, DataForSeoBot (optional, user discretion).

## Step 4: CrUX field data

Pull via `workflow-9-crux-field-vitals` or directly:
```bash
curl -s "https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=$CRUX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://funloading360.co.uk/","formFactor":"PHONE"}'
```

Metrics (mobile p75):
- LCP target: <2.5s (good), <4.0s (needs improvement)
- INP target: <200ms (good), <500ms (needs improvement)
- CLS target: <0.1 (good), <0.25 (needs improvement)

Flag any page in "needs improvement" or "poor".

## Step 5: Canonicals, hreflang, redirects

For each URL:
- `<link rel="canonical">` points to self (absolute URL, no trailing slash inconsistency)
- No hreflang needed (UK-only for now)
- Redirect chains: `curl -sIL <url> | grep -i location` — max 1 hop allowed

## Step 6: Broken links + 404s

Crawl site with Screaming Frog free (500 URL limit is fine for this site):
- 404s: fix or 301 to closest live page
- 301 chains: flatten to single hop
- Mixed content (http on https page): fix
- Orphan pages (live but no internal links): flag for interlinking pass

## Step 7: Report

Write `docs/seo/tech-audit-<YYYY-MM-DD>.md` with:
- Executive summary (3 bullets: worst, middling, best)
- Schema coverage matrix
- Robots policy per bot
- CrUX summary table per page type
- Broken links list
- **Top 5 fixes** ranked by (SEO impact × traffic exposure / effort)

## Skill output format

Always end the audit with a delegation brief. Example:
> "Delegating to `seo-technical-aeo`: fix `/pricing/360-slow-motion` JSON-LD (missing `offers.priceValidUntil`) by end of day; fix `/locations/bromley` INP regression (450ms) within 3 days."

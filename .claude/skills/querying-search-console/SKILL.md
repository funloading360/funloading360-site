---
name: querying-search-console
description: Pulls Google Search Console data via n8n webhooks (service account auth) for the orchestrator. Covers Search Analytics (queries, pages, countries, devices), Coverage (indexation issues), Core Web Vitals, Mobile Usability, and URL Inspection.
---

## Workflow

```
GSC Query Session:
- [ ] Step 1: Identify the question
- [ ] Step 2: Pick the right endpoint
- [ ] Step 3: Construct query params
- [ ] Step 4: Call n8n webhook
- [ ] Step 5: Parse + summarize
- [ ] Step 6: Archive raw data
```

## Step 1: Identify the question

Common orchestrator questions and their data shape:

| Question | Endpoint | Dimensions |
|---|---|---|
| Which queries bring clicks? | Search Analytics | query |
| Which pages rank best? | Search Analytics | page |
| Position drops last week? | Search Analytics | page + query, 2 dates compared |
| Why is page X not indexed? | URL Inspection | single URL |
| How many indexed pages? | Search Analytics | (metrics only) |
| CWV regression per URL? | Core Web Vitals report | page |

## Step 2: n8n endpoints (live at localhost:5678)

```
POST /webhook/gsc-pull
Body: {
  "type": "search-analytics" | "coverage" | "url-inspection" | "cwv",
  "siteUrl": "sc-domain:funloading360.co.uk",
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "dimensions": ["query" | "page" | "country" | "device"],
  "rowLimit": 1000,
  "url": "<for URL inspection only>"
}
```

## Step 3: Common queries

### Top 20 queries by impressions, last 28 days
```json
{
  "type": "search-analytics",
  "siteUrl": "sc-domain:funloading360.co.uk",
  "startDate": "2026-03-25",
  "endDate": "2026-04-22",
  "dimensions": ["query"],
  "rowLimit": 20
}
```

### Position delta per URL, this week vs. last week
Make 2 calls for 7-day windows, diff client-side. Flag URLs with position change ≥ 3 or impressions change ≥ 20%.

### Queries where we're on page 2 (ripe for optimization)
Filter post-query: `position > 10 AND position < 21 AND impressions > 50`. These are the highest-leverage URLs to rewrite in Phase 2.5.

### Indexation status for new URL
URL Inspection endpoint — returns: indexed / not indexed + reason.

## Step 4: Call pattern

```bash
curl -X POST http://localhost:5678/webhook/gsc-pull \
  -H "Content-Type: application/json" \
  -d @query.json > /tmp/gsc-result.json
```

In Claude Code, use WebFetch tool or Bash.

## Step 5: Parse + summarize

Always produce a structured summary, not raw JSON:

```markdown
## GSC Summary: 2026-03-25 → 2026-04-22

**Top 5 queries by impressions:**
1. photo booth hire chelmsford — 1,240 imp, 47 clicks, pos 3.2
2. 360 photo booth hire essex — 980 imp, 31 clicks, pos 4.1
3. wedding photo booth hire — 720 imp, 8 clicks, pos 12.8 ⬅ page 2, rewrite candidate
...

**URLs with position drop ≥3:**
- /locations/bromley: pos 8.2 → 11.5 (-3.3)

**Opportunities (page 2 URLs with ≥50 imp):**
- /weddings: pos 14.2, 180 imp — rewrite for AEO extractability
- /blog/corporate-photo-booth-hire-london: pos 11.8, 92 imp — add internal links

**Action**: delegate /weddings rewrite to seo-content-authority.
```

## Step 6: Archive

Store raw JSON at `docs/seo/raw-data/gsc-<YYYY-MM-DD>-<query-type>.json` for historical comparison. Never overwrite — append with date.

## Hard rules

- Never truncate or aggregate away from raw data before archiving.
- Never confuse "position" (average) with "rank" (max).
- Never report position without specifying the timeframe (position on what date range?).
- Never compare week-over-week without controlling for seasonality (wedding traffic peaks are March-September).
- Always flag data gaps (e.g., < 50 impressions = high noise, don't trust position number).

---
name: reporting-seo-kpis
description: Generates weekly and monthly SEO KPI dashboards for FunLoading360 by aggregating GSC, GA4, GBP, rank tracking, AEO presence, and CrUX data into a single report with narrative + recommendations.
---

## Workflow

```
KPI Report:
- [ ] Step 1: Pull all data sources
- [ ] Step 2: Compute deltas vs. prior period
- [ ] Step 3: Write narrative (wins, losses, causes)
- [ ] Step 4: Assess vs. plan targets
- [ ] Step 5: Recommend pivots
- [ ] Step 6: Publish report
```

## Step 1: Data sources

Pull from n8n in one pass:
- GSC: impressions, clicks, CTR, average position (per URL + per query)
- GA4: sessions, form starts, form completions, bookings, deposits
- GBP: calls, messages, direction requests, photo views
- Rank tracking (workflow-4): 30 priority keywords
- AEO presence (workflow-10): citation rate on 40 prompts
- CrUX (workflow-9): LCP, INP, CLS p75 per URL

## Step 2: Deltas

Compare vs.:
- **Weekly report**: prior 7 days
- **Monthly report**: prior 30 days + same period last month (control for seasonality)

Flag any delta:
- ≥ +20% (green — win)
- ≤ -20% (red — investigate)
- Between — neutral

## Step 3: Narrative

Three paragraphs, no jargon:

**Wins**: what improved, why we think it improved, which agent or action drove it.

**Losses**: what declined, hypothesized cause, diagnostic needed.

**Unknowns**: data we can't explain yet — flag for deeper investigation.

## Step 4: Assess vs. plan targets

Reference the KPI table in `/Users/work/.claude/plans/a-si-c-doar-rustling-allen.md`:

```markdown
| KPI | Target wk 8 | Actual wk 8 | Status |
|---|---|---|---|
| GSC impressions on city pages | +40% | +52% | ✅ ahead |
| 6/9 cities top-10 | 6 | 4 | ⚠ behind |
| "wedding photo booth hire" on page 1 | yes | still p2 | ❌ behind |
| AEO citation rate | 15% | 18% | ✅ ahead |
| Quote form completion +20% | +20% | +8% | ❌ behind (CRO priority) |
| GBP calls +30% | +30% | +45% | ✅ ahead |
| CrUX INP p75 | <200ms | 180ms | ✅ met |
```

## Step 5: Recommend pivots

Based on the assessment:
- If a KPI is materially behind target, propose 2-3 concrete actions for the next period
- If the falsification criteria from the plan are hit, escalate with a recommended pivot

Example recommendations:
- "Wedding keyword stagnant → commission 2 new blog spokes targeting 'wedding photo booth hire essex under £500'"
- "Quote form completion behind → prioritize sticky-mobile-CTA A/B test completion"
- "Bromley city page dropped → schedule `seo-technical-aeo` audit specifically on that URL"

## Step 6: Publish

Weekly: `docs/seo/weekly-<YYYY-MM-DD>.md` (every Monday)
Monthly: `docs/seo/monthly-<YYYY-MM>.md` (first working day of month)

Structure:

```markdown
# SEO Report — Week ending 2026-04-22

## TL;DR
[3 bullets]

## KPIs vs. target
[table]

## Wins
[narrative]

## Losses
[narrative]

## This week's priorities (top 3)
1. [action] — owner: [agent] — deadline: [date]
2. ...
3. ...

## Raw data archive
- GSC: `docs/seo/raw-data/gsc-2026-04-22.json`
- GA4: `docs/seo/raw-data/ga4-2026-04-22.json`
- Rank tracking: `docs/seo/raw-data/ranks-2026-04-22.json`
- AEO: `docs/seo/raw-data/aeo-2026-04-22.json`
- CrUX: `docs/seo/raw-data/crux-2026-04-22.json`
```

## Hard rules

- Never skip a weekly report (cadence discipline matters for trend detection).
- Never report a delta without context (is this seasonality or real change?).
- Never write a report without at least one concrete recommendation.
- Never hide losses. Losses inform better than wins.
- Always cite the data source and date range for every claim.

---
name: tracking-rankings
description: Tracks daily SERP positions for 30 priority keywords and weekly AEO citation rate across 40 prompts. Parses workflow-4 (rank tracking) and workflow-10 (AEO presence) output and flags drops/gains.
---

## Workflow

```
Rank Tracking Session:
- [ ] Step 1: Verify workflow-4 + workflow-10 latest run
- [ ] Step 2: Diff vs. yesterday/last week
- [ ] Step 3: Categorize drops (normal noise vs. structural)
- [ ] Step 4: Identify gains worth protecting
- [ ] Step 5: Generate delta report
- [ ] Step 6: Delegate fixes for material drops
```

## Keyword set (30 priority keywords for daily tracking)

Stored in `docs/seo/priority-keywords.md`:

**Local (18 keywords)**:
- "photo booth hire chelmsford"
- "360 photo booth hire chelmsford"
- "photo booth hire southend"
- "photo booth hire basildon"
- "photo booth hire colchester"
- "photo booth hire romford"
- "photo booth hire maidstone"
- "photo booth hire canterbury"
- "photo booth hire london"
- "photo booth hire bromley"
- [+ 8 "wedding photo booth hire {city}" variants]

**Niche (8 keywords)**:
- "wedding photo booth hire"
- "wedding photo booth hire essex"
- "wedding photo booth hire london"
- "corporate photo booth hire"
- "corporate photo booth hire london"
- "360 photo booth hire"
- "branded photo booth hire"
- "brand activation photo booth"

**Comparison / Informational (4 keywords)**:
- "photo booth hire cost uk"
- "360 vs vintage photo booth"
- "how much does photo booth hire cost"
- "best wedding photo booth uk"

## Step 1: Verify workflow output

```bash
# Latest workflow-4 output
cat photobooth-site/n8n/data/rank-tracking-$(date +%Y-%m-%d).json

# Latest workflow-10 output
cat photobooth-site/n8n/data/aeo-presence-$(date +%Y-%m-%d).json
```

If the file is missing, the workflow failed — escalate to `seo-orchestrator` for n8n debug.

## Step 2: Diff vs. prior

For each keyword, compare today's position vs. 7 days ago:

| Keyword | Today | 7d ago | Delta | Notes |
|---|---|---|---|---|
| photo booth hire chelmsford | 3 | 4 | +1 | Gaining |
| wedding photo booth hire essex | 12 | 8 | -4 | ⚠ material drop |

## Step 3: Categorize drops

**Normal noise**: ±2 positions without a clear cause — Google volatility, ignore unless sustained 7+ days.

**Structural drop**: ≥3 positions AND correlates with:
- Recent on-page change on this URL (rollback or tweak)
- Competitor publishing new content for same keyword (investigate + counter)
- Schema error introduced (check Rich Results Test)
- Page speed regression (check CrUX)
- Backlink loss (check GSC Links report)

## Step 4: Protect gains

When a keyword moves into top-3:
- Freeze that URL's copy for 4 weeks (don't rewrite during stabilization)
- Monitor daily
- Prepare "gain-protection" content: internal links from new pages pointing to the winning URL

## Step 5: Delta report

Daily auto-generated in `docs/seo/rank-deltas-<YYYY-MM-DD>.md`:

```markdown
# Rank Delta — 2026-04-23

## Biggest gains (7d)
- "photo booth hire chelmsford": pos 4 → 3 (+1)
- "wedding photo booth hire essex": pos 18 → 11 (+7) ⬅ Phase 2.5 rewrite working

## Biggest drops (7d)
- "corporate photo booth hire": pos 12 → 19 (-7) ⚠ INVESTIGATE

## AEO citation rate (weekly, from workflow-10)
- Perplexity: 8/40 (20%), +3 vs. last week
- Brave Search: 12/40 (30%), +1
- ChatGPT Search (manual): 3/10 checked (30%)

## Actions
- Investigate "corporate photo booth hire" drop — check if competitor shipped new content
- Double down on `/weddings/essex` — 4 AEO citations gained this week, high-leverage
```

## Step 6: Delegation

For material drops (≥3 positions sustained), `seo-orchestrator` delegates investigation:

- On-page issue → `seo-content-authority`
- Schema issue → `seo-technical-aeo`
- Backlink loss → `seo-content-authority` (reclaim via outreach)
- CRO symptom (traffic but no conversions) → `seo-cro-specialist`

## AEO citation tracking specifics

For each of 40 test prompts, log:
- Domain cited (funloading360.co.uk vs. competitor vs. none)
- Position in answer (first cited, third cited, etc.)
- Direct quote from our page (verify Perplexity actually quoted us)
- Prompt wording changes over time (LLM search is non-deterministic)

Run 3 trials per prompt per week — count citation if ≥2 of 3 trials cite us.

## Hard rules

- Never report rank without specifying the search engine (Google UK vs. global makes a difference).
- Never chase a single-day rank change. Always use ≥7-day window.
- Never ignore AEO citation rate because "classic rank is fine". AEO is leading indicator, classic rank lags.
- Never trust a rank tracker's data over GSC's average position for strategic decisions.
- Always note seasonality: wedding keywords peak March-September, trough November-January.

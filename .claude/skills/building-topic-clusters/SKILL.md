---
name: building-topic-clusters
description: Designs hub-and-spoke content architectures for niche verticals (wedding, corporate). Maps keywords to URLs, enforces interlinking rules, and commissions new content briefs aligned with the cluster strategy.
---

## Workflow

```
Topic Cluster Build:
- [ ] Step 1: Keyword research per cluster
- [ ] Step 2: URL lattice design
- [ ] Step 3: Interlinking rules
- [ ] Step 4: Content briefs
- [ ] Step 5: Publication sequencing
```

## Step 1: Keyword research per cluster

For each cluster (wedding, corporate), collect:

- **Head term** — single broad keyword (e.g., "wedding photo booth hire")
- **20-30 long-tails** — from Google Keyword Planner + "People Also Ask" scraped via Firecrawl + Reddit/Quora question mining
- **Competitor mapping** — for top 5 long-tails, identify who ranks top-3 and what URL type (hub, city, blog, service)
- **Intent classification** — informational (blog), commercial (hub/landing), transactional (pricing/book)

Output: `docs/seo/clusters/{cluster}-keywords.md` as a table.

## Step 2: URL lattice design

### Wedding cluster lattice

```
Pillar: /weddings (target: "wedding photo booth hire")
├── Geo-spoke: /weddings/chelmsford
├── Geo-spoke: /weddings/london
├── Geo-spoke: /weddings/{...9 cities}
├── Blog spoke: /blog/photo-booth-wedding-guide (existing)
├── Blog spoke: /blog/360-photo-booth-hire-weddings (existing)
├── Blog spoke: /blog/photo-booth-hire-wedding-essex (existing)
├── Blog spoke: /blog/wedding-photo-booth-trends-2026 (new)
└── Blog spoke: /blog/how-to-choose-wedding-photo-booth (new)
```

### Corporate cluster lattice

```
Pillar: /corporate (rewritten for Phase 2.5)
├── Sub-pillar: /corporate/case-studies (hub)
│   ├── /corporate/case-studies/{client-1}
│   ├── /corporate/case-studies/{client-2}
│   └── /corporate/case-studies/{client-3}
├── Sub-pillar: /corporate/brand-activations
├── Sub-pillar: /corporate/product-launches
├── Blog spoke: /blog/corporate-photo-booth-hire-london (existing)
├── Blog spoke: /blog/corporate-photo-booth-roi (new)
└── Blog spoke: /blog/gdpr-photo-booth-data-capture (new)
```

## Step 3: Interlinking rules

Enforce these rules in every page of a cluster:

1. **Pillar** links to every spoke (dense — in body copy, not just footer)
2. **Each spoke** links back to the pillar AND to ≥2 sibling spokes
3. **Geo-spokes** link to the matching `/locations/{city}` page (and vice versa — bidirectional)
4. **Blog spokes** link to the most commercially relevant pillar/sub-pillar at the end of the post
5. **Anchor text** varies: use the spoke's target keyword 1x, then natural variations (never "click here")
6. **No orphans**: every page in the cluster is linked from at least 2 other cluster pages

Validate via Screaming Frog internal link report: filter by URL = cluster page, count unique incoming links (≥3 from cluster, ≥5 total).

## Step 4: Content briefs

For each new spoke, write a brief following the pattern in existing `docs/blog-research-brief.md`:

```markdown
# Brief: [URL slug]

## Primary keyword
[exact-match target keyword]

## Secondary keywords (3)
[related long-tails]

## Search intent
[informational / commercial / transactional]

## Target word count
[1500-2200 for blog / 800-1200 for landing / 600-900 for geo-spoke]

## SERP analysis
[top 3 results + what they do well, gaps we can fill]

## H2 outline
- H2: [question/subtopic]
  - H3: [sub-point]
  - H3: [sub-point]
- H2: [...]

## Must-include entities
[booth types, venues, regions, pricing, USPs]

## Required schema
[Article + FAQPage, or Product, or Event]

## Internal links (min 5)
- [ ] [pillar URL]
- [ ] [2 sibling spokes]
- [ ] [related city page]
- [ ] [related pricing page]

## External authority links (2-3)
[gov.uk wedding guidance, ICO GDPR, industry report]

## CTA
[primary action + secondary]

## Meta title (≤60)
[...]

## Meta description (≤155)
[...]
```

## Step 5: Publication sequencing

Publish in this order (each unblocks the next):
1. Pillar first (needs to exist for spokes to link back)
2. Geo-spokes batch (all 9 cities at once if possible — avoids ragged indexing)
3. Blog spokes sequentially, 1 per week (Google likes content consistency; too many in a burst looks spammy)
4. Sub-pillars only after pillar has ranking traction (else they cannibalize)

Trigger `workflow-8-publish-hooks` on every publish: IndexNow ping, schema validate, internal link audit.

## Hard rules

- Never create a spoke that targets the exact same keyword as another spoke in the same cluster — that's cannibalization.
- Never build a cluster without a pillar live first.
- Never break the bidirectional pillar↔spoke linking rule.
- Never commission a brief without first confirming the keyword has ≥10 monthly searches (Keyword Planner) AND isn't dominated by a domain with DR 70+.

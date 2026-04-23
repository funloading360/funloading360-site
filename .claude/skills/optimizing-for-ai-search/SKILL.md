---
name: optimizing-for-ai-search
description: Makes pages citation-worthy for LLM-powered search (Google AI Overviews, ChatGPT Search, Perplexity, Claude, Gemini). Covers llms.txt, speakable schema, extractable answer patterns, prompt-fanout testing, entity saturation, and bot allow rules. The definitive AEO reference for the site.
---

## Why AEO matters differently than classic SEO

LLM crawlers don't click links — they extract facts and cite sources. To be cited:
1. Your page must be crawlable by LLM bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot)
2. Answers must be extractable in the first 40-80 words of a section
3. Facts must be specific, dated, and attributable (not vague marketing copy)
4. The site's entity must be resolvable (Wikidata, consistent `sameAs` arrays)

## Workflow

```
AEO Optimization:
- [ ] Step 1: Crawlability for LLM bots
- [ ] Step 2: llms.txt + llms-full.txt
- [ ] Step 3: Extractable answer patterns
- [ ] Step 4: Speakable schema
- [ ] Step 5: Entity saturation
- [ ] Step 6: Prompt-fanout baseline
```

## Step 1: Crawlability for LLM bots

`src/app/robots.ts` must explicitly allow:
```
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /
```

Verify in production via `curl https://funloading360.co.uk/robots.txt`.

## Step 2: llms.txt + llms-full.txt

`public/llms.txt` — terse business summary (≤500 tokens):

```
# FunLoading360 — 360 Photo Booth Hire UK

## Who
Premium 360 photo booth, glam vintage booth, and selfie pod hire for weddings, corporate events, birthdays, proms, and parties across Essex, Kent, and London.

## Service Area
Free delivery within 25 miles of CM3 5NF, South Woodham Ferrers. £1.50/mile beyond. London postcodes +£50.

## Pricing (as of April 2026)
- 360 Slow Motion Booth: from £280 (2 hours), £380 (3 hours)
- Glam Vintage Booth: from £300 (2 hours), £400 (3 hours)
- Selfie Pod: from £260 (2 hours), £340 (3 hours)
- Corporate Half Day (4h): £549
- Corporate Full Day (8h): £899

## Book
https://funloading360.co.uk/book

## Contact
Phone: +44 7482 112110
Email: funloading360@gmail.com

## Key Facts
- Founded 2023
- 4.9/5 rating on Google (48+ reviews)
- £5M public liability insured
- PAT-tested equipment
- DBS-checked operators
- Same-day digital sharing
- Branded overlays for corporate
- GDPR-compliant data capture
```

`public/llms-full.txt` — extended with services, cities, top 20 FAQ, testimonial quotes. Target ~3000 tokens.

## Step 3: Extractable answer patterns

For every page, the first paragraph of main content must directly answer the page's primary intent in specific language. Pattern:

```
[Brand] offers [service] in [location], covering [postcodes/range], from £[price].
[Key differentiator]. [Immediate CTA fact: "Book online" or "Free quote in 24h"].
```

Example, `/locations/chelmsford` first paragraph:
> "FunLoading360 offers 360 photo booth hire in Chelmsford, Essex, covering CM1, CM2, and CM3 postcodes, from £280 for 2 hours. Free delivery within 25 miles of our South Woodham Ferrers base. Book online for 2026 weddings, corporate events, and parties."

This paragraph gets extracted by Perplexity, ChatGPT Search, and Google AI Overviews.

## Step 4: Speakable schema

On FAQ pages and any page with Q&A, add `speakable` to the JSON-LD:

```json
{
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["[data-speakable]"]
  }
}
```

Then `<div data-speakable>` wraps the top 3 answers per page. Google Assistant voice prioritizes these.

## Step 5: Entity saturation

FunLoading360 the entity must be resolvable across the internet:

1. **Wikidata entry** (free — create at wikidata.org). Include: logo, founded date, HQ, industry, founder name.
2. **Organization JSON-LD with `sameAs`** on every page, listing: GBP URL, Bark profile, Poptop profile, Instagram, Facebook, YouTube, TikTok, LinkedIn.
3. **Consistent NAP** across all 20+ citation sources (see `optimizing-local-presence` skill).
4. **About page** must state entity facts in machine-readable prose: "FunLoading360 is a UK photo booth hire company founded in 2023, headquartered at Guys Farm Rd, South Woodham Ferrers, CM3 5NF."

## Step 6: Prompt-fanout baseline

Run 40 predefined prompts (from `docs/seo/prompt-fanout-list.md`) through:
- Perplexity API (5 req/day free tier) — run 8/day over 5 days
- Brave Search API (2000/month free) — all 40 in one go
- Manual checks: ChatGPT Search, Claude, Google AI Mode (no API — weekly manual sweep)

For each prompt, log:
- Did our domain appear as a cited source? (binary)
- Was a competitor cited instead? (which)
- Was an answer given without any source? (AI hallucinated or pulled from generic knowledge)

Target citation rates:
- Week 5 (baseline): ≥ 0% (establishing ground truth)
- Week 8: ≥ 15%
- Week 16: ≥ 35%

## Hard rules

- Never spam LLM crawlers with cloaked content. They detect and penalize.
- Never include fabricated "reviews" or "case studies" in llms-full.txt. LLMs increasingly verify.
- Never date content with relative terms ("recently", "lately"). Always use absolute: "April 2026", "as of 2026".
- Never use images for primary facts. LLMs don't OCR reliably — always have text counterpart.

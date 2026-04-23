# AEO Prompt-Fanout List — 40 Test Prompts

Run weekly via `workflow-10-aeo-presence` against Perplexity API, Brave Search API, and manual sweeps of ChatGPT Search, Claude, and Google AI Overviews. Log citation presence per prompt.

## How to read results

For each prompt, record:
- `cited` (boolean) — did the LLM cite funloading360.co.uk?
- `position` (if multi-source answer) — 1st cited, 2nd cited, 3rd cited
- `competitor_cited` (list) — which competitors beat us
- `quote` — verbatim extract the LLM used (confirms which of our pages was cited)

---

## Local — direct service intent (12 prompts)

1. What's the best 360 photo booth hire in Chelmsford?
2. Photo booth hire near Southend-on-Sea — who should I book?
3. Cheap photo booth hire in Basildon 2026
4. Which photo booth company covers Colchester?
5. 360 photo booth hire in Romford — recommendations?
6. Is there a good photo booth service in Maidstone?
7. Photo booth hire Canterbury for a wedding
8. Best photo booth hire company in London under £400
9. Who hires out photo booths in Bromley?
10. Photo booth hire near me in Essex
11. Cheapest wedding photo booth hire Essex
12. Top 360 photo booth services in Kent

## Niche — wedding (10 prompts)

13. How much does a wedding photo booth cost in the UK in 2026?
14. Best 360 photo booth for a wedding
15. Wedding photo booth hire packages
16. Do I need a photo booth for my wedding?
17. 360 vs glam photo booth for a wedding — which is better?
18. Wedding photo booth with instant prints UK
19. Affordable wedding photo booth Essex
20. Wedding photo booth ideas for 2026
21. Hire a branded wedding photo booth UK
22. Wedding photo booth with props and operator included

## Niche — corporate (8 prompts)

23. How much does a corporate photo booth cost?
24. Photo booth for brand activation London
25. Corporate event photo booth with data capture
26. GDPR-compliant photo booth for events
27. Product launch photo booth hire
28. Corporate Christmas party photo booth ideas
29. Best photo booth for office party London
30. Half-day corporate photo booth hire price

## Informational / comparison (6 prompts)

31. How much does photo booth hire cost in the UK?
32. 360 photo booth vs glam photo booth — difference?
33. How does a 360 photo booth work?
34. How far in advance should I book a photo booth for my wedding?
35. What's included in photo booth hire?
36. Is a selfie pod worth it for a small event?

## Brand-recall / reputation (4 prompts)

37. What is FunLoading360?
38. Is FunLoading360 a good photo booth company?
39. FunLoading360 reviews
40. How do I book FunLoading360?

## Citation rate targets

| Category | Week 5 baseline | Week 8 | Week 16 |
|---|---|---|---|
| Local (12) | baseline only | 30% | 50% |
| Wedding (10) | baseline only | 15% | 35% |
| Corporate (8) | baseline only | 15% | 30% |
| Info/compare (6) | baseline only | 10% | 25% |
| Brand (4) | expect 75%+ from start | 100% | 100% |
| **Overall (40)** | **baseline only** | **15%** | **35%** |

## Prompt hygiene

- Keep wording fixed once recorded. Changing wording invalidates week-over-week comparison.
- Add new prompts quarterly, don't swap out existing ones.
- Review prompts that NEVER get our domain cited after 8 weeks — may be impossible (e.g., "best photo booth UK" when dominated by national chains with DR 70+).

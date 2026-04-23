---
name: link-building-outreach
description: Earns high-quality UK backlinks from venue partnerships, wedding/event directories, guest posts, HARO responses, Wikidata, and Reddit/Quora seeding. Never buys, never schemes. Every link is earned through genuine value.
---

## Workflow

```
Link Building Sprint:
- [ ] Step 1: Build prospect list
- [ ] Step 2: Prioritize by DR + relevance
- [ ] Step 3: Draft outreach emails
- [ ] Step 4: Send + track responses
- [ ] Step 5: Verify link live
- [ ] Step 6: Maintain relationship
```

## Step 1: Prospect categories (in priority order)

### Category A: Directory listings (fast wins, free)
- Bark.com, Poptop.uk, Add-to-Event, Hitched, Bridebook, UKbride, Wedding Wire UK, For a Day, Yell, Thomson Local, Scoot, FreeIndex, Cylex UK, FindABusinessPro, BrownBook
- Most accept free submissions. Claim each, complete profile 100%, add `sameAs` links.

### Category B: Venue partnerships (highest conversion)
For every venue named on a city page (Channels Estate, Ivy Hill, Layer Marney Tower, Orsett Hall, Roslin Beach Hotel, etc.):
- Find wedding coordinator / venue manager email (LinkedIn + venue website)
- Offer preferred-vendor status + mutual link
- Provide ready-to-use vendor card for their website

### Category C: Wikidata entity
- Create FunLoading360 entry (see `docs/seo/wikidata-entry.md` template once authored)
- Required fields: logo, founded date (2023), HQ (Chelmsford, Essex), industry (P31: event production service), official website, logo image, instance of: business
- One-time setup, high authority

### Category D: Guest posts (2-3 per quarter)
- Love My Dress, Rock My Wedding, Whimsical Wonderland Weddings, Want That Wedding, Bridal Musings UK
- Corporate: Eventbrite blog, UK Event Industry blog, M&IT (Meetings & Incentives Travel)
- Pitch specific article, not generic "I'd like to write for you"

### Category E: HARO / Featured / Qwoted / ResponseSource UK
- Daily scan for queries about: weddings, corporate events, small business, UK event industry, photo booth industry
- Respond with founder-voice expertise + specific quote ready for journalist

### Category F: Reddit/Quora seeding (long tail, LLM training data)
- r/weddingplanning, r/UKWedding, r/EventPlanning, r/smallbusiness
- Quora questions about "best photo booth for wedding", "how much is photo booth hire"
- Only genuine value-add replies with natural FunLoading360 mention when relevant (e.g., sharing a pricing breakdown)

### Category G: Press releases
- PRLog (free), Pressat (free tier), NewsDirect
- Only for actual milestones: new service launch, case study, partnership, award

## Step 2: Prioritize

Score each prospect:
- DR (Domain Rating via free Ahrefs DR checker): 0-30 = skip unless category A, 30-50 = worthwhile, 50+ = high priority
- Relevance to photo booth / wedding / corporate events in UK: high / medium / low
- Effort to earn: low (submit form) / medium (pitch email) / high (write full guest post)

Prioritized list output: `docs/seo/outreach-<YYYY-MM>-prospects.md`

## Step 3: Outreach email templates

### Venue partnership template

```
Subject: Preferred photo booth for [Venue Name] couples — mutual intro?

Hi [First Name],

I'm Raz from FunLoading360 — we supply 360°, glam vintage, and selfie pod booths to weddings across Essex, Kent and London. Over the past 2 years I've set up at [Venue Name]-style events [X] times, and I always admire [specific detail about their venue — garden marquee? grand ballroom?].

Would it be helpful if I sent you a 1-page vendor card your coordinators could hand couples asking about photo booths? No cost, no exclusivity asked — just an easy referral for things you don't have to coordinate yourselves.

In return, if we end up being a good fit, I'd love to feature [Venue Name] on our Essex wedding venues page (high-quality local SEO backlink for you — we rank well locally).

Happy to send the vendor card even if mutual linking isn't a fit on your side.

Cheers,
Raz
FunLoading360
funloading360@gmail.com
+44 7482 112110
funloading360.co.uk
```

### Directory listing completion template

Not an email — a checklist:
1. Claim listing
2. Upload logo
3. Complete NAP exactly matching canonical
4. Add 10 photos (min)
5. Write 150-word description with primary service + area
6. Add `sameAs` external links (other directory profiles, social)
7. Enable reviews (where available)
8. Set primary category correctly

### HARO / Featured template

- 2-3 sentences of relevant expertise
- One specific quotable stat or claim ("The average UK wedding photo booth booking in 2026 is 3 hours at £380")
- Credentials in one line: "Raz, founder of FunLoading360 (UK photo booth hire since 2023, 48+ Google reviews)"
- Link: `https://funloading360.co.uk`

### Guest post pitch template

```
Subject: Pitch: [Specific article title] — for [Site name] readers

Hi [Editor name],

I read [specific recent article on their site] and noticed [genuine observation showing you actually read].

I'd love to write [specific proposed title] for your readers. The angle:

[2-3 sentences on what makes this article uniquely useful — specific data, first-hand experience, counter-intuitive take]

Outline:
- H2: [specific subtopic 1]
- H2: [specific subtopic 2]
- H2: [specific subtopic 3]

Happy to share samples of my writing or adjust the angle. Aiming for 1500-2000 words with original photos from real events we've serviced.

About me: [2 sentences with one credibility signal]

Cheers,
Raz
```

## Step 4: Send + track

Tracking spreadsheet in `docs/seo/outreach-tracker.md` (or Google Sheet):
- Prospect name
- Category (A-G)
- DR
- Contact email
- Date pitched
- Response (if any)
- Link live (if any) — verified with `curl -sI`
- Follow-up date (if no response after 7 days)

Target: ≥10 outreach sends per week, ≥2 verified links per month.

## Step 5: Verify link live

```bash
curl -sL <linking page URL> | grep -o 'href="[^"]*funloading360[^"]*"' 
```

Confirm:
- Link is dofollow (no `rel="nofollow"` unless it's an editorial dofollow policy exception)
- Anchor text is keyword-appropriate (primary keyword OK, brand OK, but avoid "click here")
- Link context is relevant (surrounding paragraph talks about photo booths / weddings / events)

## Step 6: Maintain

For each earned link, set a 6-month reminder to:
- Confirm link still live
- Send a thank-you / update (new photos, new case study, season-opener note)
- Explore deeper partnership if applicable

## Hard rules

- Never pay for links (sponsored content with `rel="sponsored"` is OK if disclosed, but we're doing earned-only)
- Never use PBNs, link farms, or bulk submission tools
- Never send the same email twice in the same week (spam filter)
- Never misrepresent (no fake credentials, no "we're the #1 photo booth in UK")
- Never accept a link from a spammy domain (DR <10, irrelevant niche) — toxic link risk
- Never neglect existing links — broken inbound links are worth fighting to restore

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "360 Booth vs Vintage vs Selfie Pod — Which to Hire?",
  description: "Honest comparison of 360° booths, Glam Vintage booths and Selfie Pods. Space, output, wow factor and how to pick the right one for your event.",
  openGraph: {
    title: "360 Booth vs Vintage Photo Booth vs Selfie Pod — Which is Right for You?",
    description: "Side-by-side comparison with a decision guide — pick the perfect photo booth for your wedding, party or corporate event.",
    url: "https://www.funloading360.co.uk/blog/360-vs-vintage-vs-selfie-pod",
    images: [{ url: "https://www.funloading360.co.uk/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://www.funloading360.co.uk/blog/360-vs-vintage-vs-selfie-pod" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "360 Booth vs Vintage Photo Booth vs Selfie Pod — Which Should You Hire?",
  "description": "An honest, side-by-side comparison of the three main types of photo booth: 360° slow motion, Glam Vintage, and Selfie Pod — with a decision guide to help you choose.",
  "author": { "@type": "Organization", "name": "FunLoading360" },
  "publisher": { "@type": "Organization", "name": "FunLoading360", "url": "https://www.funloading360.co.uk" },
  "datePublished": "2026-04-12",
  "url": "https://www.funloading360.co.uk/blog/360-vs-vintage-vs-selfie-pod",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do 360 booths print photos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No — the 360° booth captures slow-motion video clips, not still photos. Guests receive a shareable video file sent digitally. If you want printed keepsakes, the Glam Vintage booth is the better choice as it includes unlimited print strips."
      }
    },
    {
      "@type": "Question",
      "name": "Which booth needs the least space?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Both the Glam Vintage booth and the Selfie Pod require just 2m × 2m of floor space with a standard ceiling height. The 360° booth needs a larger 3m × 3m footprint and a minimum ceiling height of 2.5m to accommodate the rotating camera arm."
      }
    },
    {
      "@type": "Question",
      "name": "Can a selfie pod replace a traditional photo booth?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For many events, yes. A Selfie Pod offers a touchscreen-driven, digital-first experience with instant sharing. It works brilliantly for smaller gatherings, corporate events and teen parties. However, if you want physical printed strips or dramatic video output, the Vintage or 360° booth will be a better fit."
      }
    },
    {
      "@type": "Question",
      "name": "Can we hire more than one booth for the same event?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Many clients with large guest lists — 150+ guests — combine two booths to keep queues short and offer guests a choice of experience. For example, a 360° booth in the main hall and a Selfie Pod in the breakout space. Get in touch and we can tailor a multi-booth package."
      }
    },
    {
      "@type": "Question",
      "name": "Which photo booth is best for a wedding?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on your priorities. The 360° booth delivers the highest wow factor and viral video content — ideal for modern weddings with 80+ guests. The Glam Vintage booth gives every guest a physical printed strip to take home, making it the most universally loved option. The Selfie Pod suits intimate ceremonies or couples looking for a compact, budget-friendly option."
      }
    }
  ]
};

export default function BoothComparisonPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="min-h-screen bg-[#08080d] text-white">
        <div className="max-w-3xl mx-auto px-6 py-20">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li className="text-gray-700">/</li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li className="text-gray-700">/</li>
              <li className="text-gray-400" aria-current="page">Booth Comparison</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <div className="inline-block text-xs font-bold tracking-widest text-orange-400 uppercase mb-4 bg-orange-400/10 px-3 py-1 rounded-full">Buyer&apos;s Guide</div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              360° Booth vs Glam Vintage vs Selfie Pod — Which Should You Hire?
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Choosing between a 360° slow-motion booth, a Glam Vintage photo booth and a Selfie Pod can feel overwhelming — especially when every hire company is trying to upsell you. We stock all three, so we have no reason to favour one over another. Here&apos;s our honest breakdown.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-gray-500 border-t border-white/10 pt-6">
              <span>By FunLoading360</span>
              <span>·</span>
              <span>April 2026</span>
              <span>·</span>
              <span>9 min read</span>
            </div>
          </div>

          {/* Content */}
          <article className="prose prose-invert prose-lg max-w-none">

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">360° booth vs. vintage booth vs. selfie pod — the 60-second summary</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              If you&apos;re short on time, this table covers the essentials. If you want the full picture — including a three-question decision guide — keep reading.
            </p>

            {/* Comparison table */}
            <div className="overflow-x-auto mb-10 rounded-xl border border-white/10">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-4 py-3 font-semibold text-white">Feature</th>
                    <th className="px-4 py-3 font-semibold text-yellow-400">360° Booth</th>
                    <th className="px-4 py-3 font-semibold text-yellow-400">Glam Vintage</th>
                    <th className="px-4 py-3 font-semibold text-yellow-400">Selfie Pod</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 font-medium text-white">Output</td>
                    <td className="px-4 py-3">Slow-mo video</td>
                    <td className="px-4 py-3">Printed strips</td>
                    <td className="px-4 py-3">Digital photos / GIFs</td>
                  </tr>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <td className="px-4 py-3 font-medium text-white">Space needed</td>
                    <td className="px-4 py-3">3m × 3m</td>
                    <td className="px-4 py-3">2m × 2m</td>
                    <td className="px-4 py-3">2m × 2m</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 font-medium text-white">Print output</td>
                    <td className="px-4 py-3">No</td>
                    <td className="px-4 py-3">Yes (unlimited)</td>
                    <td className="px-4 py-3">Optional</td>
                  </tr>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <td className="px-4 py-3 font-medium text-white">Ideal for</td>
                    <td className="px-4 py-3">Weddings, parties 60+</td>
                    <td className="px-4 py-3">Any event</td>
                    <td className="px-4 py-3">Small events, corporates</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3 font-medium text-white">Wow factor</td>
                    <td className="px-4 py-3">★★★★★</td>
                    <td className="px-4 py-3">★★★★</td>
                    <td className="px-4 py-3">★★★</td>
                  </tr>
                  <tr className="bg-white/[0.02]">
                    <td className="px-4 py-3 font-medium text-white">Setup time</td>
                    <td className="px-4 py-3">60–90 min</td>
                    <td className="px-4 py-3">45–60 min</td>
                    <td className="px-4 py-3">30–45 min</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">What a 360° booth does best (and its limits)</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The 360° slow-motion booth is the most dramatic option in our lineup. Guests step onto a circular platform, strike a pose — or a full-on dance move — and a camera arm sweeps around them at speed, capturing a stunning slow-motion video clip. The result looks like something from a film premiere or a music video.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              The output is instantly shareable: videos are sent directly to guests&apos; phones, ready to post to Instagram or TikTok within seconds. At weddings and large birthday parties, this is what creates the &quot;viral moment&quot; — guests who haven&apos;t been to the booth yet see their friends&apos; videos going up on social media and immediately want in.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              <strong className="text-white">Where it excels:</strong> large receptions (80+ guests), modern venues, events where social sharing is a priority, and occasions where you want a genuine talking point. The 360° booth is consistently the most photographed and discussed element at any event it attends.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              <strong className="text-white">Its limits:</strong> the 360° booth needs a 3m × 3m clear floor area and a ceiling height of at least 2.5m — more than the other two options. It also doesn&apos;t produce printed photos; everything is digital. If your venue is small, your ceiling is low, or your guests specifically want physical prints to take home, the Glam Vintage will serve you better. For pricing, see our <Link href="/pricing" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">packages page</Link>.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">What a Glam Vintage booth does best (and its limits)</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The Glam Vintage booth is our most versatile option — and the one we most often recommend to couples who aren&apos;t sure what they want. It combines a beautiful illuminated backdrop, a curated prop box, and instant printed strips that guests take home as a keepsake. There&apos;s something about a physical photo strip that a digital file simply can&apos;t replicate — it ends up on fridges, in frames, and in albums.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Printing is unlimited throughout the hire. Every guest who uses the booth can print as many strips as they like, at no additional cost. The booth also captures a digital gallery that we deliver to you after the event, so you have both the tangible mementos and the digital archive.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              <strong className="text-white">Where it excels:</strong> weddings of any size, corporate events, school proms, birthday parties, charity balls — essentially any occasion. The classic feel resonates with guests of all ages, which is why it&apos;s the go-to choice for multigenerational events like golden anniversaries or milestone birthdays. It also works in smaller spaces than the 360° option: just 2m × 2m is enough.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              <strong className="text-white">Its limits:</strong> if viral social content is your primary goal, the 360° booth will generate more online buzz. And if your budget is tighter, the Selfie Pod offers a more compact entry point. Compare all three on our <Link href="/pricing" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">pricing page</Link>.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">What a Selfie Pod does best (and its limits)</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The Selfie Pod is the sleekest and most compact option we offer. It&apos;s a freestanding touchscreen unit — no large backdrop frame, no rotating arm — that guests interact with directly. They tap the screen, take their photo or GIF, customise it with digital overlays, and instantly share it to their phone or social media.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              The digital-first design makes it a natural fit for corporate events, product launches, and brand activations — the kind of settings where sharing to LinkedIn or a company hashtag is part of the brief. It&apos;s also a smart choice for events in venues with limited floor space, or for hosts who want a photo booth experience without it dominating the room.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              <strong className="text-white">Where it excels:</strong> smaller events (under 80 guests), corporate and branded activations, teen parties, venues with restricted space, and events where quick setup and breakdown matters. Setup takes as little as 30 minutes, and the pod can be repositioned during the event if needed.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              <strong className="text-white">Its limits:</strong> the Selfie Pod has the lowest wow factor of the three — it&apos;s slick rather than spectacular. It also doesn&apos;t include standard printed strips (prints are available as an optional add-on). If you want the full theatrical experience for a large crowd, the 360° or Glam Vintage will deliver more impact. Check our <Link href="/pricing" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">pricing tiers</Link> to compare what&apos;s included in each package.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">How to choose: a 3-question decision guide</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Still not sure? Answer these three questions and your answer should become clear.
            </p>

            {/* Decision guide */}
            <div className="space-y-5 mb-10">
              {[
                {
                  q: "Question 1: How many guests are attending?",
                  content: "If you have 80 or more guests, the 360° booth or Glam Vintage are the stronger choices — they handle throughput better and create more visible energy in a large room. Under 80 guests, all three work well; the Selfie Pod is particularly well-suited to intimate gatherings of under 40.",
                },
                {
                  q: "Question 2: Do you want physical prints?",
                  content: "If taking home a printed photo strip is important to you or your guests, the Glam Vintage is the only booth that includes unlimited prints as standard. The Selfie Pod can add prints for an extra cost, and the 360° booth is digital-only. For weddings where older relatives will be attending, prints are almost always a hit.",
                },
                {
                  q: "Question 3: How much space does your venue have?",
                  content: "If you can't comfortably fit a 3m × 3m clear area, rule out the 360° booth. Both the Glam Vintage and Selfie Pod need only 2m × 2m — a much easier fit for most venue configurations. Don't forget ceiling height: the 360° arm needs a minimum of 2.5m clearance.",
                },
              ].map((item, i) => (
                <div key={i} className="border border-white/10 rounded-xl p-5 bg-white/[0.02]">
                  <p className="font-bold text-white mb-2">{item.q}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>

            {/* Pick X if... */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                {
                  label: "Pick 360° if…",
                  points: ["80+ guests", "Modern venue with 3×3m space", "You want viral slow-mo videos", "Social sharing is a priority"],
                },
                {
                  label: "Pick Glam Vintage if…",
                  points: ["You want physical printed strips", "Any venue size works", "Classic or elegant vibe", "Multigenerational guest list"],
                },
                {
                  label: "Pick Selfie Pod if…",
                  points: ["Compact space or small budget", "Corporate or brand event", "Fewer than 60 guests", "Digital-first sharing needed"],
                },
              ].map((col) => (
                <div key={col.label} className="border border-white/10 rounded-xl p-5 bg-white/[0.02]">
                  <p className="font-bold text-yellow-400 mb-3 text-sm">{col.label}</p>
                  <ul className="space-y-2">
                    {col.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="text-yellow-400 mt-0.5 shrink-0">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">Can you have more than one booth at your event?</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Yes — and it&apos;s more popular than you might think. For large events with 150 or more guests, running two booths simultaneously keeps queues short and gives guests a richer experience. A common combination is the 360° booth in the main reception area (for the show-stopping videos) paired with a Glam Vintage or Selfie Pod in a secondary space (for guests who want something quicker or quieter).
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Corporate events sometimes use this approach to separate the entertainment zone from the branded photo opportunity — a Selfie Pod with a company overlay near the entrance, and a Glam Vintage in the main event space.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              We offer multi-booth packages with a combined discount — get in touch via the <Link href="/book" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">booking page</Link> or see the base <Link href="/pricing" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">pricing tiers</Link> and ask about a tailored quote.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">Frequently asked questions</h2>

            <div className="space-y-6 mb-10">
              {[
                {
                  q: "Do 360 booths print photos?",
                  a: "No — the 360° booth produces slow-motion video clips, not still photographs. Everything is delivered digitally to guests&apos; phones. If printed keepsakes matter to you, the Glam Vintage booth includes unlimited printed strips as standard.",
                },
                {
                  q: "Which booth needs the least space?",
                  a: "Both the Glam Vintage and Selfie Pod need just 2m × 2m of floor space. The 360° booth requires a 3m × 3m area plus a ceiling height of at least 2.5m for the rotating arm — so it&apos;s the most demanding on space.",
                },
                {
                  q: "Can a selfie pod replace a traditional photo booth?",
                  a: "For many events, absolutely. A Selfie Pod delivers a modern, touchscreen-driven experience with instant digital sharing. It&apos;s a great fit for smaller gatherings, corporate events and teen parties. However, if you specifically want printed strips or a dramatic video output, the Vintage or 360° booth will serve you better.",
                },
                {
                  q: "Can we hire more than one booth for the same event?",
                  a: "Yes — combining two booths is a popular choice for larger events. We offer multi-booth packages with a combined discount. A common pairing is the 360° booth in the main hall with a Glam Vintage or Selfie Pod in a secondary space.",
                },
                {
                  q: "Which photo booth is best for a wedding?",
                  a: "It depends on what you value most. For wow factor and viral social content, the 360° booth is unmatched — ideal for modern weddings with 80+ guests. For physical printed keepsakes that every guest loves, the Glam Vintage is the most universally appreciated. For intimate ceremonies or a tighter budget, the Selfie Pod is the practical, stylish choice.",
                },
              ].map((item, i) => (
                <div key={i} className="border-b border-white/10 pb-6">
                  <p className="font-bold text-white mb-2">{item.q}</p>
                  <p className="text-gray-300 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.a }} />
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">Related reading</h2>
            <ul className="text-gray-300 space-y-2 mb-6 pl-0 list-none">
              {[
                { href: "/blog/360-photo-booth-hire-weddings", label: "360° Photo Booth Hire for Weddings — the full guide" },
                { href: "/blog/birthday-photo-booth-hire", label: "Photo Booth Hire for Birthday Parties" },
                { href: "/blog/photo-booth-hire-cost-uk", label: "How Much Does Photo Booth Hire Cost in the UK?" },
              ].map((link) => (
                <li key={link.href} className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">→</span>
                  <Link href={link.href} className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">{link.label}</Link>
                </li>
              ))}
            </ul>

          </article>

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 border border-yellow-400/20 rounded-2xl p-8 text-center">
            <p className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-3">Not Sure Which to Choose?</p>
            <h2 className="text-2xl font-bold mb-3">We&apos;ll Help You Pick the Right Booth</h2>
            <p className="text-gray-400 mb-6">360° · Glam Vintage · Selfie Pod — all available to hire</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/book" className="inline-block bg-yellow-400 text-black font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 transition-colors">
                Check Availability &amp; Book
              </Link>
              <Link href="/pricing" className="inline-block border border-white/20 text-white px-8 py-3 rounded-xl hover:border-white/40 transition-colors">
                Compare Packages &amp; Prices
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}

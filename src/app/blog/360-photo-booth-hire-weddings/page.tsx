import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "360 Photo Booth Hire for Weddings UK | FunLoading360",
  description: "Everything you need to know about hiring a 360 photo booth for your UK wedding — how it works, space needs, when it's NOT the right choice, and how to book.",
  openGraph: {
    title: "360 Photo Booth Hire for Weddings UK | FunLoading360",
    description: "Honest guide to 360 wedding photo booths: how they work, space & power requirements, when to skip one, and how to get the best results on your big day.",
    url: "https://www.funloading360.co.uk/blog/360-photo-booth-hire-weddings",
    images: [{ url: "https://www.funloading360.co.uk/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://www.funloading360.co.uk/blog/360-photo-booth-hire-weddings" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "360 Photo Booth Hire for Weddings UK — The Honest Guide",
  "description": "Everything you need to know about hiring a 360 photo booth for your UK wedding, including when it is NOT the right choice.",
  "author": { "@type": "Organization", "name": "FunLoading360" },
  "publisher": { "@type": "Organization", "name": "FunLoading360", "url": "https://www.funloading360.co.uk" },
  "datePublished": "2026-04-03",
  "url": "https://www.funloading360.co.uk/blog/360-photo-booth-hire-weddings",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can guests wear heels on a 360 photo booth platform?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — our 360 platform has a low-profile rim and a non-slip surface, so heels are fine. We do ask that guests with stiletto heels take extra care stepping on and off, and our operator is always on hand to assist.",
      },
    },
    {
      "@type": "Question",
      "name": "Do 360 photo booths work outdoors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Technically yes, but we strongly advise against it for UK weddings. Wind affects the camera arm's rotation, direct sunlight creates unpredictable exposure, and British weather is famously unreliable. Our 360 booth is designed for indoor use. If your reception is in a marquee, we can assess suitability on request.",
      },
    },
    {
      "@type": "Question",
      "name": "How long does each 360 video take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Each 360 session takes around 60–90 seconds from start to finish — a few seconds on the platform while the arm rotates, then processing and sharing. Groups of up to six can go at once, so throughput is surprisingly high during busy periods.",
      },
    },
    {
      "@type": "Question",
      "name": "How much space does a 360 photo booth need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You need a clear 3m × 3m footprint, a ceiling height of at least 2.5m, a level floor (no steps, thresholds or uneven flagstones), and a standard 13A UK socket within 5 metres. Always check these with your venue coordinator before booking.",
      },
    },
    {
      "@type": "Question",
      "name": "What format is the 360 video output?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Videos are delivered as MP4 files, optimised for vertical social media (9:16 aspect ratio). Guests receive a QR code or link to download their clip immediately, and all videos are available in a shared online gallery after the event.",
      },
    },
  ],
};

export default function PhotoBooth360WeddingsPage() {
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
              <li className="text-gray-400" aria-current="page">360° Wedding Booth</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <div className="inline-block text-xs font-bold tracking-widest text-pink-400 uppercase mb-4 bg-pink-400/10 px-3 py-1 rounded-full">Wedding</div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              360 Photo Booth Hire for Weddings: The Honest UK Guide
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              The 360° photo booth is the most talked-about wedding entertainment of the decade — but it is not right for every couple or every venue. This guide covers how it works, what your venue actually needs, and the situations where a different booth will serve you better.
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

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">What is a 360 photo booth and how does it work at a UK wedding?</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              A 360° photo booth — sometimes called a 360 video booth or slow-motion booth — is a circular platform onto which guests step while a motorised camera arm rotates around them. The result is a short slow-motion video clip that captures every angle in one fluid, cinematic sweep. Think Oscar red-carpet coverage, scaled down to your wedding reception.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              The technology itself is straightforward: a high-frame-rate camera mounted on a rotating arm captures footage at 120 or 240 frames per second, which is then rendered into a smooth slow-motion clip. Guests receive their video almost immediately — via QR code or direct link to their phone — and it is ready to post to Instagram Reels or TikTok within minutes of stepping off the platform.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              At a wedding, the 360 booth typically sits open and visible in the reception space — often near the bar or dance floor — with a professional operator managing each session, handling the controls, and helping groups position themselves for the best shot. The operator is part of the experience: they cue the music, direct poses, and keep energy high throughout the evening. Unlike a traditional enclosed booth, the 360 is a spectacle in itself. Guests watching from across the room will be drawn over to take their turn.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">360 booth vs. traditional photo booth: which suits your wedding?</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Choosing between a 360° booth and a traditional print booth (like our <Link href="/blog/360-vs-vintage-vs-selfie-pod" className="text-yellow-400 hover:text-yellow-300 transition-colors">Glam Vintage or Selfie Pod</Link>) comes down to three things: your wedding vibe, your guest demographic, and your venue constraints.
            </p>

            <div className="not-prose overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 pr-6 text-gray-400 font-semibold"></th>
                    <th className="text-left py-3 pr-6 text-yellow-400 font-semibold">360° Booth</th>
                    <th className="text-left py-3 text-gray-300 font-semibold">Glam Vintage / Selfie Pod</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {[
                    ["Output", "Slow-motion video clip", "Printed photo strips + digital"],
                    ["Guest keepsake", "Digital (shareable)", "Physical print to take home"],
                    ["Space needed", "3m × 3m minimum", "2m × 2m or less"],
                    ["Best for", "Modern, social-media savvy crowd", "All ages, intimate or formal settings"],
                    ["Wow factor", "Very high — a spectacle to watch", "Warm, nostalgic, classic"],
                    ["Outdoor use", "Not recommended", "Possible with shelter"],
                  ].map(([label, col1, col2], i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-3 pr-6 text-gray-500 font-medium">{label}</td>
                      <td className="py-3 pr-6">{col1}</td>
                      <td className="py-3">{col2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6">
              The 360 booth shines at larger receptions (80+ guests) with a younger, socially active crowd. The Glam Vintage is the most versatile option and works brilliantly across all ages and venue types. Not sure which is right for you? Our <Link href="/pricing" className="text-yellow-400 hover:text-yellow-300 transition-colors">pricing page</Link> includes a full breakdown to help you compare.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">Space, power and safety requirements — what your venue needs to know</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              The 360 booth has stricter venue requirements than any other booth type. Before you book, confirm all four of the following with your venue coordinator:
            </p>
            <ul className="text-gray-300 space-y-0 mb-6 pl-0 list-none">
              {[
                {
                  icon: "◻",
                  title: "Floor space: 3m × 3m clear footprint",
                  detail: "The rotating arm extends approximately 1.2m from the platform centre. Any furniture, walls, pillars or decorations within that radius will obstruct the shot — or worse, be struck by the arm. Measure carefully.",
                },
                {
                  icon: "◻",
                  title: "Ceiling height: minimum 2.5m",
                  detail: "The arm elevation is fixed. In rooms with low beams or vaulted sections below 2.5m, the camera mount cannot clear the ceiling at full rotation. Check the lowest point across the entire 3m × 3m area, not just the centre.",
                },
                {
                  icon: "◻",
                  title: "Level floor, no thresholds or steps",
                  detail: "The platform must sit on a flat, even surface. Uneven flagstones, slight ramps, raised dance floors with a lip, or carpets with thick underlay can all cause the platform to rock during rotation — a safety issue, not just a comfort one.",
                },
                {
                  icon: "◻",
                  title: "13A socket within 5 metres",
                  detail: "A single standard UK plug socket is all that is needed. Extension leads run by our operator are fine; the venue does not need to provide anything special. Just confirm there is a socket within reasonable cable distance.",
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 border-b border-white/5 pb-4 pt-4">
                  <span className="text-yellow-400 text-lg shrink-0 mt-0.5">✓</span>
                  <div>
                    <p className="font-semibold text-white mb-1">{item.title}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-gray-300 leading-relaxed mb-6">
              We also need 60 minutes to set up and test before guests arrive. Factor this into your venue access time when coordinating with your wedding planner.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">How long a 360 session takes and how many videos you will get</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Each 360 session from start to finish takes roughly 60–90 seconds. That includes stepping onto the platform, a brief briefing from the operator, the rotation itself (around 15–20 seconds), and the video processing. Groups of up to six people can participate at once, which makes throughput surprisingly high.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Over a three-hour booking, you can realistically expect 80–120 individual video sessions, accounting for natural pauses during speeches, dinner service, and the first dance. Many groups will return for a second or third go once they have seen their first clip — factor this into your expectations but also your enjoyment: repeat visits mean your guests are genuinely having fun.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Every clip is delivered digitally. Guests scan a QR code at the booth to receive their video instantly on their phone. After the event, all videos are compiled into a shared online gallery that we send to you — a complete record of every group who stepped onto the platform that night.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">When a 360 booth is NOT the right choice for your wedding day</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We think it is important to be honest here, because most 360 booth suppliers will not tell you this. There are situations where a 360 booth will disappoint, and booking one anyway is a waste of your money and your guests&apos; patience.
            </p>
            <div className="not-prose space-y-4 mb-8">
              {[
                {
                  label: "Older or less mobile guest list",
                  detail: "Stepping onto a raised platform and standing still while a camera arm rotates is not difficult — but it can feel uncomfortable or unsafe for elderly guests, or those with mobility challenges. If a significant portion of your guest list is 65+, or if you have guests with limited mobility, a traditional print booth is a kinder, more inclusive choice.",
                },
                {
                  label: "Low ceilings or period venues",
                  detail: "Barn conversions, listed buildings, and medieval great halls often have exposed beams or low ceiling sections that fall below the 2.5m requirement. You may only discover this on the day unless you check carefully in advance. Always ask your venue for exact ceiling heights at the proposed booth location.",
                },
                {
                  label: "Uneven or outdoor surfaces",
                  detail: "Marquee grass flooring with damp or uneven ground, cobbled courtyard areas, or outdoor terraced spaces are not suitable. The platform must be completely stable. A rocking platform is both dangerous and ruins the video.",
                },
                {
                  label: "Small guest numbers (under 40)",
                  detail: "The 360 booth is a crowd-energy machine. With fewer than 40 guests, the novelty can wear off quickly and you may find the booth standing idle for long stretches. In this case, the Glam Vintage or Selfie Pod will deliver more joy per pound spent.",
                },
                {
                  label: "Formal, traditional weddings where spectacle feels out of place",
                  detail: "If your wedding is a quiet, intimate affair — a small church ceremony followed by a formal sit-down dinner — the 360 booth&apos;s high-energy, performative nature may jar with the atmosphere. The Glam Vintage, with its classic elegance and printed keepsakes, will suit that mood far better.",
                },
              ].map((item, i) => (
                <div key={i} className="border border-white/10 rounded-xl p-5 bg-white/[0.02]">
                  <p className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                    <span>✕</span>
                    <span>{item.label}</span>
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              We would always rather help you choose the right booth for your wedding than oversell you a spectacular one that does not quite fit. If you are unsure, give us a call on <a href="tel:+447482112110" className="text-yellow-400 hover:text-yellow-300 transition-colors">+44 7482 112110</a> and we will talk it through honestly.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">How to book a 360 booth in the UK — lead times and what to ask suppliers</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Saturday summer dates — particularly June, July and August — are the first to go, often booking six to twelve months in advance. If your wedding is in peak season, treat the photo booth booking with the same urgency as your photographer or caterer. Waiting until three months before the day risks finding your date already taken.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">When comparing 360 booth suppliers, ask these questions before paying a deposit:</p>
            <ul className="text-gray-300 space-y-0 mb-6 pl-0 list-none">
              {[
                "Is a professional operator included, or do guests self-operate? (Self-operate setups produce far worse results.)",
                "What happens if a fault develops on the day — do they carry backup equipment?",
                "Is the deposit refundable, and what are the cancellation terms?",
                "Can they provide a sample video from a recent wedding so you can judge the quality?",
                "Is travel charged separately, or is it included within a certain radius?",
                "Will they do a venue visit or a detailed venue suitability check before the day?",
              ].map((q, i) => (
                <li key={i} className="flex items-start gap-3 border-b border-white/5 pb-3 pt-3">
                  <span className="text-yellow-400 shrink-0 mt-0.5">→</span>
                  <span className="text-sm leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-300 leading-relaxed mb-6">
              At FunLoading360, all bookings include a dedicated operator, full setup and breakdown, a shared digital gallery delivered after your event, and a custom branded overlay with your names and wedding date at no extra charge. Our deposit is 15%, with the balance due 14 days before your wedding. We cover all venues within 25 miles of South Woodham Ferrers with free delivery; London and Kent events carry a small travel supplement.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              For full package details and to check availability for your date, visit our <Link href="/pricing" className="text-yellow-400 hover:text-yellow-300 transition-colors">pricing page</Link>. You can also explore how the 360 compares to our other booth options in our <Link href="/blog/360-vs-vintage-vs-selfie-pod" className="text-yellow-400 hover:text-yellow-300 transition-colors">360 vs Vintage vs Selfie Pod comparison</Link>, or read our <Link href="/blog/photo-booth-hire-wedding-essex" className="text-yellow-400 hover:text-yellow-300 transition-colors">Essex wedding photo booth guide</Link> for local venue tips.
            </p>

            {/* FAQ Section */}
            <h2 className="text-2xl font-bold mt-12 mb-6 text-white">Frequently asked questions</h2>

            <div className="not-prose space-y-0 mb-8">
              {[
                {
                  q: "Can guests wear heels on a 360 platform?",
                  a: "Yes — our 360 platform has a low-profile rim and a non-slip surface, so heels are fine. We do ask that guests with stiletto heels take extra care stepping on and off, and our operator is always on hand to assist.",
                },
                {
                  q: "Do 360 booths work outdoors?",
                  a: "Technically yes, but we strongly advise against it for UK weddings. Wind affects the camera arm's rotation, direct sunlight creates unpredictable exposure, and British weather is famously unreliable. Our 360 booth is designed for indoor use. If your reception is in a marquee, we can assess suitability on request.",
                },
                {
                  q: "How long does each 360 video take?",
                  a: "Each 360 session takes around 60–90 seconds from start to finish — a few seconds on the platform while the arm rotates, then processing and sharing. Groups of up to six can go at once, so throughput is surprisingly high during busy periods.",
                },
                {
                  q: "How much space does a 360 photo booth need?",
                  a: "You need a clear 3m × 3m footprint, a ceiling height of at least 2.5m, a level floor (no steps, thresholds or uneven flagstones), and a standard 13A UK socket within 5 metres. Always check these with your venue coordinator before booking.",
                },
                {
                  q: "What format is the 360 video output?",
                  a: "Videos are delivered as MP4 files, optimised for vertical social media (9:16 aspect ratio). Guests receive a QR code or link to download their clip immediately, and all videos are available in a shared online gallery after the event.",
                },
              ].map((item, i) => (
                <details key={i} className="border-b border-white/10 group">
                  <summary className="flex items-center justify-between py-4 cursor-pointer text-white font-semibold list-none">
                    <span>{item.q}</span>
                    <span className="text-yellow-400 text-lg shrink-0 ml-4 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-gray-400 text-sm leading-relaxed pb-4">{item.a}</p>
                </details>
              ))}
            </div>

          </article>

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 border border-yellow-400/20 rounded-2xl p-8 text-center">
            <p className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-3">Available Across Essex, Kent &amp; London</p>
            <h2 className="text-2xl font-bold mb-3">Book Your 360° Wedding Photo Booth</h2>
            <p className="text-gray-400 mb-6">15% deposit to confirm · Free delivery within 25 miles · Instant availability check</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/book" className="inline-block bg-yellow-400 text-black font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 transition-colors">
                Check Availability &amp; Book
              </Link>
              <Link href="/pricing" className="inline-block border border-white/20 text-white px-8 py-3 rounded-xl hover:border-white/40 transition-colors">
                View All Prices
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}

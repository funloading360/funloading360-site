import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Complete Guide to Photo Booth Hire for Your Wedding | FunLoading360",
  description: "Everything you need to know about hiring a photo booth for your wedding in Essex, Kent & London. Prices, booth types, setup tips and what to look for.",
  openGraph: {
    title: "The Complete Guide to Photo Booth Hire for Your Wedding",
    description: "Expert advice on choosing the right photo booth for your big day — from booth types to pricing, setup requirements and guest experience tips.",
    url: "https://www.funloading360.co.uk/blog/photo-booth-wedding-guide",
    images: [{ url: "https://www.funloading360.co.uk/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://www.funloading360.co.uk/blog/photo-booth-wedding-guide" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Complete Guide to Photo Booth Hire for Your Wedding",
  "description": "Everything you need to know about hiring a photo booth for your wedding in Essex, Kent & London.",
  "author": { "@type": "Organization", "name": "FunLoading360" },
  "publisher": { "@type": "Organization", "name": "FunLoading360", "url": "https://www.funloading360.co.uk" },
  "datePublished": "2026-03-26",
  "url": "https://www.funloading360.co.uk/blog/photo-booth-wedding-guide",
};

export default function PhotoBoothWeddingGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <main className="min-h-screen bg-[#08080d] text-white">
        <div className="max-w-3xl mx-auto px-6 py-20">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li className="text-gray-700">/</li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li className="text-gray-700">/</li>
              <li className="text-gray-400" aria-current="page">Wedding Guide</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <div className="inline-block text-xs font-bold tracking-widest text-yellow-400 uppercase mb-4 bg-yellow-400/10 px-3 py-1 rounded-full">Wedding Guide</div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              The Complete Guide to Photo Booth Hire for Your Wedding
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              A photo booth has become one of the most popular wedding entertainment choices in the UK — and for good reason. Here&apos;s everything you need to know before you book.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-gray-500 border-t border-white/10 pt-6">
              <span>By FunLoading360</span>
              <span>·</span>
              <span>March 2026</span>
              <span>·</span>
              <span>8 min read</span>
            </div>
          </div>

          {/* Content */}
          <article className="prose prose-invert prose-lg max-w-none">

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">Why a Photo Booth at Your Wedding?</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Your wedding day will be full of precious moments — but how many of your guests will actually have professional photos of themselves? The wedding photographer focuses on you and your partner, which means your guests often leave without a single keepsake from the day. A photo booth changes that entirely.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Beyond the photos themselves, a booth creates an activity during the drinks reception or evening do — the slightly awkward &quot;what do we do now?&quot; period that every wedding has. Once your guests find the booth, the energy in the room shifts. Laughter, group shots, silly props — it becomes the social hub of your reception.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">Which Type of Booth is Right for Your Wedding?</h2>
            <p className="text-gray-300 leading-relaxed mb-4">There are three main styles of photo booth, each suited to a different wedding vibe:</p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-yellow-400">360° Slow Motion Booth — from £499</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              The 360° booth is the show-stopper. Guests step onto a circular platform and a camera arm rotates around them, capturing a slow-motion video clip that looks like something from a Hollywood premiere. It&apos;s dramatic, shareable, and instantly goes viral on Instagram and TikTok. If your wedding has a modern, fashion-forward feel — or if you simply want the most talked-about wedding of the year — this is the one. Ideal for receptions of 80+ guests.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-yellow-400">Glam Vintage Photo Booth — from £379</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              The Glam Vintage booth combines classic elegance with modern technology. Guests step in front of a stunning backdrop, choose their filters, and walk away with a printed strip — instant, tangible, and beautiful. This booth is the most versatile: it works for intimate barn weddings, grand hotel receptions, and everything in between. Unlimited printing means every guest gets a physical keepsake to take home.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-yellow-400">Selfie Pod — from £229</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              The Selfie Pod is the smart choice for smaller weddings, micro-ceremonies, or couples who want a photo booth experience without the higher price tag. It&apos;s sleek, unobtrusive, and incredibly easy for guests to use. Perfect for intimate celebrations of up to 60 guests.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">How Much Does a Wedding Photo Booth Cost in Essex?</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              In Essex, Kent and London, you can expect to pay between £229 and £699 for a quality photo booth hire, depending on the booth type, hire duration, and any extras. Here&apos;s a realistic breakdown for a 4-hour evening reception booking with FunLoading360:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 list-none pl-0">
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Selfie Pod · 4 hours</span><span className="text-yellow-400 font-semibold">£349</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>Glam Vintage · 4 hours</span><span className="text-yellow-400 font-semibold">£549</span></li>
              <li className="flex justify-between border-b border-white/5 pb-2"><span>360° Slow Motion · 3 hours</span><span className="text-yellow-400 font-semibold">£599</span></li>
              <li className="flex justify-between pb-2"><span>Guest Book add-on</span><span className="text-yellow-400 font-semibold">+£40</span></li>
            </ul>
            <p className="text-gray-300 leading-relaxed mb-6">
              All prices include free delivery and setup within 25 miles of South Woodham Ferrers, Essex. Events in London or further into Kent carry a small travel supplement. There are no hidden charges.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">When Should You Book?</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Saturday dates — especially between April and October — book up months in advance. We recommend securing your date at least 3–6 months before your wedding. December and June are our busiest months: December for Christmas parties that run alongside weddings, June for prom season. If your wedding is in peak season, don&apos;t wait.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Booking is simple: select your date and package online, pay a 15% deposit to secure your slot, and we handle everything else. The remaining balance is due 14 days before your wedding.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">Setup Requirements — What Your Venue Needs to Know</h2>
            <p className="text-gray-300 leading-relaxed mb-4">Before booking, check these with your venue coordinator:</p>
            <ul className="text-gray-300 space-y-2 mb-6 pl-0 list-none">
              {[
                "Power: a standard 13A UK socket within 5 metres of the booth area",
                "Space: 3m × 3m for the 360° booth; 2m × 2m for Glam Vintage or Selfie Pod",
                "Access: ground floor or lift access for equipment delivery",
                "Timing: we need 60 minutes to set up before your guests arrive",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 border-b border-white/5 pb-3">
                  <span className="text-yellow-400 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">Tips for Getting the Most from Your Wedding Photo Booth</h2>
            <ol className="text-gray-300 space-y-4 mb-6 pl-0 list-none">
              {[
                { n: "01", t: "Place it near the bar or dance floor", d: "The booth works best when guests naturally flow past it. Near the bar or at the edge of the dance floor means continuous footfall." },
                { n: "02", t: "Add a guest book", d: "For £40, guests can print a copy and stick it in a physical album with a handwritten message. It becomes one of the most treasured wedding keepsakes you'll own." },
                { n: "03", t: "Brief your MC or toastmaster", d: "A quick mention during the evening announcements ('The photo booth is open — head over and grab your props!') dramatically increases engagement." },
                { n: "04", t: "Use custom overlays", d: "We create a branded overlay with your names and wedding date at no extra charge. It personalises every photo and makes them instantly recognisable as from your day." },
                { n: "05", t: "Book early and secure your date", d: "Don't leave it to chance. Summer Saturdays go fast — a quick 15% deposit secures your date with full peace of mind." },
              ].map((tip) => (
                <li key={tip.n} className="flex gap-4 border-b border-white/5 pb-4">
                  <span className="text-yellow-400 font-bold text-lg shrink-0">{tip.n}</span>
                  <div><p className="font-semibold text-white mb-1">{tip.t}</p><p className="text-gray-400 text-sm">{tip.d}</p></div>
                </li>
              ))}
            </ol>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">Serving Weddings Across Essex, Kent &amp; London</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              FunLoading360 is based in South Woodham Ferrers, Essex, and covers weddings across Chelmsford, Colchester, Basildon, Southend-on-Sea, Romford, Maidstone, Canterbury, Bromley, and Greater London. We&apos;ve worked at barns, country houses, hotels, village halls, and rooftop venues — every setting is different, and we pride ourselves on adapting seamlessly.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              With over 48 five-star reviews on Bark.com and Poptop, we&apos;re trusted by couples across the region to deliver a flawless experience on their biggest day. Our operators are professional, punctual, and experienced at working within the flow of a wedding reception.
            </p>
          </article>

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 border border-yellow-400/20 rounded-2xl p-8 text-center">
            <p className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-3">Ready to Book?</p>
            <h2 className="text-2xl font-bold mb-3">Secure Your Wedding Date Today</h2>
            <p className="text-gray-400 mb-6">15% deposit to confirm · Full refund if you cancel 90+ days before · Instant confirmation</p>
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

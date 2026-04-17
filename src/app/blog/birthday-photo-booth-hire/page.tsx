import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Photo Booth Hire for Birthday Parties UK | FunLoading360",
  description: "Planning a birthday party? Discover which photo booth suits every age — from kids to 70th celebrations — plus tips on space, props and when to book.",
  openGraph: {
    title: "Photo Booth Hire for Birthday Parties UK | FunLoading360",
    description: "From kids' parties to milestone 70th celebrations, find the perfect photo booth for every birthday — home or venue, Essex, Kent & London.",
    url: "https://www.funloading360.co.uk/blog/birthday-photo-booth-hire",
    images: [{ url: "https://www.funloading360.co.uk/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://www.funloading360.co.uk/blog/birthday-photo-booth-hire" },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Photo Booth Hire for Birthday Parties UK — The Complete Age-by-Age Guide",
  "description": "Everything you need to know about hiring a photo booth for a birthday party in the UK — from choosing the right booth for every age group to space requirements and booking tips.",
  "author": { "@type": "Organization", "name": "FunLoading360" },
  "publisher": { "@type": "Organization", "name": "FunLoading360", "url": "https://www.funloading360.co.uk" },
  "datePublished": "2026-04-11",
  "url": "https://www.funloading360.co.uk/blog/birthday-photo-booth-hire",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Can you hire a photo booth for a kids' birthday party?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Our Selfie Pod and Glam Vintage booths are fantastic for children's birthday parties. Props are lightweight and child-safe, the interface is touchscreen-simple, and kids absolutely love seeing their photos print in seconds. We recommend the Selfie Pod for younger children (under 10) and the Glam Vintage for older kids and tweens.",
      },
    },
    {
      "@type": "Question",
      "name": "How much space do you need for a photo booth at a home party?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Selfie Pod and Glam Vintage booths each need a footprint of roughly 2m × 2m — about the size of a large dining table. The 360° Slow Motion booth needs a 3m × 3m clear area. You'll also need a standard 13A UK socket within 5 metres. Most living rooms, garages, and gardens can comfortably accommodate the Selfie Pod or Glam Vintage.",
      },
    },
    {
      "@type": "Question",
      "name": "Can we hire a photo booth for just 2 hours?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — we offer flexible hire durations including 2-hour packages, which are perfect for shorter children's parties or a concentrated burst of fun during the peak party hours. Check our pricing page for available durations and packages.",
      },
    },
    {
      "@type": "Question",
      "name": "Are photo booth props suitable for all ages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our standard prop pack includes hats, oversized glasses, moustaches, signs, and feather boas — all suitable for guests of any age. We also offer themed prop packs personalised to your party's theme. All props are lightweight, clean, and appropriate for children and adults alike.",
      },
    },
    {
      "@type": "Question",
      "name": "How far in advance should I book a birthday photo booth?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We recommend booking at least 4–8 weeks in advance for a birthday party, and 3–6 months ahead for milestone birthdays (18th, 21st, 30th, 40th, 50th) that fall on a Saturday in peak months. Popular dates fill up quickly — a 15% deposit secures your slot.",
      },
    },
  ],
};

export default function BirthdayPhotoBoothHirePage() {
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
              <li className="text-gray-400" aria-current="page">Birthday Parties</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-12">
            <div className="inline-block text-xs font-bold tracking-widest text-yellow-400 uppercase mb-4 bg-yellow-400/10 px-3 py-1 rounded-full">Birthday</div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Photo Booth Hire for Birthday Parties UK — The Complete Age-by-Age Guide
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Whether you&apos;re planning a kids&apos; party in your living room or a milestone 50th at a venue, a photo booth turns any birthday into an event people talk about for years. Here&apos;s everything you need to know — including which booth suits which age, how much space you actually need at home, and when to get your booking in.
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

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">Why a Photo Booth is the Best Add-On for a UK Birthday Party</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Birthday parties have one job: to make the person celebrating feel special and give their guests an unforgettable time. A photo booth does both simultaneously — and it does it without you lifting a finger once setup is done.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Think about what normally happens at a birthday party. Guests arrive, chat in small clusters, maybe hit the food table, and a few brave souls hit the dance floor. But without something to do together, the energy can plateau. A photo booth is an instant social magnet. The moment props come out and the first strip prints, guests are queuing up, laughing, and creating memories — not just passively attending a party.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Unlike a DJ or a buffet, a photo booth produces a physical takeaway: a printed strip or a sharable slow-motion video clip that guests post online the same night. That kind of organic reach is priceless — and it means the birthday celebration lives on long after the last slice of cake is gone.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Across the UK, photo booth hire has become one of the most requested birthday add-ons — and it works just as well for a child&apos;s seventh birthday as it does for a grandparent&apos;s seventieth. The key is choosing the right booth for the right audience.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">Matching the Booth to the Age Group</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Not every photo booth suits every birthday. Here&apos;s how to match the experience to the age group you&apos;re celebrating — and the guests who&apos;ll be in the room.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-yellow-400">Kids&apos; Birthday Parties (Ages 4–11)</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Children are natural performers — give them a prop and a camera and they&apos;ll entertain themselves for hours. The <strong className="text-white">Selfie Pod</strong> is ideal for younger kids: the touchscreen is at an accessible height, the operation is genuinely simple, and the digital delivery means parents get the photos without fuss. For slightly older kids (8–11) who want something more tangible, the <strong className="text-white">Glam Vintage</strong> booth&apos;s printed strips are an absolute hit — kids love the instant gratification of a physical photo they can stick in their bedroom or school locker.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Photo booths are safe for children when operated responsibly. All our props are lightweight, clean, and age-appropriate — no sharp edges, no heavy pieces. We always recommend keeping the prop pack themed (dinosaurs, unicorns, superheroes) to match younger guests&apos; interests, which makes the booth feel like part of the party rather than an add-on.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-yellow-400">Teen Parties (Ages 12–17)</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Teenagers are the most natural photo booth users on the planet — they live on TikTok and Instagram and already understand exactly what makes a good shot. The <strong className="text-white">360° Slow Motion</strong> booth was practically made for this age group. The rotating camera arm creates dramatic, cinematic clips that are instantly shareable and look genuinely impressive on social media. If the party has a theme — neon, black-and-white glam, Hollywood — the 360° booth leans into it perfectly.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              For teens, the social sharing element is as important as the physical print. The Glam Vintage booth&apos;s printed strips still land brilliantly — teens love the nostalgic &apos;retro&apos; feel — but the 360° booth&apos;s video output gives them content they&apos;ll actually post.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-yellow-400">18th &amp; 21st Birthday Parties</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Milestone birthdays call for a milestone booth. For 18ths and 21sts — where guests are predominantly young adults who want the full experience — the <strong className="text-white">360° Slow Motion</strong> booth is the undisputed star. There&apos;s a reason it&apos;s become the default choice for this age group: it turns every group of friends into a slow-motion fashion shoot, and the results are spectacular.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              That said, the <strong className="text-white">Glam Vintage</strong> booth holds its own beautifully for 18th and 21st parties with a more classic aesthetic — think Great Gatsby, Hollywood Glam, or Black Tie. The unlimited printed strips become instant party favours that guests genuinely keep.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              For a full comparison of all three booth types, see our dedicated guide: <Link href="/blog/360-vs-vintage-vs-selfie-pod" className="text-yellow-400 hover:text-yellow-300 underline">360° vs Vintage vs Selfie Pod — Which Booth is Right for You?</Link>
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-yellow-400">30th &amp; 40th Birthday Parties</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Thirty and forty are often the most creatively ambitious birthdays — the organiser (usually a best friend or partner) wants to throw something genuinely impressive. At this age, the guest mix is broad: close friends who&apos;ll pile onto the platform three at a time, and relatives who need a gentle nudge before they&apos;re laughing hysterically in a feather boa.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              The <strong className="text-white">Glam Vintage</strong> booth works brilliantly here — it&apos;s accessible, produces a beautiful physical keepsake, and gets even the most reserved guests involved. The <strong className="text-white">360° booth</strong> raises the energy ceiling considerably if you want that wow factor. Many of our most memorable 30th and 40th bookings combine a venue with the 360° booth as the centrepiece of the entertainment.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-yellow-400">50th, 60th, 70th &amp; Beyond</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Here&apos;s the secret about older guests and photo booths: once they get in, they&apos;re often the last ones to leave. Milestone 50th, 60th, and 70th birthday parties are full of guests who rarely appear in photos together — and a photo booth gives them the perfect excuse to change that.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              For these ages, the <strong className="text-white">Glam Vintage</strong> booth is the preferred choice: the printed strips are a physical memento that resonates particularly strongly with guests who aren&apos;t on social media. The props feel playful rather than pressuring, and the printed strip becomes something people frame or stick on the fridge. It&apos;s genuinely touching to see four generations of a family clustered around a photo booth at a 70th — and that kind of moment doesn&apos;t happen without the right setup.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">Photo Booth Hire for a Home Birthday Party</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Home parties are the most common birthday setting — and the most common source of questions. &quot;Will it fit?&quot; is the big one. The honest answer: almost certainly yes, if you choose the right booth.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-yellow-400">Space Requirements</h3>
            <ul className="text-gray-300 space-y-3 mb-6 pl-0 list-none">
              {[
                { booth: "Selfie Pod", space: "2m × 2m — fits in most living rooms or a cleared dining area." },
                { booth: "Glam Vintage Booth", space: "2m × 2m for the booth itself, plus a little breathing room in front for guests to step back. A medium-sized lounge or conservatory works perfectly." },
                { booth: "360° Slow Motion Booth", space: "3m × 3m clear area is essential — the rotating arm needs unobstructed space. This works best in large open-plan rooms, garages converted for the event, or gardens (weather permitting)." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 border-b border-white/5 pb-3">
                  <span className="text-yellow-400 mt-0.5 shrink-0">✓</span>
                  <span><strong className="text-white">{item.booth}:</strong> {item.space}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-yellow-400">Power &amp; Access</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              All booths run from a standard 13A UK plug socket — the same as your kettle or TV. You just need one socket within roughly 5 metres of where the booth will be positioned. There&apos;s no special wiring, no generator, and no complex setup. We handle everything: our operator arrives 60 minutes before your guests, sets up completely, and stays for the duration of the hire to assist your guests and keep everything running smoothly.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              A couple of practical home-party tips:
            </p>
            <ul className="text-gray-300 space-y-2 mb-6 pl-0 list-none">
              {[
                "Position the booth near the entrance to the party area — guests spot it immediately and the energy builds from the start.",
                "Clear the space before our operator arrives (move the sofa, fold the dining table) so setup is quick and clean.",
                "Let us know if there are steps or a narrow hallway — we&apos;ll plan accordingly. Ground floor is always preferred.",
                "For garden parties, ensure there&apos;s a covered area or gazebo — most of our equipment is not suitable for use in rain.",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3 border-b border-white/5 pb-3">
                  <span className="text-yellow-400 mt-0.5 shrink-0">→</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">Photo Booth Hire for a Venue Birthday Party</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Venue parties give you more flexibility on booth choice — particularly for the 360° Slow Motion booth, which thrives in open-plan event spaces, hotel ballrooms, and function suites. Before confirming your booking, there are a few things worth checking with your venue coordinator.
            </p>
            <ul className="text-gray-300 space-y-3 mb-6 pl-0 list-none">
              {[
                { label: "Power supply", detail: "Confirm there&apos;s a 13A socket accessible in the area you want the booth. Most venues have this covered, but it&apos;s worth double-checking for marquees or outdoor structures." },
                { label: "Floor space", detail: "Get written confirmation of the exact area allocated for the booth — especially for the 360° option, where 3m × 3m is a non-negotiable minimum." },
                { label: "Third-party supplier policy", detail: "Some venues require their own supplier approval process. Give them FunLoading360&apos;s details (including our public liability insurance) in advance." },
                { label: "Setup window", detail: "We need 60 minutes before the booth goes live. Coordinate this with your venue&apos;s supplier access schedule." },
                { label: "Noise and lighting", detail: "If your venue will have a DJ or band, position the booth away from the main speakers — guests need to be able to hear each other during the photo experience." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 border-b border-white/5 pb-3">
                  <span className="text-yellow-400 mt-0.5 shrink-0">✓</span>
                  <span><strong className="text-white">{item.label}:</strong> {item.detail}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">Choosing Props, Backdrops and Print Designs for Your Birthday Theme</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              One of the most enjoyable parts of planning a birthday photo booth is making it feel genuinely personal to the celebration. Every FunLoading360 booking includes our standard prop pack — hats, oversized glasses, moustaches, signs, and feather boas — which works brilliantly for any age group. But you can go further.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Here&apos;s how to match the booth&apos;s visual identity to your birthday theme:
            </p>
            <ul className="text-gray-300 space-y-3 mb-6 pl-0 list-none">
              {[
                { theme: "Kids&apos; themes (dinosaurs, unicorns, superheroes)", tip: "Ask about themed prop packs tailored to the character or theme. We can personalise the printed strip overlay with the birthday child&apos;s name and age." },
                { theme: "Glamour & Hollywood (common for 18th/21st/40th)", tip: "A black sequin backdrop behind the Glam Vintage booth looks stunning on prints. Add feather boas and Hollywood glasses from the prop kit." },
                { theme: "Tropical / Summer garden party", tip: "Tropical props (flamingos, palm leaves, sunglasses) and a white or floral backdrop keep the feel light and seasonal." },
                { theme: "Decades themes (70s, 80s, 90s)", tip: "Personalise the print overlay with a retro font matching the decade. Huge hit for 40th and 50th parties especially." },
                { theme: "Milestone number birthdays", tip: "Every print can feature a custom overlay with the age ('30!', 'The Big 5-0') and the birthday person&apos;s name — included at no extra cost." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 border-b border-white/5 pb-3">
                  <span className="text-yellow-400 mt-0.5 shrink-0">★</span>
                  <span><strong className="text-white">{item.theme}:</strong> {item.tip}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-300 leading-relaxed mb-6">
              When you book, simply let us know your theme and we&apos;ll advise on the best prop and backdrop combinations available. Personalised print overlays are created before your event and included as standard.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">Booking Timeline and What to Ask Your Supplier</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Photo booth hire is one of those things that seems easy to leave until later — until you find your preferred supplier is already booked. Here&apos;s a realistic timeline and the key questions to ask before you commit.
            </p>
            <ol className="text-gray-300 space-y-4 mb-6 pl-0 list-none">
              {[
                { n: "01", t: "4–8 weeks out: standard birthdays", d: "For a weeknight or Sunday party, 4–6 weeks notice is usually sufficient. Saturday bookings fill faster — 6–8 weeks is safer." },
                { n: "02", t: "3–6 months out: milestone Saturdays", d: "18ths, 21sts, 30ths, 40ths falling on a Saturday in May–September or December need early booking. These dates go fast." },
                { n: "03", t: "What to confirm with your supplier", d: "Ask about: total hire duration options, what&apos;s included in the price, prop pack customisation, print overlay design, travel coverage for your area, and deposit/payment terms." },
                { n: "04", t: "Deposit and payment", d: "FunLoading360 takes a 15% deposit to secure your date. The balance is due 14 days before the party. No nasty surprises." },
                { n: "05", t: "Compare carefully", d: "Not all photo booth hire is equal. Check reviews, confirm the operator will be on-site for the full hire duration, and make sure unlimited prints are included — some suppliers charge per print, which adds up quickly." },
              ].map((step) => (
                <li key={step.n} className="flex gap-4 border-b border-white/5 pb-4">
                  <span className="text-yellow-400 font-bold text-lg shrink-0">{step.n}</span>
                  <div><p className="font-semibold text-white mb-1">{step.t}</p><p className="text-gray-400 text-sm">{step.d}</p></div>
                </li>
              ))}
            </ol>
            <p className="text-gray-300 leading-relaxed mb-6">
              For a full breakdown of what affects photo booth hire costs in the UK, read our guide: <Link href="/blog/photo-booth-hire-cost-uk" className="text-yellow-400 hover:text-yellow-300 underline">How Much Does Photo Booth Hire Cost in the UK?</Link>
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">Birthday Party Photo Booth FAQs</h2>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-yellow-400">Can you hire a photo booth for a kids&apos; birthday party?</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Absolutely. Our Selfie Pod and Glam Vintage booths are fantastic for children&apos;s birthday parties. Props are lightweight and child-safe, the touchscreen interface is simple enough for a five-year-old, and kids love seeing their photos print in seconds. We recommend the Selfie Pod for younger children (under 10) and the Glam Vintage for older kids and tweens. Our operators are experienced working with children and keep the experience fun and safe throughout.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-yellow-400">How much space do you need for a photo booth at a home party?</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              The Selfie Pod and Glam Vintage booths each need a footprint of roughly 2m × 2m — about the size of a large dining table. The 360° Slow Motion booth needs a 3m × 3m clear area. You&apos;ll also need a standard 13A UK socket within 5 metres. Most living rooms, garages, and gardens can comfortably accommodate the Selfie Pod or Glam Vintage. If you&apos;re unsure, drop us a message and we&apos;ll help you figure out the best fit.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-yellow-400">Can we hire a photo booth for just 2 hours?</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Yes — we offer flexible hire durations including 2-hour packages, which are perfect for shorter children&apos;s parties or a concentrated burst of fun during the peak party hours. The booth is fully set up before your guests arrive and packed down discreetly at the end. Visit our <Link href="/pricing" className="text-yellow-400 hover:text-yellow-300 underline">pricing page</Link> to see the full range of hire durations.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-yellow-400">Are photo booth props suitable for all ages?</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Our standard prop pack includes hats, oversized glasses, moustaches, signs, and feather boas — all suitable for guests of any age from 4 to 94. They&apos;re lightweight, clean, and completely age-appropriate. We also offer themed prop packs (personalised to your party theme) — just let us know what you have in mind when you book and we&apos;ll advise on what&apos;s available.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2 text-yellow-400">How far in advance should I book a birthday photo booth?</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              We recommend booking at least 4–8 weeks ahead for a standard birthday party, and 3–6 months in advance for milestone birthdays (18th, 21st, 30th, 40th, 50th) that fall on a Saturday in peak months (May–September, December). Popular dates fill quickly — and a 15% deposit is all it takes to secure your slot and give you complete peace of mind.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4 text-white">Covering Essex, Kent &amp; London Birthdays</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              FunLoading360 is based in South Woodham Ferrers, Essex, and covers birthday parties across Chelmsford, Colchester, Basildon, Southend-on-Sea, Brentwood, Romford, and the wider Essex area — all with free delivery and setup within 25 miles. We also cover events in Greater London and Kent with a small travel supplement.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Whether it&apos;s a children&apos;s party in a village hall, an 18th at a hired venue in Chelmsford, or a 60th in a back garden in Romford — we&apos;ll get there, set up professionally, and make sure your guests have the time of their lives. <Link href="/book" className="text-yellow-400 hover:text-yellow-300 underline">Check availability for your date</Link> or <Link href="/pricing" className="text-yellow-400 hover:text-yellow-300 underline">browse our packages and pricing</Link> to get started.
            </p>

          </article>

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 border border-yellow-400/20 rounded-2xl p-8 text-center">
            <p className="text-yellow-400 text-sm font-bold uppercase tracking-widest mb-3">Ready to Make It Memorable?</p>
            <h2 className="text-2xl font-bold mb-3">Book a Birthday Photo Booth Today</h2>
            <p className="text-gray-400 mb-6">Props included · Unlimited prints · 15% deposit to confirm</p>
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

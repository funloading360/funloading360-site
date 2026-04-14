import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | FunLoading360 Photo Booth Hire",
  description: "Everything you need to know about hiring a photo booth from FunLoading360. Answers about booking, pricing, setup, and cancellation.",
  openGraph: {
    title: "FAQ | FunLoading360",
    description: "Common questions about our photo booth hire service.",
    url: "https://www.funloading360.co.uk/faq",
    images: [{ url: "https://www.funloading360.co.uk/og-image.jpg", width: 1200, height: 630 }],
  },
};

const faqs = [
  // BOOKING
  { category: "Booking", q: "How do I book a photo booth?", a: "You can book directly on our website using our online booking system. Select your booth, choose your date and package, add any extras, and pay a 15% deposit to secure your booking. We'll confirm within 24 hours." },
  { category: "Booking", q: "How far in advance should I book?", a: "We recommend booking at least 4–6 weeks in advance, especially for weekend dates. For weddings, we suggest booking 3–6 months ahead as Saturdays book up quickly." },
  { category: "Booking", q: "Can I change my booking date?", a: "Yes, you can change your date subject to availability at no extra charge, provided you give us at least 14 days' notice." },
  { category: "Booking", q: "Do you require a deposit?", a: "Yes, we require a 15% deposit to confirm your booking. The remaining balance is due 14 days before your event. We accept all major credit and debit cards via our secure Stripe payment system." },
  // PRICING
  { category: "Pricing", q: "What's included in the price?", a: "All packages include: professional operator, unlimited sessions during your hire period, digital sharing via QR code, custom photo overlays, themed props, and next-day gallery delivery. Printing is included with Glam Vintage packages." },
  { category: "Pricing", q: "Are there any hidden charges?", a: "No hidden charges. Travel is free within 25 miles of South Woodham Ferrers, Essex. For events further afield, we charge £1.50 per mile, and London events have a £50 supplement. These are shown upfront during booking." },
  { category: "Pricing", q: "Do you charge extra for setup and breakdown?", a: "No — setup and breakdown time is not charged. We typically arrive 60 minutes before your start time to set up, and collect the equipment at the end of your hire period." },
  { category: "Pricing", q: "Can I pay in instalments?", a: "Currently we require a 15% deposit upfront and the remaining 85% at least 14 days before your event. We're happy to discuss flexible payment plans for larger corporate bookings — contact us to discuss." },
  // ON THE DAY
  { category: "On the Day", q: "How long does setup take?", a: "We typically need 60 minutes to set up. Our operator will arrive before your event start time to ensure the booth is ready when your guests arrive." },
  { category: "On the Day", q: "How much space do the booths need?", a: "The 360° booth needs approximately 3m × 3m. The Glam Vintage and Selfie Pod need approximately 2m × 2m. We also need access to a standard UK power socket (13A)." },
  { category: "On the Day", q: "Do you provide an operator?", a: "Yes, all our bookings include a professional, friendly operator who will guide your guests, manage the booth, and ensure everything runs smoothly throughout the event." },
  { category: "On the Day", q: "When do guests receive their photos?", a: "Guests can instantly share their photos digitally via QR code. Printed photos (Glam Vintage package) are produced on-site immediately. A full digital gallery is delivered the next day via a private link." },
  // CANCELLATION
  { category: "Cancellation", q: "What is your cancellation policy?", a: "Cancel 90+ days before: full deposit refund. Cancel 30–90 days before: 50% of deposit refunded. Cancel less than 30 days before: deposit is non-refundable. Cancel less than 7 days before: deposit forfeited plus 25% of remaining balance." },
  { category: "Cancellation", q: "What happens if you have to cancel?", a: "In the unlikely event we need to cancel (e.g., due to equipment failure or operator emergency), we will give you as much notice as possible and provide a full refund, including the deposit. We'll also try our best to find you an alternative provider." },
  { category: "Cancellation", q: "Is my deposit refundable?", a: "Yes — if you cancel 90 or more days before your event, your deposit is fully refunded. We believe in fair, transparent booking policies so you can book with complete confidence." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
};

const categories = ["Booking", "Pricing", "On the Day", "Cancellation"];

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="min-h-screen bg-[#08080d] text-white">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold tracking-widest text-yellow-400 uppercase mb-4">Support</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-400 text-lg">Everything you need to know about hiring a photo booth.</p>
          </div>

          {categories.map(cat => (
            <div key={cat} className="mb-10">
              <h2 className="text-yellow-400 font-bold text-sm uppercase tracking-widest mb-4">{cat}</h2>
              <div className="space-y-4">
                {faqs.filter(f => f.category === cat).map((faq, i) => (
                  <details key={i} className="group border border-white/10 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-white hover:text-yellow-400 transition-colors list-none">
                      {faq.q}
                      <span className="ml-4 text-gray-500 group-open:rotate-180 transition-transform">&#9660;</span>
                    </summary>
                    <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12 text-center bg-white/5 rounded-2xl p-8 border border-white/10">
            <p className="text-lg font-semibold mb-2">Still have questions?</p>
            <p className="text-gray-400 mb-4">We&apos;re happy to help — get in touch.</p>
            <a href="/book" className="inline-block bg-yellow-400 text-black font-bold px-8 py-3 rounded-xl hover:bg-yellow-300 transition-colors">
              Book Now
            </a>
            <a href="tel:+447482112110" className="inline-block ml-3 border border-white/20 text-white px-8 py-3 rounded-xl hover:border-white/40 transition-colors">
              Call Us
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

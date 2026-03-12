import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — FunLoading360",
  description:
    "Terms and conditions for FunLoading360 photo booth hire services. UK Consumer Rights Act 2015 compliant.",
  openGraph: {
    title: "Terms & Conditions — FunLoading360",
    description: "Terms and conditions for FunLoading360 photo booth hire services.",
    url: "https://www.funloading360.co.uk/terms",
    images: [{ url: "https://www.funloading360.co.uk/og-image.jpg", width: 1200, height: 630, alt: "FunLoading360 photo booth hire" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.funloading360.co.uk/og-image.jpg"],
  },
  alternates: { canonical: "https://www.funloading360.co.uk/terms" },
};

const sections = [
  {
    id: "booking-confirmation",
    title: "1. Booking & Confirmation",
    content: (
      <>
        <p>
          A booking is confirmed once we have received your completed booking
          form and a non-refundable deposit of{" "}
          <strong className="text-white">30% of the total booking value</strong>
          . Until the deposit is received and a confirmation email has been
          issued by us, no date is held or guaranteed.
        </p>
        <ul className="mt-3 space-y-2 list-none">
          {[
            "The remaining balance (70%) is due no later than 14 days before your event date.",
            "Payment reminders will be sent automatically. Failure to pay the balance by the due date may result in cancellation of your booking without refund of the deposit.",
            "All prices are stated in GBP and include VAT where applicable.",
            "Bookings are personal to the client and cannot be transferred to a third party without our written consent.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f5a623] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "cancellation-policy",
    title: "2. Cancellation Policy",
    content: (
      <>
        <p>
          We understand that plans can change. Our cancellation policy is as
          follows, calculated from the date of written cancellation to the event
          date:
        </p>
        <div className="mt-4 space-y-3">
          {[
            {
              period: "More than 90 days before event",
              outcome: "Deposit refunded in full",
              color: "border-emerald-400/30 bg-emerald-400/5",
              badge: "bg-emerald-400/10 text-emerald-400",
            },
            {
              period: "30 to 90 days before event",
              outcome: "50% of deposit refunded",
              color: "border-amber-400/30 bg-amber-400/5",
              badge: "bg-amber-400/10 text-amber-400",
            },
            {
              period: "Less than 30 days before event",
              outcome: "Deposit lost in full",
              color: "border-orange-400/30 bg-orange-400/5",
              badge: "bg-orange-400/10 text-orange-400",
            },
            {
              period: "Less than 7 days before event",
              outcome: "Deposit lost + 25% of remaining balance due",
              color: "border-red-400/30 bg-red-400/5",
              badge: "bg-red-400/10 text-red-400",
            },
          ].map((row) => (
            <div
              key={row.period}
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 rounded-xl border ${row.color}`}
            >
              <span className="text-gray-300 text-sm font-medium">
                {row.period}
              </span>
              <span
                className={`inline-flex text-xs font-semibold px-3 py-1 rounded-full ${row.badge} self-start sm:self-auto flex-shrink-0`}
              >
                {row.outcome}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4">
          Cancellations must be submitted in writing by email to{" "}
          <a
            href="mailto:hello@funloading360.co.uk"
            className="text-[#f5a623] hover:underline"
          >
            hello@funloading360.co.uk
          </a>
          . The cancellation date is the date on which we receive your written
          notice. Verbal cancellations are not accepted.
        </p>
        <p className="mt-3">
          We reserve the right to cancel a booking where the balance has not
          been received by the due date, or where we have reason to believe the
          event details provided are materially inaccurate. In the event of
          cancellation by us (other than for force majeure), a full refund of
          all sums paid will be issued.
        </p>
      </>
    ),
  },
  {
    id: "whats-included",
    title: "3. What's Included",
    content: (
      <>
        <p>
          Unless otherwise stated in your booking confirmation, all packages
          include:
        </p>
        <ul className="mt-3 space-y-2 list-none">
          {[
            "Delivery, setup and installation of the photo booth at your venue",
            "A qualified, friendly booth attendant present throughout the hire period",
            "Full operation of the booth for the duration specified in your package",
            "Dismantling and collection of equipment at the end of your hire period",
            "All equipment required to operate the booth (camera, lighting, printer where applicable)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f5a623] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          The hire period begins when the booth is declared open by our
          attendant, not from our arrival time. We typically arrive 60–90
          minutes before the agreed start time to complete setup, at no
          additional charge.
        </p>
      </>
    ),
  },
  {
    id: "travel",
    title: "4. Travel",
    content: (
      <>
        <p>
          Travel to and from your venue is charged as follows, calculated from
          our base in <strong className="text-white">Chelmsford, Essex</strong>:
        </p>
        <ul className="mt-3 space-y-2 list-none">
          {[
            "Travel within 25 miles of Chelmsford: free of charge.",
            "Travel beyond 25 miles: charged at £1.50 per mile (both directions).",
            "Events in Greater London: a flat London supplement of £50 applies, in addition to any applicable mileage.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f5a623] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          Any travel costs will be clearly stated in your quote and booking
          confirmation before you are asked to make any payment. We do not add
          travel charges after a booking has been confirmed without your written
          agreement.
        </p>
      </>
    ),
  },
  {
    id: "equipment",
    title: "5. Equipment",
    content: (
      <>
        <p>
          We maintain all equipment to a high standard and carry out checks
          before every event. Where possible, we will contact you{" "}
          <strong className="text-white">24 hours before your event</strong> to
          confirm logistics and equipment readiness.
        </p>
        <ul className="mt-3 space-y-2 list-none">
          {[
            "In the unlikely event that a piece of equipment fails during your event, our attendant will attempt to resolve the issue promptly. Where the booth cannot be restored to operation, a pro-rata refund for the lost hire time will be issued.",
            "The client is responsible for ensuring the venue provides adequate space, power supply (standard 13-amp UK socket) and access as agreed in advance.",
            "We accept no responsibility for delays or inability to operate caused by venue restrictions, lack of power, insufficient space, or failure of the client to provide agreed access.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f5a623] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 p-4 rounded-xl bg-[#f5a623]/5 border border-[#f5a623]/15">
          <strong className="text-[#f5a623]">Force Majeure:</strong>{" "}
          <span>
            Neither party shall be liable for failure to perform their
            obligations under these terms where such failure results from
            circumstances beyond their reasonable control, including but not
            limited to: severe weather, fire, flood, pandemic, government
            restriction, or failure of third-party infrastructure. In such
            cases, we will offer a date transfer at no extra charge or, where a
            transfer is not possible, a full refund.
          </span>
        </p>
      </>
    ),
  },
  {
    id: "photos-content",
    title: "6. Photos & Content",
    content: (
      <>
        <p>
          A digital gallery containing all photos and videos captured during
          your event will be delivered to you within{" "}
          <strong className="text-white">48 hours</strong> of the event
          concluding.
        </p>
        <ul className="mt-3 space-y-2 list-none">
          {[
            "All digital content remains accessible via your online gallery link for the period specified in your package.",
            "We may use photographs and video content captured at your event for our marketing purposes, including on our website and social media channels.",
            "If you would prefer that your content is not used for marketing purposes, please notify us in writing at any time and we will remove it promptly. This opt-out does not affect your booking.",
            "You grant us a non-exclusive, royalty-free licence to use content for marketing purposes unless an opt-out is received.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f5a623] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "liability",
    title: "7. Liability",
    content: (
      <>
        <p>
          Our total liability to you arising out of or in connection with your
          booking shall not exceed the total value of your booking.
        </p>
        <ul className="mt-3 space-y-2 list-none">
          {[
            "We are not liable for any indirect, consequential or special losses arising from or related to your booking.",
            "Nothing in these terms limits or excludes our liability for death or personal injury caused by our negligence, fraud, or any other matter that cannot be limited by law.",
            "We hold Public Liability Insurance to a minimum of £5,000,000 (five million pounds). A copy of our insurance certificate is available upon request.",
            "You are responsible for the conduct of your guests in relation to our equipment. Damage to equipment caused by guests will be charged at the cost of repair or replacement.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f5a623] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          These terms do not affect your statutory rights as a consumer under
          the Consumer Rights Act 2015.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "8. Governing Law",
    content: (
      <>
        <p>
          These Terms &amp; Conditions are governed by and construed in
          accordance with the laws of{" "}
          <strong className="text-white">England and Wales</strong>.
        </p>
        <p className="mt-3">
          Any dispute arising from or in connection with these terms that cannot
          be resolved by mutual agreement shall be subject to the exclusive
          jurisdiction of the courts of Essex, England.
        </p>
        <p className="mt-3">
          If you have a complaint, please contact us in the first instance at{" "}
          <a
            href="mailto:hello@funloading360.co.uk"
            className="text-[#f5a623] hover:underline"
          >
            hello@funloading360.co.uk
          </a>
          . We aim to resolve all complaints within 5 working days.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="bg-[#0a0a0e] text-white pt-20">
      {/* Header */}
      <section className="py-16 lg:py-20 text-center border-b border-[#1a1a28]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#f5a623] text-xs font-semibold uppercase tracking-widest mb-4">
            Legal
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Terms &amp; Conditions
          </h1>
          <p className="text-gray-500 text-sm">
            Last updated: <span className="text-gray-400">March 2026</span>
          </p>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed max-w-xl mx-auto">
            Please read these terms carefully before making a booking. By
            confirming a booking with us you agree to be bound by these terms
            and conditions.
          </p>
        </div>
      </section>

      {/* Table of contents */}
      <section className="pt-12 pb-2">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-5 rounded-2xl bg-[#13131a] border border-[#2a2a3a]">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
              Contents
            </p>
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-gray-400 text-sm hover:text-[#f5a623] transition-colors duration-200 py-1"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="scroll-mt-28"
              >
                <h2
                  className="text-xl sm:text-2xl font-bold text-white mb-4 pb-3 border-b border-[#1e1e2e]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {section.title}
                </h2>
                <div className="text-gray-400 text-sm leading-relaxed space-y-2">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-16 pt-8 border-t border-[#1e1e2e]">
            <p className="text-gray-500 text-xs leading-relaxed text-center">
              These terms &amp; conditions were last reviewed in March 2026 and
              are governed by English law. FunLoading360 reserves the right to update
              these terms at any time. The version published on this page at the
              time of your booking applies to your contract with us.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

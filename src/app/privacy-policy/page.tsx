import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — FunLoading360",
  description:
    "How FunLoading360 collects, uses and protects your personal data. UK GDPR compliant.",
  openGraph: {
    title: "Privacy Policy — FunLoading360",
    description: "How FunLoading360 collects, uses and protects your personal data.",
    url: "https://www.funloading360.co.uk/privacy-policy",
    images: [{ url: "https://www.funloading360.co.uk/og-image.jpg", width: 1200, height: 630, alt: "FunLoading360 photo booth hire" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.funloading360.co.uk/og-image.jpg"],
  },
  alternates: { canonical: "https://www.funloading360.co.uk/privacy-policy" },
};

const sections = [
  {
    id: "who-we-are",
    title: "1. Who We Are",
    content: (
      <>
        <p>
          FunLoading360 is a photo booth hire business based in Essex, United Kingdom.
          We provide premium photo booth hire services across Essex, Kent and
          London.
        </p>
        <p className="mt-3">
          <strong className="text-white">Contact:</strong>{" "}
          <a
            href="mailto:FunLoading360@gmail.com"
            className="text-gold hover:underline"
          >
            FunLoading360@gmail.com
          </a>
        </p>
        <p className="mt-3">
          We are the data controller for the personal information we collect
          about you. This policy explains how we handle that information in
          accordance with the UK General Data Protection Regulation (UK GDPR)
          and the Data Protection Act 2018.
        </p>
      </>
    ),
  },
  {
    id: "data-we-collect",
    title: "2. What Data We Collect",
    content: (
      <>
        <p>We collect the following categories of personal data:</p>
        <ul className="mt-3 space-y-2 list-none">
          {[
            "Full name",
            "Email address",
            "Phone number",
            "Event details (date, venue, location, event type)",
            "Billing information (processed securely via our payment provider)",
            "Communications you send to us",
            "Analytics data collected via Google Analytics (anonymised usage data, browser type, pages visited)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          We only collect data that is necessary for the purposes set out in
          this policy. We do not collect sensitive personal data (such as health
          information or financial details beyond what is required to process
          your booking).
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Data",
    content: (
      <>
        <p>We use your personal data for the following purposes:</p>
        <ul className="mt-3 space-y-2 list-none">
          {[
            {
              purpose: "Processing bookings",
              detail:
                "To confirm your booking, issue invoices and manage payments.",
            },
            {
              purpose: "Sending confirmations",
              detail:
                "To send booking confirmations, deposit invoices and event reminders.",
            },
            {
              purpose: "Customer service",
              detail:
                "To respond to your enquiries and resolve any issues with your booking.",
            },
            {
              purpose: "Service improvement",
              detail:
                "To analyse how our website is used in order to improve it (via anonymised analytics).",
            },
            {
              purpose: "Legal compliance",
              detail:
                "To comply with our legal and financial obligations, including tax record-keeping.",
            },
          ].map((item) => (
            <li key={item.purpose} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              <span>
                <strong className="text-white">{item.purpose}:</strong>{" "}
                {item.detail}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          Our lawful basis for processing your data is:
          <strong className="text-white"> contract performance</strong> (to
          fulfil your booking),{" "}
          <strong className="text-white">legitimate interests</strong> (to
          improve our services), and{" "}
          <strong className="text-white">legal obligation</strong> (for
          financial records).
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "4. Data Retention",
    content: (
      <>
        <p>We retain your personal data only for as long as necessary:</p>
        <ul className="mt-3 space-y-2 list-none">
          {[
            "Booking and financial records are retained for 3 years to meet our tax and accounting obligations (HMRC requirement).",
            "Enquiries that did not result in a booking are deleted after 12 months.",
            "Marketing communications opt-ins are retained until you withdraw consent.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          After these periods, your data will be securely deleted or
          anonymised.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "5. Your Rights",
    content: (
      <>
        <p>
          Under UK GDPR, you have the following rights in relation to your
          personal data:
        </p>
        <ul className="mt-3 space-y-2 list-none">
          {[
            {
              right: "Right of access",
              detail:
                "You can request a copy of the personal data we hold about you.",
            },
            {
              right: "Right to rectification",
              detail:
                "You can ask us to correct any inaccurate data we hold about you.",
            },
            {
              right: "Right to erasure",
              detail:
                'You can ask us to delete your data, subject to legal retention requirements ("right to be forgotten").',
            },
            {
              right: "Right to restrict processing",
              detail:
                "You can ask us to pause processing your data in certain circumstances.",
            },
            {
              right: "Right to data portability",
              detail:
                "You can request your data in a portable, machine-readable format.",
            },
            {
              right: "Right to object",
              detail:
                "You can object to processing based on legitimate interests.",
            },
          ].map((item) => (
            <li key={item.right} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              <span>
                <strong className="text-white">{item.right}:</strong>{" "}
                {item.detail}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          To exercise any of these rights, please contact us at{" "}
          <a
            href="mailto:FunLoading360@gmail.com"
            className="text-gold hover:underline"
          >
            FunLoading360@gmail.com
          </a>
          . We will respond within 30 days. You also have the right to lodge a
          complaint with the Information Commissioner&apos;s Office (ICO) at{" "}
          <a
            href="https://ico.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            ico.org.uk
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "6. Cookies",
    content: (
      <>
        <p>We use the following types of cookies on our website:</p>
        <ul className="mt-3 space-y-2 list-none">
          {[
            {
              type: "Essential cookies",
              detail:
                "Required for the website to function properly. These cannot be disabled.",
            },
            {
              type: "Analytics cookies (Google Analytics)",
              detail:
                "We use Google Analytics to understand how visitors use our website. This data is anonymised and does not identify individual users. You can opt out of analytics tracking at any time by adjusting your browser settings or using the Google Analytics opt-out browser add-on.",
            },
          ].map((item) => (
            <li key={item.type} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              <span>
                <strong className="text-white">{item.type}:</strong>{" "}
                {item.detail}
              </span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "7. Third Parties",
    content: (
      <>
        <p>
          We use a small number of trusted third-party services to run our
          business. Each operates under its own privacy policy and complies with
          applicable data protection law:
        </p>
        <ul className="mt-3 space-y-2 list-none">
          {[
            {
              name: "Resend",
              use: "Transactional email delivery (booking confirmations, invoices).",
            },
            {
              name: "Google Analytics",
              use: "Website analytics (anonymised data only).",
            },
          ].map((item) => (
            <li key={item.name} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              <span>
                <strong className="text-white">{item.name}:</strong> {item.use}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          We do not sell your personal data to any third party, and we do not
          share your data with third parties for their own marketing purposes.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "8. Contact",
    content: (
      <>
        <p>
          If you have any questions about this privacy policy or how we handle
          your personal data, please contact us:
        </p>
        <div className="mt-4 p-5 rounded-2xl bg-[#0d0d16] border border-border">
          <p className="text-white font-semibold mb-1">FunLoading360</p>
          <p className="text-gray-400 text-sm">Based in Essex, UK</p>
          <a
            href="mailto:FunLoading360@gmail.com"
            className="text-gold text-sm hover:underline mt-2 inline-block"
          >
            FunLoading360@gmail.com
          </a>
        </div>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background text-white pt-20">
      {/* Header */}
      <section className="py-16 lg:py-20 text-center border-b border-[#1a1a28]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">
            Legal
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm">
            Last updated:{" "}
            <span className="text-gray-400">March 2026</span>
          </p>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed max-w-xl mx-auto">
            We take your privacy seriously. This policy explains what data we
            collect, how we use it, and your rights under UK GDPR.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20">
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
              This privacy policy was last reviewed in March 2026. We may update
              this policy from time to time. When we do, we will update the
              &ldquo;last updated&rdquo; date at the top of this page.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

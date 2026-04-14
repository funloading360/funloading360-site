import type { Metadata } from "next";
import ServiceGridContent from "./ServiceGridContent";

export const metadata: Metadata = {
  title: "Photo Booth Hire | Choose Your Experience | FunLoading360",
  description:
    "Explore our 360° Slow Motion, Glam Vintage, and Selfie Pod photo booth experiences. Transparent pricing, no hidden fees. Covering Essex, Kent & London.",
  openGraph: {
    title: "Photo Booth Hire | Choose Your Experience | FunLoading360",
    description:
      "360° slow-motion, glam vintage prints, and selfie pod — find the perfect photo booth experience for your event. From £200.",
    url: "https://www.funloading360.co.uk/pricing",
    images: [{ url: "https://www.funloading360.co.uk/og-image.jpg", width: 1200, height: 630, alt: "FunLoading360 photo booth hire — 360, glam vintage & selfie pod booths" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.funloading360.co.uk/og-image.jpg"],
  },
  alternates: { canonical: "https://www.funloading360.co.uk/pricing" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What areas do you cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We cover Essex (including Chelmsford, Colchester, Southend-on-Sea, Romford and Basildon), Kent (including Maidstone, Canterbury, Tunbridge Wells and Dartford) and London (including East London, City of London and Canary Wharf). Travel within 25 miles of Chelmsford is free. Additional mileage is charged at £1.50 per mile.",
      },
    },
    {
      "@type": "Question",
      name: "How long does setup take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We typically arrive 60–90 minutes before your event begins for setup, and our team stays for the duration. Setup and dismantling are always included in the price — you only pay for the time the booth is running.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to pay a deposit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we require a 20% deposit to secure your booking, with the remaining balance due 14 days before your event. All payments are processed securely online.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if I need to cancel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We understand that plans can change. Cancellations made more than 90 days before your event receive a full deposit refund. Between 30–90 days, 50% of your deposit is retained. Within 30 days, the full deposit is retained. Cancellations within 7 days also incur 25% of the remaining balance. Please see our Terms & Conditions for full details.",
      },
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ServiceGridContent />
    </>
  );
}

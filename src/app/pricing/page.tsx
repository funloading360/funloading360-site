import type { Metadata } from "next";
import ServiceGridContent from "./ServiceGridContent";

export const metadata: Metadata = {
  title: "Photo Booth Hire Prices UK — 360° from £280, Glam £300 | FunLoading360",
  description:
    "Photo booth hire prices from £280 for 2h. 360° slow-motion, glam vintage with unlimited prints, selfie pods. Transparent UK pricing — no hidden fees. Essex, Kent, London.",
  keywords: [
    "photo booth hire prices",
    "photo booth hire cost uk",
    "360 photo booth hire prices",
    "wedding photo booth hire cost",
    "glam photo booth price",
    "selfie pod hire cost",
  ],
  openGraph: {
    title: "Photo Booth Hire Prices UK — 360° from £280 | FunLoading360",
    description:
      "Transparent photo booth hire pricing: 360° from £280, glam vintage from £300, selfie pod from £260. Essex, Kent, London.",
    url: "https://www.funloading360.co.uk/pricing",
    images: [
      {
        url: "https://www.funloading360.co.uk/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FunLoading360 photo booth hire prices — 360, glam vintage & selfie pod booths",
      },
    ],
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

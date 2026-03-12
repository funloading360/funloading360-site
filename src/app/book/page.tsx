import type { Metadata } from "next";
import BookingFlow from "./BookingFlow";

export const metadata: Metadata = {
  title: "Book Your Photo Booth | FunLoading360",
  description:
    "Book your photo booth hire across Essex, Kent or London. Choose from 360 slow motion, glam vintage or selfie pod packages from £299. We confirm within 2 hours.",
  openGraph: {
    title: "Book Your Photo Booth | FunLoading360",
    description:
      "Select your package and submit your date. We confirm availability within 2 hours — no payment until confirmed.",
    url: "https://www.funloading360.co.uk/book",
    images: [{ url: "https://www.funloading360.co.uk/og-image.jpg", width: 1200, height: 630, alt: "FunLoading360 photo booth hire — 360, glam vintage & selfie pod booths" }],
  },

  twitter: {
    card: "summary_large_image",
    images: ["https://www.funloading360.co.uk/og-image.jpg"],
  },
  alternates: { canonical: "https://www.funloading360.co.uk/book" },
  robots: { index: true, follow: true },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I book a photo booth?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply select your preferred package (Essential, Signature or Luxury), choose your event date, provide your contact details, and submit the form. We'll confirm availability within 2 hours via email. No payment is required until we confirm your booking.",
      },
    },
    {
      "@type": "Question",
      name: "Can I choose a different date if my preferred date is unavailable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can provide an alternative date when booking. We'll check both dates and confirm whichever is available, or suggest other options if neither works.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between the three packages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Essential (£299) includes 2 hours, standard props and instant sharing. Signature (£549) includes 4 hours, premium props, branded prints and a guest list. Luxury (£899) includes 6 hours, unlimited props, professional prints, branded packaging and a dedicated attendant.",
      },
    },
    {
      "@type": "Question",
      name: "When will I receive confirmation of my booking?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We aim to confirm all bookings within 2 hours during business hours. You'll receive an email confirmation with the full details, terms and next steps for payment. A 30% deposit secures your date, with final payment due 14 days before the event.",
      },
    },
  ],
};

export default function BookPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BookingFlow />
    </>
  );
}

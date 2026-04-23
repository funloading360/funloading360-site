import type { Metadata } from "next";
import CorporateContent from "./CorporateContent";

export const metadata: Metadata = {
  title: "Corporate Photo Booth Hire London & Essex | Branded from £549 | FunLoading360",
  description:
    "Corporate photo booth hire with branded overlays, GDPR data capture & same-day analytics. Half-day £549, full-day £899. Product launches, brand activations, Christmas parties.",
  keywords: [
    "corporate photo booth hire",
    "corporate photo booth hire london",
    "branded photo booth hire",
    "brand activation photo booth",
    "product launch photo booth",
    "christmas party photo booth",
    "corporate event photo booth",
  ],
  openGraph: {
    title: "Corporate Photo Booth Hire London & Essex — Branded from £549 | FunLoading360",
    description:
      "Premium branded corporate photo booth hire for product launches, brand activations, Christmas parties and team events. GDPR data capture, same-day analytics.",
    url: "https://www.funloading360.co.uk/corporate",
    images: [
      {
        url: "https://www.funloading360.co.uk/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FunLoading360 corporate photo booth hire — branded brand activation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.funloading360.co.uk/og-image.jpg"],
  },
  alternates: { canonical: "https://www.funloading360.co.uk/corporate" },
};

export default function CorporatePage() {
  return <CorporateContent />;
}

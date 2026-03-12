import type { Metadata } from "next";
import CorporateContent from "./CorporateContent";

export const metadata: Metadata = {
  title: "Corporate Photo Booth Hire Essex & London | FunLoading360",
  description:
    "Branded corporate photo booth hire for events across Essex, Kent and London. Custom brand overlays, instant digital sharing and same-day analytics. Perfect for product launches, Christmas parties and team events.",
  openGraph: {
    title: "Corporate Photo Booth Hire | FunLoading360",
    description:
      "Custom branded photo booths for corporate events across Essex, Kent & London. Brand overlays, data capture and professional booth operators.",
    url: "https://www.funloading360.co.uk/corporate",
    images: [{ url: "https://www.funloading360.co.uk/og-image.jpg", width: 1200, height: 630, alt: "FunLoading360 photo booth hire — 360, glam vintage & selfie pod booths" }],
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

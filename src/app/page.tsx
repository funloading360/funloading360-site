import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Photo Booth Hire Essex, Kent & London | FunLoading360",
  description:
    "Premium photo booth hire across Essex, Kent & London — 360 slow motion, glam vintage & selfie pods. Free setup, instant digital sharing. Packages from £229. Confirm within 2 hours.",
  openGraph: {
    title: "Photo Booth Hire Essex, Kent & London | FunLoading360",
    description:
      "360 slow motion, glam vintage & selfie pod booths for weddings, parties and corporate events. Free setup across Essex, Kent & London.",
    url: "https://www.funloading360.co.uk",
    images: [{ url: "https://www.funloading360.co.uk/og-image.jpg", width: 1200, height: 630, alt: "FunLoading360 photo booth hire — 360, glam vintage & selfie pod booths" }],
  },

  twitter: {
    card: "summary_large_image",
    images: ["https://www.funloading360.co.uk/og-image.jpg"],
  },
  alternates: { canonical: "https://www.funloading360.co.uk" },
};

export default function HomePage() {
  return <HomeContent />;
}

import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Photo Booth Hire Essex, Kent & London | 360° from £280 | FunLoading360",
  description:
    "360° slow-motion, glam vintage & selfie pod photo booth hire from £280. Weddings, corporate & parties across Essex, Kent & London. Free delivery 25 miles. 4.9★ from 48+ reviews.",
  openGraph: {
    title: "Photo Booth Hire Essex, Kent & London — 360° from £280 | FunLoading360",
    description:
      "Premium 360°, glam vintage & selfie pod photo booth hire for weddings, corporate events & parties across Essex, Kent & London. Free delivery within 25 miles.",
    url: "https://www.funloading360.co.uk",
    images: [
      {
        url: "https://www.funloading360.co.uk/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FunLoading360 photo booth hire — 360, glam vintage & selfie pod booths",
      },
    ],
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

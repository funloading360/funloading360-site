import type { Metadata } from "next";
import GalleryContent from "./GalleryContent";

export const metadata: Metadata = {
  title: "Photo Booth Gallery — Weddings, Parties & Corporate | FunLoading360",
  description:
    "Browse our photo booth gallery — real events across Essex, Kent and London. Weddings, corporate parties, birthdays and proms captured by FunLoading360.",
  openGraph: {
    title: "Photo Booth Gallery | FunLoading360",
    description:
      "Real events, real moments. Browse our gallery of photo booth shots from weddings, corporate events and parties across Essex, Kent & London.",
    url: "https://www.funloading360.co.uk/gallery",
    images: [{ url: "https://www.funloading360.co.uk/og-image.jpg", width: 1200, height: 630, alt: "FunLoading360 photo booth hire — 360, glam vintage & selfie pod booths" }],
  },

  twitter: {
    card: "summary_large_image",
    images: ["https://www.funloading360.co.uk/og-image.jpg"],
  },
  alternates: { canonical: "https://www.funloading360.co.uk/gallery" },
};

export default function GalleryPage() {
  return <GalleryContent />;
}

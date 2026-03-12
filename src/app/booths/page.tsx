import type { Metadata } from "next";
import BoothsContent from "./BoothsContent";

export const metadata: Metadata = {
  title: "Our Photo Booths — 360, Glam Vintage & Selfie Pod | FunLoading360",
  description:
    "Explore FunLoading360's premium photo booths: 360 slow motion video booth, glam vintage photo booth and selfie pod. Available across Essex, Kent and London for weddings, parties and corporate events.",
  openGraph: {
    title: "Our Photo Booths — 360, Glam Vintage & Selfie Pod | FunLoading360",
    description:
      "Three premium photo booths for hire across Essex, Kent & London. 360 slow motion, glam vintage and selfie pod.",
    url: "https://www.funloading360.co.uk/booths",
    images: [{ url: "https://www.funloading360.co.uk/og-image.jpg", width: 1200, height: 630, alt: "FunLoading360 photo booth hire — 360, glam vintage & selfie pod booths" }],
  },

  twitter: {
    card: "summary_large_image",
    images: ["https://www.funloading360.co.uk/og-image.jpg"],
  },
  alternates: { canonical: "https://www.funloading360.co.uk/booths" },
};

export default function BoothsPage() {
  return <BoothsContent />;
}

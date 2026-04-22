import { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Photo Booth & Party Rentals — 360, Glam & Selfie Pod | FunLoading360",
  description:
    "Explore FunLoading360's premium photo booths: 360° slow motion video, Glam Vintage prints, and Selfie Pod. Three distinct experiences for weddings, parties and corporate events across Essex, Kent & London.",
  keywords: [
    "photo booth hire",
    "party rentals",
    "photo booth rental",
    "360 photo booth",
    "slow motion booth",
    "Essex photo booth",
    "London photo booth",
    "Kent photo booth",
  ],
  openGraph: {
    title: "Photo Booth & Party Rentals — 360, Glam & Selfie Pod | FunLoading360",
    description:
      "360° slow motion, Glam Vintage and Selfie Pod photo booths for weddings, parties and corporate events. Covering Essex, Kent & London.",
    type: "website",
    url: "https://www.funloading360.co.uk/services",
    images: [
      {
        url: "https://www.funloading360.co.uk/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FunLoading360 photo booth and party rental services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Booth & Party Rentals | FunLoading360",
    description: "360° slow motion, Glam Vintage and Selfie Pod photo booths for events across Essex, Kent & London.",
    images: ["https://www.funloading360.co.uk/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.funloading360.co.uk/services",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}

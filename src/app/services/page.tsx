import { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Photo Booth & Party Rentals — 360, Glam & Selfie Pod | FunLoading360",
  description:
    "Explore FunLoading360's premium photo booths & rentals: 360° slow motion video, Glam Vintage prints, and Selfie Pod. Browse packages and add to cart for weddings, parties, and corporate events in Essex, Kent & London.",
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
      "Premium photo booths and party rentals for your celebration. Browse, customize and book online.",
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
    description: "Browse professional photo booths and rentals online",
    images: ["https://www.funloading360.co.uk/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.funloading360.co.uk/services",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}

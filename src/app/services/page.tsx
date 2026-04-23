import { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "360° Photo Booth, Glam & Selfie Pod Hire UK — Services | FunLoading360",
  description:
    "Three premium photo booth types for UK events: 360° slow-motion video, glam vintage with unlimited prints, compact selfie pods. From £280. Essex, Kent & London.",
  keywords: [
    "360 photo booth hire uk",
    "glam vintage photo booth hire",
    "selfie pod hire",
    "photo booth types",
    "slow motion photo booth",
    "vintage photo booth hire",
    "modern photo booth rental",
  ],
  openGraph: {
    title: "360° Photo Booth, Glam & Selfie Pod Hire UK | FunLoading360",
    description:
      "Three premium booth types: 360° slow-motion, glam vintage with unlimited prints, compact selfie pod. From £280. Essex, Kent & London.",
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
    title: "Photo Booth Services — 360°, Glam & Selfie Pod | FunLoading360",
    description:
      "360° slow-motion, glam vintage, and selfie pod photo booth hire across Essex, Kent & London from £280.",
    images: ["https://www.funloading360.co.uk/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.funloading360.co.uk/services",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}

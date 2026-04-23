import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About FunLoading360 — UK Photo Booth Hire Since 2023 | Essex, Kent & London",
  description:
    "FunLoading360 is a UK photo booth hire company based in Chelmsford, Essex, trading since 2023. 4.9★ from 48+ reviews, £5M insured, PAT-tested, DBS-checked operators.",
  keywords: [
    "about funloading360",
    "uk photo booth company",
    "photo booth hire essex company",
    "funloading360 reviews",
    "dbs-checked photo booth operators",
  ],
  openGraph: {
    title: "About FunLoading360 — UK Photo Booth Hire Since 2023",
    description:
      "Founded 2023, based Chelmsford. 4.9★ from 48+ UK weddings, corporate events & parties. £5M insured, PAT-tested, DBS-checked operators.",
    url: "https://www.funloading360.co.uk/about",
    images: [
      {
        url: "https://www.funloading360.co.uk/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About FunLoading360 UK photo booth hire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.funloading360.co.uk/og-image.jpg"],
  },
  alternates: { canonical: "https://www.funloading360.co.uk/about" },
};

export default function AboutPage() {
  return <AboutContent />;
}

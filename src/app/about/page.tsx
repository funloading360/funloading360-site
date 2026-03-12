import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About FunLoading360 | Premium Photo Booth Hire",
  description:
    "Learn about FunLoading360's premium photo booth hire service. Three professional booth types, expert team, and transparent pricing across Essex, Kent & London.",
  openGraph: {
    title: "About FunLoading360 | Premium Photo Booth Hire",
    description:
      "Three professional photo booth types, expert service, and transparent pricing. Serving Essex, Kent & London.",
    url: "https://www.funloading360.co.uk/about",
    images: [{ url: "https://www.funloading360.co.uk/og-image.jpg", width: 1200, height: 630, alt: "FunLoading360 photo booth hire" }],
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

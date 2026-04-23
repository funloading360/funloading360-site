import type { Metadata } from "next";
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildServiceSchema,
} from "@/lib/structured-data";
import { weddingFAQs, weddingPackages, weddingHero } from "@/lib/weddings";
import WeddingsContent from "./WeddingsContent";

const SITE_URL = "https://www.funloading360.co.uk";
const CANONICAL = `${SITE_URL}/weddings`;

export const metadata: Metadata = {
  title: "Wedding Photo Booth Hire UK | 360°, Glam & Selfie Pods from £300 | FunLoading360",
  description:
    "Wedding photo booth hire across Essex, Kent & London. 360° slow-motion, glam vintage with unlimited prints, selfie pods from £300. Free delivery 25 miles, 4.9★ from 48+ couples. Book online today.",
  keywords: [
    "wedding photo booth hire",
    "wedding photo booth hire essex",
    "wedding photo booth hire london",
    "wedding photo booth hire kent",
    "360 photo booth hire wedding",
    "glam photo booth wedding",
    "wedding photo booth packages uk",
    "wedding photo booth prices",
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Wedding Photo Booth Hire UK — 360°, Glam & Selfie Pods from £300",
    description:
      "Premium wedding photo booth hire across Essex, Kent and London. 360 slow-motion, glam vintage, or selfie pod — packages from £300.",
    type: "website",
    locale: "en_GB",
    url: CANONICAL,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "FunLoading360 wedding photo booth hire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

export default function WeddingsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Weddings", url: CANONICAL },
  ]);

  const faqSchema = buildFAQSchema(weddingFAQs, 3);

  const serviceSchemas = weddingPackages.map((pkg) =>
    buildServiceSchema({
      name: pkg.name,
      description: pkg.description,
      url: CANONICAL,
      price: pkg.priceFrom,
      areaName: "Essex, Kent, London",
      duration: pkg.duration,
    })
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {serviceSchemas.map((s, i) => (
        <script
          key={`svc-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <WeddingsContent hero={weddingHero} packages={weddingPackages} faqs={weddingFAQs} />
    </>
  );
}

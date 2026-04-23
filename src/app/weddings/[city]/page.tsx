import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, getCityBySlug } from "@/lib/cities";
import { weddingFAQs, weddingPackages } from "@/lib/weddings";
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildLocalBusinessSchema,
  buildReviewListSchema,
  buildServiceSchema,
  type ReviewSchemaInput,
} from "@/lib/structured-data";
import { getTestimonialsByCity } from "@/lib/testimonials";
import WeddingCityContent from "./WeddingCityContent";

const SITE_URL = "https://www.funloading360.co.uk";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const canonical = `${SITE_URL}/weddings/${city.slug}`;

  return {
    title: `Wedding Photo Booth Hire ${city.name} — 360° & Glam Booths from £${city.priceFrom} | FunLoading360`,
    description: `Wedding photo booth hire in ${city.name}, covering ${city.postcodes.join(", ")}. 360° slow motion, glam vintage, or selfie pods from £${city.priceFrom}. ${city.travelNote}. 4.9★ from 48+ UK couples.`,
    keywords: [
      `wedding photo booth hire ${city.name.toLowerCase()}`,
      `${city.name.toLowerCase()} wedding photo booth`,
      `360 photo booth wedding ${city.name.toLowerCase()}`,
      `wedding photo booth hire ${city.county.toLowerCase()}`,
      "wedding photo booth hire",
      "wedding photo booth packages",
    ],
    alternates: { canonical },
    openGraph: {
      title: `Wedding Photo Booth Hire ${city.name} — from £${city.priceFrom}`,
      description: `Premium wedding photo booth hire in ${city.name}. 360 slow-motion, glam vintage, or selfie pod. ${city.travelNote}.`,
      type: "website",
      locale: "en_GB",
      url: canonical,
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `FunLoading360 wedding photo booth in ${city.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

export default async function WeddingCityPage({ params }: Props) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const canonical = `${SITE_URL}/weddings/${city.slug}`;

  const cityWeddingTestimonials = getTestimonialsByCity(city.slug).filter((t) =>
    ["Wedding", "Engagement Party", "Anniversary Party"].includes(t.eventType)
  );

  const localBusinessSchema = buildLocalBusinessSchema({
    city: { name: city.name, lat: city.lat, lng: city.lng, radiusKm: city.radiusKm },
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Weddings", url: `${SITE_URL}/weddings` },
    { name: city.name, url: canonical },
  ]);

  // Combine global wedding FAQs with city-specific wedding framing.
  const cityWeddingFAQs = [
    {
      question: `How much is wedding photo booth hire in ${city.name}?`,
      answer: `A 2-hour Selfie Pod wedding package in ${city.name} starts at £${city.priceFrom}. A 3-hour 360 Slow Motion booth starts at £${
        city.priceFrom + 80
      }. A 3-hour Glam Vintage with unlimited prints from £${city.priceFrom + 100}. ${city.travelNote}.`,
    },
    {
      question: `Do you deliver wedding photo booths to ${city.postcodes.join(", ")}?`,
      answer: `Yes — we cover all ${city.postcodes.length} ${city.name} postcodes (${city.postcodes.join(", ")}). ${city.travelNote}.`,
    },
    ...weddingFAQs,
  ];
  const faqSchema = buildFAQSchema(cityWeddingFAQs, 3);

  const serviceSchemas = weddingPackages.map((pkg) =>
    buildServiceSchema({
      name: `${pkg.name} — ${city.name}`,
      description: `${pkg.description} Serving ${city.name} (${city.postcodes.join(", ")}).`,
      url: canonical,
      price: pkg.priceFrom,
      areaName: city.name,
      duration: pkg.duration,
    })
  );

  const reviewsSchemaList: ReviewSchemaInput[] = cityWeddingTestimonials.map((t) => ({
    author: t.name,
    rating: t.rating,
    body: t.quote,
    datePublished: parseDateToISO(t.date),
    eventType: t.eventType,
    city: city.name,
  }));
  const reviewsSchema =
    reviewsSchemaList.length > 0 ? buildReviewListSchema(reviewsSchemaList) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
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
      {reviewsSchema &&
        reviewsSchema.map((rs, i) => (
          <script
            key={`rev-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(rs) }}
          />
        ))}
      <WeddingCityContent
        city={city}
        packages={weddingPackages}
        cityFAQs={cityWeddingFAQs}
        cityTestimonials={cityWeddingTestimonials}
      />
    </>
  );
}

function parseDateToISO(humanDate: string): string {
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const parts = humanDate.trim().toLowerCase().split(/\s+/);
  if (parts.length === 2) {
    const month = months.indexOf(parts[0]);
    const year = parseInt(parts[1], 10);
    if (month >= 0 && !isNaN(year)) {
      return `${year}-${(month + 1).toString().padStart(2, "0")}-01`;
    }
  }
  return new Date().toISOString().split("T")[0];
}

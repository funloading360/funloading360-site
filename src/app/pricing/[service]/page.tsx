import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { boothPricing } from "@/lib/packages";
import ServiceDetailContent from "./ServiceDetailContent";

interface Props {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return boothPricing.map((b) => ({ service: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const booth = boothPricing.find((b) => b.slug === service);
  if (!booth) return {};

  const minPrice = Math.min(
    ...Object.values(booth.tiers).flatMap((t) => t.prices.map((p) => p.price))
  );

  return {
    title: `${booth.booth} Photo Booth Hire — From £${minPrice} | FunLoading360`,
    description: booth.longDescription[0],
    openGraph: {
      title: `${booth.booth} Photo Booth Hire | FunLoading360`,
      description: booth.shortDescription,
      url: `https://www.funloading360.co.uk/pricing/${booth.slug}`,
      images: [
        {
          url: "https://www.funloading360.co.uk/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `FunLoading360 ${booth.booth} photo booth hire`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["https://www.funloading360.co.uk/og-image.jpg"],
    },
    alternates: {
      canonical: `https://www.funloading360.co.uk/pricing/${booth.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { service } = await params;
  const booth = boothPricing.find((b) => b.slug === service);
  if (!booth) notFound();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${booth.booth} Photo Booth Hire`,
    description: booth.longDescription[0],
    provider: {
      "@type": "LocalBusiness",
      name: "FunLoading360",
      url: "https://www.funloading360.co.uk",
    },
    areaServed: ["Essex", "Kent", "London"],
    offers: Object.values(booth.tiers).flatMap((tier) =>
      tier.prices.map((p) => ({
        "@type": "Offer",
        name: `${tier.name} — ${p.duration}`,
        price: p.price,
        priceCurrency: "GBP",
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ServiceDetailContent slug={service} />
    </>
  );
}

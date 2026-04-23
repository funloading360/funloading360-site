import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { boothPricing } from "@/lib/packages";
import ServiceDetailContent from "./ServiceDetailContent";
import { buildProductSchema, buildServiceSchema } from "@/lib/structured-data";

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

  const allPrices = Object.values(booth.tiers).flatMap((t) =>
    t.prices.map((p) => p.price)
  );
  const priceLow = Math.min(...allPrices);
  const priceHigh = Math.max(...allPrices);
  const boothUrl = `https://www.funloading360.co.uk/pricing/${booth.slug}`;

  const serviceSchema = buildServiceSchema({
    name: `${booth.booth} Photo Booth Hire`,
    description: booth.longDescription[0],
    url: boothUrl,
    price: priceLow,
    areaName: "Essex, Kent, London",
  });

  const productSchema = buildProductSchema({
    name: `${booth.booth} Photo Booth Hire`,
    description: booth.longDescription[0],
    url: boothUrl,
    image: "https://www.funloading360.co.uk/og-image.jpg",
    priceLow,
    priceHigh,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ServiceDetailContent slug={service} />
    </>
  );
}

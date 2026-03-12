import type { Metadata } from "next";
import { cities, getCityBySlug } from "@/lib/cities";
import CityContent from "./CityContent";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return cities.map((city) => ({
    city: city.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    return {
      title: "City Not Found",
    };
  }

  const title = `Photo Booth Hire ${cityData.name} | FunLoading360`;
  const description = cityData.description;
  const url = `https://www.funloading360.co.uk/locations/${cityData.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: "https://www.funloading360.co.uk/og-image.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["https://www.funloading360.co.uk/og-image.jpg"],
    },
    alternates: { canonical: url },
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const cityData = getCityBySlug(city);

  if (!cityData) {
    notFound();
  }

  return <CityContent city={cityData} />;
}

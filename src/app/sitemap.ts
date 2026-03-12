import type { MetadataRoute } from "next";
import { cities } from "@/lib/cities";

const BASE_URL = "https://www.funloading360.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/booths", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/corporate", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/gallery", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/locations", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/book", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const cityPages = cities.map((city) => ({
    url: `/locations/${city.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...cityPages].map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}

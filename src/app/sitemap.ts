import type { MetadataRoute } from "next";
import { cities } from "@/lib/cities";
import { blogPosts } from "@/lib/blogPosts";
import { boothPricing } from "@/lib/packages";

const BASE_URL = "https://www.funloading360.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/corporate", priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/corporate/case-studies", priority: 0.75, changeFrequency: "monthly" as const },
    { url: "/weddings", priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/gallery", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/gallery/weddings", priority: 0.65, changeFrequency: "weekly" as const },
    { url: "/gallery/corporate", priority: 0.65, changeFrequency: "weekly" as const },
    { url: "/locations", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/book", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const cityPages = cities.map((city) => ({
    url: `${BASE_URL}/locations/${city.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Wedding spokes per city — created in Phase 3. Sitemap entries are forward-declared
  // so Google sees them the day they deploy.
  const weddingCityPages = cities.map((city) => ({
    url: `${BASE_URL}/weddings/${city.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.datePublished),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const pricingDetailPages = boothPricing.map((booth) => ({
    url: `${BASE_URL}/pricing/${booth.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const staticSitemap = staticPages.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  return [
    ...staticSitemap,
    ...cityPages,
    ...weddingCityPages,
    ...blogPages,
    ...pricingDetailPages,
  ];
}

import type { MetadataRoute } from "next";

const BASE_URL = "https://www.funloading360.co.uk";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/thank-you"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

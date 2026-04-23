import type { MetadataRoute } from "next";

const BASE_URL = "https://www.funloading360.co.uk";

const DISALLOWED_PATHS = ["/api/", "/thank-you", "/cart", "/availability"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      // Explicit allow for LLM / AI search crawlers — AEO signal.
      { userAgent: "GPTBot", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "ClaudeBot", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "Claude-Web", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "PerplexityBot", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "Google-Extended", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "CCBot", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "anthropic-ai", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "cohere-ai", allow: "/", disallow: DISALLOWED_PATHS },
      { userAgent: "Applebot-Extended", allow: "/", disallow: DISALLOWED_PATHS },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}

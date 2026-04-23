/**
 * Centralized JSON-LD schema builders for FunLoading360.
 * Replaces inline schema objects scattered across layout.tsx, CityContent.tsx, pricing/[service]/page.tsx.
 *
 * Usage pattern:
 *   const ld = buildLocalBusinessSchema();
 *   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
 *
 * All builders return plain objects safe to JSON.stringify.
 */

const SITE_URL = "https://www.funloading360.co.uk";

const BRAND = {
  name: "FunLoading360",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  telephone: "+44 7482 112110",
  email: "funloading360@gmail.com",
  address: {
    streetAddress: "Guys Farm Rd",
    addressLocality: "South Woodham Ferrers",
    postalCode: "CM3 5NF",
    addressRegion: "Essex",
    addressCountry: "GB",
  },
  sameAs: [
    "https://www.instagram.com/funloading360",
    "https://www.facebook.com/funloading360",
    "https://www.tiktok.com/@funloading360",
    "https://www.bark.com/en/gb/company/funloading360/",
  ],
  priceRange: "££",
  foundingDate: "2023",
};

export type RatingInput = {
  ratingValue: number;
  reviewCount: number;
};

export const DEFAULT_RATING: RatingInput = {
  ratingValue: 4.9,
  reviewCount: 48,
};

function buildAggregateRating(rating: RatingInput = DEFAULT_RATING) {
  return {
    "@type": "AggregateRating",
    ratingValue: rating.ratingValue.toString(),
    reviewCount: rating.reviewCount.toString(),
    bestRating: "5",
    worstRating: "1",
  };
}

export function buildLocalBusinessSchema(options?: {
  city?: { name: string; lat: number; lng: number; radiusKm?: number };
  rating?: RatingInput;
}) {
  const { city, rating } = options ?? {};

  const areaServed = city
    ? [
        {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: city.lat,
            longitude: city.lng,
          },
          geoRadius: ((city.radiusKm ?? 25) * 1000).toString(),
        },
      ]
    : [
        { "@type": "Place", name: "Essex" },
        { "@type": "Place", name: "Kent" },
        { "@type": "Place", name: "London" },
      ];

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: BRAND.name,
    description:
      "Premium 360°, glam vintage, and selfie pod photo booth hire across Essex, Kent and London for weddings, corporate events, birthdays and proms.",
    url: BRAND.url,
    logo: BRAND.logo,
    image: `${SITE_URL}/og-image.jpg`,
    telephone: BRAND.telephone,
    email: BRAND.email,
    address: { "@type": "PostalAddress", ...BRAND.address },
    areaServed,
    priceRange: BRAND.priceRange,
    foundingDate: BRAND.foundingDate,
    sameAs: BRAND.sameAs,
    aggregateRating: buildAggregateRating(rating),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "22:00",
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BRAND.name,
    url: BRAND.url,
    logo: BRAND.logo,
    sameAs: BRAND.sameAs,
    foundingDate: BRAND.foundingDate,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BRAND.telephone,
      email: BRAND.email,
      contactType: "customer service",
      areaServed: "GB",
      availableLanguage: "English",
    },
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export type ServiceSchemaInput = {
  name: string;
  description: string;
  url: string;
  price: number;
  priceCurrency?: string;
  areaName?: string;
  duration?: string;
};

export function buildServiceSchema(input: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: input.url,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: BRAND.name,
    },
    areaServed: {
      "@type": "Place",
      name: input.areaName ?? "Essex, Kent, London",
    },
    offers: {
      "@type": "Offer",
      price: input.price.toString(),
      priceCurrency: input.priceCurrency ?? "GBP",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString().split("T")[0],
    },
  };
}

export type ProductSchemaInput = {
  name: string;
  description: string;
  url: string;
  image: string;
  priceLow: number;
  priceHigh: number;
  rating?: RatingInput;
};

export function buildProductSchema(input: ProductSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    url: input.url,
    image: input.image,
    brand: { "@type": "Brand", name: BRAND.name },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "GBP",
      lowPrice: input.priceLow.toString(),
      highPrice: input.priceHigh.toString(),
      offerCount: "3",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: buildAggregateRating(input.rating),
  };
}

export type EventSchemaInput = {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: { name: string; city: string; postalCode?: string };
  url: string;
  price: number;
};

export function buildEventSchema(input: EventSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.name,
    description: input.description,
    startDate: input.startDate,
    endDate: input.endDate ?? input.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: input.location.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: input.location.city,
        postalCode: input.location.postalCode,
        addressCountry: "GB",
      },
    },
    organizer: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BRAND.name,
    },
    offers: {
      "@type": "Offer",
      url: input.url,
      price: input.price.toString(),
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString().split("T")[0],
    },
  };
}

export type ReviewSchemaInput = {
  author: string;
  rating: number;
  body: string;
  datePublished: string;
  eventType?: string;
  city?: string;
};

export function buildReviewSchema(input: ReviewSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: input.rating.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    author: { "@type": "Person", name: input.author },
    datePublished: input.datePublished,
    reviewBody: input.body,
    itemReviewed: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: BRAND.name,
    },
  };
}

export function buildReviewListSchema(reviews: ReviewSchemaInput[]) {
  return reviews.map((r) => buildReviewSchema(r));
}

export type FAQItem = { question: string; answer: string };

export function buildFAQSchema(items: FAQItem[], speakableTop = 3) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  if (speakableTop > 0) {
    return {
      ...schema,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: items
          .slice(0, speakableTop)
          .map((_, i) => `[data-speakable-faq="${i}"]`),
      },
    };
  }

  return schema;
}

export type ArticleSchemaInput = {
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
};

export function buildArticleSchema(input: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    image: input.image,
    url: input.url,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: {
      "@type": input.authorName ? "Person" : "Organization",
      name: input.authorName ?? BRAND.name,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
      logo: { "@type": "ImageObject", url: BRAND.logo },
    },
  };
}

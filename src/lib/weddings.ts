/**
 * Wedding-cluster data layer.
 * Decoupled from cities.ts so spokes can compose city + wedding info
 * without duplicating base-city content.
 */

export interface WeddingPackage {
  slug: string;
  boothType: "360" | "glam-vintage" | "selfie-pod";
  name: string;
  description: string;
  duration: string; // "3 hours" / "4 hours"
  priceFrom: number; // base price before city supplement
  includes: string[];
  recommendedFor: string;
}

export const weddingPackages: WeddingPackage[] = [
  {
    slug: "360-wedding-essential",
    boothType: "360",
    name: "360 Slow Motion — Wedding Essential",
    description:
      "Cinematic slow-motion wedding clips that guests share instantly to Instagram and TikTok. 3 hours of coverage including first dance and evening reception.",
    duration: "3 hours",
    priceFrom: 380,
    includes: [
      "Uniformed attendant for full 3 hours",
      "Custom wedding overlay (couple names + date)",
      "Themed wedding props box",
      "QR-code instant video delivery",
      "Evening gallery link to couple within 24h",
      "Free delivery (25-mile zone)",
    ],
    recommendedFor: "2026 weddings with 80-150 guests, modern couples who want viral-ready content",
  },
  {
    slug: "glam-wedding-signature",
    boothType: "glam-vintage",
    name: "Glam Vintage — Wedding Signature",
    description:
      "Timeless photo booth with unlimited instant prints and elegant gold trim. Guests leave with physical keepsakes, you get the digital gallery.",
    duration: "3 hours",
    priceFrom: 400,
    includes: [
      "Uniformed attendant for full 3 hours",
      "Unlimited branded prints (4×6 or strip format)",
      "Custom wedding overlay on prints + digital",
      "Premium props collection with wedding theme",
      "QR-code digital gallery",
      "Free delivery (25-mile zone)",
    ],
    recommendedFor: "Traditional and elegant weddings, couples who want a memento for every guest",
  },
  {
    slug: "selfie-pod-wedding-intimate",
    boothType: "selfie-pod",
    name: "Selfie Pod — Intimate Wedding",
    description:
      "Compact booth ideal for intimate weddings, smaller venues, or garden marquees. Touchscreen-driven, minimal footprint.",
    duration: "2 hours",
    priceFrom: 300,
    includes: [
      "Uniformed attendant",
      "Touchscreen self-serve with photo + GIF modes",
      "1 instant print per use, unlimited digital",
      "Branded overlay with couple details",
      "QR-code sharing",
      "Free delivery (25-mile zone)",
    ],
    recommendedFor: "Weddings under 80 guests, intimate receptions, venues with limited space",
  },
];

export interface WeddingFAQ {
  question: string;
  answer: string;
}

export const weddingFAQs: WeddingFAQ[] = [
  {
    question: "How much does wedding photo booth hire cost in the UK in 2026?",
    answer:
      "A 2-hour Selfie Pod wedding package starts at £300. A 3-hour 360 Slow Motion booth is £380, and a 3-hour Glam Vintage booth with unlimited prints is £400. London and London-fringe postcodes carry a £50 supplement. All packages include attendant, overlay, props, and digital gallery.",
  },
  {
    question: "How far in advance should I book a wedding photo booth?",
    answer:
      "Peak-season Saturday weddings (May-September) typically book 6-9 months ahead. Off-peak dates (Nov-Feb) or weekday weddings can be secured 2-4 weeks out. We hold dates for 7 days after quote with no deposit required.",
  },
  {
    question: "Which booth type is best for a wedding — 360, glam, or selfie pod?",
    answer:
      "The 360 Slow Motion booth is trending in 2026 for couples who want Instagram/TikTok-ready content. The Glam Vintage booth suits traditional receptions and delivers unlimited prints as guest keepsakes. The Selfie Pod is ideal for intimate weddings under 80 guests or venues with limited space.",
  },
  {
    question: "Do you provide wedding-specific props?",
    answer:
      "Yes — our wedding props box includes bride/groom-themed signs, floral props, vintage frames, and custom letter boards. For themed weddings (black tie, garden, destination) we can source additional props on request.",
  },
  {
    question: "How much space does a wedding photo booth need?",
    answer:
      "The 360 Slow Motion platform requires 3m × 3m floor space with 2.5m ceiling clearance plus access to a 13A plug. The Glam Vintage booth needs 2.5m × 2.5m × 2.2m. The Selfie Pod needs 1.5m × 1.5m × 2m. We send a full setup spec once your venue is confirmed.",
  },
  {
    question: "Can you set up before the ceremony or wait until the reception?",
    answer:
      "Both options work. Most couples have us arrive 60-90 minutes before reception start so the booth is live for the cocktail hour. For outdoor ceremonies with a different reception venue, we can arrive during the ceremony and set up discreetly for reception opening.",
  },
  {
    question: "Do you cover wedding venues across Essex, Kent, and London?",
    answer:
      "Yes — free delivery within 25 miles of our Chelmsford base (covers most of Essex). Kent and coastal venues incur a per-mile travel fee. London postcodes include a £50 flat supplement. All travel fees are itemised upfront in your quote.",
  },
  {
    question: "What happens if our wedding is postponed?",
    answer:
      "We move your deposit to a new date free of charge up to 14 days before the original event. Date changes within 14 days carry a £75 admin fee. Cancellations more than 14 days before refund the deposit in full.",
  },
  {
    question: "Is the photo booth insured for wedding venues?",
    answer:
      "Yes — we carry £5M public liability insurance, and we can share the certificate with your venue coordinator directly. All our equipment is PAT-tested annually.",
  },
  {
    question: "When do we receive our wedding gallery?",
    answer:
      "Guests receive their individual photos/videos within seconds via QR code. The full curated gallery for the couple is delivered within 24 hours of the event to a private shareable link.",
  },
];

export interface VenueArchetype {
  name: string;
  description: string;
  boothRecommendation: "360" | "glam-vintage" | "selfie-pod" | "any";
}

export const weddingVenueArchetypes: VenueArchetype[] = [
  {
    name: "Country house & manor",
    description:
      "Grand ballrooms, high ceilings, period features. Typically 100-180 guests. Glam Vintage complements the elegance; 360 adds a modern contrast.",
    boothRecommendation: "any",
  },
  {
    name: "Barn & farm wedding",
    description:
      "Rustic timber-framed venues with open floorplans. 360 Slow Motion shines against the natural backdrop; Glam Vintage offers a timeless contrast.",
    boothRecommendation: "360",
  },
  {
    name: "Hotel ballroom",
    description:
      "Dedicated function rooms with reliable power, parking, and setup support. Glam Vintage suits the formal atmosphere and guest-flow patterns.",
    boothRecommendation: "glam-vintage",
  },
  {
    name: "Garden marquee",
    description:
      "Outdoor summer weddings with shelter. 360 Slow Motion requires a flat, dry platform; Selfie Pod works in any footprint.",
    boothRecommendation: "selfie-pod",
  },
  {
    name: "City centre & rooftop",
    description:
      "London, Shoreditch, warehouse venues. Space-conscious — Selfie Pod is often the best fit. 360 works when ceiling allows.",
    boothRecommendation: "selfie-pod",
  },
  {
    name: "Castle & historic listed",
    description:
      "Protected interiors with strict setup rules (no wall attachments, no drilling). All our booths are freestanding and compliant.",
    boothRecommendation: "glam-vintage",
  },
];

export const weddingHero = {
  h1: "Wedding Photo Booth Hire — 360°, Glam & Selfie Pods from £300",
  aeoFirstParagraph:
    "FunLoading360 provides wedding photo booth hire across Essex, Kent, and London — 360° slow-motion, glam vintage with unlimited prints, or compact selfie pods. Packages start at £300 for 2 hours with free delivery within 25 miles of Chelmsford. Trusted by 48+ UK couples for 2025-2026 weddings.",
  subheadline:
    "From country-house weddings in Essex to rooftop receptions in London — your guests will leave with shareable slow-motion clips, instant prints, and memories they'll talk about for years.",
  trustBullets: [
    "4.9★ rating from 48+ couples",
    "£5M public liability insured",
    "PAT-tested equipment, DBS-checked operators",
    "Free delivery within 25 miles of Chelmsford",
  ],
};

/**
 * Testimonials tagged as wedding event type in testimonials.ts.
 * We only list event types that contain "Wedding" / "Engagement" / "Anniversary".
 */
export const WEDDING_EVENT_TYPES = [
  "Wedding",
  "Engagement Party",
  "Anniversary Party",
];

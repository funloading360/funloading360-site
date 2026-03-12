export interface PricingTier {
  name: string;
  tagline: string;
  features: string[];
}

export interface BoothPricing {
  booth: string;
  tagline: string;
  gradient: string;
  accentColor: string;
  tiers: {
    essential: PricingTier & { prices: { duration: string; price: number }[] };
    signature: PricingTier & { prices: { duration: string; price: number }[] };
    luxury: PricingTier & { prices: { duration: string; price: number }[] };
  };
}

export const boothPricing: BoothPricing[] = [
  {
    booth: "360 Slow Motion",
    tagline: "The Show-Stopper",
    gradient: "from-violet-900/80 via-purple-900/60 to-blue-900/80",
    accentColor: "bg-violet-500",
    tiers: {
      essential: {
        name: "The Essential",
        tagline: "Perfect for smaller events",
        prices: [
          { duration: "2 Hours", price: 280 },
          { duration: "3 Hours", price: 330 },
          { duration: "4 Hours", price: 380 },
        ],
        features: [
          "360° rotating camera arm",
          "Slow-motion video capture",
          "LED ring lighting",
          "Instant digital sharing via QR",
          "Professional booth attendant",
          "Free setup & collection",
          "Online gallery for 30 days",
        ],
      },
      signature: {
        name: "The Signature",
        tagline: "Our most popular choice",
        prices: [
          { duration: "2 Hours", price: 300 },
          { duration: "3 Hours", price: 350 },
          { duration: "4 Hours", price: 400 },
        ],
        features: [
          "360° rotating camera arm",
          "Slow-motion video capture",
          "RGB LED lighting backdrop",
          "Custom video branding",
          "Instant digital sharing",
          "Props & accessories",
          "Dedicated booth attendant",
          "Free setup & collection",
          "Online gallery for 60 days",
          "Choice of two songs",
        ],
      },
      luxury: {
        name: "The Luxury",
        tagline: "The ultimate experience",
        prices: [
          { duration: "2 Hours", price: 350 },
          { duration: "3 Hours", price: 400 },
          { duration: "4 Hours", price: 450 },
        ],
        features: [
          "360° rotating camera arm",
          "Slow-motion video capture",
          "RGB LED lighting backdrop",
          "Custom video branding",
          "Premium props collection",
          "Bubble guns & smoke machine",
          "Strobe laser lights",
          "Four song selections",
          "Dedicated event manager",
          "Free setup & collection",
          "Online gallery for 90 days",
          "Priority booking support",
        ],
      },
    },
  },
  {
    booth: "Glam Vintage",
    tagline: "Timeless Elegance",
    gradient: "from-amber-900/80 via-orange-900/60 to-rose-900/80",
    accentColor: "bg-amber-400",
    tiers: {
      essential: {
        name: "The Essential",
        tagline: "Perfect for intimate gatherings",
        prices: [
          { duration: "2 Hours", price: 280 },
          { duration: "3 Hours", price: 330 },
          { duration: "4 Hours", price: 380 },
        ],
        features: [
          "High-quality DSLR camera",
          "Professional backdrop",
          "Basic lighting setup",
          "Instant digital sharing",
          "Friendly booth attendant",
          "Free setup & collection",
          "Online gallery for 30 days",
          "Choice of one overlay",
        ],
      },
      signature: {
        name: "The Signature",
        tagline: "Our most versatile option",
        prices: [
          { duration: "2 Hours", price: 350 },
          { duration: "3 Hours", price: 400 },
          { duration: "4 Hours", price: 450 },
        ],
        features: [
          "Professional DSLR camera",
          "RGB LED lighting backdrop",
          "Custom overlay design",
          "Unlimited high-quality prints",
          "Instant digital sharing",
          "Props & accessories included",
          "Dedicated booth attendant",
          "Free setup & collection",
          "Online gallery for 60 days",
          "Guest book option",
        ],
      },
      luxury: {
        name: "The Luxury",
        tagline: "Premium elegance",
        prices: [
          { duration: "2 Hours", price: 400 },
          { duration: "3 Hours", price: 450 },
          { duration: "4 Hours", price: 500 },
        ],
        features: [
          "Professional DSLR camera",
          "Premium backdrop options",
          "Custom overlay design",
          "Unlimited high-quality prints",
          "Instant digital sharing",
          "Premium props collection",
          "Bespoke customization",
          "Dedicated event manager",
          "Free setup & collection",
          "Online gallery for 90 days",
          "Guest book included",
          "Priority booking support",
        ],
      },
    },
  },
  {
    booth: "Selfie Pod",
    tagline: "Modern & Sleek",
    gradient: "from-emerald-900/80 via-teal-900/60 to-cyan-900/80",
    accentColor: "bg-emerald-400",
    tiers: {
      essential: {
        name: "The Essential",
        tagline: "Perfect for compact spaces",
        prices: [{ duration: "3 Hours", price: 200 }],
        features: [
          "High-resolution camera",
          "Professional ring lighting",
          "Touchscreen interface",
          "Instant digital sharing via QR",
          "Online gallery for 30 days",
          "Friendly attendant",
          "Free setup & collection",
        ],
      },
      signature: {
        name: "The Signature",
        tagline: "Our most popular choice",
        prices: [{ duration: "4 Hours", price: 250 }],
        features: [
          "High-resolution camera",
          "Professional ring lighting",
          "Touchscreen interface",
          "Instant digital sharing",
          "Video selfie mode",
          "GIF creation",
          "Online gallery for 60 days",
          "Dedicated attendant",
          "Free setup & collection",
        ],
      },
      luxury: {
        name: "The Luxury",
        tagline: "Premium digital experience",
        prices: [{ duration: "5 Hours", price: 300 }],
        features: [
          "High-resolution camera",
          "Professional ring lighting",
          "Advanced touchscreen interface",
          "Instant digital sharing",
          "Video selfie & GIF modes",
          "Green screen option",
          "Custom branding",
          "Online gallery for 90 days",
          "Dedicated event manager",
          "Free setup & collection",
          "Priority booking support",
        ],
      },
    },
  },
];

// Backwards compatibility: flatten boothPricing for booking form
export const packages = boothPricing.flatMap((booth) =>
  Object.entries(booth.tiers).map(([tierKey, tier], idx) => ({
    id: `${booth.booth.toLowerCase().replace(/\s+/g, "-")}-${tierKey}`,
    name: tier.name,
    price: tier.prices[tier.prices.length - 1]?.price || 0, // Use max price
    duration: tier.prices.map((p) => p.duration).join(" / "),
    booth: booth.booth,
    tagline: tier.tagline,
    popular: tierKey === "signature",
    features: tier.features,
  }))
);

export function formatPrice(price: number): string {
  return `£${price}`;
}

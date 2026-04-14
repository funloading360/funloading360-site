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
  slug: string;
  shortDescription: string;
  longDescription: string[];
  highlights: string[];
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
    slug: "360-slow-motion",
    shortDescription:
      "Watch your guests become the star of their own cinematic moment as our 360° rotating arm captures every angle in stunning slow motion. Drenched in RGB light and ready to share instantly via QR, it's the experience everyone's talking about before the night is even over. Don't miss your chance — dates fill up fast.",
    longDescription: [
      "Step onto the platform and feel the energy shift. Our 360° Slow Motion booth wraps your guests in a cinematic spectacle — a rotating arm gliding around them while RGB LED lighting paints the air with colour. The result? A slow-motion video so stunning it looks like it was made for a music video.",
      "Every clip is shareable in seconds via QR code, so the hype spreads from the dance floor to social media before the night ends. A professional attendant manages every moment, ensuring a seamless experience for every single guest.",
      "Perfect for weddings, proms, birthdays, and corporate events where you want people talking — and posting — for weeks to come.",
    ],
    highlights: [
      "360° rotating arm camera",
      "Cinematic slow-motion videos",
      "RGB LED mood lighting",
      "Instant QR code sharing",
      "Dedicated professional attendant",
      "Social-media-ready content, instantly",
    ],
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
    slug: "glam-vintage",
    shortDescription:
      "Transport your guests to a golden era of glamour with our open-air Glam Vintage booth — dreamy filters, elegant props, and beautifully printed keepsakes they'll treasure forever. It's the centrepiece your event deserves, dripping in sophistication and irresistible charm. Book now before your date is gone.",
    longDescription: [
      "There's something magical about a print you can hold. Our Glam Vintage booth combines the timeless elegance of classic photography with modern glamour lighting, creating portraits so beautiful your guests will want to frame them. Choose from a curated collection of vintage-style filters and overlays that add that perfect cinematic glow.",
      "Our carefully chosen props collection turns shy guests into natural performers — laughter guaranteed. Every print is produced instantly, giving your guests a keepsake to take home and a memory to keep forever.",
      "Ideal for weddings and milestone birthdays where elegance matters, this booth adds a touch of class that elevates the entire event atmosphere.",
    ],
    highlights: [
      "Classic open-air booth design",
      "Gorgeous vintage-style filters",
      "Curated elegant props collection",
      "Instant high-quality prints",
      "Flattering professional glamour lighting",
      "Timeless keepsakes guests treasure",
    ],
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
    slug: "selfie-pod",
    shortDescription:
      "Big on fun, smart on space — our Selfie Pod delivers photos and videos your guests will share instantly, straight from a sleek touchscreen. Compact enough to fit any venue, generous enough to create a centrepiece moment for every guest. The most accessible way to wow your crowd without stretching your budget.",
    longDescription: [
      "Don't let venue size or budget hold back the fun. Our Selfie Pod packs a serious punch into a compact, modern touchscreen unit that blends seamlessly into any event space — from intimate birthday parties to large corporate gatherings. Guests snap photos and record videos in seconds, no learning curve required.",
      "Built-in social media sharing means every shot goes straight to Instagram, WhatsApp, or wherever your guests love to post. It's effortless entertainment that keeps the energy alive all night.",
      "The Selfie Pod is the smart, stylish choice for anyone who wants maximum impact at an accessible price point — proving that great experiences don't have to cost a fortune.",
    ],
    highlights: [
      "Sleek modern touchscreen interface",
      "Photo and video capture",
      "Instant social media sharing",
      "Compact design, any venue",
      "Effortless guest experience",
      "Premium fun, budget-friendly price",
    ],
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

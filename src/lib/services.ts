/**
 * Unified Service & Product Data Model
 *
 * Single source of truth for all services (photo booths, rentals, add-ons)
 * Replaces: packages.ts, about/data/booths.ts, BoothsContent.tsx data
 *
 * Structure supports:
 * - Service categories (photobooth, rental, addon)
 * - Tier-based pricing (Essential, Signature, Luxury)
 * - Multi-page metadata (pricing, about, gallery, booking)
 * - Future extensibility (party rentals structure pre-built)
 */

export type ServiceCategory = "photobooth" | "rental" | "addon";
export type PricingTier = "essential" | "signature" | "luxury";

export interface TierOption {
  name: string;
  tagline: string;
  features: string[];
  prices: { duration: string; price: number }[];
}

export interface Product {
  id: string;
  name: string;
  category: ServiceCategory;
  // Pricing
  tiers: Record<PricingTier, TierOption>;
  // Metadata for pages
  tagline: string;
  description: string; // short description (for pricing page)
  longDescription: string; // detailed description (for booths page)
  // Visual
  image: string; // hero image
  gradient: string; // tailwind gradient (for cards)
  accentColor: string; // tailwind accent color
  borderColor: string; // tailwind border color
  badgeColor: string; // tailwind badge color
  // About page specific
  aboutBenefits: Array<{
    title: string;
    text: string;
  }>;
  perfectFor: string;
  // Future: bundling & cross-sells
  bundlesWith?: string[];
}

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  tagline: string;
  products: Product[];
}

/**
 * Photo Booths Service
 * 3 products: 360°, Glam Vintage, Selfie Pod
 */
export const photoBothsService: Service = {
  id: "photo-booths",
  name: "Photo Booths",
  category: "photobooth",
  tagline: "Capture unforgettable moments",
  products: [
    // ────────────────────────────────────────────────────────────────────
    // 360 Slow Motion Booth
    // ────────────────────────────────────────────────────────────────────
    {
      id: "360-slow-motion",
      name: "360 Slow Motion Booth",
      category: "photobooth",
      tagline: "The Show-Stopper",
      description:
        "A cinematic experience your guests will never forget. Full 360° rotating camera arm capturing stunning slow-motion footage.",
      longDescription:
        "Perfect for large events where you want maximum impact. The RGB lighting backdrop adds vibrant colour, while the LED display ring creates the perfect atmosphere. Our professional attendant guides each group through the experience, ensuring everyone gets the perfect shot.",
      image: "/images/events/360-couple-dancing.jpeg",
      gradient: "from-violet-900/80 via-purple-900/60 to-blue-900/80",
      accentColor: "bg-violet-500",
      borderColor: "border-violet-500/30",
      badgeColor: "bg-violet-500/20 text-violet-300",
      perfectFor:
        "Weddings, Corporate events, Birthday parties, Proms, Large celebrations where you want impact.",
      aboutBenefits: [
        {
          title: "Creates viral-worthy moments",
          text: "Slow-motion video is naturally shareable. Guests leave wanting to relive it, talk about it, send it on.",
        },
        {
          title: "Energises the room",
          text: "High-energy events feel the difference. The booth becomes the centrepiece, not an add-on.",
        },
        {
          title: "Delivers pure cinematic quality",
          text: "Professional 4K capture, custom overlays, instant sharing. No cheap gimmicks. Just stunning results.",
        },
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
            "Full 360° rotating camera arm",
            "Slow-motion video capture",
            "RGB LED lighting backdrop",
            "Instant digital sharing via QR code",
            "Music overlay on videos",
            "Social media ready format",
            "Dedicated booth attendant",
            "Up to 5 people per rotation",
            "Custom branded intro/outro",
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
            "Full 360° rotating camera arm",
            "Slow-motion video capture",
            "RGB LED lighting backdrop",
            "Custom video branding",
            "Instant digital sharing",
            "Premium props & accessories",
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
            "Full 360° rotating camera arm",
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

    // ────────────────────────────────────────────────────────────────────
    // Glam Vintage Booth
    // ────────────────────────────────────────────────────────────────────
    {
      id: "glam-vintage",
      name: "Glam Vintage Booth",
      category: "photobooth",
      tagline: "Timeless Elegance",
      description:
        "Classic charm with a modern twist. Unlimited high-quality prints, beautifully designed custom overlays and an extensive props collection make this booth an instant hit.",
      longDescription:
        "The Glam Vintage Booth is our most versatile option — equally at home at a black-tie wedding reception or a casual birthday garden party. The warm, flattering ring light is designed to make everyone look their absolute best, and the prints are of such high quality that guests will treasure them for years.",
      image: "/images/venues/glam-backdrop-printer.jpeg",
      gradient: "from-amber-900/80 via-orange-900/60 to-rose-900/80",
      accentColor: "bg-amber-400",
      borderColor: "border-amber-500/30",
      badgeColor: "bg-amber-500/20 text-amber-300",
      perfectFor:
        "Weddings prioritising elegance and keepsakes, Milestone birthdays, Baby showers, Garden celebrations.",
      aboutBenefits: [
        {
          title: "Guests leave with something real",
          text: "Instant prints mean they take a piece of your event home tonight. Something physical to treasure.",
        },
        {
          title: "Flatters everyone beautifully",
          text: "Ring light, professional backdrop, thoughtful props. Guests who don't photograph well feel confidence.",
        },
        {
          title: "Fits every aesthetic",
          text: "Custom overlays with your details, your style. It feels like it was always yours.",
        },
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
            "Unlimited high-quality photo prints",
            "Custom overlay design included",
            "Flattering ring light setup",
            "Extensive props & accessories",
            "Instant digital copies via QR",
            "Guest book option",
            "Colour & black-and-white modes",
            "Friendly booth attendant",
            "Open or enclosed booth style",
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

    // ────────────────────────────────────────────────────────────────────
    // Selfie Pod
    // ────────────────────────────────────────────────────────────────────
    {
      id: "selfie-pod",
      name: "Selfie Pod",
      category: "photobooth",
      tagline: "Modern & Sleek",
      description:
        "Compact, connected, completely brilliant. Guests interact with an intuitive touchscreen to take their photos, which are instantly shared to their phones.",
      longDescription:
        "Don't let the size fool you — the Selfie Pod packs in impressive features. The high-resolution camera and professional lighting produce stunning results, and the online gallery ensures every guest can access their photos long after the event ends. It's our most popular choice for corporate events and intimate celebrations.",
      image: "/images/venues/selfie-pod-venue.jpeg",
      gradient: "from-emerald-900/80 via-teal-900/60 to-cyan-900/80",
      accentColor: "bg-emerald-400",
      borderColor: "border-emerald-500/30",
      badgeColor: "bg-emerald-500/20 text-emerald-300",
      perfectFor:
        "Corporate events, Exhibitions, Intimate parties, Brand activations, Modern weddings.",
      aboutBenefits: [
        {
          title: "Fits venues others can't",
          text: "Small galleries, intimate restaurants, pop-up spaces. The Pod slides in without compromising experience.",
        },
        {
          title: "Guests share instantly",
          text: "Text, QR, email—photos reach phones in seconds. No waiting. Instant gratification.",
        },
        {
          title: "Works self-service or staffed",
          text: "Let guests snap freely, or have an operator guide them. The Pod adapts to your event's energy.",
        },
      ],
      tiers: {
        essential: {
          name: "The Essential",
          tagline: "Perfect for compact spaces",
          prices: [{ duration: "3 Hours", price: 200 }],
          features: [
            "Sleek, minimal footprint",
            "High-resolution camera",
            "Touchscreen interface",
            "Instant sharing via QR & SMS",
            "Online gallery for 30+ days",
            "Video selfie & GIF modes",
            "Green screen option",
            "Fully self-service or attended",
            "No print queue delays",
          ],
        },
        signature: {
          name: "The Signature",
          tagline: "Our most popular choice",
          prices: [{ duration: "4 Hours", price: 250 }],
          features: [
            "Sleek, minimal footprint",
            "High-resolution camera",
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
            "Sleek, minimal footprint",
            "High-resolution camera",
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
  ],
};

/**
 * Party Rentals Service (Future - Phase 1B+ roadmap)
 * Structure pre-built for easy expansion
 */
export const partyRentalsService: Service = {
  id: "party-rentals",
  name: "Party Rentals",
  category: "rental",
  tagline: "Complete your celebration",
  products: [
    // 4ft Light Numbers
    {
      id: "4ft-light-numbers",
      name: "4ft Light Numbers",
      category: "rental",
      tagline: "Illuminate your age",
      description: "Giant 4ft LED light numbers - perfect for milestone birthdays and celebrations.",
      longDescription: "Create stunning photo opportunities with our professional 4ft light numbers.",
      image: "/images/rentals/4ft-light-numbers.jpeg",
      gradient: "from-yellow-900/80 via-amber-900/60 to-orange-900/80",
      accentColor: "bg-yellow-400",
      borderColor: "border-yellow-500/30",
      badgeColor: "bg-yellow-500/20 text-yellow-300",
      perfectFor: "Birthday parties, Milestone celebrations, Photo backdrops.",
      aboutBenefits: [
        { title: "Instantly iconic", text: "Light numbers create Instagram-worthy photo moments." },
        { title: "Professional finish", text: "LED quality looks premium in photos and videos." },
        { title: "Easy installation", text: "We deliver, set up, and collect." },
      ],
      tiers: {
        essential: {
          name: "Essential",
          tagline: "Single set",
          prices: [{ duration: "Full Day", price: 50 }],
          features: ["4ft tall numbers", "LED lights", "Delivery & setup", "Free collection"],
        },
        signature: {
          name: "Signature",
          tagline: "Two sets",
          prices: [{ duration: "Full Day", price: 85 }],
          features: [
            "Two 4ft number sets",
            "LED lights",
            "Delivery & setup",
            "Free collection",
          ],
        },
        luxury: {
          name: "Luxury",
          tagline: "Premium package",
          prices: [{ duration: "Full Day", price: 120 }],
          features: [
            "Three 4ft number sets",
            "LED lights with color control",
            "Delivery & setup",
            "Free collection",
            "Priority support",
          ],
        },
      },
    },
    // Inflatable Tent
    {
      id: "inflatable-tent",
      name: "Inflatable Private Party Tent",
      category: "rental",
      tagline: "Weather protection",
      description: "Professional inflatable party tent - weather-proof shelter for your celebration.",
      longDescription:
        "Create a sheltered space for dancing, mingling, or dining. Professional grade inflatable structure.",
      image: "/images/rentals/inflatable-tent.jpeg",
      gradient: "from-blue-900/80 via-cyan-900/60 to-teal-900/80",
      accentColor: "bg-blue-400",
      borderColor: "border-blue-500/30",
      badgeColor: "bg-blue-500/20 text-blue-300",
      perfectFor: "Garden parties, Outdoor celebrations, Corporate events.",
      aboutBenefits: [
        { title: "All-weather protection", text: "Rain or shine, keep the party going." },
        { title: "Professional appearance", text: "Looks premium, not like a temporary structure." },
        { title: "Easy setup", text: "We handle delivery and installation." },
      ],
      tiers: {
        essential: {
          name: "Essential",
          tagline: "20x20ft",
          prices: [{ duration: "Full Day", price: 150 }],
          features: [
            "20x20ft inflatable tent",
            "Weather-proof material",
            "Delivery & setup",
            "Free collection",
          ],
        },
        signature: {
          name: "Signature",
          tagline: "30x30ft",
          prices: [{ duration: "Full Day", price: 250 }],
          features: [
            "30x30ft inflatable tent",
            "Weather-proof material",
            "Lighting included",
            "Delivery & setup",
            "Free collection",
          ],
        },
        luxury: {
          name: "Luxury",
          tagline: "40x40ft with extras",
          prices: [{ duration: "Full Day", price: 350 }],
          features: [
            "40x40ft inflatable tent",
            "Weather-proof material",
            "Professional lighting",
            "Climate control option",
            "Delivery & setup",
            "Free collection",
            "24-hour support",
          ],
        },
      },
    },
    // Dance Floor
    {
      id: "dance-floor",
      name: "LED Dance Floor",
      category: "rental",
      tagline: "Get dancing",
      description: "Professional LED dance floor with color effects - the centerpiece of any dance space.",
      longDescription:
        "Make your dance floor the star of the show. Our LED dance floors create stunning lighting effects that respond to music.",
      image: "/images/rentals/dance-floor.jpeg",
      gradient: "from-pink-900/80 via-purple-900/60 to-indigo-900/80",
      accentColor: "bg-pink-400",
      borderColor: "border-pink-500/30",
      badgeColor: "bg-pink-500/20 text-pink-300",
      perfectFor: "Weddings, Birthday celebrations, Corporate events, Parties.",
      aboutBenefits: [
        { title: "Energizes the space", text: "Guests can't help but dance when the floor is alive." },
        { title: "Professional lighting", text: "Synchronized with music for stunning effects." },
        { title: "Photo opportunities", text: "LED effects create amazing backdrop moments." },
      ],
      tiers: {
        essential: {
          name: "Essential",
          tagline: "16x16ft",
          prices: [{ duration: "Full Day", price: 120 }],
          features: [
            "16x16ft LED dance floor",
            "Basic color modes",
            "Delivery & setup",
            "Free collection",
          ],
        },
        signature: {
          name: "Signature",
          tagline: "20x20ft",
          prices: [{ duration: "Full Day", price: 180 }],
          features: [
            "20x20ft LED dance floor",
            "Advanced color effects",
            "Music sync capability",
            "Delivery & setup",
            "Free collection",
          ],
        },
        luxury: {
          name: "Luxury",
          tagline: "Custom size with DJ integration",
          prices: [{ duration: "Full Day", price: 280 }],
          features: [
            "Custom size LED dance floor",
            "Professional color effects",
            "DJ system integration",
            "Music-responsive lighting",
            "Delivery & setup",
            "Free collection",
            "Dedicated operator",
          ],
        },
      },
    },
  ],
};

/**
 * All Services
 */
export const services: Service[] = [photoBothsService, partyRentalsService];

/**
 * Flatten all products for cart/checkout
 */
export const allProducts: Product[] = services.flatMap((service) => service.products);

/**
 * Get product by ID
 */
export function getProductById(productId: string): Product | undefined {
  return allProducts.find((p) => p.id === productId);
}

/**
 * Format price as GBP
 */
export function formatPrice(price: number): string {
  return `£${price.toLocaleString()}`;
}

/**
 * Get price for product and tier
 * Returns the highest price for that tier (max duration)
 */
export function getPriceForTier(product: Product, tier: PricingTier): number {
  const tierData = product.tiers[tier];
  if (!tierData || tierData.prices.length === 0) return 0;
  return tierData.prices[tierData.prices.length - 1].price;
}

/**
 * Backward compatibility: packages array (like packages.ts)
 * Used by existing booking form
 */
export const packages = allProducts.flatMap((product) =>
  Object.entries(product.tiers).map(([tierKey, tier]) => ({
    id: `${product.id}-${tierKey}`,
    name: tier.name,
    price: getPriceForTier(product, tierKey as PricingTier),
    duration: tier.prices.map((p) => p.duration).join(" / "),
    booth: product.name,
    tagline: tier.tagline,
    popular: tierKey === "signature",
    features: tier.features,
  }))
);

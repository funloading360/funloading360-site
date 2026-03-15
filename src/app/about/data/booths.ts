export interface BoothFeature {
  text: string;
}

export interface Booth {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  badge?: string;
  reversed?: boolean;
  benefits: {
    title: string;
    text: string;
  }[];
  perfectFor: string;
}

export const booths: Booth[] = [
  {
    id: "360",
    title: "360° Slow Motion Booth",
    tagline: "The Show-Stopper",
    description:
      "Your guests step onto the platform. The platform rotates. The camera follows every angle. And suddenly, everyone's a movie star.",
    image: "/images/booths/360-booth.jpeg",
    badge: "Most Popular Choice",
    reversed: false,
    features: [
      "4K video recording with 360° capture",
      "Slow-motion playback (2x to 4x slower)",
      "Instant sharing to social media",
      "Custom lighting rigs with LED control",
      "Green screen effects available",
      "Boomerang and loop effects",
    ],
    benefits: [
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
    perfectFor:
      "Large celebrations where you want impact. Weddings with energetic vibes. Corporate events that need a buzz-builder. Proms and milestone birthdays.",
  },
  {
    id: "glam",
    title: "Glam Vintage Booth",
    tagline: "Timeless Elegance",
    description:
      "Something magical happens when guests hold a printed photo. Warm hands. Real nostalgia. An instant keepsake they take home the same night.",
    image: "/images/booths/glam-vintage.jpeg",
    badge: "Guest Favourite",
    reversed: true,
    features: [
      "35mm-style instant prints (4x6 glossy)",
      "Premium props and vintage backdrops",
      "Guest book signing area",
      "Custom overlays and branding",
      "Digital copies via email/QR code",
      "Fast drying prints (10-15 seconds)",
    ],
    benefits: [
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
    perfectFor:
      "Weddings prioritising elegance and keepsakes. Milestone birthdays and anniversaries. Baby showers and garden celebrations. Events where you want photos guests will actually display.",
  },
  {
    id: "selfie",
    title: "Selfie Pod",
    tagline: "Modern & Sleek",
    description:
      "Compact. Intuitive. Digital-first. Perfect for events where space is precious and your guests are digital natives.",
    image: "/images/booths/selfie-pod.jpeg",
    reversed: false,
    features: [
      "HD camera with professional ring light",
      "Touch-screen interface (easy operation)",
      "Instant digital sharing",
      "Custom animations and filters",
      "Compact setup (fits smaller venues)",
      "Social media integration",
    ],
    benefits: [
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
    perfectFor:
      "Corporate events and brand activations. Intimate gatherings and cocktail parties. Modern weddings with digital-native guests. Events where space is limited but fun isn't optional.",
  },
];

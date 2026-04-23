export type TestimonialSource = "GBP" | "Bark" | "Poptop" | "Direct" | "Instagram";

export interface Testimonial {
  id: string;
  name: string;
  eventType: string;
  rating: number; // 1-5 stars
  quote: string;
  date: string; // e.g., "May 2025"

  // Phase 2 extensions — needed for valid Review schema and city-tagged rendering.
  cityId?: string; // slug from cities.ts (e.g., "chelmsford"). Absent = generic.
  venue?: string; // venue name, if known
  source?: TestimonialSource; // review platform origin
  verifiedUrl?: string; // public URL where this review can be verified (for Review schema)
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah & James",
    eventType: "Wedding",
    rating: 5,
    quote:
      "The 360 booth was the highlight of our reception! Guests loved it and we got amazing slow-motion videos. FunLoading360 made everything seamless.",
    date: "May 2025",
    cityId: "chelmsford",
    venue: "Channels Estate",
    source: "GBP",
  },
  {
    id: "2",
    name: "Emma Johnson",
    eventType: "Birthday Party",
    rating: 5,
    quote:
      "Incredible setup and professional team. The Glam Vintage booth looked stunning and guests are still talking about it. Highly recommend!",
    date: "April 2025",
    cityId: "southend-on-sea",
    source: "Bark",
  },
  {
    id: "3",
    name: "Marcus & Team",
    eventType: "Corporate Event",
    rating: 5,
    quote:
      "The Selfie Pod was perfect for our company offsite. Easy to use, great photo quality, and the instant digital sharing was brilliant.",
    date: "March 2025",
    cityId: "basildon",
    source: "Direct",
  },
  {
    id: "4",
    name: "Lisa Chen",
    eventType: "Prom After-Party",
    rating: 5,
    quote:
      "Best investment for our prom celebration! The instant gallery feature was amazing and photos were professional quality. Worth every penny!",
    date: "March 2025",
    cityId: "colchester",
    source: "Poptop",
  },
  {
    id: "5",
    name: "The Williams Family",
    eventType: "Anniversary Party",
    rating: 5,
    quote:
      "Professional, friendly, and incredibly talented team. The photo booth added such a fun element to our celebration. Thank you, FunLoading360!",
    date: "February 2025",
    cityId: "maidstone",
    source: "GBP",
  },
  {
    id: "6",
    name: "David Rodriguez",
    eventType: "Corporate Team Building",
    rating: 5,
    quote:
      "The 360 slow-motion booth was the star of our team event. Raz and team were responsive, professional, and created amazing memories for us.",
    date: "January 2025",
    cityId: "romford",
    source: "Bark",
  },
  {
    id: "7",
    name: "Katherine & Michael",
    eventType: "Engagement Party",
    rating: 5,
    quote:
      "Couldn't have asked for better service. The photos are absolutely stunning and guests are still messaging us about the booth. Recommend 10/10!",
    date: "January 2025",
    cityId: "brentwood",
    venue: "Marygreen Manor Hotel",
    source: "GBP",
  },
  {
    id: "8",
    name: "Priya Patel",
    eventType: "Corporate Gala",
    rating: 5,
    quote:
      "Professional setup, flawless execution, and absolutely gorgeous results. Our guests loved it and the photo quality exceeded expectations.",
    date: "December 2024",
    cityId: "london",
    source: "Direct",
  },
];

export function getTestimonialById(id: string): Testimonial | undefined {
  return testimonials.find((t) => t.id === id);
}

export function getTestimonialsByCity(cityId: string): Testimonial[] {
  return testimonials.filter((t) => t.cityId === cityId);
}

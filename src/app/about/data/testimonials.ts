export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "FunLoading360 was the highlight of our wedding. Guests are still talking about the 360° booth months later. Raz personally checked everything before setup—that kind of care makes all the difference.",
    author: "Sarah M.",
    role: "Wedding, 150 guests",
  },
  {
    id: "2",
    quote: "We've used FunLoading360 for our annual corporate gala for two years running. No hidden fees, no surprises, just professional service every time. The team knows our brand inside and out.",
    author: "James K.",
    role: "Corporate Events",
  },
  {
    id: "3",
    quote: "Our prom would not have been the same without the booth. Shy students felt confident, everyone had fun, and the photos are absolutely stunning. Raz treated us like we were his most important clients.",
    author: "Principal Adams",
    role: "School Prom, 400 students",
  },
  {
    id: "4",
    quote: "Booked FunLoading360 for our 50-person micro-wedding on a tight budget. They didn't treat us like a small booking—we got the same care and attention as bigger events. That meant everything.",
    author: "Emma & Tom",
    role: "Intimate Wedding, 50 guests",
  },
  {
    id: "5",
    quote: "The Glam Vintage booth gave us keepsakes we actually treasure. The prints look professional, the experience was seamless, and our guests left with something tangible from the night. Highly recommended.",
    author: "Rebecca L.",
    role: "Anniversary Party, 80 guests",
  },
];

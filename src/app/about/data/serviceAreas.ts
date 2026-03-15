export interface ServiceArea {
  id: string;
  region: string;
  image: string;
  stats: string;
  testimonial: {
    quote: string;
    author: string;
    eventType: string;
  };
  description: string;
}

export const serviceAreas: ServiceArea[] = [
  {
    id: "essex",
    region: "Essex",
    image: "/images/locations/essex.jpeg",
    stats: "200+ events",
    testimonial: {
      quote:
        "Raz made our Brentwood wedding unforgettable. Local, reliable, and genuinely cared about our guests.",
      author: "Fiona & Michael",
      eventType: "Wedding",
    },
    description:
      "Free setup within 25 miles. We know every venue, every town, every corner of Essex. Deep roots, personal service, proven track record.",
  },
  {
    id: "kent",
    region: "Kent",
    image: "/images/locations/kent.jpeg",
    stats: "180+ events",
    testimonial: {
      quote:
        "Our corporate gala needed someone reliable. FunLoading360 delivered flawlessly. Booking them again next year.",
      author: "Corporate Client, Maidstone",
      eventType: "Corporate Event",
    },
    description:
      "Serving Maidstone, Canterbury, and beyond. We've built relationships with Kent's best venues. Expert coverage, transparent pricing.",
  },
  {
    id: "london",
    region: "London",
    image: "/images/locations/london.jpeg",
    stats: "120+ events",
    testimonial: {
      quote:
        "London events are fast-paced. Raz knows the scene, the venues, the expectations. Professional doesn't come close.",
      author: "Event Planner, Central London",
      eventType: "Corporate Event",
    },
    description:
      "Central London and beyond. Premium service for London's premium events. Setup within 25 miles of central areas.",
  },
];

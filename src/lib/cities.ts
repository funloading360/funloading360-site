export interface CityData {
  slug: string;
  name: string;
  region: string;
  description: string;
  localInfo: string;
  distance: string;
}

export const cities: CityData[] = [
  {
    slug: "chelmsford",
    name: "Chelmsford",
    region: "Essex",
    description: "Photo booth hire in Chelmsford for weddings, corporate events and celebrations across Essex.",
    localInfo: "Based in Chelmsford, we serve the entire town including the town centre, suburbs and surrounding villages. Setup is free within 25 miles of our base.",
    distance: "FREE delivery within 25 miles",
  },
  {
    slug: "southend-on-sea",
    name: "Southend-on-Sea",
    region: "Essex",
    description: "Premium photo booth hire in Southend-on-Sea — 360, glam vintage and selfie pods for Essex coast events.",
    localInfo: "Southend-on-Sea's premier photo booth service. We cover the seafront, town centre, Thorpe Bay, Westcliff and all surrounding areas. Perfect for summer events and seaside celebrations.",
    distance: "£1.50 per mile after 25-mile radius",
  },
  {
    slug: "basildon",
    name: "Basildon",
    region: "Essex",
    description: "Photo booth hire Basildon — professional booths for weddings, corporate events and birthday parties.",
    localInfo: "Serving Basildon and South Essex with premium photo booth packages. We cover the town centre, Laindon, Pitsea and all local venues.",
    distance: "£1.50 per mile after 25-mile radius",
  },
  {
    slug: "colchester",
    name: "Colchester",
    region: "Essex",
    description: "Photo booth hire Colchester — 360, glam and selfie pods for North Essex events and celebrations.",
    localInfo: "Colchester's trusted photo booth provider. We serve the historic town centre, Dedham Vale and surrounding North Essex communities.",
    distance: "£1.50 per mile after 25-mile radius",
  },
  {
    slug: "romford",
    name: "Romford",
    region: "Essex/London",
    description: "Photo booth hire Romford — serving East London and Essex border with premium booth packages.",
    localInfo: "Romford and East London's photo booth specialist. We cover Romford town centre, Hornchurch, Upminster and the surrounding areas.",
    distance: "London delivery +£50 supplement",
  },
  {
    slug: "maidstone",
    name: "Maidstone",
    region: "Kent",
    description: "Photo booth hire Maidstone — premium booths for Kent weddings, corporate events and parties.",
    localInfo: "Kent's leading photo booth service based near Maidstone. We serve the county town, surrounding villages and all of West Kent.",
    distance: "£1.50 per mile after 25-mile radius",
  },
  {
    slug: "canterbury",
    name: "Canterbury",
    region: "Kent",
    description: "Photo booth hire Canterbury — event photo booths for Kent's historic city and surrounding areas.",
    localInfo: "Serving Canterbury, Whitstable, Herne Bay and all of East Kent. Perfect for historic venues, coastal celebrations and Canterbury events.",
    distance: "£1.50 per mile after 25-mile radius",
  },
  {
    slug: "london",
    name: "London",
    region: "Greater London",
    description: "Photo booth hire London — premium 360, glam and selfie pods for London venues and celebrations.",
    localInfo: "Serving East London, Central London and surrounding Greater London areas. We cover all major London venues and event spaces.",
    distance: "+£50 supplement on all packages",
  },
  {
    slug: "bromley",
    name: "Bromley",
    region: "Greater London",
    description: "Photo booth hire Bromley — South London's premium photo booth service for events and celebrations.",
    localInfo: "Bromley and South London photo booth specialist. We serve Bromley town centre, Croydon, Beckenham and all surrounding South London areas.",
    distance: "+£50 supplement on all packages",
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((city) => city.slug === slug);
}

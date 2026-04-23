export interface NearbyVenue {
  name: string;
  type: "wedding" | "corporate" | "hotel" | "manor" | "barn" | "club" | "other";
  notes?: string;
}

export interface CityFAQ {
  question: string;
  answer: string;
}

export interface CityTestimonialRef {
  testimonialId: string;
  venue?: string;
}

export interface UpcomingSlot {
  startDate: string; // ISO: "2026-05-17"
  label: string; // "Saturday afternoon slot"
  priceFrom: number;
}

export interface CityData {
  slug: string;
  name: string;
  region: string;
  county: string;
  description: string;
  localInfo: string;
  distance: string;
  lat: number;
  lng: number;
  seoContent: string;

  // Phase 2 extensions — feed new schemas and page sections.
  h1: string; // unique per-city H1 for SEO
  aeoFirstParagraph: string; // AEO-extractable 40-80 word opener
  postcodes: string[]; // ["CM1", "CM2", "CM3"]
  radiusKm: number; // for LocalBusiness GeoCircle areaServed
  priceFrom: number; // cheapest package price for this city (may include supplement)
  travelNote: string; // short, human-readable travel pricing
  nearbyVenues: NearbyVenue[]; // 5+ named venues for local authority
  cityFAQs: CityFAQ[]; // 5+ postcode/city-specific Q&As for FAQPage schema
  cityTestimonials: CityTestimonialRef[]; // references into testimonials.ts by id
  upcomingSlots?: UpcomingSlot[]; // optional, for Event schema
}

export const cities: CityData[] = [
  {
    slug: "chelmsford",
    name: "Chelmsford",
    region: "Essex",
    county: "Essex",
    description:
      "Photo booth hire in Chelmsford for weddings, corporate events and celebrations across Essex.",
    localInfo:
      "Based in Chelmsford, we serve the entire town including the town centre, suburbs and surrounding villages. Setup is free within 25 miles of our base.",
    distance: "FREE delivery within 25 miles",
    lat: 51.7356,
    lng: 0.4685,
    h1: "360 Photo Booth Hire Chelmsford — Weddings & Events from £280",
    aeoFirstParagraph:
      "FunLoading360 offers 360 photo booth hire in Chelmsford, Essex, covering CM1, CM2, and CM3 postcodes from £280 for 2 hours. Free delivery within 25 miles of our South Woodham Ferrers base. Trusted by 48+ couples and event planners across Essex for weddings, corporate events, birthdays and proms in 2026.",
    postcodes: ["CM1", "CM2", "CM3"],
    radiusKm: 25,
    priceFrom: 280,
    travelNote: "Free delivery (25-mile zone)",
    nearbyVenues: [
      { name: "Channels Estate", type: "wedding", notes: "Country house weddings" },
      { name: "Old Shire Hall", type: "wedding", notes: "Historic city centre venue" },
      { name: "The County Hotel", type: "hotel" },
      { name: "Ivy Hill Hotel", type: "wedding", notes: "Margaretting, 4-star" },
      { name: "Pontlands Park", type: "hotel", notes: "Great Baddow, weddings + corporate" },
      { name: "Holiday Inn Chelmsford", type: "hotel", notes: "Corporate events" },
    ],
    cityFAQs: [
      {
        question: "Do you deliver photo booths to CM1, CM2 and CM3?",
        answer:
          "Yes — all three central Chelmsford postcodes fall inside our free 25-mile delivery zone. There is no delivery surcharge for any address in CM1, CM2, or CM3.",
      },
      {
        question: "How much is photo booth hire for a Chelmsford wedding in 2026?",
        answer:
          "A 2-hour 360 Slow Motion booth starts at £280. A 3-hour Glam Vintage booth with unlimited prints is £400. Full-day corporate packages start at £549 for 4 hours.",
      },
      {
        question: "Can you set up at Channels Estate or Ivy Hill Hotel?",
        answer:
          "Yes — we have set up at both venues multiple times and are familiar with their setup requirements. Arrival is 60-90 minutes before your event starts.",
      },
      {
        question: "How far in advance should I book for a Chelmsford Saturday wedding?",
        answer:
          "Saturday weddings in May-September typically book 6-9 months ahead. Off-peak (Nov-Feb) or weekday bookings can be secured 2-4 weeks out.",
      },
      {
        question: "Do you provide a props box for Chelmsford birthday parties?",
        answer:
          "Yes — every hire includes a themed props box. For corporate brand activations in Chelmsford we also supply branded overlays and custom props on request.",
      },
    ],
    cityTestimonials: [
      { testimonialId: "1", venue: "Channels Estate" },
      { testimonialId: "5" },
    ],
    seoContent:
      "FunLoading360 is proud to offer premium photo booth hire in Chelmsford, Essex — covering weddings, birthday parties, corporate events, school proms, and more across the CM1, CM2, and CM3 postcode areas. Whether you're celebrating at the stunning Channels Estate, the historic Old Shire Hall, or any other Chelmsford venue, our photo booths deliver an unforgettable experience for your guests. Choose from our 360° Slow Motion booth for dramatic cinematic clips, the Glam Vintage booth for timeless elegance with unlimited printing, or the crowd-pleasing Selfie Pod for intimate gatherings. As the county town of Essex, Chelmsford hosts hundreds of weddings and events each year — and FunLoading360 is here to make yours shine. We offer free delivery within 25 miles of our South Woodham Ferrers base, which includes all of central Chelmsford. Our friendly operators set up fully within 60 minutes and stay for the duration of your event. All booths include digital sharing via QR code, custom overlays, and props. Trusted by over 48 clients with 5-star reviews on Bark.com and Poptop. Call us on +44 7482 112110 or book your Chelmsford photo booth online today — and remember, you get a full refund if you cancel more than 90 days before your event.",
  },
  {
    slug: "southend-on-sea",
    name: "Southend-on-Sea",
    region: "Essex",
    county: "Essex",
    description:
      "Premium photo booth hire in Southend-on-Sea — 360, glam vintage and selfie pods for Essex coast events.",
    localInfo:
      "Southend-on-Sea's premier photo booth service. We cover the seafront, town centre, Thorpe Bay, Westcliff and all surrounding areas. Perfect for summer events and seaside celebrations.",
    distance: "£1.50 per mile after 25-mile radius",
    lat: 51.5382,
    lng: 0.7144,
    h1: "Photo Booth Hire Southend-on-Sea — 360° & Glam Booths from £280",
    aeoFirstParagraph:
      "FunLoading360 offers photo booth hire in Southend-on-Sea, covering SS1, SS2, and SS9 postcodes, from £280 for 2 hours. We travel to Southend from our Chelmsford base — typical travel adds £15-£20 on top of hire price. Trusted choice for Essex coast weddings, beach parties and corporate events in 2026.",
    postcodes: ["SS1", "SS2", "SS9"],
    radiusKm: 20,
    priceFrom: 295,
    travelNote: "~£15-20 travel surcharge beyond 25-mile zone",
    nearbyVenues: [
      { name: "Roslin Beach Hotel", type: "wedding", notes: "Seafront weddings, 4-star" },
      { name: "Cliffs Pavilion", type: "other", notes: "Large events and shows" },
      { name: "The Park Inn Palace Hotel", type: "hotel" },
      { name: "Lawn & Dore", type: "other", notes: "Leigh-on-Sea venue" },
      { name: "Westcliff Hotel", type: "hotel" },
    ],
    cityFAQs: [
      {
        question: "Do you cover SS1, SS2, SS9 and Leigh-on-Sea?",
        answer:
          "Yes — we regularly deliver photo booths across all Southend postcodes including Westcliff, Thorpe Bay, Shoebury, and Leigh-on-Sea. Travel pricing is confirmed upfront in your quote.",
      },
      {
        question: "Can you set up at the Roslin Beach Hotel?",
        answer:
          "Yes — the Roslin Beach Hotel is one of our most frequently-booked Southend venues. We are familiar with the setup areas and venue access procedures.",
      },
      {
        question: "How much is a 360 photo booth for a Southend wedding?",
        answer:
          "From £295 for a 2-hour Essential package with free delivery travel included in quote. Glam Vintage with unlimited prints from £315.",
      },
      {
        question: "Do you do summer beach parties and outdoor events?",
        answer:
          "Yes, as long as shelter is provided (gazebo, marquee, or covered area). We cannot set up in direct rain without cover due to equipment safety.",
      },
      {
        question: "How early do you arrive for a Southend event?",
        answer:
          "60-90 minutes before your event starts. For coastal venues with restricted parking we may request arrival 2 hours ahead.",
      },
    ],
    cityTestimonials: [{ testimonialId: "2" }],
    seoContent:
      "FunLoading360 brings award-winning photo booth hire to Southend-on-Sea, covering the SS1, SS2, and SS9 postcode areas along Essex's beloved coastline. Whether your event is at the iconic Roslin Beach Hotel, the Cliff Pavilion, or a seafront venue along the world's longest pleasure pier, our booths add a spectacular touch that your guests will never forget. Southend is famous for its vibrant events calendar, from summer beach parties in Thorpe Bay and Westcliff-on-Sea to wedding receptions in Leigh-on-Sea and Shoeburyness. We offer three booth styles — the 360° Slow Motion video booth, the Glam Vintage photo booth with instant printing, and the compact Selfie Pod — all available with custom branded overlays and a full props package. Located just under 20 miles from our South Woodham Ferrers base, Southend-on-Sea falls within our standard travel zone, with delivery costs confirmed in your quote. Our professional operators arrive 60–90 minutes before your event, handle all setup and pack-down, and provide live technical support throughout. Guests receive instant digital copies via QR code, perfect for sharing on social media. With over 48 five-star reviews and hundreds of happy clients across Essex, FunLoading360 is the trusted choice for photo booth hire in Southend. Call +44 7482 112110 or book online today.",
  },
  {
    slug: "basildon",
    name: "Basildon",
    region: "Essex",
    county: "Essex",
    description:
      "Photo booth hire Basildon — professional booths for weddings, corporate events and birthday parties.",
    localInfo:
      "Serving Basildon and South Essex with premium photo booth packages. We cover the town centre, Laindon, Pitsea and all local venues.",
    distance: "£1.50 per mile after 25-mile radius",
    lat: 51.5763,
    lng: 0.488,
    h1: "Photo Booth Hire Basildon — Weddings, Corporate & Parties from £280",
    aeoFirstParagraph:
      "FunLoading360 provides photo booth hire in Basildon, covering SS13, SS14, SS15, and SS16 postcodes, from £280 for 2 hours. We travel to Basildon regularly from our South Woodham Ferrers base with a small mileage supplement applied in quote. 4.9-star rating from 48+ Essex clients.",
    postcodes: ["SS13", "SS14", "SS15", "SS16"],
    radiusKm: 20,
    priceFrom: 290,
    travelNote: "~£10-15 travel surcharge beyond 25-mile zone",
    nearbyVenues: [
      { name: "Orsett Hall Hotel", type: "wedding", notes: "Nearby country house weddings" },
      { name: "Holiday Inn Basildon", type: "hotel", notes: "Corporate events" },
      { name: "Festival Leisure Park", type: "other" },
      { name: "The Towngate Theatre", type: "other" },
      { name: "Basildon Golf Club", type: "other" },
    ],
    cityFAQs: [
      {
        question: "Do you deliver to SS13, SS14, SS15 and SS16?",
        answer:
          "Yes — all four central Basildon postcodes and surrounding areas including Laindon, Pitsea, Vange, and Langdon Hills. Travel cost shown in your quote before you book.",
      },
      {
        question: "Can you set up at Orsett Hall Hotel?",
        answer:
          "Yes — we have delivered photo booths at Orsett Hall multiple times for weddings and corporate events.",
      },
      {
        question: "What's included in a Basildon photo booth hire?",
        answer:
          "A full props box, custom-branded digital overlay, instant QR-code sharing, delivery and setup (up to 25 miles free), dedicated operator for full event duration, pack-down.",
      },
      {
        question: "Do you serve corporate events in Basildon?",
        answer:
          "Yes — our corporate packages start at £549 for 4 hours and include branded overlays, GDPR-compliant data capture, and same-day gallery delivery.",
      },
      {
        question: "Can I hire for a weekday in Basildon?",
        answer:
          "Yes — weekday bookings (Monday–Thursday) outside peak season qualify for 10% off.",
      },
    ],
    cityTestimonials: [{ testimonialId: "3" }],
    seoContent:
      "FunLoading360 delivers premium photo booth hire across Basildon and South Essex, covering the SS13, SS14, SS15, and SS16 postcode areas. Basildon is one of Essex's busiest event destinations, and our team regularly serves weddings at the Orsett Hall Hotel, corporate functions at the Holiday Inn Basildon, birthday parties in Laindon and Pitsea, and school proms throughout the district. Our three booth options — the spectacular 360° Slow Motion booth, the elegant Glam Vintage booth with unlimited prints, and the versatile Selfie Pod — can be tailored to any venue size or event theme. Every hire includes a full props box, custom overlay design, and instant digital sharing via QR code so your guests can post to social media in seconds. Basildon sits within easy reach of our South Woodham Ferrers base, and we provide transparent travel pricing in every quote — no hidden fees, ever. Our fully trained attendants handle all setup, operation, and pack-down, leaving you free to enjoy your event. We've built a reputation across South Essex for reliability, professionalism, and delivering wow-factor entertainment that guests talk about long after the event. With 48 five-star reviews on Bark.com and Poptop, we're proud to be one of the most trusted photo booth hire companies in Basildon. Contact us on +44 7482 112110 or book your date online now.",
  },
  {
    slug: "colchester",
    name: "Colchester",
    region: "Essex",
    county: "Essex",
    description:
      "Photo booth hire Colchester — 360, glam and selfie pods for North Essex events and celebrations.",
    localInfo:
      "Colchester's trusted photo booth provider. We serve the historic town centre, Dedham Vale and surrounding North Essex communities.",
    distance: "£1.50 per mile after 25-mile radius",
    lat: 51.8959,
    lng: 0.8919,
    h1: "Photo Booth Hire Colchester — 360° Booths for North Essex from £295",
    aeoFirstParagraph:
      "FunLoading360 offers photo booth hire in Colchester, covering CO1-CO7 postcodes, from £295 for 2 hours including travel. We regularly service Colchester weddings at Layer Marney Tower, corporate events at city-centre venues, and University of Essex functions. 4.9-star rating from 48+ Essex clients.",
    postcodes: ["CO1", "CO2", "CO3", "CO4", "CO5", "CO6", "CO7"],
    radiusKm: 15,
    priceFrom: 310,
    travelNote: "~£30-40 travel surcharge (outside 25-mile zone)",
    nearbyVenues: [
      { name: "Layer Marney Tower", type: "wedding", notes: "Tudor-era manor, flagship wedding venue" },
      { name: "Colchester Castle", type: "wedding", notes: "Historic centre events" },
      { name: "Prested Hall Hotel", type: "hotel" },
      { name: "Five Lakes Resort", type: "wedding", notes: "Tollesbury, golf + spa" },
      { name: "University of Essex", type: "other", notes: "Wivenhoe campus events" },
    ],
    cityFAQs: [
      {
        question: "Which Colchester postcodes do you serve?",
        answer:
          "All seven central Colchester districts: CO1, CO2, CO3, CO4, CO5, CO6, and CO7, plus surrounding villages. Travel pricing is included upfront.",
      },
      {
        question: "Can you set up at Layer Marney Tower?",
        answer:
          "Yes — Layer Marney Tower is one of our most frequently-booked North Essex wedding venues. We're familiar with the Tudor-era restrictions (no power drilling into walls, uplighter-only arrangements, etc.).",
      },
      {
        question: "How much does photo booth hire cost in Colchester?",
        answer:
          "From £310 including travel for a 2-hour 360 Slow Motion booth. Glam Vintage with unlimited prints from £340.",
      },
      {
        question: "Do you serve University of Essex student events?",
        answer:
          "Yes — we regularly supply booths for University of Essex balls, society events, and graduations at the Wivenhoe Park campus.",
      },
      {
        question: "Do you deliver to Dedham Vale and surrounding villages?",
        answer:
          "Yes — Dedham, Stratford St Mary, and surrounding villages are all within our regular service area.",
      },
    ],
    cityTestimonials: [{ testimonialId: "4" }],
    seoContent:
      "FunLoading360 offers premium photo booth hire in Colchester and across North Essex, covering CO1, CO2, CO3, and CO4 postcodes. As Britain's oldest recorded town, Colchester is home to a wealth of stunning event venues — from the atmospheric Colchester Castle and the grand Layer Marney Tower, to boutique hotel venues in Dedham Vale and private function rooms throughout the town centre. Our photo booths are the perfect addition to weddings, birthday celebrations, corporate dinners, and university events at the University of Essex campus. Choose from the 360° Slow Motion video booth that creates cinematic looping clips, the Glam Vintage booth with gilded frames and unlimited prints, or the compact Selfie Pod ideal for intimate gatherings. Every package includes a props box, custom-branded digital overlays, instant QR-code sharing, and a dedicated on-site operator. Colchester is approximately 25–30 miles from our South Woodham Ferrers base; travel costs are always confirmed upfront in your personalised quote. FunLoading360 prides itself on seamless service — we arrive early, set up discreetly, and ensure the booth runs flawlessly throughout your event. Rated 4.9 out of 5 across 48 reviews, we're the go-to photo booth company for Colchester events. Call us on +44 7482 112110 or book online and get a response within 2 hours.",
  },
  {
    slug: "brentwood",
    name: "Brentwood",
    region: "Essex",
    county: "Essex",
    description:
      "Photo booth hire Brentwood — 360, glam and selfie pods for weddings and corporate events across West Essex.",
    localInfo:
      "Brentwood's trusted photo booth provider. We cover the town centre, Shenfield, Ingatestone and all West Essex villages.",
    distance: "FREE delivery within 25 miles",
    lat: 51.622,
    lng: 0.305,
    h1: "Photo Booth Hire Brentwood — 360° & Glam Booths from £280",
    aeoFirstParagraph:
      "FunLoading360 offers photo booth hire in Brentwood, Essex, covering CM13, CM14, and CM15 postcodes, from £280 for 2 hours with FREE delivery (under 25 miles from our Chelmsford base). Popular at Brentwood wedding and corporate venues along the M25-A12 corridor. 4.9-star rating from 48+ Essex clients.",
    postcodes: ["CM13", "CM14", "CM15"],
    radiusKm: 25,
    priceFrom: 280,
    travelNote: "Free delivery (25-mile zone)",
    nearbyVenues: [
      { name: "Marygreen Manor Hotel", type: "wedding", notes: "Tudor manor wedding venue" },
      { name: "Weald Park Hotel & Golf Club", type: "wedding", notes: "South Weald, weddings + corporate" },
      { name: "The Warley Park Hotel", type: "hotel", notes: "Brentwood-adjacent venues" },
      { name: "Thorndon Park Country Club", type: "wedding", notes: "Golf + weddings" },
      { name: "Sugar Hut", type: "club", notes: "Celebrity nightspot events" },
    ],
    cityFAQs: [
      {
        question: "Do you deliver free to CM13, CM14 and CM15?",
        answer:
          "Yes — Brentwood is within our 25-mile free delivery zone from South Woodham Ferrers. No mileage charge applies to any central Brentwood, Shenfield, or Ingatestone booking.",
      },
      {
        question: "Can you set up at Marygreen Manor or Weald Park?",
        answer:
          "Yes — both are regular Brentwood venues for us. We're familiar with their function room setup requirements and arrival windows.",
      },
      {
        question: "How much is a 360 photo booth for a Brentwood wedding?",
        answer:
          "A 2-hour 360 Slow Motion Essential package starts at £280. A 3-hour Glam Vintage booth with unlimited prints is £400.",
      },
      {
        question: "Do you cover Shenfield, Ingatestone and Herongate?",
        answer:
          "Yes — all villages and outskirts of Brentwood fall inside our free 25-mile zone.",
      },
      {
        question: "Do you do corporate brand activations in Brentwood?",
        answer:
          "Yes — our corporate half-day package (4 hours) starts at £549 and includes branded overlays, GDPR-compliant data capture, and dedicated account manager.",
      },
    ],
    cityTestimonials: [{ testimonialId: "7" }],
    seoContent:
      "FunLoading360 provides premium photo booth hire in Brentwood and across West Essex, covering CM13, CM14, and CM15 postcodes — including Shenfield, Ingatestone, Herongate, and South Weald. Brentwood's thriving wedding and corporate events scene makes it one of our most-booked destinations, with frequent events at Marygreen Manor Hotel, Weald Park Hotel & Golf Club, Thorndon Park Country Club, and the iconic Sugar Hut. Whether you're planning a grand wedding reception, a corporate product launch along the M25-A12 corridor, a milestone birthday, or a school prom, our three booth formats — 360° Slow Motion, Glam Vintage, and Selfie Pod — adapt to every venue style. Brentwood sits comfortably within our 25-mile free delivery zone from South Woodham Ferrers, so there's no travel surcharge. Every booking includes a themed props box, bespoke digital overlays with your event details, instant QR-code photo sharing for guests, and a professional attendant for the entire event. With a 4.9-star rating from 48+ verified Essex reviews, FunLoading360 is the trusted photo booth choice across Brentwood. Call +44 7482 112110 or book your date online — we respond within 2 hours.",
  },
  {
    slug: "romford",
    name: "Romford",
    region: "Essex/London",
    county: "Essex",
    description:
      "Photo booth hire Romford — serving East London and Essex border with premium booth packages.",
    localInfo:
      "Romford and East London's photo booth specialist. We cover Romford town centre, Hornchurch, Upminster and the surrounding areas.",
    distance: "London delivery +£50 supplement",
    lat: 51.5754,
    lng: 0.183,
    h1: "Photo Booth Hire Romford — 360° & Glam Booths (East London) from £330",
    aeoFirstParagraph:
      "FunLoading360 provides photo booth hire in Romford, covering RM1-RM3, RM11 and RM14 postcodes, from £330 for 2 hours including the £50 London-fringe supplement. Regular setups at Romford wedding and nightlife venues across Hornchurch, Upminster and the East London border. 4.9-star rating from 48+ reviews.",
    postcodes: ["RM1", "RM2", "RM3", "RM11", "RM14"],
    radiusKm: 10,
    priceFrom: 330,
    travelNote: "Includes +£50 London-fringe supplement",
    nearbyVenues: [
      { name: "Faces Nightclub", type: "club", notes: "Romford landmark nightspot" },
      { name: "Mercury Gardens", type: "other", notes: "Private function space" },
      { name: "Brookside Golf & Events", type: "wedding", notes: "Hornchurch weddings + corporate" },
      { name: "Stock Brook Country Club", type: "wedding" },
      { name: "Upminster Golf Club", type: "other" },
    ],
    cityFAQs: [
      {
        question: "Do you cover RM1, RM2, RM11 and Upminster?",
        answer:
          "Yes — all Romford, Hornchurch, and Upminster postcodes. A £50 London-fringe supplement is applied to reflect travel from our South Woodham Ferrers base.",
      },
      {
        question: "Can you set up at Brookside Golf & Events?",
        answer:
          "Yes — Brookside is one of our regular Hornchurch venues. We know their setup areas and parking arrangements well.",
      },
      {
        question: "How much is a photo booth in Romford after the London supplement?",
        answer:
          "From £330 for a 2-hour 360 Slow Motion Essential package (includes £50 fringe supplement). Glam Vintage from £350.",
      },
      {
        question: "Do you do nightclub events at Faces Romford?",
        answer:
          "Yes — we regularly supply booths for private nightclub events including Faces. Please confirm venue technical and noise requirements before booking.",
      },
      {
        question: "Is the £50 supplement shown upfront?",
        answer:
          "Yes — every Romford quote includes the supplement line-item. No surprises.",
      },
    ],
    cityTestimonials: [{ testimonialId: "6" }],
    seoContent:
      "FunLoading360 is your trusted provider of photo booth hire in Romford and the wider East London–Essex border area, covering RM1, RM2, RM3, RM11, and RM14 postcodes. Romford's vibrant social scene makes it one of the busiest event hubs in East London, with popular venues including Faces Nightclub, the Mercury Gardens, Brookside Golf & Events, and dozens of hotel and restaurant function rooms throughout Hornchurch and Upminster. Our photo booth packages are tailored for weddings, milestone birthdays, engagement parties, and corporate dinners. Select from the show-stopping 360° Slow Motion video booth, the timeless Glam Vintage booth with unlimited metallic prints, or the sleek Selfie Pod for smaller spaces. All packages come with a themed props box, bespoke digital overlays, QR-code sharing, and a friendly on-site attendant for the full duration. A London supplement of £50 applies to Romford bookings, and this is always confirmed in your initial quote — no surprises. From our South Woodham Ferrers base, we regularly travel to Romford for events, building strong relationships with local venues and event planners. Our 4.9-star rating across 48 reviews reflects our commitment to outstanding service every time. Whether you're planning a lavish wedding or a landmark birthday party, FunLoading360 will make it unforgettable. Call +44 7482 112110 or book online today.",
  },
  {
    slug: "maidstone",
    name: "Maidstone",
    region: "Kent",
    county: "Kent",
    description:
      "Photo booth hire Maidstone — premium booths for Kent weddings, corporate events and parties.",
    localInfo:
      "Kent's leading photo booth service based near Maidstone. We serve the county town, surrounding villages and all of West Kent.",
    distance: "£1.50 per mile after 25-mile radius",
    lat: 51.272,
    lng: 0.529,
    h1: "Photo Booth Hire Maidstone — Kent's 360° & Glam Booth Specialist from £320",
    aeoFirstParagraph:
      "FunLoading360 provides photo booth hire in Maidstone, covering ME14-ME17 postcodes, from £320 for 2 hours including travel. Regular setups at Hempstead House Hotel, Larkfield Priory, and Weald of Kent wedding venues. 4.9-star rating from 48+ reviews.",
    postcodes: ["ME14", "ME15", "ME16", "ME17"],
    radiusKm: 15,
    priceFrom: 320,
    travelNote: "~£40-50 travel surcharge (outside 25-mile zone)",
    nearbyVenues: [
      { name: "Hempstead House Hotel", type: "wedding", notes: "Bapchild, multi-award wedding venue" },
      { name: "Larkfield Priory Hotel", type: "hotel" },
      { name: "The Orangery", type: "wedding", notes: "Maidstone walled garden" },
      { name: "Leeds Castle", type: "wedding", notes: "Iconic Kent castle weddings" },
      { name: "Boughton Monchelsea Place", type: "manor", notes: "Weald of Kent estate" },
    ],
    cityFAQs: [
      {
        question: "Do you cover all Maidstone postcodes (ME14-ME17)?",
        answer:
          "Yes — central Maidstone (ME14-ME16) and surrounding villages (ME17). Travel pricing is included in your quote before you book.",
      },
      {
        question: "Can you set up at Leeds Castle or Hempstead House?",
        answer:
          "Yes — we're familiar with Leeds Castle function spaces and have set up at Hempstead House many times. For Leeds Castle we arrange site access 48 hours in advance.",
      },
      {
        question: "How much is photo booth hire for a Maidstone wedding?",
        answer:
          "From £320 including travel for a 2-hour 360 Slow Motion booth. Glam Vintage with unlimited prints from £340.",
      },
      {
        question: "Do you work with Weald of Kent rural venues?",
        answer:
          "Yes — rural venues, barn conversions, and manor houses across the Weald of Kent are a specialty. Please confirm 13A power access.",
      },
      {
        question: "Can you do outdoor marquee weddings in Kent?",
        answer:
          "Yes — with shelter from rain (gazebo, marquee, or covered annex) and access to a 13A socket within 25 metres.",
      },
    ],
    cityTestimonials: [{ testimonialId: "5" }],
    seoContent:
      "FunLoading360 offers first-class photo booth hire in Maidstone and across West Kent, serving the ME14, ME15, ME16, and ME17 postcode areas. Maidstone is the county town of Kent and one of the most sought-after wedding and events destinations in the South East. Whether you're hosting a reception at the spectacular Hempstead House Hotel, the charming Larkfield Priory, or any of the many barns, manors, and country houses dotted across the Weald of Kent, our booths bring the party to life. We offer three outstanding booth experiences: the 360° Slow Motion video booth for dramatic group shots and cinematic clips, the Glam Vintage booth with unlimited instant printing and gold trim, and the compact Selfie Pod for more intimate settings. Every booking includes a curated props collection, custom digital overlays, instant QR-code photo sharing, and a professional attendant on-site throughout. Travel to Maidstone from our South Woodham Ferrers base is priced per mile beyond our 25-mile free zone, and all costs are included in your upfront quote. Kent's garden county setting deserves nothing less than the finest entertainment — and with 48 five-star reviews and a 4.9 rating, FunLoading360 delivers exactly that. Get in touch on +44 7482 112110 or book your Maidstone event photo booth online now.",
  },
  {
    slug: "canterbury",
    name: "Canterbury",
    region: "Kent",
    county: "Kent",
    description:
      "Photo booth hire Canterbury — event photo booths for Kent's historic city and surrounding areas.",
    localInfo:
      "Serving Canterbury, Whitstable, Herne Bay and all of East Kent. Perfect for historic venues, coastal celebrations and Canterbury events.",
    distance: "£1.50 per mile after 25-mile radius",
    lat: 51.2798,
    lng: 1.083,
    h1: "Photo Booth Hire Canterbury — East Kent's Premium 360° Booth Service from £340",
    aeoFirstParagraph:
      "FunLoading360 offers photo booth hire in Canterbury, covering CT1-CT4 postcodes and East Kent coast, from £340 for 2 hours including travel. Regular setups at Canterbury cathedral-area venues, barn conversions in Whitstable, and Herne Bay coastal events. 4.9-star rating from 48+ Kent and Essex reviews.",
    postcodes: ["CT1", "CT2", "CT3", "CT4"],
    radiusKm: 15,
    priceFrom: 340,
    travelNote: "~£60-70 travel surcharge (Canterbury is 55-60 miles from base)",
    nearbyVenues: [
      { name: "The Abode Canterbury", type: "hotel", notes: "Luxury city-centre venue" },
      { name: "Eastwell Manor", type: "manor", notes: "Ashford-adjacent 5-star" },
      { name: "Thanington House Hotel", type: "wedding" },
      { name: "Canterbury Cathedral Lodge", type: "wedding", notes: "Cathedral-precinct receptions" },
      { name: "Whitstable Castle", type: "wedding", notes: "Coastal Kent weddings" },
    ],
    cityFAQs: [
      {
        question: "Do you cover CT1, CT2, CT3, CT4 and coastal Kent?",
        answer:
          "Yes — all four central Canterbury postcodes plus Whitstable (CT5), Herne Bay (CT6), and surrounding villages. Distance-based travel is included in your quote.",
      },
      {
        question: "Can you set up at Canterbury Cathedral Lodge?",
        answer:
          "Yes — Canterbury Cathedral Lodge requires early venue access coordination, which we arrange at booking.",
      },
      {
        question: "How much is photo booth hire in Canterbury?",
        answer:
          "From £340 including travel for a 2-hour 360 Slow Motion booth. Glam Vintage with unlimited prints from £370.",
      },
      {
        question: "How early do you arrive for Canterbury events?",
        answer:
          "Given Canterbury is 55-60 miles from our base, we arrive 90-120 minutes before your event start.",
      },
      {
        question: "Do you set up in historic or listed buildings?",
        answer:
          "Yes — we regularly work in listed venues. We use non-damaging setups and don't require wall drilling or fixed attachments.",
      },
    ],
    cityTestimonials: [{ testimonialId: "4" }],
    seoContent:
      "FunLoading360 provides premium photo booth hire in Canterbury and across East Kent, serving CT1, CT2, CT3, and CT4 postcodes, as well as coastal towns including Whitstable and Herne Bay. Canterbury is one of England's most iconic cities, and its extraordinary selection of historic venues makes every event truly special. From medieval halls and boutique hotel ballrooms in the city centre to barn conversions in the surrounding Kent countryside, our photo booths are the perfect complement to the setting. Our 360° Slow Motion video booth is a particular favourite at Canterbury weddings — guests step onto the platform and spin while slow-motion clips are generated automatically, branded with your event details. The Glam Vintage booth suits formal dinners and charity galas, while the Selfie Pod works brilliantly at smaller family events and school proms. All packages include a full props box, bespoke digital overlays, instant QR-code sharing, and a dedicated operator who stays for the entirety of your event. Canterbury is approximately 55–60 miles from our South Woodham Ferrers base; we provide a fully transparent travel quote before you commit. FunLoading360 has earned a 4.9-star rating across 48 verified reviews, making us one of the most trusted photo booth hire companies serving East Kent. Book online or call us on +44 7482 112110 — we'll confirm availability within 2 hours.",
  },
  {
    slug: "london",
    name: "London",
    region: "Greater London",
    county: "Greater London",
    description:
      "Photo booth hire London — premium 360, glam and selfie pods for London venues and celebrations.",
    localInfo:
      "Serving East London, Central London and surrounding Greater London areas. We cover all major London venues and event spaces.",
    distance: "+£50 supplement on all packages",
    lat: 51.5074,
    lng: -0.1278,
    h1: "Photo Booth Hire London — 360° Slow Motion & Glam Booths from £330",
    aeoFirstParagraph:
      "FunLoading360 offers photo booth hire across London — Central, East, and Greater London venues — from £330 for 2 hours (includes £50 London supplement). Popular at Shoreditch rooftops, Canary Wharf corporate dinners, and City of London events. 4.9-star rating from 48+ reviews.",
    postcodes: ["E1", "E2", "EC1", "EC2", "SE1", "W1", "WC1", "N1"],
    radiusKm: 10,
    priceFrom: 330,
    travelNote: "+£50 London supplement on all packages",
    nearbyVenues: [
      { name: "The Ned London", type: "hotel", notes: "City of London boutique hotel" },
      { name: "Rosewood London", type: "hotel", notes: "Holborn luxury" },
      { name: "Shoreditch Studios", type: "other", notes: "Corporate and brand activations" },
      { name: "The Shard (Shangri-La)", type: "other", notes: "Landmark London events" },
      { name: "Canary Wharf function rooms", type: "corporate", notes: "Various corporate venues" },
    ],
    cityFAQs: [
      {
        question: "Do you cover East, Central and North London?",
        answer:
          "Yes — we cover all Greater London postcodes with a flat £50 supplement on all packages to reflect the extended travel time and parking.",
      },
      {
        question: "How much is the London supplement?",
        answer:
          "A flat £50 added to any package. This is always line-itemed in your quote before payment.",
      },
      {
        question: "Can you do corporate brand activations in the City?",
        answer:
          "Yes — our corporate packages include branded overlays, GDPR-compliant data capture, and same-day analytics. From £599 for a 4-hour half-day (£549 base + £50 London supplement).",
      },
      {
        question: "Do you do Shoreditch rooftop and warehouse parties?",
        answer:
          "Yes — the 360 Slow Motion booth is particularly popular at Shoreditch warehouse and rooftop events. We coordinate venue access and timed arrivals.",
      },
      {
        question: "How do you handle London parking and congestion charges?",
        answer:
          "All venue parking, congestion, and ULEZ charges are included in the £50 London supplement — no hidden extras.",
      },
    ],
    cityTestimonials: [{ testimonialId: "8" }],
    seoContent:
      "FunLoading360 brings its award-winning photo booth hire service to London, covering East London, Central London, and all major Greater London event spaces. From rooftop venues in Shoreditch and warehouse loft parties in Hackney to black-tie corporate dinners at Canary Wharf and landmark birthday celebrations in the City of London, we deliver the same premium experience our Essex and Kent clients have come to love. Our flagship 360° Slow Motion video booth is particularly popular at London events — it creates shareable slow-motion clips that guests post to Instagram and TikTok instantly, giving your event incredible organic reach. The Glam Vintage booth suits London's most elegant venues with its gold trim and unlimited metallic prints, while the Selfie Pod is ideal for space-conscious central London venues. A London supplement of £50 is applied to all bookings, reflecting the additional travel from our South Woodham Ferrers base, and this is always quoted upfront before any payment is taken. All packages include a props box, custom overlays, QR-code sharing, and a trained attendant for the full duration of your event. We've served corporate clients, charity galas, product launches, and private parties across London, earning a 4.9-star rating from 48 satisfied clients. Planning a London event? Call us on +44 7482 112110 or book your photo booth online — we respond within 2 hours.",
  },
  {
    slug: "bromley",
    name: "Bromley",
    region: "Greater London",
    county: "Greater London",
    description:
      "Photo booth hire Bromley — South London's premium photo booth service for events and celebrations.",
    localInfo:
      "Bromley and South London photo booth specialist. We serve Bromley town centre, Croydon, Beckenham and all surrounding South London areas.",
    distance: "+£50 supplement on all packages",
    lat: 51.4062,
    lng: 0.0148,
    h1: "Photo Booth Hire Bromley — South London 360° & Glam Booths from £330",
    aeoFirstParagraph:
      "FunLoading360 offers photo booth hire in Bromley, covering BR1-BR7 postcodes, from £330 for 2 hours (includes £50 London supplement). Regular setups at Bromley Court Hotel, Beckenham venues, and Orpington-area events. 4.9-star rating from 48+ reviews.",
    postcodes: ["BR1", "BR2", "BR3", "BR4", "BR5", "BR6", "BR7"],
    radiusKm: 10,
    priceFrom: 330,
    travelNote: "+£50 London supplement on all packages",
    nearbyVenues: [
      { name: "Bromley Court Hotel", type: "hotel", notes: "Flagship Bromley wedding venue" },
      { name: "Ravenswood Club", type: "other", notes: "Bromley Common" },
      { name: "Chatham House Hotel", type: "hotel" },
      { name: "Crystal Palace Park", type: "other", notes: "South London events" },
      { name: "The Warren at Crofton Heath", type: "wedding" },
    ],
    cityFAQs: [
      {
        question: "Do you cover BR1, BR2, BR3 and surrounding South London?",
        answer:
          "Yes — all seven Bromley postcodes (BR1-BR7) plus nearby Beckenham, Orpington, Chislehurst, and Crystal Palace. A £50 London supplement applies.",
      },
      {
        question: "Can you set up at Bromley Court Hotel?",
        answer:
          "Yes — Bromley Court is one of our most-booked South London venues. We know their setup areas, timing windows, and parking arrangements.",
      },
      {
        question: "What's the total cost for a Bromley event?",
        answer:
          "From £330 for a 2-hour 360 Slow Motion Essential (includes £50 London supplement). Glam Vintage with unlimited prints from £350.",
      },
      {
        question: "Do you do South London corporate events?",
        answer:
          "Yes — our corporate half-day (4h) package from £599 (includes London supplement) covers brand activations, product launches, and team events.",
      },
      {
        question: "Can you work at Crystal Palace Park outdoor events?",
        answer:
          "Yes — subject to dry-weather shelter (marquee or gazebo) and access to a 13A power source within 25 metres.",
      },
    ],
    cityTestimonials: [{ testimonialId: "7" }],
    seoContent:
      "FunLoading360 offers premium photo booth hire in Bromley and across South London, covering the BR1, BR2, BR3, and BR7 postcode areas including Beckenham, Orpington, and Chislehurst. Bromley is one of South London's most popular event destinations, with a strong selection of hotels, golf clubs, and function venues hosting hundreds of weddings and celebrations every year. Notable venues in the area include the Bromley Court Hotel, the historic Ravenswood Club in Bromley Common, and various private event spaces in Beckenham and Crystal Palace. Our photo booth packages are designed to work perfectly in any South London setting — whether that's a grand ballroom, a garden marquee, or an intimate private dining room. Choose from the 360° Slow Motion video booth for high-impact group entertainment, the Glam Vintage booth for sophisticated elegance with unlimited printing, or the Selfie Pod for smaller spaces. Every hire includes a full props box, branded digital overlays, QR-code sharing, and a professional attendant for the entire event. A London supplement of £50 is added to all Bromley bookings, with complete travel pricing provided upfront in your personalised quote. Rated 4.9 stars from 48 reviews, FunLoading360 is a trusted name for photo booth hire across Bromley and South London. Call +44 7482 112110 or book your event online — confirmation within 2 hours guaranteed.",
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((city) => city.slug === slug);
}

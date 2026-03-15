export interface Testimonial {
  id: string;
  name: string;
  eventType: string;
  rating: number; // 1-5 stars
  quote: string;
  date: string; // e.g., "May 2025"
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah & James',
    eventType: 'Wedding',
    rating: 5,
    quote: 'The 360 booth was the highlight of our reception! Guests loved it and we got amazing slow-motion videos. FunLoading360 made everything seamless.',
    date: 'May 2025'
  },
  {
    id: '2',
    name: 'Emma Johnson',
    eventType: 'Birthday Party',
    rating: 5,
    quote: 'Incredible setup and professional team. The Glam Vintage booth looked stunning and guests are still talking about it. Highly recommend!',
    date: 'April 2025'
  },
  {
    id: '3',
    name: 'Marcus & Team',
    eventType: 'Corporate Event',
    rating: 5,
    quote: 'The Selfie Pod was perfect for our company offsite. Easy to use, great photo quality, and the instant digital sharing was brilliant.',
    date: 'March 2025'
  },
  {
    id: '4',
    name: 'Lisa Chen',
    eventType: 'Prom After-Party',
    rating: 5,
    quote: 'Best investment for our prom celebration! The instant gallery feature was amazing and photos were professional quality. Worth every penny!',
    date: 'March 2025'
  },
  {
    id: '5',
    name: 'The Williams Family',
    eventType: 'Anniversary Party',
    rating: 5,
    quote: 'Professional, friendly, and incredibly talented team. The photo booth added such a fun element to our celebration. Thank you, FunLoading360!',
    date: 'February 2025'
  },
  {
    id: '6',
    name: 'David Rodriguez',
    eventType: 'Corporate Team Building',
    rating: 5,
    quote: 'The 360 slow-motion booth was the star of our team event. Raz and team were responsive, professional, and created amazing memories for us.',
    date: 'January 2025'
  },
  {
    id: '7',
    name: 'Katherine & Michael',
    eventType: 'Engagement Party',
    rating: 5,
    quote: 'Couldn\'t have asked for better service. The photos are absolutely stunning and guests are still messaging us about the booth. Recommend 10/10!',
    date: 'January 2025'
  },
  {
    id: '8',
    name: 'Priya Patel',
    eventType: 'Corporate Gala',
    rating: 5,
    quote: 'Professional setup, flawless execution, and absolutely gorgeous results. Our guests loved it and the photo quality exceeded expectations.',
    date: 'December 2024'
  },
];

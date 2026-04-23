"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, CheckCircle, ArrowRight, Star } from "lucide-react";
import { CityData } from "@/lib/cities";
import { getTestimonialById } from "@/lib/testimonials";
import {
  buildLocalBusinessSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildReviewListSchema,
  buildEventSchema,
  type ReviewSchemaInput,
} from "@/lib/structured-data";

interface Props {
  city: CityData;
}

const SITE_URL = "https://www.funloading360.co.uk";

export default function CityContent({ city }: Props) {
  const cityUrl = `${SITE_URL}/locations/${city.slug}`;

  const cityTestimonials = (city.cityTestimonials ?? [])
    .map((ref) => {
      const t = getTestimonialById(ref.testimonialId);
      return t ? { testimonial: t, venue: ref.venue ?? t.venue } : null;
    })
    .filter((t): t is NonNullable<typeof t> => t !== null);

  const localBusinessSchema = buildLocalBusinessSchema({
    city: { name: city.name, lat: city.lat, lng: city.lng, radiusKm: city.radiusKm },
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Locations", url: `${SITE_URL}/locations` },
    { name: city.name, url: cityUrl },
  ]);

  const faqSchema = city.cityFAQs && city.cityFAQs.length > 0
    ? buildFAQSchema(city.cityFAQs, 3)
    : null;

  const reviewsSchemaList: ReviewSchemaInput[] = cityTestimonials.map(({ testimonial }) => ({
    author: testimonial.name,
    rating: testimonial.rating,
    body: testimonial.quote,
    datePublished: parseDateToISO(testimonial.date),
    eventType: testimonial.eventType,
    city: city.name,
  }));
  const reviewsSchema = reviewsSchemaList.length > 0
    ? buildReviewListSchema(reviewsSchemaList)
    : null;

  const eventSchemas = (city.upcomingSlots ?? []).map((slot) =>
    buildEventSchema({
      name: `${slot.label} — Photo Booth in ${city.name}`,
      description: `Available ${slot.label} in ${city.name}. 360 Slow Motion, Glam Vintage, and Selfie Pod booths available from £${slot.priceFrom}.`,
      startDate: slot.startDate,
      location: { name: city.name, city: city.name, postalCode: city.postcodes[0] },
      url: cityUrl,
      price: slot.priceFrom,
    })
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      {reviewsSchema && reviewsSchema.map((rs, i) => (
        <script key={`review-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(rs) }} />
      ))}
      {eventSchemas.map((es, i) => (
        <script key={`event-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(es) }} />
      ))}

      <div className="bg-background text-white pt-20 min-h-screen">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 pt-6 pb-0">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
            </li>
            <li className="text-gray-700">/</li>
            <li>
              <Link href="/locations" className="hover:text-white transition-colors">Locations</Link>
            </li>
            <li className="text-gray-700">/</li>
            <li className="text-white font-medium" aria-current="page">{city.name}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gold/5 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-gold" />
                <p className="text-gold text-sm font-semibold uppercase tracking-widest">{city.region}</p>
              </div>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {city.h1 ?? `Photo Booth Hire in ${city.name}`}
              </h1>
              {/* AEO-extractable first paragraph — keep short, declarative, specific. */}
              <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-2xl mx-auto" data-speakable-faq="0">
                {city.aeoFirstParagraph ?? city.description}
              </p>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-background font-bold hover:bg-gold-light transition-colors"
              >
                Book Now <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Local Info + postcodes */}
        <section className="py-16 bg-surface/50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-surface border border-border rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-4">{city.name} Service Area</h2>
              <p className="text-gray-400 mb-4 leading-relaxed">{city.localInfo}</p>
              {city.postcodes && city.postcodes.length > 0 && (
                <p className="text-gray-400 mb-6 leading-relaxed">
                  <span className="text-white font-semibold">Postcodes covered: </span>
                  {city.postcodes.join(", ")}
                </p>
              )}
              <div className="flex items-center gap-2 text-gold">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">{city.travelNote ?? city.distance}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Nearby venues — local authority signal */}
        {city.nearbyVenues && city.nearbyVenues.length > 0 && (
          <section className="py-16 bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2
                className="text-3xl sm:text-4xl font-bold mb-10 text-center"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Popular {city.name} Venues We&apos;ve Booked
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {city.nearbyVenues.map((venue, i) => (
                  <motion.div
                    key={venue.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-surface border border-border rounded-xl p-5"
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-white font-semibold mb-1">{venue.name}</h3>
                        {venue.notes && <p className="text-gray-400 text-sm">{venue.notes}</p>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* City testimonials — Review schema rendered above */}
        {cityTestimonials.length > 0 && (
          <section className="py-16 bg-surface/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2
                className="text-3xl sm:text-4xl font-bold mb-10 text-center"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                What {city.name} Clients Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cityTestimonials.map(({ testimonial, venue }) => (
                  <article
                    key={testimonial.id}
                    className="bg-surface border border-border rounded-xl p-6"
                    itemScope
                    itemType="https://schema.org/Review"
                  >
                    <div className="flex gap-1 mb-3" aria-label={`${testimonial.rating} out of 5 stars`}>
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <blockquote className="text-gray-300 italic mb-4" itemProp="reviewBody">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <footer className="text-sm">
                      <cite className="not-italic text-white font-semibold" itemProp="author">
                        {testimonial.name}
                      </cite>
                      <span className="text-gray-500"> — {testimonial.eventType}</span>
                      {venue && <span className="text-gray-500">, {venue}</span>}
                    </footer>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SEO Content */}
        {city.seoContent && (
          <section className="py-12 bg-background">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="prose prose-invert prose-sm max-w-none text-gray-400 leading-relaxed"
              >
                <p>{city.seoContent}</p>
              </motion.div>
            </div>
          </section>
        )}

        {/* City-specific FAQ — FAQPage schema rendered above */}
        {city.cityFAQs && city.cityFAQs.length > 0 && (
          <section className="py-16 bg-surface/30">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2
                className="text-3xl sm:text-4xl font-bold mb-10 text-center"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {city.name} Photo Booth FAQs
              </h2>
              <div className="space-y-4">
                {city.cityFAQs.map((faq, i) => (
                  <details
                    key={i}
                    className="group bg-surface border border-border rounded-xl p-5 open:bg-surface/80 transition"
                  >
                    <summary className="cursor-pointer font-semibold text-white list-none flex justify-between items-center">
                      <span>{faq.question}</span>
                      <span className="text-gold text-xl group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p
                      className="text-gray-300 mt-3 leading-relaxed"
                      data-speakable-faq={i < 3 ? i.toString() : undefined}
                    >
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Why Choose */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl sm:text-4xl font-bold text-center mb-16"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Why Choose FunLoading360 in {city.name}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Fast Confirmation", desc: "We confirm your booking within 2 hours" },
                { title: "Three Booth Types", desc: "360 slow motion, glam vintage, or selfie pod" },
                { title: "Professional Team", desc: "Trained attendants at every event" },
                { title: "Transparent Pricing", desc: "No hidden fees, all-inclusive packages" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-surface border border-border rounded-xl p-6"
                >
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-surface to-background border-t border-border">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ready to Book Your {city.name} Photo Booth?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              From £{city.priceFrom}. {city.travelNote}. Select your date, choose your booth, and we&apos;ll confirm within 2 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-background font-bold hover:bg-gold-light transition-colors"
              >
                Start Your Booking <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={`/weddings/${city.slug}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-white hover:bg-surface transition-colors"
              >
                {city.name} Weddings <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

/**
 * Parse human-readable date like "May 2025" into ISO "2025-05-01".
 * Falls back to today's date on parse failure.
 */
function parseDateToISO(humanDate: string): string {
  const months = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december",
  ];
  const parts = humanDate.trim().toLowerCase().split(/\s+/);
  if (parts.length === 2) {
    const month = months.indexOf(parts[0]);
    const year = parseInt(parts[1], 10);
    if (month >= 0 && !isNaN(year)) {
      return `${year}-${(month + 1).toString().padStart(2, "0")}-01`;
    }
  }
  return new Date().toISOString().split("T")[0];
}

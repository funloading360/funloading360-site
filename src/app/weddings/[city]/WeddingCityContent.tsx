"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Heart,
  MapPin,
  Star,
} from "lucide-react";
import { CityData } from "@/lib/cities";
import { WeddingFAQ, WeddingPackage } from "@/lib/weddings";
import { Testimonial } from "@/lib/testimonials";

interface Props {
  city: CityData;
  packages: WeddingPackage[];
  cityFAQs: WeddingFAQ[];
  cityTestimonials: Testimonial[];
}

export default function WeddingCityContent({
  city,
  packages,
  cityFAQs,
  cityTestimonials,
}: Props) {
  // Filter city venues to wedding-friendly types.
  const weddingVenues = (city.nearbyVenues ?? []).filter((v) =>
    ["wedding", "hotel", "manor", "barn"].includes(v.type)
  );

  // City-supplement-aware pricing for packages.
  const baseDelta = city.priceFrom - 280; // 280 = baseline Chelmsford priceFrom
  const adjustedPackages = packages.map((pkg) => ({
    ...pkg,
    adjustedPrice: pkg.priceFrom + Math.max(0, baseDelta),
  }));

  return (
    <div className="bg-background text-white pt-20 min-h-screen">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 pt-6 pb-0">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
          </li>
          <li className="text-gray-700">/</li>
          <li>
            <Link href="/weddings" className="hover:text-white transition-colors">
              Weddings
            </Link>
          </li>
          <li className="text-gray-700">/</li>
          <li className="text-white font-medium" aria-current="page">
            {city.name}
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-gold" />
              <p className="text-gold text-sm font-semibold uppercase tracking-widest">
                Wedding Photo Booth · {city.region}
              </p>
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Wedding Photo Booth Hire in {city.name} — from £{city.priceFrom}
            </h1>
            {/* AEO-extractable first paragraph */}
            <p
              className="text-gray-200 text-lg sm:text-xl mb-6 leading-relaxed max-w-3xl mx-auto"
              data-speakable-faq="0"
            >
              FunLoading360 provides wedding photo booth hire in {city.name}, covering{" "}
              {city.postcodes.join(", ")} postcodes, from £{city.priceFrom} for 2 hours.
              360° slow motion, glam vintage with unlimited prints, or compact selfie pods.{" "}
              {city.travelNote}. Trusted by 48+ UK couples for 2025-2026 weddings.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                <span>4.9★ from 48+ couples</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                <span>£5M insured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                <span>{city.travelNote}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-background font-bold hover:bg-gold-light transition-colors"
              >
                Get Your {city.name} Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={`/locations/${city.slug}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-white hover:bg-surface transition-colors"
              >
                All {city.name} Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Wedding venues in this city */}
      {weddingVenues.length > 0 && (
        <section className="py-16 bg-surface/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4 text-center"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {city.name} Wedding Venues We&apos;ve Booked
            </h2>
            <p className="text-center text-gray-400 mb-10 max-w-2xl mx-auto">
              Our team has set up at these {city.name} and surrounding wedding venues. Familiar with setup areas, timing windows, and venue-specific requirements.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {weddingVenues.map((venue) => (
                <article
                  key={venue.name}
                  className="bg-surface border border-border rounded-xl p-5"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">{venue.name}</h3>
                      {venue.notes && (
                        <p className="text-gray-400 text-sm">{venue.notes}</p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Packages with city-adjusted pricing */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {city.name} Wedding Photo Booth Packages
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Prices below include the {city.travelNote.toLowerCase()}. No hidden extras — every quote is itemised upfront.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {adjustedPackages.map((pkg) => (
              <motion.article
                key={pkg.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-surface border border-border rounded-2xl p-6 flex flex-col"
              >
                <div className="mb-4">
                  <p className="text-gold text-xs uppercase tracking-widest font-semibold mb-1">
                    {pkg.duration}
                  </p>
                  <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {pkg.description}
                  </p>
                </div>
                <div className="text-3xl font-bold text-white mb-4">
                  from £{pkg.adjustedPrice}
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-gold text-background font-bold hover:bg-gold-light transition-colors"
                >
                  Book for {city.name} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding testimonials from this city */}
      {cityTestimonials.length > 0 && (
        <section className="py-16 bg-surface/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-10 text-center"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {city.name} Wedding Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cityTestimonials.map((t) => (
                <article
                  key={t.id}
                  className="bg-surface border border-border rounded-xl p-6"
                >
                  <div
                    className="flex gap-1 mb-3"
                    aria-label={`${t.rating} out of 5 stars`}
                  >
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <blockquote className="text-gray-300 italic mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <footer className="text-sm">
                    <cite className="not-italic text-white font-semibold">{t.name}</cite>
                    <span className="text-gray-500"> — {t.eventType}</span>
                    {t.venue && <span className="text-gray-500">, {t.venue}</span>}
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {city.name} Wedding FAQs
          </h2>
          <div className="space-y-4">
            {cityFAQs.map((faq, i) => (
              <details
                key={i}
                className="group bg-surface border border-border rounded-xl p-5 open:bg-surface/80 transition"
              >
                <summary className="cursor-pointer font-semibold text-white list-none flex justify-between items-center">
                  <span>{faq.question}</span>
                  <span className="text-gold text-xl group-open:rotate-45 transition-transform">
                    +
                  </span>
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

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-surface to-background border-t border-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Book Your {city.name} Wedding Photo Booth
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            From £{city.priceFrom}. {city.travelNote}. Confirmation within 2 hours.
            Hold your date for 7 days — no deposit required upfront.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-background font-bold hover:bg-gold-light transition-colors"
            >
              Start Your Booking <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/weddings"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-white hover:bg-surface transition-colors"
            >
              Other Wedding Locations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

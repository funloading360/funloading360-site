"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Heart, MapPin, Star } from "lucide-react";
import {
  weddingVenueArchetypes,
  type WeddingFAQ,
  type WeddingPackage,
} from "@/lib/weddings";
import { cities } from "@/lib/cities";
import { testimonials } from "@/lib/testimonials";

interface Props {
  hero: {
    h1: string;
    aeoFirstParagraph: string;
    subheadline: string;
    trustBullets: string[];
  };
  packages: WeddingPackage[];
  faqs: WeddingFAQ[];
}

export default function WeddingsContent({ hero, packages, faqs }: Props) {
  const weddingTestimonials = testimonials.filter((t) =>
    ["Wedding", "Engagement Party", "Anniversary Party"].includes(t.eventType)
  );

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
          <li className="text-white font-medium" aria-current="page">
            Weddings
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
                Wedding Photo Booth Hire
              </p>
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {hero.h1}
            </h1>
            {/* AEO-extractable first paragraph */}
            <p
              className="text-gray-200 text-lg sm:text-xl mb-6 leading-relaxed max-w-3xl mx-auto"
              data-speakable-faq="0"
            >
              {hero.aeoFirstParagraph}
            </p>
            <p className="text-gray-400 text-base mb-8 leading-relaxed max-w-2xl mx-auto">
              {hero.subheadline}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10 text-sm text-gray-300">
              {hero.trustBullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-background font-bold hover:bg-gold-light transition-colors"
              >
                Get Your Wedding Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#packages"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-white hover:bg-surface transition-colors"
              >
                View Packages
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-16 lg:py-20 bg-surface/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Wedding Photo Booth Packages
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Three booth formats, one goal: the best possible wedding day entertainment.
            All packages include attendant, overlay, props, delivery, and digital gallery.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
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
                  <p className="text-gray-400 text-sm leading-relaxed">{pkg.description}</p>
                </div>
                <div className="text-3xl font-bold text-white mb-4">
                  from £{pkg.priceFrom}
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-500 text-xs italic mb-4">
                  Best for: {pkg.recommendedFor}
                </p>
                <Link
                  href="/book"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-gold text-background font-bold hover:bg-gold-light transition-colors"
                >
                  Book This Package <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.article>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">
            London and London-fringe postcodes carry a £50 supplement. All quotes itemise travel upfront.
          </p>
        </div>
      </section>

      {/* Venue archetypes */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Which Booth for Your Wedding Venue?
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Every wedding venue has its own character. Here&apos;s how our booths adapt to the most common UK wedding venue types.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weddingVenueArchetypes.map((arch) => (
              <article
                key={arch.name}
                className="bg-surface border border-border rounded-xl p-5"
              >
                <h3 className="text-lg font-bold text-white mb-2">{arch.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  {arch.description}
                </p>
                <p className="text-gold text-xs font-semibold uppercase tracking-widest">
                  Recommended:{" "}
                  {arch.boothRecommendation === "any"
                    ? "Any booth"
                    : arch.boothRecommendation === "360"
                    ? "360 Slow Motion"
                    : arch.boothRecommendation === "glam-vintage"
                    ? "Glam Vintage"
                    : "Selfie Pod"}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* City spokes */}
      <section className="py-16 lg:py-20 bg-surface/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Wedding Photo Booth Hire by City
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            We cover weddings across Essex, Kent, and London. Pick your city for local venue knowledge, postcode coverage, and exact pricing.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/weddings/${city.slug}`}
                className="group bg-surface border border-border rounded-xl p-4 hover:border-gold transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span className="text-white font-semibold text-sm">{city.name}</span>
                </div>
                <p className="text-gray-500 text-xs">
                  from £{city.priceFrom}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding testimonials */}
      {weddingTestimonials.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-3xl sm:text-4xl font-bold text-center mb-12"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              What Real Couples Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {weddingTestimonials.map((t) => (
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

      {/* Wedding FAQ */}
      <section className="py-16 lg:py-20 bg-surface/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Wedding Photo Booth FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
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
            Ready to Book Your Wedding Photo Booth?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Select your date, choose your booth, and we&apos;ll confirm within 2 hours.
            No deposit required to hold your date for 7 days.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-background font-bold hover:bg-gold-light transition-colors"
          >
            Start Your Booking <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

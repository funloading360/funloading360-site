"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, CheckCircle, ArrowRight } from "lucide-react";
import { CityData } from "@/lib/cities";

interface Props {
  city: CityData;
}

export default function CityContent({ city }: Props) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.funloading360.co.uk" },
      { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://www.funloading360.co.uk/locations" },
      { "@type": "ListItem", "position": 3, "name": city.name, "item": `https://www.funloading360.co.uk/locations/${city.slug}` }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "FunLoading360",
    description: `Premium photo booth hire in ${city.name}, ${city.county}`,
    url: `https://www.funloading360.co.uk/locations/${city.slug}`,
    telephone: "+44 7482 112110",
    email: "FunLoading360@gmail.com",
    areaServed: {
      "@type": "City",
      name: city.name,
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: city.lat,
        longitude: city.lng,
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Guys Farm Rd",
      addressLocality: "South Woodham Ferrers",
      postalCode: "CM3 5NF",
      addressRegion: "Essex",
      addressCountry: "GB",
    },
    sameAs: [
      "https://www.instagram.com/funloading360",
      "https://www.tiktok.com/@funloading360",
      "https://www.facebook.com/funloading360",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
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
                Photo Booth Hire in {city.name}
              </h1>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">{city.description}</p>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-background font-bold hover:bg-gold-light transition-colors"
              >
                Book Now <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Local Info */}
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
              <p className="text-gray-400 mb-6 leading-relaxed">{city.localInfo}</p>
              <div className="flex items-center gap-2 text-gold">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">{city.distance}</span>
              </div>
            </motion.div>
          </div>
        </section>

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
              Ready to Book?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Select your preferred booth, choose your date, and we&apos;ll confirm availability within 2 hours.
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
    </>
  );
}

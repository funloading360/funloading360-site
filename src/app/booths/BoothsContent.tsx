"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/variants";

const booths = [
  {
    id: "360",
    name: "360 Slow Motion Booth",
    tagline: "The Show-Stopper",
    headline: "A cinematic experience your guests will never forget.",
    description:
      "Our 360 Slow Motion Booth is the centrepiece of any event. Guests step onto an elevated platform, strike their pose, and our camera arm rotates a full 360 degrees while capturing stunning slow-motion footage. The result is a jaw-dropping video clip — complete with music overlay — that's ready to share instantly.",
    longDescription:
      "Perfect for large events where you want maximum impact. The RGB lighting backdrop adds vibrant colour, while the LED display ring creates the perfect atmosphere. Our professional attendant guides each group through the experience, ensuring everyone gets the perfect shot.",
    features: [
      "Full 360° rotating camera arm",
      "Slow-motion video capture",
      "RGB LED lighting backdrop",
      "Instant digital sharing via QR code",
      "Music overlay on videos",
      "Social media ready format",
      "Dedicated booth attendant",
      "Up to 5 people per rotation",
      "Custom branded intro/outro",
    ],
    idealFor: ["Weddings", "Corporate events", "Birthday parties", "Proms"],
    gradient: "from-violet-900/80 via-purple-900/60 to-blue-900/80",
    accentColor: "bg-violet-500",
    borderColor: "border-violet-500/30",
    badgeColor: "bg-violet-500/20 text-violet-300",
    heroImage: "/images/events/360-couple-dancing.jpeg",
    heroAlt: "Couple dancing on the 360 slow-motion platform under dramatic neon lighting",
  },
  {
    id: "glam",
    name: "Glam Vintage Booth",
    tagline: "Timeless Elegance",
    headline: "Classic charm with a modern twist.",
    description:
      "Our Glam Vintage Booth combines the nostalgic appeal of traditional photo booths with the quality and features you'd expect from a premium modern experience. Unlimited high-quality prints, beautifully designed custom overlays and an extensive props collection make this booth an instant hit.",
    longDescription:
      "The Glam Vintage Booth is our most versatile option — equally at home at a black-tie wedding reception or a casual birthday garden party. The warm, flattering ring light is designed to make everyone look their absolute best, and the prints are of such high quality that guests will treasure them for years.",
    features: [
      "Unlimited high-quality photo prints",
      "Custom overlay design included",
      "Flattering ring light setup",
      "Extensive props & accessories",
      "Instant digital copies via QR",
      "Guest book option",
      "Colour & black-and-white modes",
      "Friendly booth attendant",
      "Open or enclosed booth style",
    ],
    idealFor: ["Weddings", "Birthday milestones", "Baby showers", "School proms"],
    gradient: "from-amber-900/80 via-orange-900/60 to-rose-900/80",
    accentColor: "bg-amber-400",
    borderColor: "border-amber-500/30",
    badgeColor: "bg-amber-500/20 text-amber-300",
    heroImage: "/images/venues/glam-backdrop-printer.jpeg",
    heroAlt: "Glam Vintage Booth setup with colourful feather boas and props display",
  },
  {
    id: "selfie",
    name: "Selfie Pod",
    tagline: "Modern & Sleek",
    headline: "Compact, connected, completely brilliant.",
    description:
      "The Selfie Pod is our most compact and versatile booth — ideal for venues where space is limited, or where you want a seamless, modern aesthetic. Guests interact with an intuitive touchscreen to take their photos, which are instantly shared to their phones via text or QR code.",
    longDescription:
      "Don't let the size fool you — the Selfie Pod packs in impressive features. The high-resolution camera and professional lighting produce stunning results, and the online gallery ensures every guest can access their photos long after the event ends. It's our most popular choice for corporate events and intimate celebrations.",
    features: [
      "Sleek, minimal footprint",
      "High-resolution camera",
      "Touchscreen interface",
      "Instant sharing via QR & SMS",
      "Online gallery for 30+ days",
      "Video selfie & GIF modes",
      "Green screen option",
      "Fully self-service or attended",
      "No print queue delays",
    ],
    idealFor: ["Corporate events", "Exhibitions", "Intimate parties", "Brand activations"],
    gradient: "from-emerald-900/80 via-teal-900/60 to-cyan-900/80",
    accentColor: "bg-emerald-400",
    borderColor: "border-emerald-500/30",
    badgeColor: "bg-emerald-500/20 text-emerald-300",
    heroImage: "/images/venues/selfie-pod-venue.jpeg",
    heroAlt: "Selfie Pod kiosk with ring light at an elegant Christmas venue",
  },
];

export default function BoothsPage() {
  return (
    <div className="bg-[#0a0a0e] text-white pt-20">
      {/* Header */}
      <section className="py-20 lg:py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#f5a623]/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#f5a623] text-sm font-semibold uppercase tracking-widest mb-3">
              Our Fleet
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Our Photo Booths
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Three distinct experiences, each built to create unforgettable
              moments. From cinematic 360 experiences to timeless glam prints —
              there&apos;s a booth for every occasion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booth sections */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {booths.map((booth, i) => (
            <motion.div
              key={booth.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                i % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Booth image */}
              <motion.div
                variants={fadeUp}
                className={`relative rounded-3xl overflow-hidden aspect-[4/3] border ${booth.borderColor} ${i % 2 === 1 ? "lg:col-start-2" : ""}`}
              >
                <Image
                  src={booth.heroImage}
                  alt={booth.heroAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority={i === 0}
                />
                {/* Subtle bottom gradient so the badge stays legible */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-5 left-5">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${booth.badgeColor} backdrop-blur-sm border border-white/10`}
                  >
                    {booth.tagline}
                  </span>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                variants={fadeUp}
                className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}
              >
                <p className="text-[#f5a623] text-sm font-semibold uppercase tracking-widest mb-3">
                  {booth.tagline}
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-white mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {booth.name}
                </h2>
                <p className="text-xl text-gray-300 mb-4 leading-relaxed font-medium">
                  {booth.headline}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {booth.description}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {booth.longDescription}
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                  {booth.features.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-gray-300"
                    >
                      <Check className="w-4 h-4 text-[#f5a623] flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>

                {/* Ideal for */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-gray-500 text-sm self-center">
                    Ideal for:
                  </span>
                  {booth.idealFor.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full bg-[#13131a] border border-[#2a2a3a] text-gray-300 text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-7 py-3 sm:py-2.5 rounded-full bg-[#f5a623] text-[#0a0a0e] font-bold text-sm hover:bg-[#fbbf4a] transition-all duration-200 shadow-lg shadow-[#f5a623]/20 hover:-translate-y-0.5 min-h-[48px] sm:min-h-[44px]"
                >
                  Book This Booth
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison CTA */}
      <section className="py-20 lg:py-24 bg-[#080810]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Not Sure Which Booth to Choose?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
              Our team is happy to help you pick the perfect booth for your event.
              Get in touch or see our packages — all booths can be combined in our
              Signature and Luxury packages.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-7 py-3 sm:py-2.5 rounded-full bg-[#f5a623] text-[#0a0a0e] font-bold text-sm hover:bg-[#fbbf4a] transition-all duration-200 shadow-lg shadow-[#f5a623]/20 hover:-translate-y-0.5 w-full sm:w-auto justify-center min-h-[48px] sm:min-h-[44px]"
              >
                View Packages
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-7 py-3 sm:py-2.5 rounded-full border border-[#2a2a3a] text-white font-semibold text-sm hover:border-[#f5a623]/40 hover:bg-white/5 transition-all duration-200 w-full sm:w-auto justify-center min-h-[48px] sm:min-h-[44px]"
              >
                Book a Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

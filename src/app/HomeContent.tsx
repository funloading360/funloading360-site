"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  Camera,
  Truck,
  Smartphone,
  ChevronRight,
  ArrowRight,
  Heart,
  Building2,
  Cake,
  GraduationCap,
  Check,
} from "lucide-react";

import { fadeUp, stagger } from "@/lib/variants";


const googleBusinessUrl =
  "https://www.google.com/maps/dir/FunLoading360+Photo+Booth,+Guys+Farm+Rd,+South+Woodham+Ferrers,+Chelmsford+CM3+5NF/FunLoading360+Photo+Booth,+Guys+Farm+Rd,+South+Woodham+Ferrers,+Chelmsford+CM3+5NF/@51.6390912,0.3506176,13z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x47d8ddbcb32b8c1f:0x36198f1517fd1c93!2m2!1d0.6127473!2d51.6457952!1m5!1m1!1s0x47d8ddbcb32b8c1f:0x36198f1517fd1c93!2m2!1d0.6127473!2d51.6457952";

const trustBadges = [
  { icon: Star, label: "5-Star Rated", sub: "Reviews", href: googleBusinessUrl },
  { icon: Camera, label: "3 Premium Booths", sub: "360, Glam & Selfie", href: "/booths" },
  { icon: Truck, label: "Free Setup", sub: "& collection included", href: "/pricing" },
  { icon: Smartphone, label: "Instant Sharing", sub: "digital gallery", href: "/gallery" },
];

const booths = [
  {
    name: "360 Slow Motion",
    tagline: "The Show-Stopper",
    description:
      "Jaw-dropping 360° video experiences with slow-motion effects. Guests step onto the platform and watch as the camera circles them, creating cinematic content that goes viral.",
    features: ["Slow-mo video", "RGB backdrop", "Instant sharing", "Custom overlay"],
    gradient: "from-purple-900/60 to-blue-900/60",
    accentColor: "bg-purple-400",
    href: "/booths",
    image: "/images/events/360-couple-dancing.jpeg",
  },
  {
    name: "Glam Vintage",
    tagline: "Timeless Elegance",
    description:
      "Classic elegance meets modern technology. Unlimited high-quality prints, custom overlays and a stunning vintage aesthetic that elevates any event.",
    features: [
      "Unlimited prints",
      "Custom overlay",
      "Props included",
      "Instant photos",
    ],
    gradient: "from-amber-900/60 to-rose-900/60",
    accentColor: "bg-amber-400",
    href: "/booths",
    image: "/images/venues/glam-setup-props.jpeg",
  },
  {
    name: "Selfie Pod",
    tagline: "Modern & Sleek",
    description:
      "Compact, stylish and packed with features. Perfect for intimate gatherings and venues with limited space. Digital sharing straight to your guests' phones.",
    features: [
      "Digital sharing",
      "Online gallery",
      "Compact design",
      "Video messages",
    ],
    gradient: "from-emerald-900/60 to-teal-900/60",
    accentColor: "bg-emerald-400",
    href: "/booths",
    image: "/images/venues/selfie-pod-venue.jpeg",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose Your Package",
    description:
      "Browse our curated packages — from our compact Selfie Pod to the full Luxury 360 experience. Every budget covered.",
  },
  {
    number: "02",
    title: "Pick Your Date",
    description:
      "Check availability and secure your date instantly. We cover weekdays, weekends and bank holidays across Essex, Kent & London.",
  },
  {
    number: "03",
    title: "We Handle Everything",
    description:
      "Our team arrives early, sets up the booth, operates it throughout your event, and dismantles everything. You just enjoy the night.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    event: "Wedding — Chelmsford",
    quote:
      "Absolutely incredible! Our guests couldn't stop talking about the 360 booth. The team were professional, friendly and went above and beyond. Would book again in a heartbeat!",
    rating: 5,
  },
  {
    name: "James & Rachel T.",
    event: "Corporate Event — Canary Wharf",
    quote:
      "We hired the Glam Vintage booth for our company Christmas party. The branded overlays looked stunning and every single employee was queuing up to use it. Brilliant service.",
    rating: 5,
  },
  {
    name: "Emma L.",
    event: "21st Birthday — Maidstone",
    quote:
      "From booking to the night itself, everything was seamless. The photo prints were gorgeous quality and the props were so fun. My guests absolutely loved it!",
    rating: 5,
  },
];

const eventTypes = [
  {
    icon: Heart,
    label: "Weddings",
    description: "Create magical memories for the biggest day of your life",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/20",
  },
  {
    icon: Building2,
    label: "Corporate",
    description: "Brand activations, parties & team-building events",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  {
    icon: Cake,
    label: "Birthdays",
    description: "Make milestone birthdays truly unforgettable",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
  },
  {
    icon: GraduationCap,
    label: "School Proms",
    description: "The perfect addition to an already special evening",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
];

export default function HomePage() {
  return (
    <div className="bg-[#0a0a0e] text-white overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/events/360-confetti-pose.jpeg"
            alt="360 photo booth confetti moment"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/60" />
          {/* Subtle radial glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#f5a623]/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Pre-headline badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5a623]/10 border border-[#f5a623]/20 text-[#f5a623] text-sm font-medium mb-8"
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Essex, Kent &amp; London&apos;s Premier Photo Booth</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Your Celebration,{" "}
            <span
              className="block"
              style={{
                background:
                  "linear-gradient(135deg, #f5a623 0%, #fbbf4a 50%, #f5a623 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Captured Forever
            </span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Premium Photo Booth Hire — Essex, Kent &amp; London
            <br className="hidden sm:block" />
            <span className="text-gray-500">
              360 Slow Motion &bull; Glam Vintage &bull; Selfie Pod
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 sm:py-3 rounded-full bg-[#f5a623] text-[#0a0a0e] font-bold text-base hover:bg-[#fbbf4a] transition-all duration-200 shadow-lg shadow-[#f5a623]/25 hover:shadow-[#f5a623]/40 hover:-translate-y-0.5 w-full sm:w-auto justify-center min-h-[48px] sm:min-h-[44px]"
            >
              See Packages
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 sm:py-3 rounded-full border border-[#2a2a3a] text-white font-semibold text-base hover:border-[#f5a623]/40 hover:bg-white/5 transition-all duration-200 w-full sm:w-auto justify-center min-h-[48px] sm:min-h-[44px]"
            >
              Check Availability
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {trustBadges.map((badge) => (
              <Link
                key={badge.label}
                href={badge.href}
                target={badge.href.startsWith("http") ? "_blank" : undefined}
                rel={badge.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#13131a] border border-[#2a2a3a] hover:border-[#f5a623]/50 hover:bg-[#1a1a2e] transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-[#f5a623]/10 border border-[#f5a623]/20 flex items-center justify-center">
                  <badge.icon className="w-5 h-5 text-[#f5a623]" />
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold text-sm">
                    {badge.label}
                  </p>
                  <p className="text-gray-500 text-xs">{badge.sub}</p>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-[#2a2a3a] flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2.5 bg-[#f5a623] rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ── OUR BOOTHS ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-[#f5a623] text-sm font-semibold uppercase tracking-widest mb-3">
              Our Fleet
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Our Booths
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Three distinct experiences, each crafted to create moments your
              guests will talk about long after the night is over.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {booths.map((booth, i) => (
              <motion.div
                key={booth.name}
                variants={fadeUp}
                custom={i}
                className="group relative rounded-3xl overflow-hidden border border-[#2a2a3a] bg-[#13131a] hover:border-[#f5a623]/30 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Booth image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={booth.image}
                    alt={booth.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={90}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={i === 0}
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${booth.gradient}`} />
                  {/* Tagline badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium border border-white/10">
                      {booth.tagline}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="text-xl font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {booth.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {booth.description}
                  </p>
                  <ul className="space-y-1.5 mb-6">
                    {booth.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <Check className="w-3.5 h-3.5 text-[#f5a623] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={booth.href}
                    className="inline-flex items-center gap-1.5 text-[#f5a623] text-sm font-semibold hover:gap-2.5 transition-all duration-200"
                  >
                    Learn more
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mt-10"
          >
            <Link
              href="/booths"
              className="inline-flex items-center gap-2 px-6 py-3 sm:py-2.5 rounded-full border border-[#2a2a3a] text-white font-medium hover:border-[#f5a623]/40 hover:bg-white/5 transition-all duration-200 min-h-[48px] sm:min-h-[44px]"
            >
              View All Booths
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 lg:py-32 bg-[#080810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-[#f5a623] text-sm font-semibold uppercase tracking-widest mb-3">
              Simple Process
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              How It Works
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                custom={i}
                className="relative text-center"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] right-[-40%] h-px bg-gradient-to-r from-[#f5a623]/30 to-transparent" />
                )}
                <div className="inline-flex w-20 h-20 rounded-full bg-[#13131a] border-2 border-[#f5a623]/30 items-center justify-center mb-6">
                  <span
                    className="text-2xl font-bold text-[#f5a623]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {step.number}
                  </span>
                </div>
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-[#f5a623] text-sm font-semibold uppercase tracking-widest mb-3">
              Real Reviews
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              What Our Clients Say
            </h2>
            <div className="flex items-center justify-center gap-1 mb-2" role="img" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-[#f5a623] fill-current"
                  aria-hidden="true"
                />
              ))}
            </div>
            <Link
              href={googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 text-sm hover:text-[#f5a623] transition-colors inline-block"
            >
              See all reviews
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                custom={i}
                className="p-6 rounded-3xl bg-[#13131a] border border-[#2a2a3a] flex flex-col"
              >
                <div className="flex items-center gap-1 mb-4" role="img" aria-label={`${t.rating} out of 5 stars`}>
                  {[...Array(t.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 text-[#f5a623] fill-current"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="text-gray-300 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="border-t border-[#2a2a3a] pt-4">
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-[#f5a623] text-xs mt-0.5">{t.event}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PERFECT FOR ── */}
      <section className="py-24 lg:py-32 bg-[#080810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-[#f5a623] text-sm font-semibold uppercase tracking-widest mb-3">
              Any Occasion
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Perfect For
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {eventTypes.map((event, i) => (
              <motion.div
                key={event.label}
                variants={fadeUp}
                custom={i}
                className={`p-6 rounded-2xl ${event.bg} border ${event.border} text-center group hover:-translate-y-1 transition-transform duration-200`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${event.bg} border ${event.border} flex items-center justify-center mx-auto mb-4`}
                >
                  <event.icon className={`w-7 h-7 ${event.color}`} />
                </div>
                <h3
                  className={`text-lg font-bold ${event.color} mb-2`}
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {event.label}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {event.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="relative p-10 lg:p-16 rounded-3xl bg-gradient-to-br from-[#13131a] to-[#1c1228] border border-[#f5a623]/20 overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-[#f5a623]/3 rounded-3xl" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#f5a623]/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-[#f5a623] fill-current"
                  />
                ))}
              </div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Ready to Book?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                Secure your date today. Packages from just £299 with free setup
                and instant sharing included.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-8 py-4 sm:py-3 rounded-full bg-[#f5a623] text-[#0a0a0e] font-bold text-base hover:bg-[#fbbf4a] transition-all duration-200 shadow-lg shadow-[#f5a623]/25 hover:-translate-y-0.5 w-full sm:w-auto justify-center min-h-[48px] sm:min-h-[44px]"
                >
                  Check Availability
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 sm:py-3 rounded-full border border-[#2a2a3a] text-white font-semibold text-base hover:border-[#f5a623]/40 hover:bg-white/5 transition-all duration-200 w-full sm:w-auto justify-center min-h-[48px] sm:min-h-[44px]"
                >
                  View Packages
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

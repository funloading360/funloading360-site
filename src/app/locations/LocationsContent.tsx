"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Car, PoundSterling, AlertCircle } from "lucide-react";

import { fadeUp, stagger } from "@/lib/variants";

const regions = [
  {
    name: "Essex",
    color: "text-amber-400",
    border: "border-amber-400/20",
    bg: "bg-amber-400/5",
    glow: "shadow-amber-400/10",
    towns: [
      "Chelmsford",
      "Colchester",
      "Southend-on-Sea",
      "Romford",
      "Basildon",
      "Brentwood",
      "Harlow",
      "Witham",
      "Maldon",
    ],
  },
  {
    name: "Kent",
    color: "text-blue-400",
    border: "border-blue-400/20",
    bg: "bg-blue-400/5",
    glow: "shadow-blue-400/10",
    towns: [
      "Maidstone",
      "Canterbury",
      "Tunbridge Wells",
      "Dartford",
      "Gravesend",
      "Sevenoaks",
      "Tonbridge",
      "Folkestone",
      "Ashford",
    ],
  },
  {
    name: "London",
    color: "text-purple-400",
    border: "border-purple-400/20",
    bg: "bg-purple-400/5",
    glow: "shadow-purple-400/10",
    towns: [
      "East London",
      "City of London",
      "Canary Wharf",
      "Stratford",
      "Hackney",
      "Bethnal Green",
      "Whitechapel",
      "Docklands",
      "Walthamstow",
    ],
  },
];

const travelFacts = [
  {
    icon: Car,
    label: "Free within 25 miles",
    sub: "of Chelmsford, Essex",
    accent: "text-gold",
  },
  {
    icon: PoundSterling,
    label: "£1.50 per mile",
    sub: "beyond the free zone",
    accent: "text-gold",
  },
  {
    icon: MapPin,
    label: "London supplement",
    sub: "+£50 flat rate",
    accent: "text-gold",
  },
  {
    icon: AlertCircle,
    label: "Full quote included",
    sub: "in your booking confirmation",
    accent: "text-gold",
  },
];

export default function LocationsPage() {
  return (
    <div className="bg-background text-white pt-20 overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative py-24 lg:py-32 text-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-8"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Essex · Kent · London</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            We Come{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              To You
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Covering Essex, Kent &amp; London — Free delivery within 25 miles of
            Chelmsford
          </motion.p>
        </div>
      </section>

      {/* ── COVERAGE MAP PLACEHOLDER ── */}
      <section className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden border border-border bg-[#0d0d16]"
            style={{ minHeight: "380px" }}
          >
            {/* Grid pattern background */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Subtle radial glow from centre */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(245,166,35,0.06),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_30%_40%,rgba(147,51,234,0.05),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_70%_30%,rgba(59,130,246,0.05),transparent)]" />

            {/* Outer border glow */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5" />

            {/* LONDON — top left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute top-10 left-10 sm:top-14 sm:left-16"
            >
              <div className="inline-flex flex-col items-start gap-1.5">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400 opacity-70">
                  London
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                  <div className="h-px w-12 bg-gradient-to-r from-purple-400/50 to-transparent" />
                </div>
              </div>
            </motion.div>

            {/* ESSEX — top right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-10 right-10 sm:top-14 sm:right-16"
            >
              <div className="inline-flex flex-col items-end gap-1.5">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 opacity-70">
                  Essex
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="h-px w-12 bg-gradient-to-l from-amber-400/50 to-transparent" />
                  <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,74,0.8)]" />
                </div>
              </div>
            </motion.div>

            {/* KENT — bottom right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute bottom-10 right-10 sm:bottom-14 sm:right-16"
            >
              <div className="inline-flex flex-col items-end gap-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="h-px w-12 bg-gradient-to-l from-blue-400/50 to-transparent" />
                  <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 opacity-70">
                  Kent
                </span>
              </div>
            </motion.div>

            {/* Centre: Base marker */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-3 text-center">
                {/* Pulsing marker */}
                <div className="relative">
                  <div className="absolute -inset-3 rounded-full bg-gold/10 animate-ping motion-reduce:animate-none" />
                  <div className="absolute -inset-1.5 rounded-full bg-gold/20" />
                  <div className="relative w-5 h-5 rounded-full bg-gold shadow-[0_0_20px_rgba(245,166,35,0.6)]" />
                </div>
                <div className="px-4 py-2 rounded-xl bg-surface/90 border border-gold/30 backdrop-blur-sm">
                  <p className="text-gold text-xs font-bold tracking-wide">
                    Base: Chelmsford
                  </p>
                  <p className="text-gray-500 text-[10px] mt-0.5">
                    Free travel · 25 mile radius
                  </p>
                </div>

                {/* Radius ring */}
                <div className="absolute w-48 h-48 rounded-full border border-dashed border-gold/15 pointer-events-none" />
                <div className="absolute w-80 h-80 rounded-full border border-dashed border-gold/8 pointer-events-none" />
              </div>
            </motion.div>

            {/* Bottom label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <p className="text-gray-600 text-[11px] tracking-widest uppercase">
                Coverage Area
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── COVERAGE BY REGION ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              Where We Operate
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Coverage by Region
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {regions.map((region, i) => (
              <motion.div
                key={region.name}
                variants={fadeUp}
                custom={i}
                className={`rounded-3xl ${region.bg} border ${region.border} p-7 shadow-xl ${region.glow}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-2 h-8 rounded-full bg-current ${region.color}`}
                  />
                  <h3
                    className={`text-2xl font-bold ${region.color}`}
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {region.name}
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {region.towns.map((town) => (
                    <li
                      key={town}
                      className="flex items-center gap-2.5 text-sm text-gray-300"
                    >
                      <div
                        className={`w-1 h-1 rounded-full bg-current flex-shrink-0 ${region.color} opacity-60`}
                      />
                      {town}
                      {town === "Chelmsford" && (
                        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-gold/15 border border-gold/20 text-gold font-medium">
                          Base
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── GOOGLE MAPS BANNER ── */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-8 rounded-xl overflow-hidden border border-white/10">
            <div className="p-4 bg-white/5 text-center">
              <p className="text-sm text-gray-400 mb-3">We serve Essex, Kent &amp; London</p>
              <a
                href="https://maps.google.com/?q=FunLoading360,+South+Woodham+Ferrers,+Essex+CM3+5NF"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors"
              >
                📍 View Our Coverage Area on Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRAVEL PRICING ── */}
      <section className="py-20 lg:py-28 bg-[#080810]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              No Surprises
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Travel Pricing
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-3xl bg-surface border border-border overflow-hidden"
          >
            {/* Top gold line */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

            <div className="p-8 lg:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {travelFacts.map((fact, i) => (
                  <motion.div
                    key={fact.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-[#0d0d16] border border-border"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                      <fact.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm leading-snug">
                        {fact.label}
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">{fact.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-gray-400 text-sm">
                  Travel costs are calculated from{" "}
                  <span className="text-gold font-medium">
                    Chelmsford, Essex
                  </span>
                  . Your full quote — including any travel — will be confirmed
                  before you pay a penny.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OUTSIDE OUR AREA? ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-10 lg:p-14 rounded-3xl bg-gradient-to-br from-surface to-[#0f0f1c] border border-border overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-gold/8 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-7 h-7 text-gold" />
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Outside Our Coverage?
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8 max-w-md mx-auto">
                Not in our coverage area? Drop us a message — we&apos;ve
                travelled further for the right event.
              </p>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-background font-bold hover:bg-gold-light transition-all duration-200 shadow-lg shadow-gold/25 hover:-translate-y-0.5"
              >
                Get In Touch
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

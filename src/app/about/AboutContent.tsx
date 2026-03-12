"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Award, Users, Zap } from "lucide-react";

export default function AboutContent() {
  return (
    <div className="bg-[#0a0a0e] text-white pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#f5a623]/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[#f5a623] text-sm font-semibold uppercase tracking-widest mb-3">About Us</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              Premium Photo Booth Hire
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
              Three professional booth types, expert service, and transparent pricing. Serving Essex, Kent &amp; London for weddings, corporate events, and celebrations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 lg:py-24 bg-[#13131a]/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16" style={{ fontFamily: "var(--font-playfair)" }}>
            Our Commitment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Professional Quality",
                desc: "High-resolution cameras, professional lighting, and premium props across all booth types.",
              },
              {
                icon: Users,
                title: "Expert Team",
                desc: "Trained attendants who ensure smooth setup, operation, and memorable guest experiences.",
              },
              {
                icon: Zap,
                title: "Transparent Pricing",
                desc: "No hidden fees. Clear, upfront pricing with all setup, delivery, and service included.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0a0a0e] border border-[#2a2a3a] rounded-xl p-8 text-center"
              >
                <item.icon className="w-12 h-12 text-[#f5a623] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 360° Booth */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
                360° Slow Motion Booth
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Our flagship booth captures guests in stunning slow-motion video. Perfect for dynamic moments and high-energy events.
              </p>
              <ul className="space-y-3">
                {[
                  "4K video recording with 360° capture",
                  "Slow-motion playback (2x to 4x slower)",
                  "Instant sharing to social media",
                  "Custom lighting rigs with LED control",
                  "Green screen effects available",
                  "Boomerang and loop effects",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#f5a623] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#f5a623]/20 to-[#f5a623]/5 rounded-xl border border-[#f5a623]/30 h-96 flex items-center justify-center"
            >
              <p className="text-gray-500 text-center">360° Booth Photo</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Glam Vintage Booth */}
      <section className="py-16 lg:py-24 bg-[#13131a]/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#f5a623]/20 to-[#f5a623]/5 rounded-xl border border-[#f5a623]/30 h-96 flex items-center justify-center order-2 lg:order-1"
            >
              <p className="text-gray-500 text-center">Glam Vintage Booth Photo</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
                Glam Vintage Booth
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Our classic booth with vintage styling. Prints instantly, perfect for elegant events with a timeless feel.
              </p>
              <ul className="space-y-3">
                {[
                  "35mm-style instant prints (4x6 glossy)",
                  "Premium props and vintage backdrops",
                  "Guest book signing area",
                  "Custom overlays and branding",
                  "Digital copies via email/QR code",
                  "Fast drying prints (10-15 seconds)",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#f5a623] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Selfie Pod */}
      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
                Selfie Pod
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Our compact, modern selfie station. Perfect for venues with space constraints or as a second booth complement.
              </p>
              <ul className="space-y-3">
                {[
                  "HD camera with professional ring light",
                  "Touch-screen interface (easy operation)",
                  "Instant digital sharing",
                  "Custom animations and filters",
                  "Compact setup (fits smaller venues)",
                  "Social media integration",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#f5a623] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#f5a623]/20 to-[#f5a623]/5 rounded-xl border border-[#f5a623]/30 h-96 flex items-center justify-center"
            >
              <p className="text-gray-500 text-center">Selfie Pod Photo</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 lg:py-24 bg-[#13131a]/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            Service Areas
          </h2>
          <p className="text-gray-400 mb-12 text-lg max-w-2xl mx-auto">
            We proudly serve Essex, Kent, and London with reliable, professional photo booth hire for any occasion.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Essex", "Kent", "London"].map((region, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0a0a0e] border border-[#2a2a3a] rounded-lg p-6"
              >
                <h3 className="text-xl font-bold text-[#f5a623]">{region}</h3>
                <p className="text-gray-400 text-sm mt-2">Free setup within 25 miles</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            Ready to Bring the Fun?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Explore our packages, check pricing, and book your perfect photo booth experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="px-8 py-4 rounded-full bg-[#f5a623] text-[#0a0a0e] font-bold hover:bg-[#fbbf4a] transition-colors"
            >
              Book Now
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 rounded-full border border-[#f5a623] text-[#f5a623] font-bold hover:bg-[#f5a623]/10 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

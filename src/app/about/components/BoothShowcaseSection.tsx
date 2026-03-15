"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Booth } from "../data/booths";

interface BoothShowcaseSectionProps {
  booth: Booth;
  index?: number;
}

export default function BoothShowcaseSection({ booth, index = 0 }: BoothShowcaseSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isReversed = booth.reversed;

  return (
    <section
      className={`py-16 lg:py-24 ${index % 2 === 1 ? "bg-[#13131a]/50" : "bg-[#0a0a0e]"}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
            isReversed ? "lg:[direction:rtl]" : ""
          }`}
        >
          {/* Image */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: isReversed ? 20 : -20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="relative h-96 rounded-2xl overflow-hidden border border-[#f5a623]/30 shadow-lg shadow-[#f5a623]/10"
          >
            <Image
              src={booth.image}
              alt={booth.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
            {booth.badge && (
              <div className="absolute top-4 right-4 bg-[#f5a623] text-[#0a0a0e] px-4 py-2 rounded-full text-xs font-bold">
                {booth.badge}
              </div>
            )}
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: isReversed ? -20 : 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="lg:[direction:ltr]"
          >
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
            >
              <p className="text-[#f5a623] text-xs font-semibold uppercase tracking-widest mb-2">
                {booth.tagline}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                {booth.title}
              </h2>
              <p className="text-gray-400 text-base leading-relaxed mb-6">{booth.description}</p>
            </motion.div>

            {/* Benefits (Why It Matters) */}
            <motion.div
              className="space-y-4 mb-8"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
            >
              {booth.benefits.map((benefit, idx) => (
                <div key={idx} className="border-l-2 border-[#f5a623] pl-4">
                  <h3 className="text-white font-semibold text-sm mb-1">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.text}</p>
                </div>
              ))}
            </motion.div>

            {/* Features List */}
            <motion.ul
              className="space-y-2 mb-8"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.3 }}
            >
              {booth.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#f5a623] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </li>
              ))}
            </motion.ul>

            {/* Perfect For */}
            <motion.div
              className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-4 mb-8"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
            >
              <p className="text-xs font-semibold text-[#f5a623] uppercase tracking-widest mb-2">
                Perfect For
              </p>
              <p className="text-gray-300 text-sm">{booth.perfectFor}</p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.5 }}
            >
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f5a623] text-[#0a0a0e] font-semibold hover:bg-[#fbbf4a] transition-colors"
              >
                View Specs <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

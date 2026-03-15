"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function RazStoryCard() {
  const prefersReducedMotion = useReducedMotion();

  const highlights = [
    "3 years obsessed with event memories",
    "Essex-born & raised",
    "Believes moments matter more than margins",
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#0a0a0e]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Image — 60% (3/5 cols) */}
          <motion.div
            className="lg:col-span-3"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.7 }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-3 border-[#f5a623] shadow-lg shadow-[#f5a623]/20">
              <Image
                src="/images/raz-portrait.jpeg"
                alt="Raz, founder of FunLoading360"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Text — 40% (2/5 cols) */}
          <motion.div
            className="lg:col-span-2"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.7, delay: 0.1 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-[#f5a623] mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
            >
              Hi, I'm Raz
            </motion.h2>

            <motion.p
              className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.3 }}
            >
              Most photo booths feel like an afterthought. I saw it differently. Years ago, watching
              guests gravitate to photo booths at events, I realized something profound: people didn't
              come for the photos themselves. They came for permission to let loose, to laugh, to
              create inside jokes. Photo booths unlocked that.
            </motion.p>

            <motion.p
              className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
            >
              So I decided to build the opposite of what I'd seen. Professional gear. Expert
              operators who genuinely cared. Equipment that delivered stunning results. Not because it
              was a sales opportunity, but because your event memories deserve better.
            </motion.p>

            <motion.ul
              className="space-y-3"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.5 }}
            >
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#f5a623] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

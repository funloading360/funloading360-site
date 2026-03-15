"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { testimonials, Testimonial } from "../data/testimonials";

export default function SocialProofSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Auto-rotate testimonials
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const current = testimonials[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const metrics = [
    { label: "Events", value: "500+" },
    { label: "Guests", value: "15K+" },
    { label: "Rating", value: "4.9★" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#13131a]/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Metrics Row */}
        <motion.div
          className="grid grid-cols-3 gap-4 lg:gap-8 mb-16 text-center"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.5 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: idx * 0.1 }}
            >
              <motion.div
                className="text-3xl sm:text-4xl font-bold text-[#f5a623] mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 1, delay: idx * 0.2 }}
              >
                {metric.value}
              </motion.div>
              <div className="text-gray-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          className="text-center"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12" style={{ fontFamily: "var(--font-playfair)" }}>
            Why Clients Trust FunLoading360
          </h2>

          {/* Testimonial Card */}
          <div className="relative bg-[#0a0a0e] border border-[#2a2a3a] rounded-3xl p-8 sm:p-12 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
                className="text-center"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#f5a623] fill-[#f5a623]"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-white text-lg sm:text-xl leading-relaxed mb-6 italic">
                  "{current.quote}"
                </blockquote>

                {/* Author */}
                <div>
                  <p className="text-white font-bold text-lg">{current.author}</p>
                  <p className="text-gray-400 text-sm">{current.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-[#f5a623] w-8" : "bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <p className="text-center text-gray-500 text-sm mt-6">
            {currentIndex + 1} of {testimonials.length}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

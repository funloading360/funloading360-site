'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '@/lib/testimonials';
import { useReducedMotion } from '@/lib/useReducedMotion';

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Auto-rotate testimonials every 5 seconds (skip if motion is reduced)
  useEffect(() => {
    if (isHovering || prefersReducedMotion) return; // Pause on hover or reduced motion

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovering, prefersReducedMotion]);

  const current = testimonials[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div
      className="py-20 px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[#f5a623] text-sm font-semibold uppercase tracking-widest mb-3">
            What Our Clients Say
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Testimonials from Real Events
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative bg-[#13131a] border border-[#2a2a3a] rounded-3xl p-8 sm:p-12">
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
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#f5a623] fill-[#f5a623]" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-white text-lg sm:text-xl leading-relaxed mb-6 italic">
                &quot;{current.quote}&quot;
              </blockquote>

              {/* Author */}
              <div>
                <p className="text-white font-bold text-lg">{current.name}</p>
                <p className="text-gray-400 text-sm">
                  {current.eventType} • {current.date}
                </p>
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

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-[#f5a623] w-8' : 'bg-gray-600'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <p className="text-center text-gray-500 text-sm mt-6">
          {currentIndex + 1} of {testimonials.length}
        </p>
      </div>
    </div>
  );
}

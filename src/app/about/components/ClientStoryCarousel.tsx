"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface ClientStory {
  id: string;
  image: string;
  caption: string;
  eventType: string;
}

const clientStories: ClientStory[] = [
  {
    id: "story-1",
    image: "/images/gallery/event-1.jpeg",
    caption: "Wedding Reception",
    eventType: "Essex",
  },
  {
    id: "story-2",
    image: "/images/gallery/event-2.jpeg",
    caption: "Corporate Gala",
    eventType: "London",
  },
  {
    id: "story-3",
    image: "/images/gallery/event-3.jpeg",
    caption: "Milestone Birthday",
    eventType: "Kent",
  },
  {
    id: "story-4",
    image: "/images/gallery/event-4.jpeg",
    caption: "Engagement Party",
    eventType: "Essex",
  },
  {
    id: "story-5",
    image: "/images/gallery/event-5.jpeg",
    caption: "Product Launch",
    eventType: "London",
  },
];

export default function ClientStoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Auto-rotate stories
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % clientStories.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + clientStories.length) % clientStories.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % clientStories.length);
  };

  const current = clientStories[currentIndex];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Real Events, Real Moments
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From weddings to corporate celebrations, see how FunLoading360 brings joy to every occasion.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="relative bg-surface border border-border rounded-3xl overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          {/* Image Carousel */}
          <div className="relative h-96 sm:h-[500px] lg:h-[600px] w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={prefersReducedMotion ? {} : { opacity: 1 }}
                exit={prefersReducedMotion ? {} : { opacity: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={current.image}
                  alt={current.caption}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
              <motion.div
                key={`caption-${current.id}`}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
              >
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">{current.eventType}</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">{current.caption}</h3>
              </motion.div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Next story"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {clientStories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-gold w-8" : "bg-gray-600"
              }`}
              aria-label={`Go to story ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <p className="text-center text-gray-500 text-sm mt-6">
          {currentIndex + 1} of {clientStories.length}
        </p>
      </div>
    </section>
  );
}

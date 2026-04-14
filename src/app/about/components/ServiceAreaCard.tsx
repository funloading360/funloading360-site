"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ServiceArea } from "../data/serviceAreas";

interface ServiceAreaCardProps {
  area: ServiceArea;
  index?: number;
}

export default function ServiceAreaCard({ area, index = 0 }: ServiceAreaCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
      className="bg-background border border-border rounded-2xl overflow-hidden hover:border-gold/30 transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.div
          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          transition={prefersReducedMotion ? {} : { duration: 0.5 }}
          className="w-full h-full"
        >
          <Image
            src={area.image}
            alt={`${area.region} photo booth events`}
            fill
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <h3 className="text-2xl font-bold text-gold mb-2">{area.region}</h3>

        <p className="text-gray-400 text-sm font-semibold mb-4">{area.stats}</p>

        <p className="text-gray-300 text-sm leading-relaxed mb-6">{area.description}</p>

        {/* Testimonial */}
        <div className="bg-surface border border-border rounded-lg p-4 mb-6">
          <p className="text-gray-300 text-sm italic mb-2">"{area.testimonial.quote}"</p>
          <p className="text-gray-400 text-xs">
            <span className="font-semibold">{area.testimonial.author}</span> •{" "}
            {area.testimonial.eventType}
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/book"
          className="block w-full px-4 py-3 rounded-full border border-gold text-gold font-semibold text-center hover:bg-gold/10 transition-colors"
        >
          Book {area.region}
        </Link>
      </div>
    </motion.div>
  );
}

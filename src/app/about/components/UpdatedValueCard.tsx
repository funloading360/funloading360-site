"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export default function UpdatedValueCard({ icon: Icon, title, description, index = 0 }: ValueCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
      className="bg-background border border-border rounded-2xl p-8 text-center hover:border-gold/30 hover:bg-surface transition-all duration-300 group"
    >
      <motion.div
        whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
        transition={prefersReducedMotion ? {} : { duration: 0.3 }}
        className="mb-4"
      >
        <Icon className="w-12 h-12 text-gold mx-auto" />
      </motion.div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors">
        {title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

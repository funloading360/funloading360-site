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
      className="bg-[#0a0a0e] border border-[#2a2a3a] rounded-2xl p-8 text-center hover:border-[#f5a623]/30 hover:bg-[#13131a] transition-all duration-300 group"
    >
      <motion.div
        whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
        transition={prefersReducedMotion ? {} : { duration: 0.3 }}
        className="mb-4"
      >
        <Icon className="w-12 h-12 text-[#f5a623] mx-auto" />
      </motion.div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#f5a623] transition-colors">
        {title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

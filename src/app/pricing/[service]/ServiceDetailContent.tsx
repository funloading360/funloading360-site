"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Star,
  Camera,
  Sparkles,
  Zap,
} from "lucide-react";
import { boothPricing, formatPrice } from "@/lib/packages";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useCart } from "@/hooks/useCart";
import type { PricingTier } from "@/lib/services";
import PricingComparisonModal from "../PricingComparisonModal";

const highlightIcons = [Camera, Sparkles, Zap, Star, ArrowRight, Check];

const tierIcons: Record<string, typeof Camera> = {
  essential: Camera,
  signature: Star,
  luxury: Sparkles,
};

interface Props {
  slug: string;
}

export default function ServiceDetailContent({ slug }: Props) {
  const [showComparison, setShowComparison] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { addToCart } = useCart();
  const router = useRouter();

  const booth = boothPricing.find((b) => b.slug === slug);
  if (!booth) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anim = (props: Record<string, any>) => (prefersReducedMotion ? {} : props);

  return (
    <div className="bg-background text-white pt-20">
      {/* Packages */}
      <section id="packages" className="py-20 lg:py-24 bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={anim({ opacity: 0, y: 30 })}
            whileInView={anim({ opacity: 1, y: 0 })}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Find Your Perfect Package
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              All prices include VAT. 15% deposit required to secure your date.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
            {Object.entries(booth.tiers).map(([tierKey, tier], tierIdx) => {
              const isSignature = tierKey === "signature";
              const Icon = tierIcons[tierKey] ?? Camera;

              return (
                <motion.div
                  key={tierKey}
                  initial={anim({ opacity: 0, y: 30 })}
                  whileInView={anim({ opacity: 1, y: 0 })}
                  viewport={{ once: true }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { duration: 0.6, delay: tierIdx * 0.1 }
                  }
                  className={`relative rounded-3xl flex flex-col ${
                    isSignature
                      ? "bg-gradient-to-b from-[#1c1228] to-surface border-2 border-gold/50 shadow-xl shadow-gold/10"
                      : "bg-surface border border-border"
                  }`}
                >
                  {isSignature && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gold text-background text-xs font-bold uppercase tracking-wide shadow-lg shadow-gold/30">
                        <Star className="w-3 h-3 fill-current" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="p-7 flex flex-col flex-1">
                    {/* Tier header */}
                    <div className="mb-6">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                          isSignature
                            ? "bg-gold/20 border border-gold/30"
                            : "bg-white/5 border border-border"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${isSignature ? "text-gold" : "text-gray-400"}`}
                        />
                      </div>
                      <h3
                        className="text-2xl font-bold text-white mb-1"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {tier.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{tier.tagline}</p>
                    </div>

                    {/* Pricing options */}
                    <div className="mb-6 pb-6 border-b border-border">
                      <div className="space-y-2">
                        {tier.prices.map((priceOpt) => (
                          <div
                            key={priceOpt.duration}
                            className="flex items-center justify-between"
                          >
                            <span className="text-gray-400 text-sm">
                              {priceOpt.duration}
                            </span>
                            <span
                              className={`text-lg font-bold ${
                                isSignature ? "text-gold" : "text-white"
                              }`}
                            >
                              {formatPrice(priceOpt.price)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2.5 flex-1 mb-8">
                      {tier.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 text-sm text-gray-300"
                        >
                          <Check
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              isSignature ? "text-gold" : "text-emerald-400"
                            }`}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      onClick={() => {
                        const minHours = parseInt(tier.prices[0]?.duration, 10) || 2;
                        addToCart(booth.slug, tierKey as PricingTier, minHours);
                        router.push("/book");
                      }}
                      className={`block w-full text-center py-3 sm:py-2.5 rounded-full font-semibold text-sm transition-all duration-200 min-h-[48px] sm:min-h-[44px] flex items-center justify-center cursor-pointer ${
                        isSignature
                          ? "bg-gold text-background hover:bg-gold-light shadow-lg shadow-gold/25 hover:shadow-gold/40 hover:-translate-y-0.5"
                          : "border border-border text-white hover:border-gold/40 hover:bg-white/5"
                      }`}
                    >
                      Book This Package
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Compare CTA */}
          <div className="text-center">
            <button
              onClick={() => setShowComparison(true)}
              className="px-6 py-2.5 rounded-full border border-gold/40 text-gold hover:bg-gold/10 transition-all duration-200 font-semibold text-sm"
            >
              Compare All Packages
            </button>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={anim({ opacity: 0, y: 30 })}
            whileInView={anim({ opacity: 1, y: 0 })}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="mb-14"
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Here&apos;s What Your Guests Will Love
            </h2>

            <div className="space-y-5 mb-12">
              {booth.longDescription.map((para, i) => (
                <p key={i} className="text-gray-400 text-base leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {booth.highlights.map((highlight, i) => {
                const Icon = highlightIcons[i % highlightIcons.length];
                return (
                  <motion.div
                    key={highlight}
                    initial={anim({ opacity: 0, y: 20 })}
                    whileInView={anim({ opacity: 1, y: 0 })}
                    viewport={{ once: true }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.5, delay: i * 0.08 }
                    }
                    className="flex items-center gap-3 p-4 rounded-2xl bg-surface border border-border"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-gold" />
                    </div>
                    <span className="text-gray-300 text-sm font-medium">{highlight}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-24 bg-[#080810]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={anim({ opacity: 0, y: 30 })}
            whileInView={anim({ opacity: 1, y: 0 })}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <h2
              className="text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ready to Make It Unforgettable?
            </h2>
            <p className="text-gray-400 mb-8">
              Secure your date today — our most popular weekends book out weeks in advance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-8 py-4 sm:py-3 rounded-full bg-gold text-background font-bold hover:bg-gold-light transition-all duration-200 shadow-lg shadow-gold/25 hover:-translate-y-0.5 min-h-[48px] sm:min-h-[44px]"
              >
                Book {booth.booth}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 sm:py-3 rounded-full border border-border text-gray-300 hover:border-gold/40 hover:text-white transition-all duration-200 min-h-[48px] sm:min-h-[44px] font-semibold text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Explore All Experiences
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Modal */}
      <PricingComparisonModal
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        slug={slug}
      />
    </div>
  );
}

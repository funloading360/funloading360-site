"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Star,
  ArrowRight,
  ChevronDown,
  Zap,
  Camera,
  Sparkles,
} from "lucide-react";
import { boothPricing, formatPrice } from "@/lib/packages";
import PricingComparisonModal from "./PricingComparisonModal";
import { DEPOSIT_LABEL } from "@/lib/constants";

import { fadeUp } from "@/lib/variants";
import { useReducedMotion } from "@/lib/useReducedMotion";

const tierIcons: Record<string, typeof Camera> = {
  essential: Camera,
  signature: Star,
  luxury: Sparkles,
};

const addOns = [
  {
    name: "Extra Hour",
    price: "£75",
    description: "Extend your booth hire by one additional hour.",
  },
  {
    name: "Custom Overlay Design",
    price: "£50",
    description:
      "Bespoke photo overlay designed to match your event theme or branding.",
  },
  {
    name: "Guest Book",
    price: "£40",
    description:
      "Premium printed guest book for your guests to write personal messages alongside their photo.",
  },
  {
    name: "Backdrop Upgrade",
    price: "£60",
    description:
      "Premium sequin, floral or neon backdrop to match your event aesthetic.",
  },
  {
    name: "Day-After Highlight Reel",
    price: "£79",
    description:
      "A professionally edited video reel of the best moments from your event, delivered the next day.",
  },
];

const faqs = [
  {
    question: "What areas do you cover?",
    answer:
      "We cover Essex (including Chelmsford, Colchester, Southend-on-Sea, Romford and Basildon), Kent (including Maidstone, Canterbury, Tunbridge Wells and Dartford) and London (including East London, City of London and Canary Wharf). Travel within 25 miles of Chelmsford is free. Additional mileage is charged at £1.50 per mile.",
  },
  {
    question: "How long does setup take?",
    answer:
      "We typically arrive 60–90 minutes before your event begins for setup, and our team stays for the duration. Setup and dismantling are always included in the price — you only pay for the time the booth is running.",
  },
  {
    question: "Do I need to pay a deposit?",
    answer:
      "Yes, we require a 15% deposit to secure your booking, with the remaining balance due before your event. All payments are processed securely online.",
  },
  {
    question: "What happens if I need to cancel?",
    answer:
      "We understand that plans can change. Cancellations made more than 90 days before your event receive a full deposit refund. Between 30–90 days, 50% of your deposit is retained. Within 30 days, the full deposit is retained. Cancellations within 7 days also incur 25% of the remaining balance. Please see our Terms & Conditions for full details.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="bg-background text-white pt-20">
      {/* Header */}
      <section className="py-20 lg:py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              Transparent Pricing
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Packages & Pricing
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              No hidden fees, no surprises. Choose your booth and package that
              suits your celebration and we&apos;ll handle everything else.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Guarantee banner */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-8">
        <div className="flex items-center gap-3 bg-green-950/40 border border-green-700/40 rounded-xl px-5 py-3">
          <span className="text-2xl">🛡️</span>
          <div>
            <p className="text-green-400 font-semibold text-sm">Book with complete confidence</p>
            <p className="text-gray-300 text-sm">Full 100% refund if you cancel 90+ days before your event. No questions asked.</p>
          </div>
        </div>
      </div>

      {/* Pricing by Booth Type */}
      {/* Comparison CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 lg:pb-32">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
          className="mb-16 p-8 rounded-2xl bg-surface border border-border"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">
                Comparing Our Packages?
              </h3>
              <p className="text-gray-400 text-sm">
                View all tiers and booths side-by-side to find the perfect match for your event.
              </p>
            </div>
            <button
              onClick={() => setShowComparison(true)}
              className="px-6 py-2.5 rounded-full border border-gold text-gold hover:bg-gold/10 transition-all duration-200 font-semibold text-sm whitespace-nowrap"
            >
              Compare All Packages
            </button>
          </div>
        </motion.div>
      </div>

      {/* Booth Sections - Full Width */}
      {boothPricing.map((booth, boothIdx) => (
        <section
          key={booth.booth}
          className={`py-20 lg:py-24 ${boothIdx % 2 === 0 ? "bg-surface/30" : "bg-background"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            >
              {/* Booth header - Minimal */}
              <div className="text-left mb-12">
                <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
                  {booth.tagline}
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {booth.booth}
                </h2>
              </div>

              {/* Three pricing tiers for this booth - Responsive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {Object.entries(booth.tiers).map(([tierKey, tier], tierIdx) => {
                  const isSignature = tierKey === "signature";
                  return (
                    <motion.div
                      key={tierKey}
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={prefersReducedMotion ? { duration: 0 } : {
                        duration: 0.6,
                        delay: tierIdx * 0.1,
                      }}
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
                            {(() => {
                              const Icon = tierIcons[tierKey];
                              return (
                                <Icon
                                  className={`w-6 h-6 ${
                                    isSignature
                                      ? "text-gold"
                                      : "text-gray-400"
                                  }`}
                                />
                              );
                            })()}
                          </div>
                          <h3
                            className="text-2xl font-bold text-white mb-1"
                            style={{ fontFamily: "var(--font-playfair)" }}
                          >
                            {tier.name}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {tier.tagline}
                          </p>
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
                                    isSignature
                                      ? "text-gold"
                                      : "text-white"
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
                                  isSignature
                                    ? "text-gold"
                                    : "text-emerald-400"
                                }`}
                              />
                              {f}
                            </li>
                          ))}
                        </ul>

                        {/* CTA */}
                        <Link
                          href={`/book?productId=${booth.slug}&tier=${tierKey}`}
                          className={`block w-full text-center py-3 sm:py-2.5 rounded-full font-semibold text-sm transition-all duration-200 min-h-[48px] sm:min-h-[44px] flex items-center justify-center ${
                            isSignature
                              ? "bg-gold text-background hover:bg-gold-light shadow-lg shadow-gold/25 hover:shadow-gold/40 hover:-translate-y-0.5"
                              : "border border-border text-white hover:border-gold/40 hover:bg-white/5"
                          }`}
                        >
                          Book This Package
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>
      ))}

      {/* Pricing footer note */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-sm py-8"
        >
          All prices include VAT. {DEPOSIT_LABEL} deposit required to secure your date.
        </motion.p>
      </div>

      {/* Add-ons */}
      <section className="py-24 lg:py-32 bg-[#080810]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              Enhance Your Experience
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Optional Add-Ons
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Personalise your package with any of our premium add-ons.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addOns.map((addon, i) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-5 rounded-2xl bg-surface border border-border hover:border-gold/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-white font-semibold text-sm">
                    {addon.name}
                  </h3>
                  <span className="text-gold font-bold text-sm ml-3 flex-shrink-0">
                    +{addon.price}
                  </span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {addon.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              Got Questions?
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl bg-surface border border-border overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/5 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-white font-medium text-sm leading-relaxed">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-border pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-[#080810]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Zap className="w-10 h-10 text-gold mx-auto mb-4" />
            <h2
              className="text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ready to Secure Your Date?
            </h2>
            <p className="text-gray-400 mb-8">
              Dates fill up fast — especially weekends. Book today with just a{" "}
              {DEPOSIT_LABEL} deposit.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 sm:py-3 rounded-full bg-gold text-background font-bold hover:bg-gold-light transition-all duration-200 shadow-lg shadow-gold/25 hover:-translate-y-0.5 min-h-[48px] sm:min-h-[44px]"
            >
              Book Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2 text-sm text-orange-400 mt-3">
              <span>⚡</span>
              <span>Weekends book fast — secure your date early to avoid disappointment</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Modal */}
      <PricingComparisonModal
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
      />
    </div>
  );
}

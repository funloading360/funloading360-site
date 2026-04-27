"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Camera,
  Sparkles,
  Zap,
  ChevronDown,
} from "lucide-react";
import { boothPricing, formatPrice } from "@/lib/packages";
import { useReducedMotion } from "@/lib/useReducedMotion";

const boothIcons = [Camera, Sparkles, Zap];

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
      "Yes, we require a 15% deposit to secure your booking, with the remaining balance due 14 days before your event. All payments are processed securely online.",
  },
  {
    question: "What happens if I need to cancel?",
    answer:
      "We understand that plans can change. Cancellations made more than 90 days before your event receive a full deposit refund. Between 30–90 days, 50% of your deposit is retained. Within 30 days, the full deposit is retained. Cancellations within 7 days also incur 25% of the remaining balance. Please see our Terms & Conditions for full details.",
  },
];

export default function ServiceGridContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anim = (props: Record<string, any>) => (prefersReducedMotion ? {} : props);

  return (
    <div className="bg-background text-white pt-20">
      {/* Hero Header */}
      <section className="py-16 lg:py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={anim({ opacity: 0, y: 20 })}
            animate={anim({ opacity: 1, y: 0 })}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Photo Booth Hire Prices — From £280
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed" data-speakable-faq="0">
              Photo booth hire in the UK costs £280-£470 for 2-4 hours, depending on booth type and package tier. Below: transparent, all-inclusive pricing for 360° Slow Motion, Glam Vintage with unlimited prints, and Selfie Pod booths — across Essex, Kent and London.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Postcard Grid */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {boothPricing.map((booth, idx) => {
              const Icon = boothIcons[idx] ?? Camera;
              const minPrice = Math.min(
                ...Object.values(booth.tiers).flatMap((t) =>
                  t.prices.map((p) => p.price)
                )
              );

              return (
                <Link key={booth.slug} href={`/pricing/${booth.slug}`} className="block">
                  <motion.div
                    initial={anim({ opacity: 0, y: 40 })}
                    whileInView={anim({ opacity: 1, y: 0 })}
                    viewport={{ once: true }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.6, delay: idx * 0.12 }
                    }
                    whileHover={anim({ y: -4 })}
                    className="rounded-3xl bg-surface border border-border overflow-hidden flex flex-col group hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10 transition-all duration-300 h-full cursor-pointer"
                  >
                  {/* Visual area */}
                  <div className="relative h-52 overflow-hidden">
                    {booth.slug === "360-slow-motion" && (
                      <>
                        <Image
                          src="/360-slow-motion-card.jpg"
                          alt="360 Slow Motion photo booth"
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-background/20" />
                      </>
                    )}
                    {booth.slug === "glam-vintage" && (
                      <>
                        <Image
                          src="/glam-vintage-card.jpg"
                          alt="Glam Vintage photo booth"
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-background/20" />
                      </>
                    )}
                    {booth.slug === "selfie-pod" && (
                      <>
                        <Image
                          src="/selfie-pod-card.jpg"
                          alt="Selfie Pod photo booth"
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-background/20" />
                      </>
                    )}
                    {/* Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold/20 border border-gold/30 text-gold text-xs font-semibold backdrop-blur-sm z-10">
                      {booth.tagline}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-7 flex flex-col flex-1">
                    <h2
                      className="text-2xl font-bold text-white mb-1"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {booth.booth}
                    </h2>
                    <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">
                      {booth.tagline}
                    </p>

                    <div className="h-px bg-border mb-4" />

                    <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-6">
                      {booth.shortDescription}
                    </p>

                    <div className="h-px bg-border mb-5" />

                    <div className="flex items-end justify-between mb-5">
                      <div>
                        <p className="text-gray-500 text-xs mb-0.5">Starting from</p>
                        <p className="text-2xl font-bold text-white">
                          {formatPrice(minPrice)}
                        </p>
                      </div>
                      <span className="text-gray-500 text-xs">3 packages available</span>
                    </div>

                    <span className="booth-btn flex items-center justify-center gap-2 w-full py-3 rounded-full border border-gold/40 hover:bg-gold hover:border-gold transition-all duration-200 group-hover:border-gold">
                      <span className="booth-btn-text text-gold font-semibold text-sm transition-colors duration-200">View Packages</span>
                      <ArrowRight className="booth-btn-text w-4 h-4 text-gold transition-colors duration-200" />
                    </span>
                  </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 lg:py-24 bg-[#080810]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={anim({ opacity: 0, y: 30 })}
            whileInView={anim({ opacity: 1, y: 0 })}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-center mb-10 lg:mb-12"
          >
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
                initial={anim({ opacity: 0, y: 20 })}
                whileInView={anim({ opacity: 1, y: 0 })}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: i * 0.08 }}
                className="p-5 rounded-2xl bg-surface border border-border hover:border-gold/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-white font-semibold text-sm">{addon.name}</h3>
                  <span className="text-gold font-bold text-sm ml-3 flex-shrink-0">
                    +{addon.price}
                  </span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{addon.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={anim({ opacity: 0, y: 30 })}
            whileInView={anim({ opacity: 1, y: 0 })}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
            className="text-center mb-10 lg:mb-12"
          >
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
                initial={anim({ opacity: 0, y: 20 })}
                whileInView={anim({ opacity: 1, y: 0 })}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: i * 0.08 }}
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

      {/* Final CTA */}
      <section className="py-16 lg:py-20 bg-[#080810]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={anim({ opacity: 0, y: 30 })}
            whileInView={anim({ opacity: 1, y: 0 })}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
          >
            <Sparkles className="w-10 h-10 text-gold mx-auto mb-4" />
            <h2
              className="text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ready to Make It Unforgettable?
            </h2>
            <p className="text-gray-400 mb-8">
              Secure your date today — our most popular weekends book out weeks in advance.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 sm:py-3 rounded-full bg-gold text-background font-bold hover:bg-gold-light transition-all duration-200 shadow-lg shadow-gold/25 hover:-translate-y-0.5 min-h-[48px] sm:min-h-[44px]"
            >
              Book Your Experience
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

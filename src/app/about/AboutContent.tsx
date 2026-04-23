"use client";

import Link from "next/link";
import { Award, Users, DollarSign, Heart } from "lucide-react";
import RazStoryCard from "./components/RazStoryCard";
import UpdatedValueCard from "./components/UpdatedValueCard";
import BoothShowcaseSection from "./components/BoothShowcaseSection";
import ClientStoryCarousel from "./components/ClientStoryCarousel";
import SocialProofSection from "./components/SocialProofSection";
import ServiceAreaCard from "./components/ServiceAreaCard";
import { motion } from "framer-motion";
import { booths } from "./data/booths";
import { serviceAreas } from "./data/serviceAreas";

const coreValues = [
  {
    icon: Award,
    title: "Professional Quality",
    description:
      "High-resolution cameras, professional lighting, premium props. Every booth is maintained to cinematic standards.",
  },
  {
    icon: Users,
    title: "Expert Operators",
    description:
      "Trained, caring attendants who understand your event. We're not background staff—we're part of making it great.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description:
      "No hidden fees. No surprises. Setup, delivery, operation, all included. What you see is what you pay.",
  },
  {
    icon: Heart,
    title: "We Care About Your Event",
    description:
      "Your event memories matter to us. That's why we show up early, stay late, and treat every booking like our most important one.",
  },
];

export default function AboutContent() {
  return (
    <div className="bg-background text-white pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              About FunLoading360 — UK Photo Booth Hire Since 2023
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto" data-speakable-faq="0">
              FunLoading360 is a UK photo booth hire company founded in 2023, headquartered in Chelmsford, Essex (CM3 5NF). We operate three professional booth types — 360° slow-motion, glam vintage, and selfie pod — serving weddings, corporate events, birthdays, and proms across Essex, Kent, and London. 4.9★ rating from 48+ verified reviews.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Raz Story Section */}
      <RazStoryCard />

      {/* Core Values Grid (4 Cards) */}
      <section className="py-16 lg:py-24 bg-surface/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 lg:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Our Core Commitment
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We don't just rent photo booths. We deliver exceptional experiences backed by genuine care for your event.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, idx) => (
              <UpdatedValueCard
                key={idx}
                icon={value.icon}
                title={value.title}
                description={value.description}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Booth Showcase Sections */}
      {booths.map((booth, idx) => (
        <BoothShowcaseSection key={booth.id} booth={booth} index={idx} />
      ))}

      {/* Client Stories Carousel */}
      <ClientStoryCarousel />

      {/* Social Proof Section */}
      <SocialProofSection />

      {/* Service Areas */}
      <section className="py-16 lg:py-24 bg-surface/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              We Know Your Area
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Deep expertise in Essex, Kent, and London. We know the venues, the expectations, and exactly what it takes to deliver.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {serviceAreas.map((area, idx) => (
              <ServiceAreaCard key={area.id} area={area} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              Ready to Bring the Fun?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              From micro-weddings to corporate galas, we're ready to make your event unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="px-8 py-4 rounded-full bg-gold text-background font-bold hover:bg-gold-light transition-colors"
              >
                Book Your Booth
              </Link>
              <Link
                href="/pricing"
                className="booth-btn inline-flex items-center gap-2 px-8 py-4 rounded-full border border-gold/40 hover:bg-gold hover:border-gold transition-all duration-200"
              >
                <span className="booth-btn-text text-gold font-semibold text-sm transition-colors duration-200">View Pricing</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

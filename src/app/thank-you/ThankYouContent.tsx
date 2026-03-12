"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Mail, Phone, ArrowRight } from "lucide-react";

export default function ThankYouContent() {
  return (
    <div className="bg-[#0a0a0e] text-white min-h-screen pt-20 pb-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#f5a623]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <CheckCircle className="w-20 h-20 text-[#f5a623]" strokeWidth={1.5} />
            </motion.div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Enquiry Received!
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Thank you for your interest in FunLoading360. We've received your enquiry and our team will be in touch within <span className="text-[#f5a623] font-semibold">2 hours</span> to confirm availability and discuss your event.
            </p>

            <div className="bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-8 mb-8">
              <p className="text-gray-400 text-sm mb-4">
                In the meantime, you can:
              </p>
              <ul className="space-y-3 text-left text-gray-300 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#f5a623] flex-shrink-0 mt-0.5" />
                  <span>Check out our <Link href="/gallery" className="text-[#f5a623] hover:underline">gallery of past events</Link></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#f5a623] flex-shrink-0 mt-0.5" />
                  <span>Explore our <Link href="/booths" className="text-[#f5a623] hover:underline">three premium booths</Link> in detail</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#f5a623] flex-shrink-0 mt-0.5" />
                  <span>Review our <Link href="/pricing" className="text-[#f5a623] hover:underline">transparent pricing and packages</Link></span>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <a
                href="tel:+447482112110"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-[#f5a623]/30 text-white hover:bg-[#f5a623]/10 transition-all duration-200"
              >
                <Phone className="w-5 h-5 text-[#f5a623]" />
                <span className="font-semibold">+44 7482 112110</span>
              </a>
              <a
                href="mailto:FunLoading360@gmail.com"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-[#f5a623]/30 text-white hover:bg-[#f5a623]/10 transition-all duration-200"
              >
                <Mail className="w-5 h-5 text-[#f5a623]" />
                <span className="font-semibold">Email us</span>
              </a>
            </div>

            {/* CTA */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#f5a623] text-[#0a0a0e] font-bold hover:bg-[#fbbf4a] transition-all duration-200 shadow-lg shadow-[#f5a623]/25 hover:-translate-y-0.5"
            >
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Questions in the Meantime?
            </h2>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-[#13131a] border border-[#2a2a3a]">
                <h3 className="text-white font-semibold mb-2">What happens next?</h3>
                <p className="text-gray-400 text-sm">
                  Our team reviews your enquiry and calls within 2 hours (Monday–Sunday, 9am–9pm) to confirm your date, discuss package options, and answer any questions.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#13131a] border border-[#2a2a3a]">
                <h3 className="text-white font-semibold mb-2">How do I book?</h3>
                <p className="text-gray-400 text-sm">
                  Once you've confirmed your date and package, we'll send a booking link. A 30% deposit secures your date, with the balance due 14 days before your event.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#13131a] border border-[#2a2a3a]">
                <h3 className="text-white font-semibold mb-2">What if my date isn't available?</h3>
                <p className="text-gray-400 text-sm">
                  No problem! Our team will suggest alternative dates that work for you. We typically have availability across Essex, Kent, and London.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#13131a] border border-[#2a2a3a]">
                <h3 className="text-white font-semibold mb-2">Do you offer add-ons?</h3>
                <p className="text-gray-400 text-sm">
                  Yes! We offer extras like custom overlays, guest books, backdrop upgrades, and more. Our team will discuss these options when they call.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Mail, MessageCircle, ArrowRight, Clock } from "lucide-react";

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
              Your Request Has Been Received!
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-3">
              Thank you for your interest in FunLoading360. We've received your request and our team will get in touch within <span className="text-[#f5a623] font-semibold">2 hours</span> to confirm availability.
            </p>

            <p className="text-gray-400 text-sm mb-8">
              Your quote will be sent via email and SMS within the next 5 minutes.
            </p>

            {/* Confirmation Messages */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-2xl p-6 text-left"
              >
                <div className="flex items-start gap-3 mb-2">
                  <Mail className="w-5 h-5 text-[#f5a623] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold">Confirmation Email</h3>
                    <p className="text-gray-400 text-xs mt-1">Check your inbox and spam folder</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-[#f5a623]/10 border border-[#f5a623]/30 rounded-2xl p-6 text-left"
              >
                <div className="flex items-start gap-3 mb-2">
                  <MessageCircle className="w-5 h-5 text-[#f5a623] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold">Confirmation SMS</h3>
                    <p className="text-gray-400 text-xs mt-1">Text message with booking details</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Next Steps */}
            <div className="bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-8 mb-8">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#f5a623]" />
                What happens now?
              </h3>
              <ul className="space-y-3 text-left text-gray-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#f5a623] font-bold flex-shrink-0 w-6">1.</span>
                  <span>Your quote will be generated in ~5 minutes and sent via email</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#f5a623] font-bold flex-shrink-0 w-6">2.</span>
                  <span>Our team will review availability and confirm within 2 hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#f5a623] font-bold flex-shrink-0 w-6">3.</span>
                  <span>We'll call you to discuss details and finalize your booking</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#f5a623] font-bold flex-shrink-0 w-6">4.</span>
                  <span>Pay the 15% deposit to confirm your date</span>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <a
                href="tel:+447482112110"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-[#f5a623]/30 text-white hover:bg-[#f5a623]/10 transition-all duration-200"
              >
                <span className="font-semibold">+44 7482 112110</span>
              </a>
              <a
                href="mailto:hello@funloading360.co.uk"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-[#f5a623]/30 text-white hover:bg-[#f5a623]/10 transition-all duration-200"
              >
                <span className="font-semibold">hello@funloading360.co.uk</span>
              </a>
            </div>

            {/* CTA */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#f5a623] text-[#0a0a0e] font-bold hover:bg-[#fbbf4a] transition-all duration-200 shadow-lg shadow-[#f5a623]/25 hover:-translate-y-0.5"
            >
              Back Home
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
              Questions?
            </h2>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-[#13131a] border border-[#2a2a3a]">
                <h3 className="text-white font-semibold mb-2">What happens next?</h3>
                <p className="text-gray-400 text-sm">
                  Our team reviews your request and contacts you within 2 hours (Mon-Sun, 9am-9pm) to confirm your date and discuss details.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#13131a] border border-[#2a2a3a]">
                <h3 className="text-white font-semibold mb-2">How is my booking finalized?</h3>
                <p className="text-gray-400 text-sm">
                  After confirming availability, you'll receive a payment request for the 15% deposit. The balance is due before your event.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#13131a] border border-[#2a2a3a]">
                <h3 className="text-white font-semibold mb-2">What if my date isn't available?</h3>
                <p className="text-gray-400 text-sm">
                  No problem! Our team will suggest alternative dates that work. We have availability across Essex, Kent and London.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#13131a] border border-[#2a2a3a]">
                <h3 className="text-white font-semibold mb-2">Do you offer add-ons?</h3>
                <p className="text-gray-400 text-sm">
                  Yes! We offer add-ons like guest books, highlight reels and extra hours. Our team will discuss these options.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

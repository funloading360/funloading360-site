"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Mail, CreditCard, ArrowRight, Clock } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const isPaid = !!sessionId;
  const { clearCart } = useCart();

  // Clear cart and verify session after successful payment
  useEffect(() => {
    if (!sessionId) return;
    clearCart();
    fetch(`/api/checkout/verify-session?session_id=${encodeURIComponent(sessionId)}`)
      .catch(() => {});
  }, [sessionId]);

  return (
    <div className="bg-background text-white min-h-screen pt-20 pb-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/5 rounded-full blur-3xl" />
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
              <CheckCircle className="w-20 h-20 text-gold" strokeWidth={1.5} />
            </motion.div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {isPaid ? "Booking Confirmed!" : "Your Request Has Been Received!"}
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-3">
              {isPaid
                ? "Your payment has been processed and your date is secured. We look forward to making your event unforgettable!"
                : "Thank you for your interest in FunLoading360. Our team will get in touch within 2 hours to confirm availability."}
            </p>

            {!isPaid && (
              <p className="text-gray-400 text-sm mb-8">
                Your quote will be sent via email within the next 5 minutes.
              </p>
            )}

            {/* Confirmation Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10 mt-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gold/10 border border-gold/30 rounded-2xl p-6 text-left"
              >
                <div className="flex items-start gap-3 mb-2">
                  <Mail className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold">Confirmation Email</h3>
                    <p className="text-gray-400 text-xs mt-1">
                      {isPaid
                        ? "A detailed booking confirmation has been sent to your email"
                        : "Check your inbox and spam folder"}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gold/10 border border-gold/30 rounded-2xl p-6 text-left"
              >
                <div className="flex items-start gap-3 mb-2">
                  <CreditCard className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold">
                      {isPaid ? "Stripe Receipt" : "Payment Details"}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1">
                      {isPaid
                        ? "Stripe will send a separate payment receipt to your email"
                        : "You'll receive a payment request after confirmation"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Next Steps */}
            <div className="bg-surface border border-border rounded-2xl p-8 mb-8">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gold" />
                What happens next?
              </h3>
              <ul className="space-y-3 text-left text-gray-300 text-sm">
                {isPaid ? (
                  <>
                    <li className="flex items-start gap-3">
                      <span className="text-gold font-bold flex-shrink-0 w-6">1.</span>
                      <span>You will receive a confirmation email with your full booking details</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold font-bold flex-shrink-0 w-6">2.</span>
                      <span>Stripe will send a separate payment receipt</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold font-bold flex-shrink-0 w-6">3.</span>
                      <span>Our team will contact you to discuss event details and logistics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold font-bold flex-shrink-0 w-6">4.</span>
                      <span>If you paid a deposit, the remaining balance is due before your event</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-3">
                      <span className="text-gold font-bold flex-shrink-0 w-6">1.</span>
                      <span>Your quote will be generated in ~5 minutes and sent via email</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold font-bold flex-shrink-0 w-6">2.</span>
                      <span>Our team will review availability and confirm within 2 hours</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold font-bold flex-shrink-0 w-6">3.</span>
                      <span>We&apos;ll call you to discuss details and finalize your booking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-gold font-bold flex-shrink-0 w-6">4.</span>
                      <span>Pay the 15% deposit to confirm your date</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <a
                href="tel:+447482112110"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-gold/30 text-white hover:bg-gold/10 transition-all duration-200"
              >
                <span className="font-semibold">+44 7482 112110</span>
              </a>
              <a
                href="mailto:FunLoading360@gmail.com"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-gold/30 text-white hover:bg-gold/10 transition-all duration-200"
              >
                <span className="font-semibold">FunLoading360@gmail.com</span>
              </a>
            </div>

            {/* CTA */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-background font-bold hover:bg-gold-light transition-all duration-200 shadow-lg shadow-gold/25 hover:-translate-y-0.5"
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
              <div className="p-6 rounded-2xl bg-surface border border-border">
                <h3 className="text-white font-semibold mb-2">What happens next?</h3>
                <p className="text-gray-400 text-sm">
                  {isPaid
                    ? "Your date is secured! Our team will contact you to discuss event details and logistics."
                    : "Our team reviews your request and contacts you within 2 hours (Mon-Sun, 9am-9pm) to confirm your date and discuss details."}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface border border-border">
                <h3 className="text-white font-semibold mb-2">Can I cancel or reschedule?</h3>
                <p className="text-gray-400 text-sm">
                  Yes. Please review our <Link href="/terms" className="text-gold hover:underline">Terms &amp; Conditions</Link> for our cancellation policy. Contact us at FunLoading360@gmail.com to request changes.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface border border-border">
                <h3 className="text-white font-semibold mb-2">What if my date isn&apos;t available?</h3>
                <p className="text-gray-400 text-sm">
                  No problem! Our team will suggest alternative dates that work. We have availability across Essex, Kent and London.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface border border-border">
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

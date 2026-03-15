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
              Cererea ta a fost primită!
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-3">
              Mulțumesc pentru interesul în FunLoading360. Am primit cererea ta și echipa noastră va veni în contact în maxim <span className="text-[#f5a623] font-semibold">2 ore</span> pentru a confirma disponibilitatea.
            </p>

            <p className="text-gray-400 text-sm mb-8">
              Oferta ta va fi trimisă prin email și SMS în următoarele 5 minute.
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
                    <h3 className="text-white font-semibold">Email de confirmare</h3>
                    <p className="text-gray-400 text-xs mt-1">Verific-ți inbox și folderul de spam</p>
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
                    <h3 className="text-white font-semibold">SMS de confirmare</h3>
                    <p className="text-gray-400 text-xs mt-1">Mesaj text cu detaliile rezervării</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Next Steps */}
            <div className="bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-8 mb-8">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#f5a623]" />
                Ce se întâmplă acum?
              </h3>
              <ul className="space-y-3 text-left text-gray-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#f5a623] font-bold flex-shrink-0 w-6">1.</span>
                  <span>Oferta ta va fi generată în ~5 minute și trimisă prin email</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#f5a623] font-bold flex-shrink-0 w-6">2.</span>
                  <span>Echipa noastră va revizui disponibilitatea și va confirma în 2 ore</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#f5a623] font-bold flex-shrink-0 w-6">3.</span>
                  <span>Te vom contacta prin telefon pentru a discuta detalii și a finaliza rezervarea</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#f5a623] font-bold flex-shrink-0 w-6">4.</span>
                  <span>Plătește depozitul de 15% pentru a confirma data</span>
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
              Înapoi la Acasă
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
              Întrebări?
            </h2>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-[#13131a] border border-[#2a2a3a]">
                <h3 className="text-white font-semibold mb-2">Ce se întâmplă mai departe?</h3>
                <p className="text-gray-400 text-sm">
                  Echipa noastră revizuiește cererea și ia contact în 2 ore (luni-duminică, 9:00-21:00) pentru a confirma data și discuta detalii.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#13131a] border border-[#2a2a3a]">
                <h3 className="text-white font-semibold mb-2">Cum se finalizează rezervarea?</h3>
                <p className="text-gray-400 text-sm">
                  După confirmarea disponibilității, vei primi o cerere de plată pentru depozitul de 15%. Restul se plătește înainte de eveniment.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#13131a] border border-[#2a2a3a]">
                <h3 className="text-white font-semibold mb-2">Ce se întâmplă dacă data nu este disponibilă?</h3>
                <p className="text-gray-400 text-sm">
                  Fără probleme! Echipa noastră va sugera date alternative care se potrivesc. Avem disponibilitate în Essex, Kent și Londra.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#13131a] border border-[#2a2a3a]">
                <h3 className="text-white font-semibold mb-2">Oferiți îmbunătățiri?</h3>
                <p className="text-gray-400 text-sm">
                  Da! Oferim servicii suplimentare precum carte de oaspeți, montaj video și oră suplimentară. Echipa va discuta aceste opțiuni.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

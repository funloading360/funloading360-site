"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ShoppingCart, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { services, formatPrice, getPriceForTier, PricingTier } from "@/lib/services";
import { useCart } from "@/hooks/useCart";
import { fadeUp } from "@/lib/variants";

interface AddToCartModalState {
  isOpen: boolean;
  productId: string | null;
  selectedTier: PricingTier | null;
  quantity: number;
}

export default function ServicesContent() {
  const { addToCart, getItemCount } = useCart();
  const [modalState, setModalState] = useState<AddToCartModalState>({
    isOpen: false,
    productId: null,
    selectedTier: null,
    quantity: 1,
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const photoBooths = services.find((s) => s.id === "photo-booths");
  const products = photoBooths?.products || [];
  const modalProduct = products.find((p) => p.id === modalState.productId);

  const openModal = (productId: string) => {
    setModalState({
      isOpen: true,
      productId,
      selectedTier: null,
      quantity: 1,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      productId: null,
      selectedTier: null,
      quantity: 1,
    });
  };

  const handleAddToCart = () => {
    if (!modalState.productId || !modalState.selectedTier) return;

    addToCart(modalState.productId, modalState.selectedTier, modalState.quantity);
    setSuccessMessage(`Added to cart! (${modalState.quantity} item)`);
    closeModal();

    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="bg-[#0a0a0e] text-white pt-20 min-h-screen">
      {/* Header */}
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
            <p className="text-[#f5a623] text-sm font-semibold uppercase tracking-widest mb-3">
              Our Services
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Professional Photo Booths
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Three unique experiences for any occasion. From cinematic 360° video to classic
              vintage photos — find your perfect match.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coș Badge - Top Right */}
      <div className="fixed top-24 right-6 z-40">
        <Link href="/cart" className="relative inline-flex">
          <div className="p-3 rounded-full bg-[#f5a623] text-[#0a0a0e] hover:bg-[#fbbf4a] transition-colors shadow-lg">
            <ShoppingCart className="w-6 h-6" />
          </div>
          {getItemCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {getItemCount()}
            </span>
          )}
        </Link>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-32 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300 text-sm font-medium"
          >
            ✅ {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Servicii Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                i % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Imagine */}
              <motion.div
                variants={fadeUp}
                className={`relative rounded-3xl overflow-hidden aspect-[4/3] border ${product.borderColor}`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority={i === 0}
                  loading={i === 0 ? "eager" : "lazy"}
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-5 left-5">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${product.badgeColor} backdrop-blur-sm border border-white/10`}>
                    {product.tagline}
                  </span>
                </div>
              </motion.div>

              {/* Conținut */}
              <motion.div
                variants={fadeUp}
                className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}
              >
                <p className="text-[#f5a623] text-sm font-semibold uppercase tracking-widest mb-3">
                  {product.tagline}
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-white mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {product.name}
                </h2>
                <p className="text-xl text-gray-300 mb-4 leading-relaxed font-medium">
                  {product.description}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {product.longDescription}
                </p>

                {/* Tieruri de Preț */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                  {(Object.entries(product.tiers) as Array<[PricingTier, any]>).map(
                    ([tierKey, tier]) => (
                      <div
                        key={tierKey}
                        className="p-4 rounded-xl bg-[#13131a] border border-[#2a2a3a] text-center"
                      >
                        <h4 className="font-bold text-white mb-1">{tier.name}</h4>
                        <p className="text-[#f5a623] font-bold text-lg mb-3">
                          {formatPrice(getPriceForTier(product, tierKey))}
                        </p>
                        <button
                          onClick={() => openModal(product.id)}
                          className="w-full py-2 rounded-lg bg-[#f5a623] text-[#0a0a0e] font-semibold text-sm hover:bg-[#fbbf4a] transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    )
                  )}
                </div>

                {/* Caracteristici */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                  {product.tiers.essential.features.slice(0, 8).map((f) => (
                    <div key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-[#f5a623] flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>

                {/* Perfect For */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-gray-500 text-sm self-center">Perfect for:</span>
                  {product.perfectFor.split(",").map((item) => (
                    <span
                      key={item.trim()}
                      className="px-3 py-1 rounded-full bg-[#13131a] border border-[#2a2a3a] text-gray-300 text-xs"
                    >
                      {item.trim()}
                    </span>
                  ))}
                </div>

                <Link
                  href="/cart"
                  className="inline-flex items-center gap-2 px-7 py-3 sm:py-2.5 rounded-full bg-[#f5a623] text-[#0a0a0e] font-bold text-sm hover:bg-[#fbbf4a] transition-all duration-200 shadow-lg shadow-[#f5a623]/20 hover:-translate-y-0.5 min-h-[48px] sm:min-h-[44px]"
                >
                  Go to Cart
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Comparare */}
      <section className="py-20 lg:py-24 bg-[#080810]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Not sure which to choose?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
              Our team is ready to help you choose the perfect photo booth for your event. Call us or press the button below.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-7 py-3 sm:py-2.5 rounded-full bg-[#f5a623] text-[#0a0a0e] font-bold text-sm hover:bg-[#fbbf4a] transition-all duration-200 shadow-lg shadow-[#f5a623]/20 hover:-translate-y-0.5 w-full sm:w-auto justify-center min-h-[48px] sm:min-h-[44px]"
              >
                View Packages
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+447482112110"
                className="inline-flex items-center gap-2 px-7 py-3 sm:py-2.5 rounded-full border border-[#2a2a3a] text-white font-semibold text-sm hover:border-[#f5a623]/40 hover:bg-white/5 transition-all duration-200 w-full sm:w-auto justify-center min-h-[48px] sm:min-h-[44px]"
              >
                Call Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal Add to Cart */}
      <AnimatePresence>
        {modalState.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-8 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h3
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Choose Package
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Tier Selection */}
              <div className="space-y-3 mb-8">
                {modalProduct && (Object.entries(modalProduct.tiers) as Array<[PricingTier, any]>).map(
                  ([tierKey, tier]) => (
                    <button
                      key={tierKey}
                      onClick={() =>
                        setModalState({ ...modalState, selectedTier: tierKey })
                      }
                      className={cn(
                        "w-full p-4 rounded-xl border-2 text-left transition-all",
                        modalState.selectedTier === tierKey
                          ? "border-[#f5a623] bg-[#f5a623]/10"
                          : "border-[#2a2a3a] hover:border-[#f5a623]/50"
                      )}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-white">{tier.name}</h4>
                        <span className="text-[#f5a623] font-bold">
                          {modalProduct && formatPrice(getPriceForTier(modalProduct, tierKey))}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{tier.tagline}</p>
                    </button>
                  )
                )}
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setModalState({
                        ...modalState,
                        quantity: Math.max(1, modalState.quantity - 1),
                      })
                    }
                    className="px-4 py-2 rounded-lg bg-[#2a2a3a] hover:bg-[#3a3a4a] text-white"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center text-white font-bold">
                    {modalState.quantity}
                  </span>
                  <button
                    onClick={() =>
                      setModalState({
                        ...modalState,
                        quantity: modalState.quantity + 1,
                      })
                    }
                    className="px-4 py-2 rounded-lg bg-[#2a2a3a] hover:bg-[#3a3a4a] text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 rounded-lg border border-[#2a2a3a] text-white font-semibold hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={!modalState.selectedTier}
                  className={cn(
                    "flex-1 px-4 py-3 rounded-lg font-bold transition-all",
                    modalState.selectedTier
                      ? "bg-[#f5a623] text-[#0a0a0e] hover:bg-[#fbbf4a]"
                      : "bg-[#2a2a3a] text-gray-500 cursor-not-allowed"
                  )}
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

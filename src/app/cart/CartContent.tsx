"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { getPriceForTier, formatPrice, PricingTier } from "@/lib/services";
import { cn } from "@/lib/utils";
import { trackViewCart, trackRemoveFromCart, trackBeginCheckout } from "@/lib/analytics";
import { trackFunnelStage } from "@/lib/conversionFunnel";

export default function CartContent() {
  const { items, removeFromCart, updateQuantity, updateTier, getProduct, getCartTotal } =
    useCart();

  // Track cart view on mount
  useEffect(() => {
    const totalPrice = getCartTotal();
    if (items.length > 0) {
      const cartItems = items
        .map((item) => {
          const product = getProduct(item.productId);
          if (!product) return null;
          return {
            productId: item.productId,
            productName: product.name,
            tier: item.selectedTier,
            price: getPriceForTier(product, item.selectedTier),
            quantity: item.quantity,
          };
        })
        .filter((item) => item !== null) as Array<{
        productId: string;
        productName: string;
        tier: string;
        price: number;
        quantity: number;
      }>;

      if (cartItems.length > 0) {
        trackViewCart(cartItems, totalPrice);
        trackFunnelStage("cart_view", { itemCount: items.length, cartTotal: totalPrice });
      }
    }
  }, []);

  const isEmpty = items.length === 0;
  const totalPrice = getCartTotal();
  const depositPrice = Math.round(totalPrice * 0.15);

  return (
    <div className="bg-[#0a0a0e] text-white min-h-screen pt-20 pb-20">
      {/* Header */}
      <section className="py-16 lg:py-20 text-center relative overflow-hidden mb-12">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#f5a623]/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Coșul tău
            </h1>
            <p className="text-gray-400 text-lg">
              {isEmpty ? "Coșul este gol" : `${items.length} articol${items.length !== 1 ? "e" : ""} în coș`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Empty State */}
      {isEmpty ? (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <ShoppingCart className="w-16 h-16 mx-auto mb-6 text-gray-500" />
            <h2 className="text-2xl font-bold mb-3">Coșul este gol</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Explorează serviciile noastre și adaugă pachete în coș pentru a continua.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#f5a623] text-[#0a0a0e] font-bold text-sm hover:bg-[#fbbf4a] transition-all duration-200 shadow-lg shadow-[#f5a623]/20"
            >
              Explorează Serviciile
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>
      ) : (
        /* Cart Items */
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item, index) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;

                  const itemPrice = getPriceForTier(product, item.selectedTier);
                  const itemTotal = itemPrice * item.quantity;

                  return (
                    <motion.div
                      key={item.productId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 items-start">
                        {/* Product Image & Name */}
                        <div className="sm:col-span-1">
                          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#1a1a24] border border-[#2a2a3a]">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 200px"
                            />
                          </div>
                        </div>

                        {/* Details */}
                        <div className="sm:col-span-2 flex flex-col justify-between">
                          <div>
                            <h3
                              className="text-lg sm:text-xl font-bold text-white mb-1"
                              style={{ fontFamily: "var(--font-playfair)" }}
                            >
                              {product.name}
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">{product.description}</p>

                            {/* Tier Selection */}
                            <div className="mb-4">
                              <label className="block text-xs font-semibold text-gray-300 mb-2">
                                Pachet
                              </label>
                              <select
                                value={item.selectedTier}
                                onChange={(e) =>
                                  updateTier(item.productId, e.target.value as PricingTier)
                                }
                                className="w-full px-3 py-2 rounded-lg bg-[#2a2a3a] border border-[#3a3a4a] text-white text-sm hover:border-[#f5a623]/50 transition-colors"
                              >
                                {(Object.entries(product.tiers) as Array<[PricingTier, any]>).map(
                                  ([tierKey, tier]) => (
                                    <option key={tierKey} value={tierKey}>
                                      {tier.name} — {formatPrice(getPriceForTier(product, tierKey))}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>

                            {/* Quantity */}
                            <div>
                              <label className="block text-xs font-semibold text-gray-300 mb-2">
                                Cantitate
                              </label>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.productId, Math.max(1, item.quantity - 1))
                                  }
                                  className="px-3 py-1.5 rounded-lg bg-[#2a2a3a] hover:bg-[#3a3a4a] text-white text-sm transition-colors"
                                >
                                  −
                                </button>
                                <span className="w-12 text-center font-bold text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.productId, item.quantity + 1)
                                  }
                                  className="px-3 py-1.5 rounded-lg bg-[#2a2a3a] hover:bg-[#3a3a4a] text-white text-sm transition-colors"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Price & Remove */}
                        <div className="sm:col-span-1 flex flex-col items-end justify-between h-full">
                          <div className="text-right">
                            <p className="text-[#f5a623] font-bold text-lg">
                              {formatPrice(itemTotal)}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {formatPrice(itemPrice)} × {item.quantity}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              const product = getProduct(item.productId);
                              if (product) {
                                const price = getPriceForTier(product, item.selectedTier);
                                trackRemoveFromCart(item.productId, product.name, price);
                              }
                              removeFromCart(item.productId);
                            }}
                            className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 transition-all"
                            title="Șterge articolul"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Summary Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="h-fit sticky top-24"
            >
              <div className="bg-[#13131a] border border-[#2a2a3a] rounded-xl p-6 space-y-6">
                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Rezumat
                </h3>

                {/* Summary Items */}
                <div className="space-y-3 border-b border-[#2a2a3a] pb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Articole ({items.length})</span>
                    <span className="text-white font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                {/* Deposit Info */}
                <div className="bg-[#f5a623]/10 border border-[#f5a623]/20 rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-2">Depozit necesar (15%)</p>
                  <p className="text-xl font-bold text-[#f5a623]">{formatPrice(depositPrice)}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Restul se plătește înainte de eveniment
                  </p>
                </div>

                {/* Total */}
                <div className="border-t border-[#2a2a3a] pt-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-2xl font-bold text-[#f5a623]">{formatPrice(totalPrice)}</span>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-3">
                    <Link
                      href="/book"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#f5a623] text-[#0a0a0e] font-bold text-sm hover:bg-[#fbbf4a] transition-all duration-200 shadow-lg shadow-[#f5a623]/20"
                    >
                      Continuă Checkout
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/services"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#2a2a3a] text-white font-semibold text-sm hover:border-[#f5a623]/40 hover:bg-white/5 transition-all duration-200"
                    >
                      Continuă Cumpărături
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

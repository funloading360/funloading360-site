"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";
import { formatPrice, getPriceForTierAndHours, PricingTier, Product } from "@/lib/services";
import { trackRemoveFromCart } from "@/lib/analytics";
import { CartItem } from "@/hooks/useCart";

interface CartItemsEditorProps {
  items: CartItem[];
  updateTier: (productId: string, tier: PricingTier) => void;
  updateHours: (productId: string, hours: number) => void;
  removeFromCart: (productId: string) => void;
  getProduct: (productId: string) => Product | undefined;
}

export default function CartItemsEditor({
  items,
  updateTier,
  updateHours,
  removeFromCart,
  getProduct,
}: CartItemsEditorProps) {
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {items.map((item) => {
          const product = getProduct(item.productId);
          if (!product) return null;

          const itemPrice = getPriceForTierAndHours(product, item.selectedTier, item.selectedHours);
          const tierData = product.tiers[item.selectedTier];

          return (
            <motion.div
              key={item.productId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0d0d16] border border-border rounded-xl p-4"
            >
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-border">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Details + Dropdowns */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold text-white truncate">{product.name}</h3>
                    <p className="text-gold font-bold text-base flex-shrink-0">
                      {formatPrice(itemPrice)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Tier Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">
                        Package
                      </label>
                      <select
                        value={item.selectedTier}
                        onChange={(e) =>
                          updateTier(item.productId, e.target.value as PricingTier)
                        }
                        className="w-full px-2 py-1.5 rounded-lg bg-border border border-[#3a3a4a] text-white text-xs hover:border-gold/50 transition-colors"
                      >
                        {(Object.entries(product.tiers) as Array<[PricingTier, any]>).map(
                          ([tierKey, tier]) => (
                            <option key={tierKey} value={tierKey}>
                              {tier.name}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    {/* Duration Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1">
                        Duration
                      </label>
                      <select
                        value={item.selectedHours}
                        onChange={(e) =>
                          updateHours(item.productId, Number(e.target.value))
                        }
                        className="w-full px-2 py-1.5 rounded-lg bg-border border border-[#3a3a4a] text-white text-xs hover:border-gold/50 transition-colors"
                      >
                        {tierData?.prices.map((priceOpt: { duration: string; price: number }) => {
                          const hrs = parseInt(priceOpt.duration, 10);
                          return (
                            <option key={priceOpt.duration} value={isNaN(hrs) ? 0 : hrs}>
                              {priceOpt.duration} — {formatPrice(priceOpt.price)}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => {
                    if (product) {
                      const price = getPriceForTierAndHours(product, item.selectedTier, item.selectedHours);
                      trackRemoveFromCart(item.productId, product.name, price);
                    }
                    removeFromCart(item.productId);
                  }}
                  className="self-center p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 transition-all flex-shrink-0"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <Link
        href="/services"
        className="block text-center py-2 text-sm text-gold hover:text-gold-light transition-colors font-medium"
      >
        + Add another package
      </Link>
    </div>
  );
}

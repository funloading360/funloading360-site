'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { boothPricing } from '@/lib/packages';
import Link from 'next/link';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  slug?: string;
}

export default function PricingComparisonModal({ isOpen, onClose, slug }: ComparisonModalProps) {
  const booth = boothPricing.find((b) => b.slug === slug) ?? boothPricing[0];

  // Collect all unique features across the tiers of this booth only
  const allFeatures = booth
    ? Array.from(
        new Set(Object.values(booth.tiers).flatMap((tier) => tier.features))
      ).sort()
    : [];

  // Create column headers for the 3 tiers of this booth only
  const columns = booth
    ? Object.entries(booth.tiers).map(([tierKey, tier]) => ({
        tierKey,
        tierName: tier.name,
        tier,
        maxPrice: Math.max(...tier.prices.map((p) => p.price)),
      }))
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-surface border border-border rounded-3xl w-full max-w-7xl max-h-[85vh] overflow-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-surface border-b border-border p-6 flex items-center justify-between">
              <h2
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Compare {booth?.booth} Packages
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close comparison"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto p-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-gray-300 font-semibold min-w-[200px] sticky left-0 bg-surface z-10">
                      Feature
                    </th>
                    {columns.map((col) => (
                      <th
                        key={col.tierKey}
                        className="text-center p-4 text-white font-bold min-w-[180px] bg-background"
                      >
                        <div className="text-base font-bold text-white">
                          {col.tierName}
                        </div>
                        <div className="text-lg font-bold text-gold mt-2">
                          £{col.maxPrice}
                        </div>
                        <div className="text-xs text-gray-500 font-normal">
                          {col.tier.prices.length > 0
                            ? col.tier.prices[col.tier.prices.length - 1].duration
                            : ''}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Features rows */}
                  {allFeatures.map((feature, idx) => (
                    <tr
                      key={feature}
                      className={idx % 2 === 0 ? 'bg-background' : 'bg-surface'}
                    >
                      <td className="p-4 text-gray-300 text-sm font-medium sticky left-0 z-10 bg-inherit">
                        {feature}
                      </td>
                      {columns.map((col) => (
                        <td
                          key={`${col.tierKey}-${feature}`}
                          className="text-center p-4"
                        >
                          {col.tier.features.includes(feature) ? (
                            <Check className="w-5 h-5 text-gold mx-auto" />
                          ) : (
                            <span className="text-gray-600">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer CTA */}
            <div className="sticky bottom-0 bg-surface border-t border-border p-6 text-center">
              <p className="text-gray-400 text-sm mb-4">
                Ready to book? Let's find the perfect package for your event.
              </p>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gold text-background font-bold hover:bg-gold-light transition-all duration-200 shadow-lg shadow-gold/25 hover:-translate-y-0.5"
              >
                Start Booking
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

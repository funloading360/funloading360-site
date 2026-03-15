"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StripePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentIntentId: string) => void;
  totalPrice: number;
  depositAmount: number;
  email: string;
  name: string;
  isLoading?: boolean;
}

export default function StripePaymentModal({
  isOpen,
  onClose,
  onSuccess,
  totalPrice,
  depositAmount,
  email,
  name,
  isLoading = false,
}: StripePaymentModalProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);

    try {
      // TODO: Integrate with Stripe Elements
      // For now, this is a placeholder
      console.log("Payment processing...", {
        email,
        name,
        amount: depositAmount,
      });

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess(true);
      setTimeout(() => {
        onSuccess("pi_mock_" + Date.now());
        onClose();
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Payment processing failed"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isProcessing) onClose();
      }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-md bg-[#13131a] border border-[#2a2a3a] rounded-2xl p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Pay Deposit</h2>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1 hover:bg-[#2a2a3a] rounded transition-colors disabled:opacity-50"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Amount Info */}
        <div className="bg-[#0a0a0e] rounded-lg p-4 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Total Booking:</span>
            <span className="text-white font-semibold">£{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-3 pb-3 border-b border-[#2a2a3a]">
            <span className="text-gray-400">Deposit (15%):</span>
            <span className="text-[#f5a623] font-semibold">£{depositAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-300 text-xs">Remaining (85%) due before event</span>
          </div>
        </div>

        {success ? (
          // Success State
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-[#f5a623]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-[#f5a623]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Payment Confirmed!
            </h3>
            <p className="text-sm text-gray-400">
              Confirmation email sent to {email}
            </p>
          </motion.div>
        ) : (
          // Payment Form
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Card Number
              </label>
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                maxLength={19}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                disabled={isProcessing}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#0a0a0e] border border-[#2a2a3a] text-white placeholder-gray-600 focus:outline-none focus:border-[#f5a623] transition-colors disabled:opacity-50"
              />
            </div>

            {/* Expiry & CVC */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  disabled={isProcessing}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#0a0a0e] border border-[#2a2a3a] text-white placeholder-gray-600 focus:outline-none focus:border-[#f5a623] transition-colors disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  CVC
                </label>
                <input
                  type="text"
                  placeholder="123"
                  maxLength={4}
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                  disabled={isProcessing}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#0a0a0e] border border-[#2a2a3a] text-white placeholder-gray-600 focus:outline-none focus:border-[#f5a623] transition-colors disabled:opacity-50"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Info Text */}
            <p className="text-xs text-gray-500 text-center">
              For testing: 4242 4242 4242 4242 | Any future date | Any CVC
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing || !cardNumber || !cardExpiry || !cardCvc}
              className={cn(
                "w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2",
                isProcessing
                  ? "bg-[#f5a623]/50 text-white cursor-not-allowed"
                  : "bg-[#f5a623] text-[#0a0a0e] hover:bg-[#f5a623]/90 active:scale-95"
              )}
            >
              {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
              {isProcessing ? "Processing..." : `Pay £${depositAmount.toFixed(2)}`}
            </button>

            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="w-full py-2 px-4 rounded-lg font-medium text-gray-300 hover:text-white transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Lock, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getProductById, formatPrice, getPriceForTierAndHours, PricingTier } from "@/lib/services";
import { ADDONS } from "@/lib/constants";
import { useCart } from "@/hooks/useCart";
import CustomCalendar from "@/components/CustomCalendar";
import CartItemsEditor from "./CartItemsEditor";
import { trackViewCart } from "@/lib/analytics";
import { trackFunnelStage } from "@/lib/conversionFunnel";

const eventTypes = [
  "Wedding",
  "Birthday",
  "Corporate Event",
  "School Prom",
  "Anniversary",
  "Christening",
  "Engagement Party",
  "Other",
];


export default function BookPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items: cartItems, addToCart, removeFromCart, updateHours, updateTier, getProduct, isLoading } = useCart();

  // Track whether we've just added an item from URL params to prevent premature redirect
  const addedFromParamsRef = useRef(false);

  // If URL has productId + tier params (e.g. from /pricing CTA), add to cart before rendering
  useEffect(() => {
    if (isLoading) return;
    const productId = searchParams.get("productId");
    const tier = searchParams.get("tier") as PricingTier | null;
    if (productId && tier) {
      addedFromParamsRef.current = true;
      addToCart(productId, tier);
      // Remove params from URL so a page refresh doesn't re-add the item
      router.replace("/book");
    }
  }, [isLoading, searchParams, addToCart, router]);

  // Redirect to services if cart is empty (only when no productId param is present and not mid-add)
  useEffect(() => {
    if (!isLoading && cartItems.length === 0 && !searchParams.get("productId") && !addedFromParamsRef.current) {
      router.replace("/services");
    }
  }, [cartItems, isLoading, router, searchParams]);

  // Track cart view on mount (ported from CartContent)
  useEffect(() => {
    if (cartItems.length > 0) {
      const cartTotal = getCartItemsTotal();
      const mapped = cartItems
        .map((item) => {
          const product = getProductById(item.productId);
          if (!product) return null;
          return {
            productId: item.productId,
            productName: product.name,
            tier: item.selectedTier,
            price: getPriceForTierAndHours(product, item.selectedTier, item.selectedHours),
            quantity: 1,
          };
        })
        .filter((item) => item !== null) as Array<{
        productId: string;
        productName: string;
        tier: string;
        price: number;
        quantity: number;
      }>;

      if (mapped.length > 0) {
        trackViewCart(mapped, cartTotal);
        trackFunnelStage("cart_view", { itemCount: cartItems.length, cartTotal });
      }
    }
  }, []);

  // Check if user was redirected back from cancelled Stripe checkout
  useEffect(() => {
    if (searchParams.get("cancelled") === "true") {
      setCancelled(true);
    }
  }, [searchParams]);

  const [selectedUpsells, setSelectedUpsells] = useState<string[]>([]);
  const [paymentType, setPaymentType] = useState<"deposit" | "full">("deposit");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    altDate: "",
    venue: "",
    specialRequests: "",
  });

  const hasItems = cartItems.length > 0;

  // Derive current step: step 2 once user starts filling personal details
  const currentStep = formData.name || formData.email || formData.phone || formData.eventDate ? 2 : 1;

  const handleToggleUpsell = (upsellId: string) => {
    setSelectedUpsells(prev =>
      prev.includes(upsellId)
        ? prev.filter(id => id !== upsellId)
        : [...prev, upsellId]
    );
  };

  const calculateUpsellTotal = () => {
    return selectedUpsells.reduce((sum, id) => {
      const upsell = ADDONS.find(u => u.id === id);
      return sum + (upsell?.price || 0);
    }, 0);
  };

  const getCartItemsTotal = () => {
    return cartItems.reduce((sum, item) => {
      const product = getProductById(item.productId);
      if (!product) return sum;
      return sum + getPriceForTierAndHours(product, item.selectedTier, item.selectedHours);
    }, 0);
  };

  const getTotalPrice = () => {
    return getCartItemsTotal() + calculateUpsellTotal();
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return '';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^(\+44[\s\-]?|0044[\s\-]?|0)(7\d{9}|[1-9]\d{8,9}|\d{2}[\s\-]?\d{4}[\s\-]?\d{4})$/.test(value.trim())) {
          return 'Please enter a valid UK phone number (e.g. 07700 123456 or +44 7700 123456)';
        }
        return '';
      case 'eventDate':
        if (!value) return 'Event date is required';
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) return 'Event date must be in the future';
        return '';
      case 'venue':
        if (!value.trim()) return 'Venue is required';
        return '';
      case 'eventType':
        if (!value) return 'Event type is required';
        return '';
      default:
        return '';
    }
  };

  const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const error = validateField('phone', e.target.value);
    setFieldErrors(prev => ({
      ...prev,
      phone: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[handleSubmit] formData:', JSON.stringify(formData));

    // Validate all fields
    const newErrors: Record<string, string> = {};
    newErrors.name = validateField('name', formData.name);
    newErrors.email = validateField('email', formData.email);
    newErrors.phone = validateField('phone', formData.phone);
    newErrors.eventDate = validateField('eventDate', formData.eventDate);
    newErrors.venue = validateField('venue', formData.venue);
    newErrors.eventType = validateField('eventType', formData.eventType);

    // If any errors exist, show them and don't submit
    if (Object.values(newErrors).some(err => err)) {
      setFieldErrors(newErrors);
      const firstError = Object.keys(newErrors).find(key => newErrors[key]);
      if (firstError) {
        const element = document.getElementById(`book-${firstError}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Clear errors if all valid
    setFieldErrors({});

    setSubmitError(null);
    setCancelled(false);
    setIsSubmitting(true);
    try {
      const firstItem = cartItems[0];
      const res = await fetch("/api/checkout/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: firstItem.productId,
          tier: firstItem.selectedTier,
          cartItems: cartItems.map(item => ({
            productId: item.productId,
            tier: item.selectedTier,
            hours: item.selectedHours || 2,
          })),
          upsells: selectedUpsells,
          totalPrice: getTotalPrice(),
          paymentType,
          ...formData,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error?.message || "submission failed");
      window.location.href = data.data.checkoutUrl;
    } catch {
      setIsSubmitting(false);
      setSubmitError("An error occurred. Please try again or contact us at FunLoading360@gmail.com");
    }
  };

  return (
    <div className="bg-background text-white pt-20 min-h-screen">
      {/* Header */}
      <section className="py-14 lg:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gold/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              Complete Your Booking
            </p>
            <h1
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Book Your Photo Booth
            </h1>
            <p className="text-gray-400">
              Complete your booking below. We'll confirm availability within 2 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cancelled Banner */}
      {cancelled && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <span>Payment was cancelled. Your booking has not been confirmed. You can try again below.</span>
          </div>
        </div>
      )}

      {/* Checkout Form */}
      {hasItems && (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              {/* Progress indicator */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${currentStep >= 1 ? 'bg-yellow-400 text-black' : 'bg-white/10 text-gray-400'}`}>1</div>
                  <span className={`text-sm ${currentStep >= 1 ? 'text-white' : 'text-gray-500'}`}>Select Package</span>
                </div>
                <div className="flex-1 h-px bg-white/10 max-w-[40px]" />
                <div className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${currentStep >= 2 ? 'bg-yellow-400 text-black' : 'bg-white/10 text-gray-400'}`}>2</div>
                  <span className={`text-sm ${currentStep >= 2 ? 'text-white' : 'text-gray-500'}`}>Your Details</span>
                </div>
              </div>

              {/* Cart Items — editable inline */}
              <div className="rounded-2xl bg-surface border border-border p-6 mb-6">
                <h2
                  className="text-2xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Your Cart ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                  Modify your packages below, or add more from our services page.
                </p>

                <CartItemsEditor
                  items={cartItems}
                  updateTier={updateTier}
                  updateHours={updateHours}
                  removeFromCart={removeFromCart}
                  getProduct={getProduct}
                />
              </div>

              <h2
                className="text-2xl font-bold text-white mb-8"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Booking Details & Add-ons
              </h2>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Date Section */}
                <div className="rounded-2xl bg-surface border border-border p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Event Date</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preferred Date <span className="text-gold">*</span>
                      </label>
                      <CustomCalendar
                        value={formData.eventDate}
                        onChange={(date) => {
                          setFormData(prev => ({ ...prev, eventDate: date }));
                          setFieldErrors(prev => ({...prev, eventDate: ""}));
                        }}
                        minDate={new Date().toISOString().split("T")[0]}
                        productIds={cartItems.map(item => item.productId)}
                      />
                      {fieldErrors.eventDate && (
                        <div className="mt-1.5 flex items-start gap-2 text-red-400 text-xs">
                          <span className="flex-shrink-0 mt-0.5">⚠️</span>
                          <span>{fieldErrors.eventDate}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="book-alt-date" className="block text-sm font-medium text-gray-300 mb-2">
                        Alternative Date <span className="text-gray-500 font-normal">(optional)</span>
                      </label>
                      <input
                        id="book-alt-date"
                        type="date"
                        value={formData.altDate ?? ""}
                        onChange={(e) =>
                          setFormData(prev => ({ ...prev, altDate: e.target.value }))
                        }
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#0d0d16] border border-border text-white text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-colors [color-scheme:dark] min-h-[48px] sm:min-h-[44px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="rounded-2xl bg-surface border border-border p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Personal Details</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="book-name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name <span className="text-gold">*</span>
                      </label>
                      <input
                        id="book-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => {
                          console.log('[name onChange]', e.target.value);
                          setFormData(prev => ({ ...prev, name: e.target.value }));
                        }}
                        onBlur={handleFieldBlur}
                        placeholder="e.g. John Smith"
                        className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#0d0d16] border ${
                          fieldErrors.name ? 'border-red-500/50' : 'border-border'
                        } text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-colors min-h-[48px] sm:min-h-[44px]`}
                      />
                      {fieldErrors.name && (
                        <div className="mt-1.5 flex items-start gap-2 text-red-400 text-xs">
                          <span className="flex-shrink-0 mt-0.5">⚠️</span>
                          <span>{fieldErrors.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="book-email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email <span className="text-gold">*</span>
                      </label>
                      <input
                        id="book-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData(prev => ({ ...prev, email: e.target.value }))
                        }
                        onBlur={handleFieldBlur}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#0d0d16] border ${
                          fieldErrors.email ? 'border-red-500/50' : 'border-border'
                        } text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-colors min-h-[48px] sm:min-h-[44px]`}
                      />
                      {fieldErrors.email && (
                        <div className="mt-1.5 flex items-start gap-2 text-red-400 text-xs">
                          <span className="flex-shrink-0 mt-0.5">⚠️</span>
                          <span>{fieldErrors.email}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="book-phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone <span className="text-gold">*</span>
                      </label>
                      <input
                        id="book-phone"
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData(prev => ({ ...prev, phone: e.target.value }))
                        }
                        onBlur={handlePhoneBlur}
                        placeholder="+44 7482 112110"
                        className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#0d0d16] border ${
                          fieldErrors.phone ? 'border-red-500/50' : 'border-border'
                        } text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-colors min-h-[48px] sm:min-h-[44px]`}
                      />
                      {fieldErrors.phone && (
                        <div className="mt-1.5 flex items-start gap-2 text-red-400 text-xs">
                          <span className="flex-shrink-0 mt-0.5">⚠️</span>
                          <span>{fieldErrors.phone}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="book-event-type" className="block text-sm font-medium text-gray-300 mb-2">
                        Event Type <span className="text-gold">*</span>
                      </label>
                      <select
                        id="book-event-type"
                        name="eventType"
                        required
                        value={formData.eventType}
                        onChange={(e) =>
                          setFormData(prev => ({ ...prev, eventType: e.target.value }))
                        }
                        onBlur={handleFieldBlur}
                        className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#0d0d16] border ${
                          fieldErrors.eventType ? 'border-red-500/50' : 'border-border'
                        } text-white text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-colors appearance-none min-h-[48px] sm:min-h-[44px]`}
                      >
                        <option value="" disabled className="text-gray-600">
                          Select event type
                        </option>
                        {eventTypes.map((type) => (
                          <option key={type} value={type} className="bg-[#0d0d16]">
                            {type}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.eventType && (
                        <div className="mt-1.5 flex items-start gap-2 text-red-400 text-xs">
                          <span className="flex-shrink-0 mt-0.5">⚠️</span>
                          <span>{fieldErrors.eventType}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="book-venue" className="block text-sm font-medium text-gray-300 mb-2">
                      Event Venue <span className="text-gold">*</span>
                    </label>
                    <input
                      id="book-venue"
                      type="text"
                      name="venue"
                      required
                      value={formData.venue}
                      onChange={(e) =>
                        setFormData(prev => ({ ...prev, venue: e.target.value }))
                      }
                      onBlur={handleFieldBlur}
                      placeholder="e.g. Grand Hotel, 123 Main Street, London, SW1A 1AA"
                      className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#0d0d16] border ${
                        fieldErrors.venue ? 'border-red-500/50' : 'border-border'
                      } text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-colors min-h-[48px] sm:min-h-[44px]`}
                    />
                    {fieldErrors.venue && (
                      <div className="mt-1.5 flex items-start gap-2 text-red-400 text-xs">
                        <span className="flex-shrink-0 mt-0.5">⚠️</span>
                        <span>{fieldErrors.venue}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <label htmlFor="book-requests" className="block text-sm font-medium text-gray-300 mb-2">
                      Special Requests <span className="text-gray-500 font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="book-requests"
                      rows={3}
                      value={formData.specialRequests}
                      onChange={(e) =>
                        setFormData(prev => ({ ...prev, specialRequests: e.target.value }))
                      }
                      placeholder="Themes, allergies, accessibility needs..."
                      className="w-full px-4 py-3 rounded-xl bg-[#0d0d16] border border-border text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Upsells */}
                <div className="rounded-2xl bg-surface border border-border p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Available Add-ons</h3>
                  <p className="text-gray-400 text-sm mb-4">Select the add-ons that suit your event</p>

                  <div className="space-y-3">
                    {ADDONS.map((upsell) => (
                      <button
                        key={upsell.id}
                        type="button"
                        onClick={() => handleToggleUpsell(upsell.id)}
                        className={cn(
                          "w-full p-4 rounded-xl border-2 text-left transition-all",
                          selectedUpsells.includes(upsell.id)
                            ? "border-gold bg-gold/10"
                            : "border-border hover:border-gold/50"
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-bold text-white">{upsell.name}</h4>
                            <p className="text-gray-400 text-sm">{upsell.description}</p>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            <p className="text-gold font-bold">+{formatPrice(upsell.price)}</p>
                            <div className={cn(
                              "w-5 h-5 rounded border-2 flex items-center justify-center mt-2",
                              selectedUpsells.includes(upsell.id)
                                ? "border-gold bg-gold"
                                : "border-border"
                            )}>
                              {selectedUpsells.includes(upsell.id) && (
                                <Check className="w-3 h-3 text-background" />
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {submitError && (
                  <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <span className="mt-0.5 flex-shrink-0">⚠️</span>
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "inline-flex items-center gap-2 px-8 py-3 sm:py-2.5 rounded-full font-bold text-sm transition-all duration-200 min-h-[48px] sm:min-h-[44px]",
                      isSubmitting
                        ? "bg-gold/70 text-background cursor-not-allowed"
                        : "bg-gold text-background hover:bg-gold-light shadow-lg shadow-gold/25 hover:-translate-y-0.5"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Redirecting to payment...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Proceed to Payment
                      </>
                    )}
                  </button>
                </div>

                <p className="text-gray-500 text-xs leading-relaxed">
                  By proceeding to payment you agree to our{" "}
                  <Link href="/privacy-policy" className="text-gold hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" className="text-gold hover:underline">
                    Terms &amp; Conditions
                  </Link>
                  .
                </p>
              </form>
            </div>

            {/* Summary Sidebar */}
            <div className="h-fit sticky top-24">
              <div className="bg-surface border border-border rounded-xl p-6 space-y-6">
                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Summary
                </h3>

                {/* Cart Items */}
                <div className="border-b border-border pb-4 space-y-4">
                  {cartItems.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;
                    const tier = product.tiers[item.selectedTier];
                    const price = getPriceForTierAndHours(product, item.selectedTier, item.selectedHours);
                    return (
                      <div key={item.productId} className="space-y-1">
                        <p className="text-white font-bold text-sm">{product.name}</p>
                        <p className="text-gold text-xs font-semibold">{tier?.name}</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">{item.selectedHours} Hours</span>
                          <span className="text-white font-bold">{formatPrice(price)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Upsells */}
                {selectedUpsells.length > 0 && (
                  <div className="border-b border-border pb-4 space-y-2">
                    <p className="text-xs text-gray-400 mb-3">Selected Add-ons</p>
                    {selectedUpsells.map((upsellId) => {
                      const upsell = ADDONS.find(u => u.id === upsellId);
                      return (
                        <div key={upsellId} className="flex justify-between text-sm">
                          <span className="text-gray-300">{upsell?.name}</span>
                          <span className="text-gold font-medium">+{formatPrice(upsell?.price || 0)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Payment Option */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-400 mb-2">Payment Option</p>
                  <button
                    type="button"
                    onClick={() => setPaymentType("deposit")}
                    className={cn(
                      "w-full p-3 rounded-lg border-2 text-left transition-all",
                      paymentType === "deposit"
                        ? "border-gold bg-gold/10"
                        : "border-border hover:border-gold/50"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white font-medium">Pay 15% Deposit</span>
                      <span className="text-gold font-bold">
                        {getTotalPrice() > 0 ? formatPrice(Math.round(getTotalPrice() * 0.15)) : "—"}
                      </span>
                    </div>
                    {paymentType === "deposit" && (
                      <p className="text-xs text-gray-500 mt-1">
                        Remaining balance ({formatPrice(getTotalPrice() - Math.round(getTotalPrice() * 0.15))}) due before event
                      </p>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentType("full")}
                    className={cn(
                      "w-full p-3 rounded-lg border-2 text-left transition-all",
                      paymentType === "full"
                        ? "border-gold bg-gold/10"
                        : "border-border hover:border-gold/50"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white font-medium">Pay in Full</span>
                      <span className="text-gold font-bold">
                        {getTotalPrice() > 0 ? formatPrice(getTotalPrice()) : "—"}
                      </span>
                    </div>
                  </button>
                </div>

                {/* Total */}
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-2xl font-bold text-gold">
                      {getTotalPrice() > 0 ? formatPrice(getTotalPrice()) : "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

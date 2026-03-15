"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Calendar, User, Package, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { validatePhone } from "@/lib/validation";
import { services, formatPrice, getPriceForTier, PricingTier } from "@/lib/services";
import CustomCalendar from "@/components/CustomCalendar";

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

const upsells = [
  { id: "guest-book", name: "Guest Book", price: 40, description: "Guests sign memories" },
  { id: "extra-hour", name: "Extra Hour", price: 75, description: "More time for fun" },
  { id: "highlight-reel", name: "Highlight Reel", price: 79, description: "Professional edit next day" },
];

const steps = [
  { id: 0, label: "Selection", icon: Package },
  { id: 1, label: "Details", icon: User },
];

export default function BookPage() {
  const router = useRouter();

  const photoBooths = services.find((s) => s.id === "photo-booths");
  const products = photoBooths?.products || [];

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [selectedUpsells, setSelectedUpsells] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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

  const selectedProductData = products.find((p) => p.id === selectedProduct);
  const canProceed = selectedProduct && selectedTier;

  const handleToggleUpsell = (upsellId: string) => {
    setSelectedUpsells(prev =>
      prev.includes(upsellId)
        ? prev.filter(id => id !== upsellId)
        : [...prev, upsellId]
    );
  };

  const calculateUpsellTotal = () => {
    return selectedUpsells.reduce((sum, id) => {
      const upsell = upsells.find(u => u.id === id);
      return sum + (upsell?.price || 0);
    }, 0);
  };

  const getTotalPrice = () => {
    if (!selectedProductData || !selectedTier) return 0;
    const basePrice = getPriceForTier(selectedProductData, selectedTier);
    return basePrice + calculateUpsellTotal();
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
        const cleaned = value.replace(/[\s\-()\.]/g, '');
        if (!cleaned) return 'Phone number is required';
        if (!/^\+?\d{10,}$/.test(cleaned)) return 'Invalid format. Try: +44 7482 112110';
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
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct,
          tier: selectedTier,
          upsells: selectedUpsells,
          totalPrice: getTotalPrice(),
          ...formData,
          _hp: "",
        }),
      });
      if (!res.ok) throw new Error("submission failed");
      window.location.href = "/thank-you";
    } catch {
      setIsSubmitting(false);
      setSubmitError("An error occurred. Please try again or contact us at hello@funloading360.co.uk");
    }
  };

  return (
    <div className="bg-[#0a0a0e] text-white pt-20 min-h-screen">
      {/* Header */}
      <section className="py-14 lg:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#f5a623]/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#f5a623] text-sm font-semibold uppercase tracking-widest mb-3">
              Complete Your Booking
            </p>
            <h1
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Book Your Photo Booth
            </h1>
            <p className="text-gray-400">
              Complete in 2 easy steps. We'll confirm availability within 2 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stepper */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center justify-center gap-0">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 font-semibold text-sm",
                    currentStep === step.id
                      ? "bg-[#f5a623] border-[#f5a623] text-[#0a0a0e]"
                      : currentStep > step.id
                        ? "bg-[#f5a623]/20 border-[#f5a623]/40 text-[#f5a623] cursor-pointer"
                        : "bg-[#13131a] border-[#2a2a3a] text-gray-500"
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </button>
                <span
                  className={cn(
                    "text-xs mt-1.5 font-medium",
                    currentStep === step.id ? "text-[#f5a623]" : "text-gray-500"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "h-px w-16 sm:w-24 mx-3 mb-5 transition-colors duration-300",
                    currentStep > step.id ? "bg-[#f5a623]/40" : "bg-[#2a2a3a]"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <AnimatePresence mode="wait">
          {/* STEP 0: Select Service & Tier */}
          {currentStep === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2
                className="text-2xl font-bold text-white text-center mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Choose Your Photo Booth
              </h2>
              <p className="text-center text-gray-400 mb-10">
                Select the service and package that suits your event
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "relative rounded-2xl border-2 overflow-hidden transition-all duration-300 cursor-pointer",
                      selectedProduct === product.id
                        ? "border-[#f5a623] bg-[#f5a623]/10"
                        : "border-[#2a2a3a] hover:border-[#f5a623]/50 bg-[#13131a]"
                    )}
                    onClick={() => {
                      setSelectedProduct(product.id);
                      setSelectedTier(null);
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e] via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3
                        className="text-lg font-bold text-white mb-1"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">{product.description}</p>

                      {/* Tier Selection */}
                      {selectedProduct === product.id && (
                        <div className="space-y-2 mt-4 pt-4 border-t border-[#2a2a3a]">
                          {(Object.entries(product.tiers) as Array<[PricingTier, any]>).map(
                            ([tierKey, tier]) => (
                              <button
                                key={tierKey}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedTier(tierKey);
                                }}
                                className={cn(
                                  "w-full p-3 rounded-lg text-left text-sm transition-all",
                                  selectedTier === tierKey
                                    ? "bg-[#f5a623] text-[#0a0a0e] font-semibold"
                                    : "bg-[#2a2a3a] text-gray-300 hover:bg-[#3a3a4a]"
                                )}
                              >
                                <div className="flex justify-between items-center">
                                  <span>{tier.name}</span>
                                  <span className="font-bold">{formatPrice(getPriceForTier(product, tierKey))}</span>
                                </div>
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>

                    {selectedProduct === product.id && selectedTier && (
                      <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#f5a623] flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-[#0a0a0e]" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Next Button */}
              <div className="flex justify-end mt-10">
                <button
                  onClick={() => setCurrentStep(1)}
                  disabled={!canProceed}
                  className={cn(
                    "inline-flex items-center gap-2 px-8 py-3 sm:py-2.5 rounded-full font-semibold text-sm transition-all duration-200 min-h-[48px] sm:min-h-[44px]",
                    canProceed
                      ? "bg-[#f5a623] text-[#0a0a0e] hover:bg-[#fbbf4a] shadow-lg shadow-[#f5a623]/25 hover:-translate-y-0.5"
                      : "bg-[#13131a] text-gray-500 border border-[#2a2a3a] cursor-not-allowed"
                  )}
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 1: Date + Details + Upsells */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-2">
                  <h2
                    className="text-2xl font-bold text-white mb-8"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Details & Add-ons
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Date Section */}
                    <div className="rounded-2xl bg-[#13131a] border border-[#2a2a3a] p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Event Date</h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Preferred Date <span className="text-[#f5a623]">*</span>
                          </label>
                          <CustomCalendar
                            value={formData.eventDate}
                            onChange={(date) => {
                              setFormData({ ...formData, eventDate: date });
                              setFieldErrors(prev => ({...prev, eventDate: ""}));
                            }}
                            minDate={new Date().toISOString().split("T")[0]}
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
                              setFormData({ ...formData, altDate: e.target.value })
                            }
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#0d0d16] border border-[#2a2a3a] text-white text-sm focus:outline-none focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 transition-colors [color-scheme:dark] min-h-[48px] sm:min-h-[44px]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="rounded-2xl bg-[#13131a] border border-[#2a2a3a] p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Personal Details</h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="book-name" className="block text-sm font-medium text-gray-300 mb-2">
                            Full Name <span className="text-[#f5a623]">*</span>
                          </label>
                          <input
                            id="book-name"
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            onBlur={handleFieldBlur}
                            placeholder="e.g. John Smith"
                            className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#0d0d16] border ${
                              fieldErrors.name ? 'border-red-500/50' : 'border-[#2a2a3a]'
                            } text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 transition-colors min-h-[48px] sm:min-h-[44px]`}
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
                            Email <span className="text-[#f5a623]">*</span>
                          </label>
                          <input
                            id="book-email"
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            onBlur={handleFieldBlur}
                            placeholder="john@example.com"
                            className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#0d0d16] border ${
                              fieldErrors.email ? 'border-red-500/50' : 'border-[#2a2a3a]'
                            } text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 transition-colors min-h-[48px] sm:min-h-[44px]`}
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
                            Phone <span className="text-[#f5a623]">*</span>
                          </label>
                          <input
                            id="book-phone"
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            onBlur={handlePhoneBlur}
                            placeholder="+44 7482 112110"
                            className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#0d0d16] border ${
                              fieldErrors.phone ? 'border-red-500/50' : 'border-[#2a2a3a]'
                            } text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 transition-colors min-h-[48px] sm:min-h-[44px]`}
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
                            Event Type <span className="text-[#f5a623]">*</span>
                          </label>
                          <select
                            id="book-event-type"
                            name="eventType"
                            required
                            value={formData.eventType}
                            onChange={(e) =>
                              setFormData({ ...formData, eventType: e.target.value })
                            }
                            onBlur={handleFieldBlur}
                            className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#0d0d16] border ${
                              fieldErrors.eventType ? 'border-red-500/50' : 'border-[#2a2a3a]'
                            } text-white text-sm focus:outline-none focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 transition-colors appearance-none min-h-[48px] sm:min-h-[44px]`}
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
                          Event Venue <span className="text-[#f5a623]">*</span>
                        </label>
                        <input
                          id="book-venue"
                          type="text"
                          name="venue"
                          required
                          value={formData.venue}
                          onChange={(e) =>
                            setFormData({ ...formData, venue: e.target.value })
                          }
                          onBlur={handleFieldBlur}
                          placeholder="e.g. Grand Hotel, 123 Main Street, London, SW1A 1AA"
                          className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#0d0d16] border ${
                            fieldErrors.venue ? 'border-red-500/50' : 'border-[#2a2a3a]'
                          } text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 transition-colors min-h-[48px] sm:min-h-[44px]`}
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
                            setFormData({
                              ...formData,
                              specialRequests: e.target.value,
                            })
                          }
                          placeholder="Themes, allergies, accessibility needs..."
                          className="w-full px-4 py-3 rounded-xl bg-[#0d0d16] border border-[#2a2a3a] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 transition-colors resize-none"
                        />
                      </div>
                    </div>

                    {/* Upsells */}
                    <div className="rounded-2xl bg-[#13131a] border border-[#2a2a3a] p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Available Add-ons</h3>
                      <p className="text-gray-400 text-sm mb-4">Select the add-ons that suit your event</p>

                      <div className="space-y-3">
                        {upsells.map((upsell) => (
                          <button
                            key={upsell.id}
                            type="button"
                            onClick={() => handleToggleUpsell(upsell.id)}
                            className={cn(
                              "w-full p-4 rounded-xl border-2 text-left transition-all",
                              selectedUpsells.includes(upsell.id)
                                ? "border-[#f5a623] bg-[#f5a623]/10"
                                : "border-[#2a2a3a] hover:border-[#f5a623]/50"
                            )}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-bold text-white">{upsell.name}</h4>
                                <p className="text-gray-400 text-sm">{upsell.description}</p>
                              </div>
                              <div className="flex-shrink-0 ml-4">
                                <p className="text-[#f5a623] font-bold">+{formatPrice(upsell.price)}</p>
                                <div className={cn(
                                  "w-5 h-5 rounded border-2 flex items-center justify-center mt-2",
                                  selectedUpsells.includes(upsell.id)
                                    ? "border-[#f5a623] bg-[#f5a623]"
                                    : "border-[#2a2a3a]"
                                )}>
                                  {selectedUpsells.includes(upsell.id) && (
                                    <Check className="w-3 h-3 text-[#0a0a0e]" />
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

                    {/* Buttons */}
                    <div className="flex justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(0)}
                        className="inline-flex items-center gap-2 px-6 py-3 sm:py-2.5 rounded-full border border-[#2a2a3a] text-white font-medium text-sm hover:border-[#f5a623]/40 hover:bg-white/5 transition-all duration-200 min-h-[48px] sm:min-h-[44px]"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                          "inline-flex items-center gap-2 px-8 py-3 sm:py-2.5 rounded-full font-bold text-sm transition-all duration-200 min-h-[48px] sm:min-h-[44px]",
                          isSubmitting
                            ? "bg-[#f5a623]/70 text-[#0a0a0e] cursor-not-allowed"
                            : "bg-[#f5a623] text-[#0a0a0e] hover:bg-[#fbbf4a] shadow-lg shadow-[#f5a623]/25 hover:-translate-y-0.5"
                        )}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Request Quote
                            <ChevronRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-gray-500 text-xs leading-relaxed">
                      By submitting this form you agree to our{" "}
                      <Link href="/privacy-policy" className="text-[#f5a623] hover:underline">
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link href="/terms" className="text-[#f5a623] hover:underline">
                        Terms & Conditions
                      </Link>
                      . Your data will only be used to process your booking request.
                    </p>
                  </form>
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
                      Summary
                    </h3>

                    {/* Selected Service */}
                    {selectedProductData && selectedTier && (
                      <div className="border-b border-[#2a2a3a] pb-4 space-y-3">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Service</p>
                          <p className="text-white font-bold">{selectedProductData.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Package</p>
                          <p className="text-[#f5a623] font-bold">
                            {selectedProductData.tiers[selectedTier]?.name}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Price</span>
                          <span className="text-white font-bold">
                            {formatPrice(getPriceForTier(selectedProductData, selectedTier))}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Upsells */}
                    {selectedUpsells.length > 0 && (
                      <div className="border-b border-[#2a2a3a] pb-4 space-y-2">
                        <p className="text-xs text-gray-400 mb-3">Selected Add-ons</p>
                        {selectedUpsells.map((upsellId) => {
                          const upsell = upsells.find(u => u.id === upsellId);
                          return (
                            <div key={upsellId} className="flex justify-between text-sm">
                              <span className="text-gray-300">{upsell?.name}</span>
                              <span className="text-[#f5a623] font-medium">+{formatPrice(upsell?.price || 0)}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Deposit */}
                    <div className="bg-[#f5a623]/10 border border-[#f5a623]/20 rounded-lg p-4">
                      <p className="text-xs text-gray-400 mb-2">Deposit Required (15%)</p>
                      <p className="text-xl font-bold text-[#f5a623]">
                        {formatPrice(Math.round(getTotalPrice() * 0.15))}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Balance due before event
                      </p>
                    </div>

                    {/* Total */}
                    <div className="border-t border-[#2a2a3a] pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-white">Total</span>
                        <span className="text-2xl font-bold text-[#f5a623]">
                          {formatPrice(getTotalPrice())}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

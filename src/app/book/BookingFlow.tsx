"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Calendar, User, Package, Star, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { validatePhone } from "@/lib/validation";
import { packages, formatPrice } from "@/lib/packages";

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

const steps = [
  { id: 1, label: "Choose Package", icon: Package },
  { id: 2, label: "Pick Date", icon: Calendar },
  { id: 3, label: "Your Details", icon: User },
];

export default function BookPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string>("");
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

  const handleNextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
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
        if (selectedDate < today) return 'Date must be in the future';
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
    const result = validatePhone(e.target.value);
    setPhoneError(result.error || "");
    // Also validate with field errors
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
        body: JSON.stringify({ packageId: selectedPackage, ...formData, _hp: "" }),
      });
      if (!res.ok) throw new Error("submission failed");
      window.location.href = "/thank-you";
    } catch {
      setIsSubmitting(false);
      setSubmitError("Something went wrong. Please try again or email us at hello@funloading360.co.uk");
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
              Secure Your Date
            </p>
            <h1
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Book Your Photo Booth
            </h1>
            <p className="text-gray-400">
              Complete the steps below to request your booking. We&apos;ll confirm
              within 2 hours.
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
          {/* STEP 1: Choose Package */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2
                className="text-2xl font-bold text-white text-center mb-8"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Choose Your Package
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={cn(
                      "relative p-6 rounded-2xl border-2 text-left transition-all duration-200 group",
                      selectedPackage === pkg.id
                        ? "border-[#f5a623] bg-[#f5a623]/10"
                        : pkg.popular
                          ? "border-[#f5a623]/30 bg-[#13131a] hover:border-[#f5a623]/50"
                          : "border-[#2a2a3a] bg-[#13131a] hover:border-[#f5a623]/30"
                    )}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f5a623] text-[#0a0a0e] text-xs font-bold">
                          <Star className="w-3 h-3 fill-current" />
                          Most Popular
                        </span>
                      </div>
                    )}
                    {selectedPackage === pkg.id && (
                      <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#f5a623] flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-[#0a0a0e]" />
                      </div>
                    )}
                    <h3
                      className="text-lg font-bold text-white mb-1"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {pkg.name}
                    </h3>
                    <p className="text-gray-400 text-xs mb-4">{pkg.tagline}</p>
                    <div className="text-3xl font-bold text-[#f5a623] mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                      {formatPrice(pkg.price)}
                    </div>
                    <p className="text-gray-500 text-xs mb-4">
                      {pkg.duration} · {pkg.booth}
                    </p>
                    <ul className="space-y-1.5">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-gray-300">
                          <Check className="w-3 h-3 text-[#f5a623] flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
              <div className="flex justify-end mt-8">
                <button
                  onClick={handleNextStep}
                  disabled={!selectedPackage}
                  className={cn(
                    "inline-flex items-center gap-2 px-8 py-3 sm:py-2.5 rounded-full font-semibold text-sm transition-all duration-200 min-h-[48px] sm:min-h-[44px]",
                    selectedPackage
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

          {/* STEP 2: Pick Date */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2
                className="text-2xl font-bold text-white text-center mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Your Preferred Date
              </h2>
              <p className="text-gray-400 text-center text-sm mb-10">
                Tell us your event date and we&apos;ll confirm availability within 2 hours.
              </p>

              <div className="rounded-3xl bg-[#13131a] border border-[#2a2a3a] overflow-hidden">
                <div className="p-8 lg:p-10">
                  <div className="flex items-start gap-4 mb-8 p-4 rounded-2xl bg-[#f5a623]/5 border border-[#f5a623]/20">
                    <div className="w-10 h-10 rounded-xl bg-[#f5a623]/10 border border-[#f5a623]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Calendar className="w-5 h-5 text-[#f5a623]" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold mb-1">How it works</p>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        Submit your preferred date below. We&apos;ll check our calendar and confirm
                        availability within 2 hours — usually much sooner. No payment is taken until
                        your date is confirmed.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label htmlFor="step2-event-date" className="block text-sm font-medium text-gray-300 mb-2">
                        Preferred Event Date <span className="text-[#f5a623]">*</span>
                      </label>
                      <input
                        id="step2-event-date"
                        type="date"
                        required
                        value={formData.eventDate}
                        onChange={(e) =>
                          setFormData({ ...formData, eventDate: e.target.value })
                        }
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#0d0d16] border border-[#2a2a3a] text-white text-sm focus:outline-none focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 transition-colors [color-scheme:dark] min-h-[48px] sm:min-h-[44px]"
                      />
                    </div>

                    <div>
                      <label htmlFor="step2-alt-date" className="block text-sm font-medium text-gray-300 mb-2">
                        Alternative Date{" "}
                        <span className="text-gray-500 font-normal">(optional, if flexible)</span>
                      </label>
                      <input
                        id="step2-alt-date"
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

                  <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-[#2a2a3a]">
                    {[
                      { label: "Response time", value: "Within 2 hours" },
                      { label: "Payment", value: "After confirmation" },
                      { label: "Cancellation", value: "Free within 90 days" },
                    ].map((fact) => (
                      <div key={fact.label} className="text-center">
                        <p className="text-[#f5a623] text-xs font-semibold mb-1">{fact.value}</p>
                        <p className="text-gray-500 text-[11px]">{fact.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevStep}
                  className="inline-flex items-center gap-2 px-6 py-3 sm:py-2.5 rounded-full border border-[#2a2a3a] text-white font-medium text-sm hover:border-[#f5a623]/40 hover:bg-white/5 transition-all duration-200 min-h-[48px] sm:min-h-[44px]"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={!formData.eventDate}
                  className={cn(
                    "inline-flex items-center gap-2 px-8 py-3 sm:py-2.5 rounded-full font-semibold text-sm transition-all duration-200 min-h-[48px] sm:min-h-[44px]",
                    formData.eventDate
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

          {/* STEP 3: Your Details */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2
                className="text-2xl font-bold text-white text-center mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Your Details
              </h2>
              <p className="text-gray-400 text-center text-sm mb-10">
                We&apos;ll use these details to confirm your booking within 2 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot — hidden from real users, traps bots */}
                <input type="text" name="_hp" aria-hidden="true" tabIndex={-1} className="hidden" defaultValue="" readOnly />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? "name-error" : undefined}
                      placeholder="e.g. Sarah Johnson"
                      className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#13131a] border ${
                        fieldErrors.name ? 'border-red-500/50' : 'border-[#2a2a3a]'
                      } text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 transition-colors min-h-[48px] sm:min-h-[44px]`}
                    />
                    {fieldErrors.name && (
                      <div id="name-error" role="alert" className="mt-1.5 flex items-start gap-2 text-red-400 text-xs">
                        <span className="flex-shrink-0 mt-0.5">⚠️</span>
                        <span>{fieldErrors.name}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="book-email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address <span className="text-[#f5a623]">*</span>
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
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? "email-error" : undefined}
                      placeholder="sarah@example.com"
                      className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#13131a] border ${
                        fieldErrors.email ? 'border-red-500/50' : 'border-[#2a2a3a]'
                      } text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 transition-colors min-h-[48px] sm:min-h-[44px]`}
                    />
                    {fieldErrors.email && (
                      <div id="email-error" role="alert" className="mt-1.5 flex items-start gap-2 text-red-400 text-xs">
                        <span className="flex-shrink-0 mt-0.5">⚠️</span>
                        <span>{fieldErrors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="book-phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number <span className="text-[#f5a623]">*</span>
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
                      aria-invalid={!!fieldErrors.phone}
                      aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                      placeholder="+44 7482 112110"
                      className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#13131a] border ${
                        fieldErrors.phone ? 'border-red-500/50' : 'border-[#2a2a3a]'
                      } text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 transition-colors min-h-[48px] sm:min-h-[44px]`}
                    />
                    {fieldErrors.phone && (
                      <div id="phone-error" role="alert" className="mt-1.5 flex items-start gap-2 text-red-400 text-xs">
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
                      aria-invalid={!!fieldErrors.eventType}
                      aria-describedby={fieldErrors.eventType ? "eventType-error" : undefined}
                      className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#13131a] border ${
                        fieldErrors.eventType ? 'border-red-500/50' : 'border-[#2a2a3a]'
                      } text-white text-sm focus:outline-none focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 transition-colors appearance-none min-h-[48px] sm:min-h-[44px]`}
                    >
                      <option value="" disabled className="text-gray-600">
                        Select event type
                      </option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type} className="bg-[#13131a]">
                          {type}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.eventType && (
                      <div id="eventType-error" role="alert" className="mt-1.5 flex items-start gap-2 text-red-400 text-xs">
                        <span className="flex-shrink-0 mt-0.5">⚠️</span>
                        <span>{fieldErrors.eventType}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="book-event-date" className="block text-sm font-medium text-gray-300 mb-2">
                    Event Date <span className="text-[#f5a623]">*</span>
                  </label>
                  <input
                    id="book-event-date"
                    type="date"
                    name="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={(e) =>
                      setFormData({ ...formData, eventDate: e.target.value })
                    }
                    onBlur={handleFieldBlur}
                    aria-invalid={!!fieldErrors.eventDate}
                    aria-describedby={fieldErrors.eventDate ? "eventDate-error" : undefined}
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#13131a] border ${
                      fieldErrors.eventDate ? 'border-red-500/50' : 'border-[#2a2a3a]'
                    } text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 transition-colors [color-scheme:dark] min-h-[48px] sm:min-h-[44px]`}
                  />
                  {fieldErrors.eventDate && (
                    <div id="eventDate-error" role="alert" className="mt-1.5 flex items-start gap-2 text-red-400 text-xs">
                      <span className="flex-shrink-0 mt-0.5">⚠️</span>
                      <span>{fieldErrors.eventDate}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="book-venue" className="block text-sm font-medium text-gray-300 mb-2">
                    Venue / Address <span className="text-[#f5a623]">*</span>
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
                    aria-invalid={!!fieldErrors.venue}
                    aria-describedby={fieldErrors.venue ? "venue-error" : undefined}
                    placeholder="e.g. The Grand Hotel, 123 High Street, Chelmsford, CM1 1AA"
                    className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#13131a] border ${
                      fieldErrors.venue ? 'border-red-500/50' : 'border-[#2a2a3a]'
                    } text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 transition-colors min-h-[48px] sm:min-h-[44px]`}
                  />
                  {fieldErrors.venue && (
                    <div id="venue-error" role="alert" className="mt-1.5 flex items-start gap-2 text-red-400 text-xs">
                      <span className="flex-shrink-0 mt-0.5">⚠️</span>
                      <span>{fieldErrors.venue}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="book-requests" className="block text-sm font-medium text-gray-300 mb-2">
                    Special Requests{" "}
                    <span className="text-gray-500 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="book-requests"
                    rows={4}
                    value={formData.specialRequests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialRequests: e.target.value,
                      })
                    }
                    placeholder="Any specific requirements, theme details, allergies, accessibility needs..."
                    className="w-full px-4 py-3 rounded-xl bg-[#13131a] border border-[#2a2a3a] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20 transition-colors resize-none"
                  />
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
                  . Your details will only be used to process your booking enquiry.
                </p>

                {submitError && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                  >
                    <span className="mt-0.5 flex-shrink-0">&#9888;</span>
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="flex justify-between pt-2">
                  <button
                    type="button"
                    onClick={handlePrevStep}
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
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit Booking Request
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Palette,
  Share2,
  ShieldCheck,
  Database,
  BarChart3,
  UserCheck,
  ArrowRight,
  Check,
  ChevronRight,
  Building2,
  Send,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { validatePhone } from "@/lib/validation";

import { fadeUp, stagger } from "@/lib/variants";
import { useReducedMotion } from "@/lib/useReducedMotion";

// ── Data ───────────────────────────────────────────────────────────────────────

const trustBadges = [
  "Weddings & Galas",
  "Corporate Events",
  "Product Launches",
  "Christmas Parties",
  "Brand Activations",
];

const features = [
  {
    icon: Palette,
    title: "Custom Brand Overlays",
    description:
      "Your logo, brand colours and messaging printed on every single photo. Every share becomes organic brand exposure at zero extra cost.",
    accent: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/20",
  },
  {
    icon: Share2,
    title: "Instant Digital Sharing",
    description:
      "Guests receive branded photos directly to their phones in seconds. Your brand travels with every WhatsApp share and Instagram post.",
    accent: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  {
    icon: ShieldCheck,
    title: "Professional Presence",
    description:
      "Suited-up operator throughout the event, branded equipment covers available on request. We look as sharp as your event demands.",
    accent: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
  {
    icon: Database,
    title: "Data Capture",
    description:
      "Collect guest emails with full GDPR consent at the point of photo sharing — building your marketing list effortlessly throughout the event.",
    accent: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/20",
  },
  {
    icon: BarChart3,
    title: "Same-Day Analytics",
    description:
      "A full usage report — total activations, peak times, sharing stats — delivered to your inbox the same evening. Prove ROI instantly.",
    accent: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/20",
  },
  {
    icon: UserCheck,
    title: "Dedicated Account Manager",
    description:
      "One point of contact from first enquiry through to post-event debrief. No call centres, no ticketing systems — just direct, personal service.",
    accent: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
  },
];

const packages = [
  {
    name: "Half Day",
    duration: "4 Hours",
    price: "£549",
    guests: "Up to 150 guests",
    highlight: false,
    badge: null,
    includes: [
      "4-hour staffed hire",
      "Custom branded overlay",
      "Instant digital sharing",
      "Online photo gallery",
      "Props & accessories",
      "Setup & breakdown included",
      "Post-event analytics report",
    ],
  },
  {
    name: "Full Day",
    duration: "8 Hours",
    price: "£899",
    guests: "Up to 300 guests",
    highlight: true,
    badge: "Most Popular",
    includes: [
      "8-hour staffed hire",
      "Custom branded overlay",
      "Instant digital sharing",
      "Online photo gallery",
      "Props & accessories",
      "Setup & breakdown included",
      "Post-event analytics report",
      "Email data capture (GDPR)",
      "Branded equipment covers",
      "Dedicated account manager",
    ],
  },
  {
    name: "Monthly Retainer",
    duration: "12-Month Contract",
    price: "£299",
    priceNote: "/month",
    guests: "1 event per month",
    highlight: false,
    badge: "Best Value",
    includes: [
      "1 event per month (up to 6h)",
      "Priority booking guarantee",
      "Fixed monthly rate — no surprises",
      "Custom branded overlay",
      "Instant digital sharing",
      "Email data capture (GDPR)",
      "Monthly analytics dashboard",
      "Dedicated account manager",
    ],
  },
];

const timelineSteps = [
  {
    number: "01",
    title: "Enquire",
    description:
      "Submit your brief via our corporate form or call us directly. Tell us your event type, date and guest count.",
  },
  {
    number: "02",
    title: "Custom Quote",
    description:
      "Your account manager sends a tailored proposal within 2 hours — including branding concepts and package options.",
  },
  {
    number: "03",
    title: "We Set Up",
    description:
      "Our team arrives 90 minutes before your event. We handle everything — set up, branding, testing — invisibly.",
  },
  {
    number: "04",
    title: "You Enjoy",
    description:
      "Guests love it. You take the credit. We send you the analytics report that evening. Job done.",
  },
];

const eventTypeOptions = [
  "Christmas Party",
  "Summer Event",
  "Product Launch",
  "Conference",
  "Brand Activation",
  "Awards Ceremony",
  "Team Building",
  "Other",
];

const guestOptions = ["Under 50", "50–150", "150–300", "300+"];

interface FormState {
  company: string;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  guestCount: string;
  eventDate: string;
  message: string;
}

// ── Animated gradient mesh background ─────────────────────────────────────────

function GradientMesh() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-[#0d0d1e] to-background" />
      {/* Animated orbs — respects prefers-reduced-motion */}
      <motion.div
        animate={{
          x: shouldReduceMotion ? 0 : [0, 60, -30, 0],
          y: shouldReduceMotion ? 0 : [0, -40, 50, 0],
          scale: shouldReduceMotion ? 1 : [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 18, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[400px] bg-blue-600/8 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: shouldReduceMotion ? 0 : [0, -50, 40, 0],
          y: shouldReduceMotion ? 0 : [0, 60, -30, 0],
          scale: shouldReduceMotion ? 1 : [1, 0.8, 1.15, 1],
        }}
        transition={{ duration: 22, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-1/3 right-1/4 w-[450px] h-[350px] bg-gold/6 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: shouldReduceMotion ? 0 : [0, 30, -60, 0],
          y: shouldReduceMotion ? 0 : [0, -50, 20, 0],
          scale: shouldReduceMotion ? 1 : [1, 1.1, 0.85, 1],
        }}
        transition={{ duration: 15, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut", delay: 6 }}
        className="absolute top-1/2 right-1/3 w-[350px] h-[300px] bg-violet-600/6 rounded-full blur-3xl"
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function CorporatePage() {
  const [formState, setFormState] = useState<FormState>({
    company: "",
    name: "",
    email: "",
    phone: "",
    eventType: "",
    guestCount: "",
    eventDate: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const result = validatePhone(e.target.value);
      setPhoneError(result.error || "");
    } else {
      setPhoneError("");
    }
    // Also validate with field errors
    const error = validateField('phone', e.target.value);
    setFieldErrors(prev => ({
      ...prev,
      phone: error
    }));
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'company':
        if (!value.trim()) return 'Company name is required';
        return '';
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
        if (!cleaned) return '';
        if (!/^\+?\d{10,}$/.test(cleaned)) return 'Invalid format. Try: +44 7482 112110';
        return '';
      case 'eventType':
        if (!value) return 'Event type is required';
        return '';
      case 'eventDate':
        if (!value) return '';
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) return 'Date must be in the future';
        return '';
      case 'guestCount':
        if (!value) return 'Guest count is required';
        if (parseInt(value) < 50) return 'Minimum 50 guests required';
        return '';
      case 'message':
        if (!value.trim()) return 'Additional details are required';
        return '';
      default:
        return '';
    }
  };

  const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    newErrors.company = validateField('company', formState.company);
    newErrors.name = validateField('name', formState.name);
    newErrors.email = validateField('email', formState.email);
    newErrors.phone = validateField('phone', formState.phone);
    newErrors.eventType = validateField('eventType', formState.eventType);
    newErrors.guestCount = validateField('guestCount', formState.guestCount);
    newErrors.message = validateField('message', formState.message);

    // If any errors exist, show them and don't submit
    if (Object.values(newErrors).some(err => err)) {
      setFieldErrors(newErrors);
      const firstError = Object.keys(newErrors).find(key => newErrors[key]);
      if (firstError) {
        const element = document.getElementById(`corp-${firstError}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Clear errors if all valid
    setFieldErrors({});

    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState, _hp: "" }),
      });
      if (!res.ok) throw new Error("submission failed");
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or email FunLoading360@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-background text-white overflow-x-hidden">
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] flex items-center justify-center pt-20 overflow-hidden"
      >
        <GradientMesh />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-sm font-medium mb-8"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate &amp; B2B Solutions</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Corporate Photo Booth Hire{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              London &amp; Essex
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
            data-speakable-faq="0"
          >
            FunLoading360 provides corporate photo booth hire across London, Essex and Kent from £549 (half-day, 4h). Custom branded overlays, GDPR-compliant data capture, same-day analytics, and dedicated account manager. Trusted for product launches, brand activations, Christmas parties, and team events.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#quote-form"
              className="inline-flex items-center gap-2 px-8 py-4 sm:py-3 rounded-full bg-gold text-background font-bold text-base hover:bg-gold-light transition-all duration-200 shadow-lg shadow-gold/25 hover:shadow-gold/40 hover:-translate-y-0.5 w-full sm:w-auto justify-center min-h-[48px] sm:min-h-[44px]"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#packages"
              className="inline-flex items-center gap-2 px-8 py-4 sm:py-3 rounded-full border border-border text-white font-semibold text-base hover:border-gold/40 hover:bg-white/5 transition-all duration-200 w-full sm:w-auto justify-center min-h-[48px] sm:min-h-[44px]"
            >
              View Packages
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="py-10 border-y border-[#1e1e28] bg-[#08080f]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <p className="text-gray-600 text-xs font-semibold uppercase tracking-widest whitespace-nowrap flex-shrink-0">
              Events we cover
            </p>
            <div className="w-px h-8 bg-border hidden sm:block flex-shrink-0" />
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-8 lg:gap-12 flex-1">
              {trustBadges.map((badge) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-[#3a3a4a] font-semibold text-sm tracking-wide hover:text-[#5a5a6a] transition-colors duration-200 cursor-default"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {badge}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CORPORATE CLIENTS CHOOSE US ── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-10 lg:mb-12"
          >
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-xl leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Why Corporate Clients{" "}
                <span className="text-gold">Choose Us</span>
              </h2>
              <p className="text-gray-400 max-w-md leading-relaxed lg:text-right">
                We don&apos;t just supply a booth. We deliver a measurable brand
                experience — with ROI you can show to your stakeholders.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                custom={i}
                className={cn(
                  "group p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:border-opacity-60",
                  "bg-[#0e0e16]",
                  feature.border
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl border flex items-center justify-center mb-5",
                    feature.bg,
                    feature.border
                  )}
                >
                  <feature.icon className={cn("w-5 h-5", feature.accent)} />
                </div>
                <h3
                  className="text-white font-bold text-lg mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CORPORATE PACKAGES ── */}
      <section id="packages" className="py-16 lg:py-24 bg-[#08080f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-10 lg:mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Corporate Packages
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
              Transparent, all-inclusive pricing. No hidden fees, no surprises.
              Every package includes setup, breakdown and a dedicated operator.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
          >
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                variants={fadeUp}
                custom={i}
                className={cn(
                  "relative rounded-3xl border overflow-hidden transition-all duration-300",
                  pkg.highlight
                    ? "border-gold/40 bg-gradient-to-b from-[#1a1408] to-surface"
                    : "border-border bg-surface hover:border-gold/20"
                )}
              >
                {pkg.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                )}

                {pkg.badge && (
                  <div className="absolute top-5 right-5">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold",
                        pkg.highlight
                          ? "bg-gold text-background"
                          : "bg-gold/15 text-gold border border-gold/30"
                      )}
                    >
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-1">
                      {pkg.duration}
                    </p>
                    <h3
                      className="text-2xl font-bold text-white mb-1"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {pkg.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{pkg.guests}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-8 pb-8 border-b border-border">
                    <span
                      className={cn(
                        "text-4xl font-bold",
                        pkg.highlight ? "text-gold" : "text-white"
                      )}
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {pkg.price}
                    </span>
                    {"priceNote" in pkg && pkg.priceNote && (
                      <span className="text-gray-500 text-base">{pkg.priceNote}</span>
                    )}
                  </div>

                  {/* Includes */}
                  <ul className="space-y-3 mb-8">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <Check
                          className={cn(
                            "w-4 h-4 flex-shrink-0 mt-0.5",
                            pkg.highlight ? "text-gold" : "text-emerald-400"
                          )}
                        />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="#quote-form"
                    className={cn(
                      "block w-full text-center py-3 sm:py-2.5 px-6 rounded-full font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 min-h-[48px] sm:min-h-[44px] flex items-center justify-center",
                      pkg.highlight
                        ? "bg-gold text-background hover:bg-gold-light shadow-lg shadow-gold/25"
                        : "border border-[#3a3a4a] text-white hover:border-gold/40 hover:bg-white/5"
                    )}
                  >
                    Get Quote
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 text-sm mt-8"
          >
            All prices shown are subject to VAT at the standard rate. Bespoke multi-day and conference packages available on request.
          </motion.p>
        </div>
      </section>

      {/* ── HOW IT WORKS (HORIZONTAL TIMELINE) ── */}
      <section className="py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-10 lg:mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              How It Works for Corporate
            </h2>
          </motion.div>

          {/* Desktop horizontal timeline */}
          <div className="hidden lg:block relative">
            {/* Connector line */}
            <div className="absolute top-[44px] left-[12.5%] right-[12.5%] h-px">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="w-full h-full origin-left"
                style={{
                  backgroundImage: "linear-gradient(90deg, rgba(245,166,35,0.4) 0%, rgba(245,166,35,0.15) 50%, rgba(245,166,35,0.4) 100%)",
                }}
              />
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={stagger}
              className="grid grid-cols-4 gap-8"
            >
              {timelineSteps.map((step, i) => (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  custom={i}
                  className="relative text-center pt-2"
                >
                  {/* Node */}
                  <div className="relative z-10 inline-flex w-[88px] h-[88px] rounded-full bg-surface border-2 border-gold/30 items-center justify-center mx-auto mb-6 group-hover:border-gold/60 transition-colors">
                    <span
                      className="text-2xl font-bold text-gold"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {step.number}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile vertical timeline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="lg:hidden space-y-8"
          >
            {timelineSteps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                custom={i}
                className="flex gap-5"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-surface border-2 border-gold/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-gold" style={{ fontFamily: "var(--font-playfair)" }}>
                      {step.number}
                    </span>
                  </div>
                  {i < timelineSteps.length - 1 && (
                    <div className="flex-1 w-px bg-gold/15 mt-2" style={{ minHeight: "40px" }} />
                  )}
                </div>
                <div className="pb-2">
                  <h3 className="text-lg font-bold text-white mb-1.5" style={{ fontFamily: "var(--font-playfair)" }}>
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── LEAD FORM ── */}
      <section id="quote-form" className="py-16 lg:py-24 bg-[#08080f]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-10 lg:mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Request a Corporate Quote
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Tell us about your event and we&apos;ll send you a tailored proposal
              within 2 business hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl border border-border bg-[#0e0e16] overflow-hidden"
          >
            {/* Top gold line */}
            <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

            <div className="p-8 lg:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-400/30 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Enquiry Received
                  </h3>
                  <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                    Thank you — your enquiry is with our corporate team. You&apos;ll
                    receive a tailored proposal within 2 business hours.
                  </p>
                  <p className="text-gold text-sm font-medium mt-4">
                    Keep an eye on {formState.email || "your inbox"}.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot — hidden from real users, traps bots */}
                  <input type="text" name="_hp" aria-hidden="true" tabIndex={-1} className="hidden" defaultValue="" readOnly />
                  {/* Row 1: Company + Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="corp-company" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                        Company Name <span className="text-gold">*</span>
                      </label>
                      <input
                        id="corp-company"
                        type="text"
                        name="company"
                        required
                        value={formState.company}
                        onChange={handleChange}
                        onBlur={handleFieldBlur}
                        aria-invalid={!!fieldErrors.company}
                        aria-describedby={fieldErrors.company ? "company-error" : undefined}
                        placeholder="Acme Corp Ltd"
                        className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-surface border ${
                          fieldErrors.company ? 'border-red-500/50' : 'border-border'
                        } text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold/50 focus:bg-[#16161f] transition-all duration-200 min-h-[48px] sm:min-h-[44px]`}
                      />
                      {fieldErrors.company && (
                        <div id="company-error" role="alert" className="mt-1.5 flex items-start gap-2 text-red-400 text-xs">
                          <span className="flex-shrink-0 mt-0.5">⚠️</span>
                          <span>{fieldErrors.company}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="corp-name" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                        Your Name <span className="text-gold">*</span>
                      </label>
                      <input
                        id="corp-name"
                        type="text"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        onBlur={handleFieldBlur}
                        aria-invalid={!!fieldErrors.name}
                        aria-describedby={fieldErrors.name ? "name-error" : undefined}
                        placeholder="Jane Smith"
                        className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-surface border ${
                          fieldErrors.name ? 'border-red-500/50' : 'border-border'
                        } text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold/50 focus:bg-[#16161f] transition-all duration-200 min-h-[48px] sm:min-h-[44px]`}
                      />
                      {fieldErrors.name && (
                        <div id="name-error" role="alert" className="mt-1.5 flex items-start gap-2 text-red-400 text-xs">
                          <span className="flex-shrink-0 mt-0.5">⚠️</span>
                          <span>{fieldErrors.name}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="corp-email" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                        Email <span className="text-gold">*</span>
                      </label>
                      <input
                        id="corp-email"
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        onBlur={handleFieldBlur}
                        aria-invalid={!!fieldErrors.email}
                        aria-describedby={fieldErrors.email ? "email-error" : undefined}
                        placeholder="jane@company.com"
                        className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-surface border ${
                          fieldErrors.email ? 'border-red-500/50' : 'border-border'
                        } text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold/50 focus:bg-[#16161f] transition-all duration-200 min-h-[48px] sm:min-h-[44px]`}
                      />
                      {fieldErrors.email && (
                        <div id="email-error" role="alert" className="mt-1.5 flex items-start gap-2 text-red-400 text-xs">
                          <span className="flex-shrink-0 mt-0.5">⚠️</span>
                          <span>{fieldErrors.email}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="corp-phone" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                        Phone
                      </label>
                      <input
                        id="corp-phone"
                        type="tel"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        onBlur={handlePhoneBlur}
                        aria-invalid={!!fieldErrors.phone}
                        aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                        placeholder="+44 7482 112110"
                        className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-surface border ${
                          fieldErrors.phone ? 'border-red-500/50' : 'border-border'
                        } text-white placeholder-gray-600 text-sm focus:outline-none focus:bg-[#16161f] transition-all duration-200 min-h-[48px] sm:min-h-[44px]`}
                      />
                      {fieldErrors.phone && (
                        <div id="phone-error" role="alert" className="mt-1.5 flex items-start gap-2 text-red-400 text-xs">
                          <span className="flex-shrink-0 mt-0.5">⚠️</span>
                          <span>{fieldErrors.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Event Type + Guest Count */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="corp-event-type" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                        Event Type <span className="text-gold">*</span>
                      </label>
                      <select
                        id="corp-event-type"
                        name="eventType"
                        required
                        value={formState.eventType}
                        onChange={handleChange}
                        onBlur={handleFieldBlur}
                        aria-invalid={!!fieldErrors.eventType}
                        aria-describedby={fieldErrors.eventType ? "eventType-error" : undefined}
                        className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-surface border ${
                          fieldErrors.eventType ? 'border-red-500/50' : 'border-border'
                        } text-sm focus:outline-none focus:border-gold/50 focus:bg-[#16161f] transition-all duration-200 appearance-none cursor-pointer text-white min-h-[48px] sm:min-h-[44px]`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6,9 12,15 18,9'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 16px center",
                        }}
                      >
                        <option value="" disabled>Select event type</option>
                        {eventTypeOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-surface">{opt}</option>
                        ))}
                      </select>
                      {fieldErrors.eventType && (
                        <div id="eventType-error" role="alert" className="mt-1.5 flex items-start gap-2 text-red-400 text-xs">
                          <span className="flex-shrink-0 mt-0.5">⚠️</span>
                          <span>{fieldErrors.eventType}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="corp-guests" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                        Expected Guests <span className="text-gold">*</span>
                      </label>
                      <select
                        id="corp-guests"
                        name="guestCount"
                        required
                        value={formState.guestCount}
                        onChange={handleChange}
                        onBlur={handleFieldBlur}
                        aria-invalid={!!fieldErrors.guestCount}
                        aria-describedby={fieldErrors.guestCount ? "guestCount-error" : undefined}
                        className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-surface border ${
                          fieldErrors.guestCount ? 'border-red-500/50' : 'border-border'
                        } text-sm focus:outline-none focus:border-gold/50 focus:bg-[#16161f] transition-all duration-200 appearance-none cursor-pointer text-white min-h-[48px] sm:min-h-[44px]`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6,9 12,15 18,9'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 16px center",
                        }}
                      >
                        <option value="" disabled>Select guest count</option>
                        {guestOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-surface">{opt}</option>
                        ))}
                      </select>
                      {fieldErrors.guestCount && (
                        <div id="guestCount-error" role="alert" className="mt-1.5 flex items-start gap-2 text-red-400 text-xs">
                          <span className="flex-shrink-0 mt-0.5">⚠️</span>
                          <span>{fieldErrors.guestCount}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Row 4: Event Date */}
                  <div>
                    <label htmlFor="corp-event-date" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                      Event Date
                    </label>
                    <input
                      id="corp-event-date"
                      type="date"
                      name="eventDate"
                      value={formState.eventDate}
                      onChange={handleChange}
                      onBlur={handleFieldBlur}
                      aria-invalid={!!fieldErrors.eventDate}
                      aria-describedby={fieldErrors.eventDate ? "eventDate-error" : undefined}
                      min={new Date().toISOString().split("T")[0]}
                      className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-surface border ${
                        fieldErrors.eventDate ? 'border-red-500/50' : 'border-border'
                      } text-white text-sm focus:outline-none focus:border-gold/50 focus:bg-[#16161f] transition-all duration-200 [color-scheme:dark] min-h-[48px] sm:min-h-[44px]`}
                    />
                    {fieldErrors.eventDate && (
                      <div id="eventDate-error" role="alert" className="mt-1.5 flex items-start gap-2 text-red-400 text-xs">
                        <span className="flex-shrink-0 mt-0.5">⚠️</span>
                        <span>{fieldErrors.eventDate}</span>
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="corp-message" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                      Additional Details
                    </label>
                    <textarea
                      id="corp-message"
                      name="message"
                      rows={4}
                      value={formState.message}
                      onChange={handleChange}
                      onBlur={handleFieldBlur}
                      aria-invalid={!!fieldErrors.message}
                      aria-describedby={fieldErrors.message ? "message-error" : undefined}
                      placeholder="Tell us about your event, branding requirements, specific requests..."
                      className={`w-full px-4 py-3 sm:py-2.5 rounded-xl bg-surface border ${
                        fieldErrors.message ? 'border-red-500/50' : 'border-border'
                      } text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold/50 focus:bg-[#16161f] transition-all duration-200 resize-none leading-relaxed min-h-[48px] sm:min-h-[44px]`}
                    />
                    {fieldErrors.message && (
                      <div id="message-error" role="alert" className="mt-1.5 flex items-start gap-2 text-red-400 text-xs">
                        <span className="flex-shrink-0 mt-0.5">⚠️</span>
                        <span>{fieldErrors.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Privacy note */}
                  <p className="text-gray-600 text-xs leading-relaxed">
                    By submitting this form you agree to be contacted regarding your
                    enquiry. We will never share your details with third parties. See
                    our{" "}
                    <Link href="/privacy-policy" className="text-gold/70 hover:text-gold underline transition-colors">
                      Privacy Policy
                    </Link>
                    .
                  </p>

                  {/* Inline error */}
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

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-2.5 py-4 sm:py-3 px-8 rounded-full bg-gold text-background font-bold text-base transition-all duration-200 min-h-[48px] sm:min-h-[44px]",
                      isSubmitting
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-gold-light shadow-lg shadow-gold/25 hover:shadow-gold/40 hover:-translate-y-0.5"
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
                        />
                        Sending Enquiry...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Enquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Reassurance row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8 text-gray-600 text-sm"
          >
            {[
              "Response within 2 hours",
              "No obligation quote",
              "Dedicated account manager",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-gold/60" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

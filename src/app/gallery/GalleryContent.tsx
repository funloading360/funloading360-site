"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Eye, ArrowRight, Star, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────────

type FilterKey = "all" | "weddings" | "corporate" | "birthdays" | "proms" | "360" | "glam" | "selfie";

interface GalleryCard {
  id: number;
  eventType: "weddings" | "corporate" | "birthdays" | "proms";
  boothType: "360" | "glam" | "selfie";
  aspect: "portrait" | "landscape" | "square" | "tall";
  src: string;
  alt: string;
  badgeBg: string;
  badgeText: string;
  tagBg: string;
  tagText: string;
}

// ── Data ───────────────────────────────────────────────────────────────────────

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "weddings", label: "Weddings" },
  { key: "corporate", label: "Corporate" },
  { key: "birthdays", label: "Birthdays" },
  { key: "proms", label: "Proms" },
  { key: "360", label: "360°" },
  { key: "glam", label: "Glam" },
  { key: "selfie", label: "Selfie Pod" },
];

const eventBadge: Record<string, { bg: string; text: string }> = {
  weddings: { bg: "bg-rose-500/20 border-rose-400/30", text: "text-rose-300" },
  corporate: { bg: "bg-blue-500/20 border-blue-400/30", text: "text-blue-300" },
  birthdays: { bg: "bg-amber-500/20 border-amber-400/30", text: "text-amber-300" },
  proms: { bg: "bg-purple-500/20 border-purple-400/30", text: "text-purple-300" },
};

const boothTag: Record<string, { bg: string; text: string }> = {
  "360": { bg: "bg-[#f5a623]/15 border-[#f5a623]/30", text: "text-[#f5a623]" },
  glam: { bg: "bg-white/10 border-white/20", text: "text-white/80" },
  selfie: { bg: "bg-emerald-500/15 border-emerald-400/30", text: "text-emerald-300" },
};

const boothLabel: Record<string, string> = {
  "360": "360°",
  glam: "Glam",
  selfie: "Selfie Pod",
};

const galleryItems: GalleryCard[] = [
  // 360° — Weddings
  { id: 1,  eventType: "weddings",  boothType: "360",   aspect: "portrait",  src: "/images/events/360-couple-dancing.jpeg",    alt: "Couple dancing on the 360 booth platform, neon wedding atmosphere",           badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  { id: 2,  eventType: "weddings",  boothType: "360",   aspect: "landscape", src: "/images/events/360-two-women-blue.jpeg",    alt: "Two women posing on the 360 booth under blue neon at a wedding",             badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  { id: 3,  eventType: "weddings",  boothType: "360",   aspect: "square",    src: "/images/events/360-confetti-pose.jpeg",     alt: "Confetti raining down on guests posing on the 360 booth at a wedding",       badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  // 360° — Birthdays
  { id: 4,  eventType: "birthdays", boothType: "360",   aspect: "tall",      src: "/images/events/360-green-energy.jpeg",      alt: "High-energy birthday pose on the 360 booth with green lighting",             badgeBg: eventBadge.birthdays.bg, badgeText: eventBadge.birthdays.text, tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  { id: 5,  eventType: "birthdays", boothType: "360",   aspect: "portrait",  src: "/images/events/360-jazz-costume.jpeg",      alt: "Guests in jazz costumes striking poses on the 360 booth at a birthday party", badgeBg: eventBadge.birthdays.bg, badgeText: eventBadge.birthdays.text, tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  { id: 6,  eventType: "birthdays", boothType: "360",   aspect: "landscape", src: "/images/events/360-glamour-group.jpeg",     alt: "Glamorous group shot on the 360 booth at a birthday celebration",            badgeBg: eventBadge.birthdays.bg, badgeText: eventBadge.birthdays.text, tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  // Glam — Weddings
  { id: 7,  eventType: "weddings",  boothType: "glam",  aspect: "portrait",  src: "/images/venues/glam-venue-grand.jpeg",      alt: "Glam Vintage booth set up in a grand wedding venue",                         badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  { id: 8,  eventType: "weddings",  boothType: "glam",  aspect: "square",    src: "/images/venues/glam-venue-2.jpeg",          alt: "Glam Vintage booth setup variation at a wedding venue",                      badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  // Glam — Setup / All
  { id: 9,  eventType: "weddings",  boothType: "glam",  aspect: "tall",      src: "/images/venues/glam-backdrop-printer.jpeg", alt: "Glam Vintage booth with colourful props, boas and printer on display",        badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  { id: 10, eventType: "weddings",  boothType: "glam",  aspect: "landscape", src: "/images/venues/glam-setup-3.jpeg",          alt: "Glam Vintage photo booth setup at an event venue",                           badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  // Glam print strip
  { id: 11, eventType: "birthdays", boothType: "glam",  aspect: "portrait",  src: "/images/events/glam-print-strip.png",       alt: "Printed glam photo strip from the Glam Vintage booth",                      badgeBg: eventBadge.birthdays.bg, badgeText: eventBadge.birthdays.text, tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  // 360 venue setup
  { id: 12, eventType: "weddings",  boothType: "360",   aspect: "square",    src: "/images/venues/glam-setup-props.jpeg",      alt: "360 booth setup in a venue with chandelier and green neon",                  badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  // Selfie Pod — Corporate
  { id: 13, eventType: "corporate", boothType: "selfie", aspect: "landscape", src: "/images/venues/selfie-pod-venue.jpeg",     alt: "Selfie Pod at an elegant corporate venue with ring light",                   badgeBg: eventBadge.corporate.bg, badgeText: eventBadge.corporate.text, tagBg: boothTag.selfie.bg, tagText: boothTag.selfie.text },
  { id: 14, eventType: "corporate", boothType: "selfie", aspect: "portrait",  src: "/images/venues/selfie-pod-christmas.jpeg", alt: "Selfie Pod Christmas setup at a corporate event",                            badgeBg: eventBadge.corporate.bg, badgeText: eventBadge.corporate.text, tagBg: boothTag.selfie.bg, tagText: boothTag.selfie.text },
  // Selfie Pod — Birthdays
  { id: 15, eventType: "birthdays", boothType: "selfie", aspect: "square",   src: "/images/venues/selfie-pod-christmas-2.jpeg", alt: "Selfie Pod with festive Christmas decorations at a birthday party",        badgeBg: eventBadge.birthdays.bg, badgeText: eventBadge.birthdays.text, tagBg: boothTag.selfie.bg, tagText: boothTag.selfie.text },
  // Booth exterior
  { id: 16, eventType: "weddings",  boothType: "360",   aspect: "tall",      src: "/images/equipment/booth-exterior-hero.jpeg", alt: "Black inflatable photo booth exterior with red carpet entrance",           badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  // Additional equipment
  { id: 17, eventType: "weddings",  boothType: "360",   aspect: "portrait",  src: "/images/equipment/booth-exterior-1.jpeg",  alt: "Professional 360 booth exterior setup with LED lighting for wedding venue",     badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  { id: 18, eventType: "corporate", boothType: "360",   aspect: "landscape", src: "/images/equipment/booth-exterior-2.jpeg",  alt: "360 photo booth exterior at a corporate event with branding opportunities",    badgeBg: eventBadge.corporate.bg, badgeText: eventBadge.corporate.text, tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  // 360° — Additional venue setups
  { id: 19, eventType: "weddings",  boothType: "360",   aspect: "tall",      src: "/images/venues/360-booth-outdoor.jpeg",    alt: "360 photo booth setup outdoors in natural garden venue with golden backdrop",   badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  { id: 20, eventType: "corporate", boothType: "360",   aspect: "landscape", src: "/images/venues/360-full-setup.jpeg",       alt: "Full 360 booth setup at a corporate gala with professional lighting",         badgeBg: eventBadge.corporate.bg, badgeText: eventBadge.corporate.text, tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  { id: 21, eventType: "weddings",  boothType: "360",   aspect: "square",    src: "/images/venues/360-platform-lit.jpeg",     alt: "Illuminated 360 booth platform at an elegant wedding venue with guests",     badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  { id: 22, eventType: "birthdays", boothType: "360",   aspect: "landscape", src: "/images/venues/360-setup-neon.jpeg",       alt: "360 booth with vibrant neon lighting setup for an energetic birthday party",   badgeBg: eventBadge.birthdays.bg, badgeText: eventBadge.birthdays.text, tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  { id: 23, eventType: "corporate", boothType: "360",   aspect: "portrait",  src: "/images/venues/360-setup-venue.jpeg",      alt: "Professional 360 booth setup at a corporate team building event venue",       badgeBg: eventBadge.corporate.bg, badgeText: eventBadge.corporate.text, tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  // Glam — Additional setups
  { id: 24, eventType: "corporate", boothType: "glam",  aspect: "portrait",  src: "/images/venues/glam-setup-2.jpeg",        alt: "Glam Vintage booth setup with elegant props and backdrop at a corporate event",  badgeBg: eventBadge.corporate.bg, badgeText: eventBadge.corporate.text, tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  { id: 25, eventType: "birthdays", boothType: "glam",  aspect: "landscape", src: "/images/venues/glam-setup-4.jpeg",        alt: "Glam booth with colourful props setup for a fun birthday celebration",         badgeBg: eventBadge.birthdays.bg, badgeText: eventBadge.birthdays.text, tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  { id: 26, eventType: "weddings",  boothType: "glam",  aspect: "square",    src: "/images/venues/glam-setup-5.jpeg",        alt: "Glam Vintage booth elegantly decorated for a romantic wedding reception",     badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  { id: 27, eventType: "corporate", boothType: "glam",  aspect: "portrait",  src: "/images/venues/glam-setup-6.jpeg",        alt: "Glam photo booth at a luxury corporate gala with premium backdrop setup",     badgeBg: eventBadge.corporate.bg, badgeText: eventBadge.corporate.text, tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  { id: 28, eventType: "proms",     boothType: "glam",  aspect: "landscape", src: "/images/venues/glam-setup-7.jpeg",        alt: "Glam booth setup at a glamorous prom night with festive decorations",         badgeBg: eventBadge.proms.bg,    badgeText: eventBadge.proms.text,    tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  { id: 29, eventType: "corporate", boothType: "glam",  aspect: "tall",      src: "/images/venues/glam-venue-christmas.jpeg",  alt: "Glam booth decorated with festive Christmas backdrop at corporate party",      badgeBg: eventBadge.corporate.bg, badgeText: eventBadge.corporate.text, tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  { id: 30, eventType: "weddings",  boothType: "glam",  aspect: "square",    src: "/images/venues/IMG_3067.jpeg",             alt: "Glam Vintage booth setup with beautiful backdrop at a wedding venue",        badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  // Selfie Pod — Additional setups
  { id: 31, eventType: "birthdays", boothType: "selfie", aspect: "portrait",  src: "/images/venues/selfie-pod-christmas-3.jpeg", alt: "Selfie Pod with festive Christmas props and bright ring light setup",       badgeBg: eventBadge.birthdays.bg, badgeText: eventBadge.birthdays.text, tagBg: boothTag.selfie.bg, tagText: boothTag.selfie.text },
  { id: 32, eventType: "corporate", boothType: "selfie", aspect: "square",    src: "/images/venues/selfie-pod-setup-2.jpeg",    alt: "Selfie Pod with professional ring light and clean backdrop at corporate event", badgeBg: eventBadge.corporate.bg, badgeText: eventBadge.corporate.text, tagBg: boothTag.selfie.bg, tagText: boothTag.selfie.text },
  // Prom nights
  { id: 33, eventType: "proms",     boothType: "360",   aspect: "landscape", src: "/images/venues/venue-setup-1.jpeg",        alt: "360 booth setup at a glamorous prom venue with elegant decorations",         badgeBg: eventBadge.proms.bg,    badgeText: eventBadge.proms.text,    tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  { id: 34, eventType: "proms",     boothType: "360",   aspect: "portrait",  src: "/images/venues/venue-setup-2.jpeg",        alt: "Professional 360 photo booth at prom with vibrant lighting and setup",        badgeBg: eventBadge.proms.bg,    badgeText: eventBadge.proms.text,    tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
];

const aspectClass: Record<string, string> = {
  portrait:  "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square:    "aspect-square",
  tall:      "aspect-[2/3]",
};

const eventLabel: Record<string, string> = {
  weddings:  "Wedding",
  corporate: "Corporate",
  birthdays: "Birthday",
  proms:     "Prom Night",
};

// ── Sub-components ─────────────────────────────────────────────────────────────

const GalleryCard = forwardRef<
  HTMLButtonElement,
  {
    card: GalleryCard;
    index: number;
    onClick: () => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  }
>(({ card, index, onClick, onKeyDown }, ref) => {
  return (
    <motion.button
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-label={`${card.alt}. Press Enter to view full image.`}
      aria-pressed={false}
      className="group relative overflow-hidden rounded-2xl border border-[#2a2a3a] cursor-pointer hover:border-[#f5a623]/30 focus-visible:ring-2 focus-visible:ring-[#f5a623] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0e] transition-all duration-300 break-inside-avoid mb-4"
    >
      {/* Real photo */}
      <div className={cn("relative w-full overflow-hidden", aspectClass[card.aspect])}>
        <Image
          src={card.src}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />

        {/* Subtle dark vignette so badges are always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e]/50 via-transparent to-[#0a0a0e]/20 pointer-events-none" />

        {/* Light sweep on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Event type badge — top left */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm",
              card.badgeBg,
              card.badgeText
            )}
          >
            {eventLabel[card.eventType]}
          </span>
        </div>

        {/* Booth type tag — top right */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-sm",
              card.tagBg,
              card.tagText
            )}
          >
            {boothLabel[card.boothType]}
          </span>
        </div>

        {/* Hover overlay with eye icon */}
        <div className="absolute inset-0 bg-[#0a0a0e]/60 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-300 flex items-center justify-center z-20">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            whileHover={{ scale: 1 }}
            className="w-14 h-14 rounded-full bg-[#f5a623] flex items-center justify-center shadow-xl shadow-[#f5a623]/30"
          >
            <Eye className="w-6 h-6 text-[#0a0a0e]" />
          </motion.div>
        </div>
      </div>
    </motion.button>
  );
});

GalleryCard.displayName = "GalleryCard";

// ── Hero with parallax ─────────────────────────────────────────────────────────

function GalleryHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[52vh] min-h-[340px] flex items-center justify-center overflow-hidden pt-20"
    >
      {/* BG layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0e] via-[#0d0d18] to-[#0a0a0e]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#f5a623]/6 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] bg-rose-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[250px] bg-purple-600/5 rounded-full blur-3xl" />

      {/* Parallax content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-4"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#f5a623] text-sm font-semibold uppercase tracking-widest mb-4"
        >
          Our Portfolio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Every Moment,{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #f5a623 0%, #fbbf4a 50%, #f5a623 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Perfectly Captured
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-lg mt-5 max-w-xl mx-auto"
        >
          Real events. Real guests. Real memories — from weddings in Essex to
          corporate events across London.
        </motion.p>
      </motion.div>
    </section>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [selectedCard, setSelectedCard] = useState<GalleryCard | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [announcement, setAnnouncement] = useState<string>("");
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filtered = galleryItems.filter((card) => {
    if (activeFilter === "all") return true;
    if (["weddings", "corporate", "birthdays", "proms"].includes(activeFilter)) {
      return card.eventType === activeFilter;
    }
    return card.boothType === activeFilter;
  });

  // Handle filter change with announcement
  const handleFilterChange = (filterKey: FilterKey) => {
    setActiveFilter(filterKey);
    const count = galleryItems.filter((card) => {
      if (filterKey === "all") return true;
      if (["weddings", "corporate", "birthdays", "proms"].includes(filterKey)) {
        return card.eventType === filterKey;
      }
      return card.boothType === filterKey;
    }).length;
    const filterLabel = filters.find((f) => f.key === filterKey)?.label || filterKey;
    setAnnouncement(`Showing ${count} ${count === 1 ? "photo" : "photos"} in ${filterLabel} category`);
  };

  // Open modal with specific card
  const openImageModal = (card: GalleryCard, index: number) => {
    setSelectedCard(card);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  };

  // Close modal
  const closeModal = () => {
    setSelectedCard(null);
    setCurrentIndex(-1);
    document.body.style.overflow = "auto";
  };

  // Handle modal keyboard shortcuts
  const handleModalKeydown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
    }
    if (e.key === "ArrowRight" && currentIndex < filtered.length - 1) {
      e.preventDefault();
      setSelectedCard(filtered[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    }
    if (e.key === "ArrowLeft" && currentIndex > 0) {
      e.preventDefault();
      setSelectedCard(filtered[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Handle gallery card keyboard navigation
  const handleCardKeydown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    card: GalleryCard,
    index: number
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openImageModal(card, index);
    }
    if (e.key === "ArrowRight" && index < filtered.length - 1) {
      e.preventDefault();
      cardRefs.current[index + 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      cardRefs.current[index - 1]?.focus();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="bg-[#0a0a0e] text-white min-h-screen">
      <GalleryHero />

      {/* Accessibility: Live region for filter announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      {/* ── Filter Tabs ── */}
      <section className="sticky top-[64px] z-30 bg-[#0a0a0e]/90 backdrop-blur-md border-b border-[#1e1e28]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto py-4 scrollbar-none">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => handleFilterChange(f.key)}
                aria-pressed={activeFilter === f.key}
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 focus-visible:ring-2 focus-visible:ring-[#f5a623] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0e]",
                  activeFilter === f.key
                    ? "text-[#0a0a0e]"
                    : "text-gray-400 hover:text-white hover:bg-[#1e1e28]"
                )}
              >
                {activeFilter === f.key && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-[#f5a623] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Grid ── */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Result count */}
          <motion.p
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 text-sm mb-8"
          >
            Showing{" "}
            <span className="text-[#f5a623] font-semibold">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "photo" : "photos"}
            {activeFilter !== "all" && (
              <>
                {" "}in{" "}
                <span className="text-white font-medium">
                  {filters.find((f) => f.key === activeFilter)?.label}
                </span>
              </>
            )}
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="columns-2 md:columns-3 xl:columns-4 gap-4"
              role="region"
              aria-label="Gallery items"
            >
              {filtered.map((card, index) => (
                <GalleryCard
                  key={card.id}
                  card={card}
                  index={index}
                  onClick={() => openImageModal(card, index)}
                  onKeyDown={(e) => handleCardKeydown(e, card, index)}
                  ref={(el) => {
                    if (el) cardRefs.current[index] = el;
                  }}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <p className="text-gray-600 text-lg">No photos in this category yet.</p>
              <button
                onClick={() => setActiveFilter("all")}
                className="mt-4 text-[#f5a623] text-sm font-semibold hover:underline"
              >
                View all photos
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative p-10 lg:p-16 rounded-3xl border border-[#f5a623]/20 bg-gradient-to-br from-[#13131a] to-[#1a0f24] overflow-hidden text-center"
          >
            {/* Glow effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-[#f5a623]/8 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-60 h-40 bg-rose-600/8 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-1 mb-4" role="img" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#f5a623] fill-current" aria-hidden="true" />
                ))}
              </div>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Love What You See?
              </h2>

              <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                Every one of these moments was created by our team. Yours is
                next — let&apos;s make it unforgettable.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#f5a623] text-[#0a0a0e] font-bold text-base hover:bg-[#fbbf4a] transition-all duration-200 shadow-lg shadow-[#f5a623]/25 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                >
                  Book Your Booth
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#2a2a3a] text-white font-semibold text-base hover:border-[#f5a623]/40 hover:bg-white/5 transition-all duration-200 w-full sm:w-auto justify-center"
                >
                  See Packages
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Image Modal ── */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Full image viewer"
            onKeyDown={handleModalKeydown}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeModal}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              aria-label="Close image viewer"
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-[#f5a623] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Main image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedCard.src}
                alt={selectedCard.alt}
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] rounded-lg object-contain"
                priority
              />
            </motion.div>

            {/* Navigation and info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <div className="text-white text-sm text-center">
                <p className="font-semibold mb-2">{selectedCard.alt}</p>
                <p className="text-gray-300 text-xs">
                  {currentIndex + 1} of {filtered.length} |{" "}
                  <span className="text-[#f5a623]">
                    Esc to close
                  </span>
                  {filtered.length > 1 && (
                    <span>
                      {" "}| Arrow keys to navigate
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Previous button */}
            {currentIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCard(filtered[currentIndex - 1]);
                  setCurrentIndex(currentIndex - 1);
                }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-[#f5a623] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next button */}
            {currentIndex < filtered.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCard(filtered[currentIndex + 1]);
                  setCurrentIndex(currentIndex + 1);
                }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-[#f5a623] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

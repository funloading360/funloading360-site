"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Eye, ArrowRight, Star, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { galleryCaptions } from "@/lib/gallery-captions";
import { useReducedMotion } from "@/lib/useReducedMotion";

// ── Types ──────────────────────────────────────────────────────────────────────

type FilterKey = "all" | "360" | "glam" | "selfie";

interface GalleryCard {
  id: number;
  imageId: string;
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
  { key: "360", label: "360° Slow Motion" },
  { key: "glam", label: "Glam Vintage" },
  { key: "selfie", label: "Selfie Pod" },
];

const eventBadge: Record<string, { bg: string; text: string }> = {
  weddings: { bg: "bg-rose-500/20 border-rose-400/30", text: "text-rose-300" },
  corporate: { bg: "bg-blue-500/20 border-blue-400/30", text: "text-blue-300" },
  birthdays: { bg: "bg-amber-500/20 border-amber-400/30", text: "text-amber-300" },
  proms: { bg: "bg-purple-500/20 border-purple-400/30", text: "text-purple-300" },
};

const boothTag: Record<string, { bg: string; text: string }> = {
  "360": { bg: "bg-gold/15 border-gold/30", text: "text-gold" },
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
  { id: 1,  imageId: "360-couple-dancing", eventType: "weddings",  boothType: "360",   aspect: "portrait",  src: "/images/360-slow-motion/360-couple-dancing.jpeg",    alt: "Couple dancing on the 360 booth platform, neon wedding atmosphere",           badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  { id: 2,  imageId: "360-two-women-blue", eventType: "weddings",  boothType: "360",   aspect: "landscape", src: "/images/360-slow-motion/360-two-women-blue.jpeg",    alt: "Two women posing on the 360 booth under blue neon at a wedding",             badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  { id: 3,  imageId: "360-confetti-pose", eventType: "weddings",  boothType: "360",   aspect: "square",    src: "/images/360-slow-motion/360-confetti-pose.jpeg",     alt: "Confetti raining down on guests posing on the 360 booth at a wedding",       badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  // 360° — Birthdays
  { id: 4,  imageId: "360-green-energy", eventType: "birthdays", boothType: "360",   aspect: "tall",      src: "/images/360-slow-motion/360-green-energy.jpeg",      alt: "High-energy birthday pose on the 360 booth with green lighting",             badgeBg: eventBadge.birthdays.bg, badgeText: eventBadge.birthdays.text, tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  { id: 5,  imageId: "360-jazz-costume", eventType: "birthdays", boothType: "360",   aspect: "portrait",  src: "/images/360-slow-motion/360-jazz-costume.jpeg",      alt: "Guests in jazz costumes striking poses on the 360 booth at a birthday party", badgeBg: eventBadge.birthdays.bg, badgeText: eventBadge.birthdays.text, tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  { id: 6,  imageId: "360-glamour-group", eventType: "birthdays", boothType: "360",   aspect: "landscape", src: "/images/360-slow-motion/360-glamour-group.jpeg",     alt: "Glamorous group shot on the 360 booth at a birthday celebration",            badgeBg: eventBadge.birthdays.bg, badgeText: eventBadge.birthdays.text, tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  // Glam — Weddings
  { id: 7,  imageId: "glam-venue-grand", eventType: "weddings",  boothType: "glam",  aspect: "portrait",  src: "/images/glam-vintage/glam-venue-grand.jpeg",      alt: "Glam Vintage booth set up in a grand wedding venue",                         badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  { id: 8,  imageId: "glam-venue-2", eventType: "weddings",  boothType: "glam",  aspect: "square",    src: "/images/glam-vintage/glam-venue-2.jpeg",          alt: "Glam Vintage booth setup variation at a wedding venue",                      badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  // Glam — Setup / All
  { id: 9,  imageId: "glam-backdrop-printer", eventType: "weddings",  boothType: "glam",  aspect: "tall",      src: "/images/glam-vintage/glam-backdrop-printer.jpeg", alt: "Glam Vintage booth with colourful props, boas and printer on display",        badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  { id: 10, imageId: "glam-setup-3", eventType: "weddings",  boothType: "360",  aspect: "landscape", src: "/images/360-slow-motion/glam-setup-3.jpeg",          alt: "Glam Vintage photo booth setup at an event venue",                           badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag["360"].bg,   tagText: boothTag["360"].text },
  // Glam print strip (no caption - it's PNG)
  { id: 11, imageId: "glam-print-strip", eventType: "birthdays", boothType: "glam",  aspect: "portrait",  src: "/images/events/glam-print-strip.png",       alt: "Printed glam photo strip from the Glam Vintage booth",                      badgeBg: eventBadge.birthdays.bg, badgeText: eventBadge.birthdays.text, tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  // 360 venue setup
  { id: 12, imageId: "glam-setup-props", eventType: "weddings",  boothType: "360",   aspect: "square",    src: "/images/360-slow-motion/glam-setup-props.jpeg",      alt: "360 booth setup in a venue with chandelier and green neon",                  badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag["360"].bg, tagText: boothTag["360"].text },
  // Selfie Pod — Corporate
  { id: 13, imageId: "selfie-pod-venue", eventType: "corporate", boothType: "selfie", aspect: "landscape", src: "/images/selfie-pod/selfie-pod-venue.jpeg",     alt: "Selfie Pod at an elegant corporate venue with ring light",                   badgeBg: eventBadge.corporate.bg, badgeText: eventBadge.corporate.text, tagBg: boothTag.selfie.bg, tagText: boothTag.selfie.text },
  { id: 14, imageId: "selfie-pod-christmas", eventType: "corporate", boothType: "selfie", aspect: "portrait",  src: "/images/selfie-pod/selfie-pod-christmas.jpeg", alt: "Selfie Pod Christmas setup at a corporate event",                            badgeBg: eventBadge.corporate.bg, badgeText: eventBadge.corporate.text, tagBg: boothTag.selfie.bg, tagText: boothTag.selfie.text },
  // Selfie Pod — Birthdays
  { id: 15, imageId: "selfie-pod-christmas-2", eventType: "birthdays", boothType: "selfie", aspect: "square",   src: "/images/selfie-pod/selfie-pod-christmas-2.jpeg", alt: "Selfie Pod with festive Christmas decorations at a birthday party",        badgeBg: eventBadge.birthdays.bg, badgeText: eventBadge.birthdays.text, tagBg: boothTag.selfie.bg, tagText: boothTag.selfie.text },
  // 360° — Additional venue setups
  { id: 19, imageId: "360-booth-outdoor", eventType: "weddings",  boothType: "glam",   aspect: "tall",      src: "/images/glam-vintage/360-booth-outdoor.jpeg",    alt: "360 photo booth setup outdoors in natural garden venue with golden backdrop",   badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag.glam.bg, tagText: boothTag.glam.text },
  { id: 20, imageId: "360-full-setup", eventType: "corporate", boothType: "glam",   aspect: "landscape", src: "/images/glam-vintage/360-full-setup.jpeg",       alt: "Full 360 booth setup at a corporate gala with professional lighting",         badgeBg: eventBadge.corporate.bg, badgeText: eventBadge.corporate.text, tagBg: boothTag.glam.bg, tagText: boothTag.glam.text },
  { id: 21, imageId: "360-platform-lit", eventType: "weddings",  boothType: "glam",   aspect: "square",    src: "/images/glam-vintage/360-platform-lit.jpeg",     alt: "Illuminated 360 booth platform at an elegant wedding venue with guests",     badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag.glam.bg, tagText: boothTag.glam.text },
  { id: 22, imageId: "360-setup-neon", eventType: "birthdays", boothType: "selfie",   aspect: "landscape", src: "/images/selfie-pod/360-setup-neon.jpeg",       alt: "360 booth with vibrant neon lighting setup for an energetic birthday party",   badgeBg: eventBadge.birthdays.bg, badgeText: eventBadge.birthdays.text, tagBg: boothTag.selfie.bg, tagText: boothTag.selfie.text },
  { id: 23, imageId: "360-setup-venue", eventType: "corporate", boothType: "selfie",   aspect: "portrait",  src: "/images/selfie-pod/360-setup-venue.jpeg",      alt: "Professional 360 booth setup at a corporate team building event venue",       badgeBg: eventBadge.corporate.bg, badgeText: eventBadge.corporate.text, tagBg: boothTag.selfie.bg, tagText: boothTag.selfie.text },
  // Glam — Additional setups
  { id: 24, imageId: "glam-setup-2", eventType: "corporate", boothType: "360",  aspect: "portrait",  src: "/images/360-slow-motion/glam-setup-2.jpeg",        alt: "Glam Vintage booth setup with elegant props and backdrop at a corporate event",  badgeBg: eventBadge.corporate.bg, badgeText: eventBadge.corporate.text, tagBg: boothTag["360"].bg,   tagText: boothTag["360"].text },
  { id: 25, imageId: "glam-setup-4", eventType: "birthdays", boothType: "360",  aspect: "landscape", src: "/images/360-slow-motion/glam-setup-4.jpeg",        alt: "Glam booth with colourful props setup for a fun birthday celebration",         badgeBg: eventBadge.birthdays.bg, badgeText: eventBadge.birthdays.text, tagBg: boothTag["360"].bg,   tagText: boothTag["360"].text },
  { id: 26, imageId: "glam-setup-5", eventType: "weddings",  boothType: "glam",  aspect: "square",    src: "/images/glam-vintage/glam-setup-5.jpeg",        alt: "Glam Vintage booth elegantly decorated for a romantic wedding reception",     badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  { id: 27, imageId: "glam-setup-6", eventType: "corporate", boothType: "glam",  aspect: "portrait",  src: "/images/glam-vintage/glam-setup-6.jpeg",        alt: "Glam photo booth at a luxury corporate gala with premium backdrop setup",     badgeBg: eventBadge.corporate.bg, badgeText: eventBadge.corporate.text, tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  { id: 28, imageId: "glam-setup-7", eventType: "proms",     boothType: "glam",  aspect: "landscape", src: "/images/glam-vintage/glam-setup-7.jpeg",        alt: "Glam booth setup at a glamorous prom night with festive decorations",         badgeBg: eventBadge.proms.bg,    badgeText: eventBadge.proms.text,    tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  { id: 29, imageId: "glam-venue-christmas", eventType: "corporate", boothType: "glam",  aspect: "tall",      src: "/images/glam-vintage/glam-venue-christmas.jpeg",  alt: "Glam booth decorated with festive Christmas backdrop at corporate party",      badgeBg: eventBadge.corporate.bg, badgeText: eventBadge.corporate.text, tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  { id: 30, imageId: "IMG_3067", eventType: "weddings",  boothType: "glam",  aspect: "square",    src: "/images/glam-vintage/IMG_3067.jpeg",             alt: "Glam Vintage booth setup with beautiful backdrop at a wedding venue",        badgeBg: eventBadge.weddings.bg,  badgeText: eventBadge.weddings.text,  tagBg: boothTag.glam.bg,   tagText: boothTag.glam.text },
  // Selfie Pod — Additional setups
  { id: 31, imageId: "selfie-pod-christmas-3", eventType: "birthdays", boothType: "glam", aspect: "portrait",  src: "/images/glam-vintage/selfie-pod-christmas-3.jpeg", alt: "Selfie Pod with festive Christmas props and bright ring light setup",       badgeBg: eventBadge.birthdays.bg, badgeText: eventBadge.birthdays.text, tagBg: boothTag.glam.bg, tagText: boothTag.glam.text },
  { id: 32, imageId: "selfie-pod-setup-2", eventType: "corporate", boothType: "glam", aspect: "square",    src: "/images/glam-vintage/selfie-pod-setup-2.jpeg",    alt: "Selfie Pod with professional ring light and clean backdrop at corporate event", badgeBg: eventBadge.corporate.bg, badgeText: eventBadge.corporate.text, tagBg: boothTag.glam.bg, tagText: boothTag.glam.text },
  // Prom nights
  { id: 33, imageId: "venue-setup-1", eventType: "proms",     boothType: "glam",   aspect: "landscape", src: "/images/glam-vintage/venue-setup-1.jpeg",        alt: "360 booth setup at a glamorous prom venue with elegant decorations",         badgeBg: eventBadge.proms.bg,    badgeText: eventBadge.proms.text,    tagBg: boothTag.glam.bg, tagText: boothTag.glam.text },
  { id: 34, imageId: "venue-setup-2", eventType: "proms",     boothType: "glam",   aspect: "portrait",  src: "/images/glam-vintage/venue-setup-2.jpeg",        alt: "Professional 360 photo booth at prom with vibrant lighting and setup",        badgeBg: eventBadge.proms.bg,    badgeText: eventBadge.proms.text,    tagBg: boothTag.glam.bg, tagText: boothTag.glam.text },
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
  const captionData = galleryCaptions[card.imageId];

  return (
    <div>
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
        className="group relative overflow-hidden rounded-2xl border border-border cursor-pointer hover:border-gold/30 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-300 break-inside-avoid mb-4 w-full"
      >
        {/* Real photo */}
        <div className={cn("relative w-full overflow-hidden", aspectClass[card.aspect])}>
          <Image
            src={card.src}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            loading="lazy"
            quality={85}
          />

          {/* Subtle dark vignette so badges are always readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/20 pointer-events-none" />

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

          {/* Desktop hover overlay with caption and eye icon */}
          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-300 flex flex-col items-center justify-center z-20 hidden sm:flex">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              whileHover={{ scale: 1 }}
              className="w-14 h-14 rounded-full bg-gold flex items-center justify-center shadow-xl shadow-gold/30 mb-4"
            >
              <Eye className="w-6 h-6 text-background" />
            </motion.div>

            {/* Caption overlay for desktop */}
            {captionData && (
              <div className="text-center px-4">
                <p className="text-white text-sm font-semibold mb-2 line-clamp-3">
                  {captionData.caption}
                </p>
                <Link
                  href={`/locations/${captionData.citySlug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-gold text-xs hover:underline inline-block transition-colors"
                >
                  Hire in {captionData.city} →
                </Link>
              </div>
            )}
          </div>

          {/* Mobile eye icon only (no caption on hover) */}
          <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-300 flex items-center justify-center z-20 sm:hidden">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              whileHover={{ scale: 1 }}
              className="w-14 h-14 rounded-full bg-gold flex items-center justify-center shadow-xl shadow-gold/30"
            >
              <Eye className="w-6 h-6 text-background" />
            </motion.div>
          </div>
        </div>
      </motion.button>

      {/* Mobile caption display below image */}
      {captionData && (
        <div className="mt-3 sm:hidden px-1">
          <p className="text-white text-xs leading-relaxed mb-2">
            {captionData.caption}
          </p>
          <Link
            href={`/locations/${captionData.citySlug}`}
            className="text-gold text-xs hover:underline inline-flex items-center gap-1 transition-colors"
          >
            Hire in {captionData.city}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}
    </div>
  );
});

GalleryCard.displayName = "GalleryCard";

// ── Hero with parallax ─────────────────────────────────────────────────────────

function GalleryHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative h-[52vh] min-h-[340px] flex items-center justify-center overflow-hidden pt-20"
    >
      {/* BG layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0d0d18] to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gold/6 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] bg-rose-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[250px] bg-purple-600/5 rounded-full blur-3xl" />

      {/* Parallax content */}
      <motion.div
        style={prefersReducedMotion ? {} : { y, opacity }}
        className="relative z-10 text-center px-4"
      >
        <motion.h1
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Every Moment,{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Perfectly Captured
          </span>
        </motion.h1>
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
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
  const [activeFilter, setActiveFilter] = useState<FilterKey>("360");
  const [selectedCard, setSelectedCard] = useState<GalleryCard | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [announcement, setAnnouncement] = useState<string>("");
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const filtered = galleryItems.filter((card) => {
    if (activeFilter === "all") return true;
    return card.boothType === activeFilter;
  });

  // Handle filter change with announcement
  const handleFilterChange = (filterKey: FilterKey) => {
    setActiveFilter(filterKey);
    const count = galleryItems.filter((card) => {
      if (filterKey === "all") return true;
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
    <div className="bg-background text-white min-h-screen">
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
      <section className="sticky top-[64px] z-30 bg-background/90 backdrop-blur-md border-b border-[#1e1e28]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 overflow-x-auto py-4 scrollbar-none">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => handleFilterChange(f.key)}
                aria-pressed={activeFilter === f.key}
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  activeFilter === f.key
                    ? "text-background"
                    : "text-gray-400 hover:text-white hover:bg-[#1e1e28]"
                )}
              >
                {activeFilter === f.key && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-gold rounded-full"
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
            <span className="text-gold font-semibold">{filtered.length}</span>{" "}
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
              className="columns-2 lg:columns-3 xl:columns-4 gap-4"
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
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <p className="text-gray-600 text-lg">No photos in this category yet.</p>
              <button
                onClick={() => setActiveFilter("360")}
                className="mt-4 text-gold text-sm font-semibold hover:underline"
              >
                View 360° photos
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative p-10 lg:p-16 rounded-3xl border border-gold/20 bg-gradient-to-br from-surface to-[#1a0f24] overflow-hidden text-center"
          >
            {/* Glow effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-gold/8 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-60 h-40 bg-rose-600/8 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-1 mb-4" role="img" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-current" aria-hidden="true" />
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
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-background font-bold text-base hover:bg-gold-light transition-all duration-200 shadow-lg shadow-gold/25 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                >
                  Book Your Booth
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-white font-semibold text-base hover:border-gold/40 hover:bg-white/5 transition-all duration-200 w-full sm:w-auto justify-center"
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
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
                quality={90}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              />
            </motion.div>

            {/* Navigation and info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <div className="text-white text-sm text-center">
                <p className="font-semibold mb-2">{selectedCard.alt}</p>
                <p className="text-gray-300 text-xs">
                  {currentIndex + 1} of {filtered.length} |{" "}
                  <span className="text-gold">
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
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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

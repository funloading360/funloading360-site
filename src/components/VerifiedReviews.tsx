'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ExternalLink, ShieldCheck, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useReducedMotion } from '@/lib/useReducedMotion';
import rawReviews from '@/data/platform-reviews.json';

// ── Types ─────────────────────────────────────────────────────────────────────

interface PlatformReview {
  id: string;
  platform: 'bark' | 'poptop';
  platformName: string;
  profileUrl: string;
  screenshot: string | null;
  reviewerName: string;
  rating: number;
  quote: string;
  date: string;
  eventType: string;
}

const reviews = rawReviews as PlatformReview[];
type FilterTab = 'all' | 'bark' | 'poptop';

const PLATFORM = {
  bark:   { label: 'Bark.com', color: '#e8690a', badge: 'bg-[#e8690a]', url: 'bark.com' },
  poptop: { label: 'Poptop',   color: '#e91e8c', badge: 'bg-[#e91e8c]', url: 'poptop.uk.com' },
} as const;

const TABS: { key: FilterTab; label: string }[] = [
  { key: 'all',    label: 'All Reviews' },
  { key: 'bark',   label: 'Bark.com' },
  { key: 'poptop', label: 'Poptop' },
];

// ── Hooks ─────────────────────────────────────────────────────────────────────

function usePerPage() {
  const [perPage, setPerPage] = useState(3);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setPerPage(1);
      else if (window.innerWidth < 1024) setPerPage(2);
      else setPerPage(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return perPage;
}

// ── Browser frame mockup ──────────────────────────────────────────────────────
// Makes the screenshot look intentional ("this is a real review on the platform")
// Pattern used by Vercel, Linear, Notion for product screenshots.

function BrowserFrame({ src, alt, platform }: { src: string; alt: string; platform: 'bark' | 'poptop' }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) return null;

  return (
    <div className="rounded-xl overflow-hidden border border-[#3a3a4a] shadow-lg shadow-black/40 mx-1">
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-3 py-2.5 bg-[#252535] border-b border-[#3a3a4a]">
        {/* Traffic lights */}
        <div className="flex gap-1.5 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1" />
      </div>
      {/* Screenshot inside frame */}
      <div className="bg-white">
        <Image
          src={src}
          alt={alt}
          width={624}
          height={300}
          className="w-full h-auto block"
          onError={() => setImgError(true)}
          draggable={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}

// ── Review Card ───────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-gold fill-gold' : 'text-gray-600'}`} />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: PlatformReview }) {
  const screenshotSrc = review.screenshot;

  return (
    <article className="flex flex-col bg-surface border border-border rounded-2xl overflow-hidden hover:border-[#3a3a5a] transition-colors duration-200">

      {/* Browser frame for ALL cards that have a screenshot */}
      {screenshotSrc && (
        <div className="p-4 pb-0 bg-[#0e0e18]">
          <BrowserFrame
            src={screenshotSrc}
            alt={`Real review from ${review.reviewerName} on ${review.platformName}`}
            platform={review.platform}
          />
        </div>
      )}

      {/* Card body */}
      <div className="flex flex-col p-5 gap-3">

        {/* Stars */}
        <div className="flex items-center">
          <StarRating rating={review.rating} />
        </div>

        {/* Quote */}
        <blockquote className="text-gray-300 text-sm leading-relaxed line-clamp-4">
          &ldquo;{review.quote}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="pt-3 border-t border-border">
          <p className="text-white font-semibold text-sm">{review.reviewerName}</p>
          {(review.eventType || review.date) && (
            <p className="text-gray-500 text-xs mt-0.5">
              {[review.eventType, review.date].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>

      </div>
    </article>
  );
}

// ── Main Carousel ─────────────────────────────────────────────────────────────

const SWIPE_THRESHOLD = 80; // px to trigger page change — prevent accidental swipes during vertical scroll

export default function VerifiedReviews() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const isDragging = dragStart !== null;
  const prefersReducedMotion = useReducedMotion();
  const perPage = usePerPage();

  const filtered = activeTab === 'all' ? reviews : reviews.filter((r) => r.platform === activeTab);

  // Navigate in full-page steps (perPage cards at a time) → fewer dots, cleaner UX
  const totalPages = Math.ceil(filtered.length / perPage);
  const maxPage = totalPages - 1;

  // index tracks the current PAGE (not card index)
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setIndex((i) => Math.min(maxPage, i + 1)), [maxPage]);

  useEffect(() => setIndex(0), [activeTab, perPage]);

  useEffect(() => {
    if (isHovering || prefersReducedMotion || totalPages <= 1) return;
    const id = setInterval(() => setIndex((i) => (i >= maxPage ? 0 : i + 1)), 5500);
    return () => clearInterval(id);
  }, [isHovering, prefersReducedMotion, totalPages, maxPage]);

  const cardWidthPct = 100 / perPage;
  const translateX = -(index * perPage * cardWidthPct);
  const totalDots = totalPages;

  // Drag handlers
  const onDragStart = (x: number) => { setDragStart(x); setIsHovering(true); };
  const onDragMove  = (x: number) => { if (dragStart !== null) setDragOffset(x - dragStart); };
  const onDragEnd   = () => {
    if (dragStart !== null) {
      if (dragOffset < -SWIPE_THRESHOLD) next();
      else if (dragOffset > SWIPE_THRESHOLD) prev();
    }
    setDragStart(null);
    setDragOffset(0);
    setIsHovering(false);
  };

  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            What Real Clients Say
          </h2>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => !isDragging && setIsHovering(true)}
          onMouseLeave={() => { setIsHovering(false); onDragEnd(); }}
        >
          <div
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={(e) => onDragStart(e.clientX)}
            onMouseMove={(e) => onDragMove(e.clientX)}
            onMouseUp={onDragEnd}
            onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => { e.preventDefault(); onDragMove(e.touches[0].clientX); }}
            onTouchEnd={onDragEnd}
          >
            <div
              className="flex items-start"
              style={{
                transform: `translateX(calc(${translateX}% + ${isDragging ? dragOffset : 0}px))`,
                transition: isDragging || prefersReducedMotion ? 'none' : 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                userSelect: 'none',
              }}
            >
              {filtered.map((review) => (
                <div
                  key={review.id}
                  style={{ minWidth: `${cardWidthPct}%`, maxWidth: `${cardWidthPct}%` }}
                  className="px-3 pb-1"
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>

          {index > 0 && (
            <button onClick={prev} aria-label="Previous"
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-white hover:bg-[#1e1e2e] hover:border-gold/40 hover:text-gold transition-all shadow-xl">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {index < maxPage && (
            <button onClick={next} aria-label="Next"
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-white hover:bg-[#1e1e2e] hover:border-gold/40 hover:text-gold transition-all shadow-xl">
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Dots */}
        {totalDots > 1 && (
          <div className="flex justify-center gap-2 mt-6 mb-2">
            {Array.from({ length: totalDots }).map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} aria-label={`Slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${i === index ? 'w-8 h-2 bg-gold' : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        )}


      </div>
    </div>
  );
}

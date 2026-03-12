'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const COOKIE_KEY = 'fl360_cookie_consent';

type ConsentState = 'accepted' | 'declined' | null;

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [consentCheckbox, setConsentCheckbox] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(COOKIE_KEY) as ConsentState | null;
    setConsent(stored);
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    setConsent('accepted');
    window.dispatchEvent(new Event('fl360:consent-accepted'));
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined');
    setConsent('declined');
  };

  // Don't render until mounted (avoid hydration mismatch)
  if (!mounted) return null;
  // Banner already answered
  if (consent !== null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-labelledby="cookie-title"
        aria-modal="true"
        className="fixed bottom-0 left-0 right-0 z-[100] bg-[#13131a] border-t border-[#2a2a3a] p-4 sm:p-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h2 id="cookie-title" className="text-lg font-bold text-white mb-3">
                We use cookies
              </h2>

              {/* DISCLOSURE SECTION */}
              <div className="text-sm text-gray-300 space-y-3 mb-4">
                <p>
                  <strong className="text-[#f5a623]">Essential Cookies:</strong> Required for
                  site security and basic functionality (e.g., login sessions).
                </p>

                <p>
                  <strong className="text-[#f5a623]">Analytics Cookies:</strong> Google
                  Analytics 4 (GA4) with IP anonymization enabled. Helps us understand how
                  visitors use our site.
                </p>

                <ul className="list-disc list-inside space-y-1 text-xs text-gray-400">
                  <li>Data collected: Page views, session duration, device type, location</li>
                  <li>Data retained for 14 months</li>
                  <li>Cookie ID used (not personal data)</li>
                </ul>

                <p className="text-xs text-gray-400">
                  Read our{' '}
                  <Link href="/privacy-policy" className="text-[#f5a623] hover:underline">
                    Privacy Policy
                  </Link>{' '}
                  for full details about data collection, processing, and your rights
                  (access, deletion, portability, and objection).
                </p>
              </div>

              {/* EXPLICIT CONSENT CHECKBOX */}
              <label className="flex items-center gap-3 mb-4 p-3 bg-[#0a0a0e]/50 rounded-lg border border-[#2a2a3a]">
                <input
                  type="checkbox"
                  checked={consentCheckbox}
                  onChange={(e) => setConsentCheckbox(e.target.checked)}
                  aria-required="true"
                  className="w-4 h-4 rounded border-[#2a2a3a] bg-[#13131a] cursor-pointer"
                />
                <span className="text-sm text-gray-300 cursor-pointer">
                  I understand and consent to analytics cookies as described above
                  <span className="text-[#f5a623]">*</span> (required)
                </span>
              </label>
            </div>

            {/* Close button for accessibility */}
            <button
              onClick={handleDecline}
              aria-label="Close cookie banner and decline analytics"
              className="text-gray-400 hover:text-white flex-shrink-0 mt-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ACTION BUTTONS — EQUAL PROMINENCE */}
          <div className="flex gap-3 flex-col sm:flex-row">
            {/* DECLINE BUTTON */}
            <button
              onClick={handleDecline}
              className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-400 text-white font-semibold hover:bg-gray-400/10 hover:border-white transition-all duration-200 text-sm"
            >
              Decline Analytics
            </button>

            {/* ACCEPT BUTTON */}
            <button
              onClick={handleAcceptAll}
              disabled={!consentCheckbox}
              className="flex-1 px-6 py-3 rounded-lg bg-[#f5a623] text-[#0a0a0e] font-bold hover:bg-[#fbbf4a] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm"
            >
              Accept & Continue
            </button>
          </div>

          {/* FOOTER NOTE */}
          <p className="text-xs text-gray-500 mt-3 text-center">
            You can change consent preferences anytime in our{' '}
            <Link href="/privacy-policy" className="text-[#f5a623] hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

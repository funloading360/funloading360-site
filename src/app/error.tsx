"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-background text-white min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
        <h1
          className="text-3xl font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Something went wrong
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          We&apos;re sorry — an unexpected error occurred. Please try again or
          contact us directly if the problem continues.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-full bg-gold text-background font-semibold text-sm hover:bg-gold-light transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-full border border-border text-white font-medium text-sm hover:border-gold/40 hover:bg-white/5 transition-colors"
          >
            Back to homepage
          </Link>
        </div>
        <p className="text-gray-600 text-xs mt-8">
          Need help?{" "}
          <a href="mailto:FunLoading360@gmail.com" className="text-gold hover:underline">
            FunLoading360@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}

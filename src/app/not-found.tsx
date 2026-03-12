import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | FunLoading360",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="bg-[#0a0a0e] text-white min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="max-w-md w-full text-center">
        <p className="text-[#f5a623] text-sm font-semibold uppercase tracking-widest mb-4">
          404
        </p>
        <h1
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Page not found
        </h1>
        <p className="text-gray-400 leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist. You might have followed an old
          link or mistyped the address.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-[#f5a623] text-[#0a0a0e] font-semibold text-sm hover:bg-[#fbbf4a] transition-colors"
          >
            Back to homepage
          </Link>
          <Link
            href="/book"
            className="px-6 py-3 rounded-full border border-[#2a2a3a] text-white font-medium text-sm hover:border-[#f5a623]/40 hover:bg-white/5 transition-colors"
          >
            Book a booth
          </Link>
        </div>
      </div>
    </div>
  );
}

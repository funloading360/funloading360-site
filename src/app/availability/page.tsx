import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Check Availability | FunLoading360 Photo Booth Hire",
  description: "Check available dates for your photo booth hire in Essex, Kent and London. Book online in minutes.",
  robots: { index: false }, // don't index — this is a utility page
};

export default function AvailabilityPage() {
  return (
    <main className="min-h-screen bg-[#08080d] text-white">
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-xs font-bold tracking-widest text-yellow-400 uppercase mb-4">Availability</p>
        <h1 className="text-4xl font-bold mb-4">Check Available Dates</h1>
        <p className="text-gray-400 text-lg mb-8">
          Select your date and booth in our booking system to see real-time availability from our live calendar.
        </p>
        <Link
          href="/book"
          className="inline-block bg-yellow-400 text-black font-bold px-10 py-4 rounded-xl text-lg hover:bg-yellow-300 transition-colors"
        >
          Check My Date &rarr;
        </Link>
        <p className="text-gray-500 text-sm mt-4">
          Weekends book quickly — we recommend booking at least 4 weeks in advance.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="font-semibold mb-1">Call Us</p>
            <a href="tel:+447482112110" className="text-yellow-400 hover:underline">+44 7482 112110</a>
            <p className="text-gray-500 text-sm mt-1">Mon–Sun &middot; 9am–10pm</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="font-semibold mb-1">Email Us</p>
            <a href="mailto:FunLoading360@gmail.com" className="text-yellow-400 hover:underline text-sm">FunLoading360@gmail.com</a>
            <p className="text-gray-500 text-sm mt-1">We reply within 24 hours</p>
          </div>
        </div>
      </div>
    </main>
  );
}

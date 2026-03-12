import Link from "next/link";
import { Camera, Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

const TikTokIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z" />
  </svg>
);

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Our Booths", href: "/booths" },
  { label: "Pricing & Packages", href: "/pricing" },
  { label: "Gallery", href: "/gallery" },
  { label: "Corporate Events", href: "/corporate" },
  { label: "Locations", href: "/locations" },
  { label: "Book Now", href: "/book" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="bg-[#080810] border-t border-[#2a2a3a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Column 1: Brand info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 rounded-full bg-[#f5a623] flex items-center justify-center flex-shrink-0">
                <Camera className="w-4 h-4 text-[#0a0a0e]" strokeWidth={2.5} />
              </div>
              <span
                className="text-xl font-bold text-white tracking-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                FunLoading360
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Premium photo booth hire across Essex, Kent & London. Making your
              celebration unforgettable, one photo at a time.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/funloading360"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#13131a] border border-[#2a2a3a] flex items-center justify-center text-gray-400 hover:text-[#f5a623] hover:border-[#f5a623]/40 transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@funloading360"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-[#13131a] border border-[#2a2a3a] flex items-center justify-center text-gray-400 hover:text-[#f5a623] hover:border-[#f5a623]/40 transition-all duration-200"
              >
                <TikTokIcon />
              </a>
              <a
                href="https://www.facebook.com/funloading360"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#13131a] border border-[#2a2a3a] flex items-center justify-center text-gray-400 hover:text-[#f5a623] hover:border-[#f5a623]/40 transition-all duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-[#f5a623] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+447482112110"
                  className="flex items-start gap-3 text-gray-400 text-sm hover:text-[#f5a623] transition-colors duration-200 group"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#f5a623]" />
                  <span>+44 7482 112110</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:FunLoading360@gmail.com"
                  className="flex items-start gap-3 text-gray-400 text-sm hover:text-[#f5a623] transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#f5a623]" />
                  <span>FunLoading360@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#f5a623]" />
                  <span>Essex, Kent & London</span>
                </div>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-[#13131a] border border-[#2a2a3a]">
              <p className="text-xs text-gray-400 leading-relaxed">
                <span className="text-[#f5a623] font-medium">
                  Enquiries welcome 7 days a week
                </span>
                <br />
                We typically respond within 2 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-[#2a2a3a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            &copy; 2026 FunLoading360. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-500 text-xs hover:text-gray-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

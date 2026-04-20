import type { Metadata } from "next";
import React from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import WebVitals from "@/components/WebVitals";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FunLoading360 — Premium Photo Booth Hire | Essex, Kent & London",
  description:
    "Premium photo booth hire across Essex, Kent & London. 360 slow motion booths, glam vintage booths & selfie pods. Perfect for weddings, corporate events, birthdays and proms. Free setup, instant sharing.",
  keywords: [
    "photo booth hire",
    "photo booth Essex",
    "photo booth Kent",
    "photo booth London",
    "wedding photo booth",
    "360 photo booth",
    "glam vintage photo booth",
    "corporate photo booth",
    "photo booth Chelmsford",
  ],
  openGraph: {
    title: "FunLoading360 — Premium Photo Booth Hire | Essex, Kent & London",
    description:
      "Premium photo booth hire across Essex, Kent & London. 360 slow motion, glam vintage & selfie pods.",
    type: "website",
    locale: "en_GB",
    url: "https://www.funloading360.co.uk",
    images: [{ url: "https://www.funloading360.co.uk/og-image.jpg", width: 1200, height: 630, alt: "FunLoading360 photo booth hire" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.funloading360.co.uk/og-image.jpg"],
  },
  verification: {
    google: "zUgQ1msi7OF4yIhBQHA_Q3GGe6tESvhPY4uOYmCvqYs",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "FunLoading360",
  description:
    "Premium photo booth hire across Essex, Kent & London for weddings, corporate events, birthdays and proms.",
  url: "https://www.funloading360.co.uk",
  telephone: "+44 7482 112110",
  email: "FunLoading360@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Guys Farm Rd",
    addressLocality: "South Woodham Ferrers",
    postalCode: "CM3 5NF",
    addressRegion: "Essex",
    addressCountry: "GB",
  },
  areaServed: [
    { "@type": "Place", name: "Essex" },
    { "@type": "Place", name: "Kent" },
    { "@type": "Place", name: "London" },
  ],
  priceRange: "££",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "48",
    bestRating: "5",
    worstRating: "1",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "09:00",
    closes: "22:00",
  },
  sameAs: [
    "https://www.instagram.com/funloading360",
    "https://www.tiktok.com/@funloading360",
    "https://www.facebook.com/funloading360",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-white`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-gold focus:text-background focus:font-bold focus:text-sm focus:outline-none"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieBanner />
        <GoogleAnalytics />
        <WebVitals />
      </body>
    </html>
  );
}

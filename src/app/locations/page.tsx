import type { Metadata } from "next";
import LocationsContent from "./LocationsContent";

export const metadata: Metadata = {
  title: "Photo Booth Hire Locations — Essex, Kent & London | FunLoading360",
  description:
    "FunLoading360 covers all of Essex, Kent and London — including Chelmsford, Maidstone, Southend, Basildon and Central London. Free delivery within 25 miles of Chelmsford.",
  openGraph: {
    title: "Locations — Essex, Kent & London | FunLoading360",
    description:
      "We cover Essex, Kent & London. Free delivery within 25 miles of Chelmsford. £1.50/mile beyond. London supplement +£50.",
    url: "https://www.funloading360.co.uk/locations",
    images: [{ url: "https://www.funloading360.co.uk/og-image.jpg", width: 1200, height: 630, alt: "FunLoading360 photo booth hire — 360, glam vintage & selfie pod booths" }],
  },

  twitter: {
    card: "summary_large_image",
    images: ["https://www.funloading360.co.uk/og-image.jpg"],
  },
  alternates: { canonical: "https://www.funloading360.co.uk/locations" },
};

export default function LocationsPage() {
  return <LocationsContent />;
}

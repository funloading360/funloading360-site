import type { Metadata } from "next";
import ThankYouContent from "./ThankYouContent";

export const metadata: Metadata = {
  title: "Enquiry Received — FunLoading360",
  description:
    "Thank you for your photo booth enquiry. We've sent you a confirmation email and SMS. We'll confirm availability within 2 hours.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://www.funloading360.co.uk/thank-you",
  },
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}

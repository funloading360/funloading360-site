import { Metadata } from "next";
import CartContent from "./CartContent";

export const metadata: Metadata = {
  title: "Your Cart — FunLoading360",
  description:
    "Review your cart items, customize quantities and packages, then proceed to checkout.",
  robots: {
    index: false, // Cart pages shouldn't be indexed
    follow: true,
  },
  openGraph: {
    title: "Your Cart — FunLoading360",
    description: "Review and manage your cart items.",
    type: "website",
    url: "https://www.funloading360.co.uk/cart",
  },
  twitter: {
    card: "summary",
    title: "Your Cart — FunLoading360",
    description: "Review your cart items.",
  },
  alternates: {
    canonical: "https://www.funloading360.co.uk/cart",
  },
};

export default function CartPage() {
  return <CartContent />;
}

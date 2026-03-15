import { Metadata } from "next";
import CartContent from "./CartContent";

export const metadata: Metadata = {
  title: "Coșul tău — FunLoading360",
  description:
    "Revizuiți articolele din coșul dvs., personalizați cantități și pachete, apoi continuați la checkout.",
  robots: {
    index: false, // Cart pages shouldn't be indexed
    follow: true,
  },
  openGraph: {
    title: "Coșul tău — FunLoading360",
    description: "Revizuiți și gestionați articolele din coșul dvs.",
    type: "website",
    url: "https://www.funloading360.co.uk/cart",
  },
  twitter: {
    card: "summary",
    title: "Coșul tău — FunLoading360",
    description: "Revizuiți articolele din coșul dvs.",
  },
  alternates: {
    canonical: "https://www.funloading360.co.uk/cart",
  },
};

export default function CartPage() {
  return <CartContent />;
}

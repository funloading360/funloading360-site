import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Your Cart | FunLoading360",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  redirect("/book");
}

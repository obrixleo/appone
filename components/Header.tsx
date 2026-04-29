"use client";

import Link from "next/link";
import { Sparkles, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/singles", label: "Singles" },
  { href: "/sealed", label: "Sealed" },
];

export default function Header() {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EEF2F9] to-[#FEF6E0] shadow-sm">
            <Sparkles className="h-6 w-6 text-[#1B3A6B]" />
          </div>
          <div className="text-left">
            <p className="text-xl font-black tracking-tight text-[#0F1F3D]">
              Pearl Collectors
            </p>
            <p className="text-xs text-stone-400">
              Singles • Sealed • Local Pickup
            </p>
          </div>
        </Link>

        {/* Nav + Cart grouped together on the right */}
        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-100"
              >
                {label}
              </Link>
            ))}
          </nav>

          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full bg-[#E8503A] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#C73E2A] transition ml-2"
          >
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 ? (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#E8503A] text-xs font-black">
                {cartCount}
              </span>
            ) : (
              <span>Cart</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { initialProducts, currency } from "@/data/products";
import { Card, CardContent } from "@/components/ui";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { Search, Tag, MapPin, ShieldCheck, Zap, Package } from "lucide-react";

export default function HomePage() {
  const { addToCart } = useCart();
  const router = useRouter();

  const featured = initialProducts.filter((p) => p.featured).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#FAFAF7]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#EEF2F9] via-white to-[#FEF6E0] px-4 py-16">
        <div className="mx-auto max-w-7xl grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-block rounded-full bg-[#E8503A] px-4 py-1.5 text-xs font-bold text-white tracking-wide uppercase">
              🇵🇭 Filipino-Owned Card Shop
            </span>
            <h1 className="text-5xl font-black tracking-tight text-[#0F1F3D] md:text-6xl leading-tight">
              Your Local Pokémon Card Shop,{" "}
              <span className="text-[#E8503A]">Online.</span>
            </h1>
            <p className="text-lg leading-relaxed text-stone-500">
              Browse singles and sealed product with transparent market pricing.
              Reserve online, pick up today — no shipping needed.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/singles"
                className="rounded-xl bg-[#E8503A] px-6 py-3 font-bold text-white hover:bg-[#C73E2A] transition shadow-sm"
              >
                Shop Singles
              </Link>
              <Link
                href="/sealed"
                className="rounded-xl border-2 border-[#1B3A6B] bg-white px-6 py-3 font-bold text-[#1B3A6B] hover:bg-[#EEF2F9] transition"
              >
                Shop Sealed
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 pt-2 text-sm font-semibold text-stone-500">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#E8503A]" />
                Condition guaranteed
              </span>
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#F0B429]" />
                Same-day pickup
              </span>
              <span className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-[#1B3A6B]" />
                Competitive pricing
              </span>
            </div>
          </div>

          {/* Featured product cards */}
          <div className="grid grid-cols-2 gap-4">
            {featured.map((p) => (
              <div
                key={p.id}
                className="group rounded-2xl bg-white p-4 shadow-sm border border-stone-100 hover:shadow-md transition flex flex-col gap-3"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  onClick={() => router.push(`/product/${p.id}`)}
                  className="h-36 w-full rounded-xl object-contain cursor-pointer transition-transform group-hover:scale-105"
                />
                <div>
                  <p className="font-bold text-sm text-[#0F1F3D] line-clamp-1">
                    {p.name}
                  </p>
                  <p className="text-xs text-stone-400">{p.set}</p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-lg font-black text-[#0F1F3D]">
                    {currency.format(p.shopPrice)}
                  </p>
                  <button
                    onClick={() => addToCart(p)}
                    className="rounded-lg bg-[#E8503A] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#C73E2A] transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-black text-[#0F1F3D] mb-8 text-center">
          Why shop with Pearl Collectors?
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="rounded-2xl border-stone-100 bg-white">
            <CardContent className="p-6 space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2F9]">
                <Search className="h-6 w-6 text-[#1B3A6B]" />
              </div>
              <h3 className="font-bold text-[#0F1F3D]">Easy search</h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Filter by set, type, rarity, condition, and price. Find exactly
                what you need in seconds.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-stone-100 bg-white">
            <CardContent className="p-6 space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FEF6E0]">
                <Tag className="h-6 w-6 text-[#C68F0A]" />
              </div>
              <h3 className="font-bold text-[#0F1F3D]">Transparent pricing</h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                See market price next to our price on every card. Know you're
                getting a fair deal every time.
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-stone-100 bg-white">
            <CardContent className="p-6 space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDECEA]">
                <MapPin className="h-6 w-6 text-[#E8503A]" />
              </div>
              <h3 className="font-bold text-[#0F1F3D]">Local pickup</h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Reserve online and pick up in store today. No shipping fees, no
                waiting.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[#0F1F3D] px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-black text-white mb-8 text-center">
            Browse our inventory
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/singles"
              className="group rounded-2xl bg-[#1B3A6B] p-8 hover:bg-[#243f73] transition flex items-center justify-between"
            >
              <div>
                <h3 className="text-2xl font-black text-white">Singles</h3>
                <p className="mt-2 text-sm text-blue-200">
                  Individual cards • Graded condition • Market pricing
                </p>
                <span className="mt-4 inline-block rounded-full bg-[#E8503A] px-4 py-1.5 text-xs font-bold text-white">
                  Shop Now →
                </span>
              </div>
              <span className="text-6xl">🃏</span>
            </Link>
            <Link
              href="/sealed"
              className="group rounded-2xl bg-[#F0B429] p-8 hover:bg-[#e0a820] transition flex items-center justify-between"
            >
              <div>
                <h3 className="text-2xl font-black text-[#0F1F3D]">Sealed</h3>
                <p className="mt-2 text-sm text-[#0F1F3D]/70">
                  Booster boxes • ETBs • Tins • Bundles
                </p>
                <span className="mt-4 inline-block rounded-full bg-[#0F1F3D] px-4 py-1.5 text-xs font-bold text-white">
                  Shop Now →
                </span>
              </div>
              <span className="text-6xl">📦</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-3xl bg-gradient-to-br from-[#EEF2F9] to-[#FEF6E0] p-8 md:p-12 text-center space-y-4">
          <ShieldCheck className="mx-auto h-12 w-12 text-[#1B3A6B]" />
          <h2 className="text-2xl font-black text-[#0F1F3D]">
            Every card is condition-verified
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto leading-relaxed">
            Each card is inspected and graded in store before listing. What you
            see is what you get — no surprises when you pick up.
          </p>
          <Link
            href="/singles"
            className="inline-block rounded-xl bg-[#1B3A6B] px-6 py-3 font-bold text-white hover:bg-[#243f73] transition"
          >
            Browse Singles
          </Link>
        </div>
      </section>
    </main>
  );
}

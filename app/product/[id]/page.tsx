"use client";

import { useParams, useRouter } from "next/navigation";
import { initialProducts, currency } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ShieldCheck, Zap, ArrowLeft, Tag } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const typeColors: Record<string, string> = {
  Fire: "bg-orange-100 text-orange-700",
  Water: "bg-blue-100 text-blue-700",
  Grass: "bg-green-100 text-green-700",
  Electric: "bg-yellow-100 text-yellow-700",
  Psychic: "bg-purple-100 text-purple-700",
  Fighting: "bg-red-100 text-red-700",
  Dark: "bg-gray-800 text-gray-100",
  Metal: "bg-slate-200 text-slate-700",
  Dragon: "bg-indigo-100 text-indigo-700",
  Fairy: "bg-pink-100 text-pink-700",
  Normal: "bg-stone-100 text-stone-600",
};

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const product = initialProducts.find((p) => p.id === id);
  const similarItems = initialProducts
    .filter(
      (p) => p.id !== id && p.category === product?.category && p.quantity > 0,
    )
    .slice(0, 3);

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-stone-500">Product not found.</p>
      </main>
    );
  }

  const savings = product.marketPrice - product.shopPrice;
  const savingsPercent = Math.round((savings / product.marketPrice) * 100);
  const typeColor = typeColors[product.type] ?? "bg-stone-100 text-stone-600";

  return (
    <main className="bg-[#FAFAF7] min-h-screen">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-semibold text-stone-400 hover:text-[#1B3A6B] transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      {/* Main product section */}
      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-8 md:grid-cols-2 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-100">
          {/* Image */}
          <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#EEF2F9] to-[#FEF6E0] p-8">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[420px] w-auto rounded-2xl object-contain drop-shadow-xl"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5">
            {/* Category + name */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E8503A]">
                {product.category === "single"
                  ? "Pokémon Single"
                  : "Sealed Product"}
              </span>
              <h1 className="mt-1 text-4xl font-black text-[#0F1F3D] leading-tight">
                {product.name}
              </h1>
              <p className="mt-2 text-stone-400 font-medium">
                {product.set} • {product.rarity}
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${typeColor}`}
              >
                {product.type}
              </span>
              <span className="rounded-full bg-[#EEF2F9] px-3 py-1 text-xs font-bold text-[#1B3A6B]">
                {product.condition}
              </span>
              <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-600">
                {product.quantity} available
              </span>
            </div>

            {/* Pricing */}
            <div className="rounded-2xl bg-[#FAFAF7] border border-stone-100 p-5 space-y-3">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                    Our Price
                  </p>
                  <p className="text-5xl font-black text-[#0F1F3D] leading-none">
                    {currency.format(product.shopPrice)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                    Market
                  </p>
                  <p className="text-lg text-stone-400 line-through">
                    {currency.format(product.marketPrice)}
                  </p>
                </div>
              </div>
              {savings > 0 && (
                <div className="flex items-center gap-2 rounded-xl bg-[#FDECEA] px-4 py-2">
                  <Tag className="h-4 w-4 text-[#E8503A]" />
                  <p className="text-sm font-bold text-[#E8503A]">
                    You save {currency.format(savings)} ({savingsPercent}% below
                    market)
                  </p>
                </div>
              )}
            </div>

            {/* CTA buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => addToCart(product)}
                className="rounded-xl bg-[#E8503A] py-4 text-sm font-bold text-white hover:bg-[#C73E2A] transition shadow-sm"
              >
                Add to Cart
              </button>
              <button
                onClick={() => router.back()}
                className="rounded-xl border-2 border-[#1B3A6B] py-4 text-sm font-bold text-[#1B3A6B] hover:bg-[#EEF2F9] transition"
              >
                Back
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-[#EEF2F9] px-4 py-3">
                <ShieldCheck className="h-5 w-5 text-[#1B3A6B] shrink-0" />
                <p className="text-xs font-semibold text-[#1B3A6B]">
                  Condition verified in store
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-[#FEF6E0] px-4 py-3">
                <Zap className="h-5 w-5 text-[#C68F0A] shrink-0" />
                <p className="text-xs font-semibold text-[#C68F0A]">
                  Same-day pickup available
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar items */}
      {similarItems.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8">
          <h2 className="text-2xl font-black text-[#0F1F3D] mb-6">
            You might also like
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similarItems.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={addToCart}
                onView={(p) => router.push(`/product/${p.id}`)}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

"use client";

import { useMemo, useState } from "react";
import { initialProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

export default function SinglesPage() {
  const [query, setQuery] = useState("");
  const [setFilter, setSetFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [rarityFilter, setRarityFilter] = useState("All");
  const [conditionFilter, setConditionFilter] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const { addToCart } = useCart();
  const router = useRouter();

  const singles = initialProducts.filter(
    (p) => p.category === "sealed" && p.quantity > 0,
  );

  const sets = ["All", ...new Set(singles.map((p) => p.set))];
  const types = ["All", ...new Set(singles.map((p) => p.type))];
  const rarities = ["All", ...new Set(singles.map((p) => p.rarity))];
  const conditions = ["All", ...new Set(singles.map((p) => p.condition))];

  const filtered = useMemo(() => {
    let results = singles.filter((p) => {
      if (query && !p.name.toLowerCase().includes(query.toLowerCase()))
        return false;
      if (setFilter !== "All" && p.set !== setFilter) return false;
      if (typeFilter !== "All" && p.type !== typeFilter) return false;
      if (rarityFilter !== "All" && p.rarity !== rarityFilter) return false;
      if (conditionFilter !== "All" && p.condition !== conditionFilter)
        return false;
      return true;
    });

    switch (sortBy) {
      case "featured":
        return [...results].sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
        );
      case "price-asc":
        return [...results].sort((a, b) => a.shopPrice - b.shopPrice);
      case "price-desc":
        return [...results].sort((a, b) => b.shopPrice - a.shopPrice);
      case "name-asc":
        return [...results].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...results].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return results;
    }
  }, [query, setFilter, typeFilter, rarityFilter, conditionFilter, sortBy]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 min-h-screen bg-[#FAFAF7]">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Sidebar filters */}
        <aside className="h-fit rounded-2xl border border-stone-100 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-[#1B3A6B]" />
            <h2 className="font-bold text-[#0F1F3D]">Filters</h2>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sealed products"
                className="w-full rounded-xl border border-stone-200 py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-[#1B3A6B]/20"
              />
            </div>
            {[
              {
                label: "Set",
                options: sets,
                value: setFilter,
                setter: setSetFilter,
              },
              {
                label: "Type",
                options: types,
                value: typeFilter,
                setter: setTypeFilter,
              },
              {
                label: "Rarity",
                options: rarities,
                value: rarityFilter,
                setter: setRarityFilter,
              },
              {
                label: "Condition",
                options: conditions,
                value: conditionFilter,
                setter: setConditionFilter,
              },
            ].map(({ label, options, value, setter }) => (
              <label
                key={label}
                className="block text-sm font-semibold text-[#0F1F3D]"
              >
                {label}
                <select
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white p-2 text-sm font-normal outline-none focus:ring-2 focus:ring-[#1B3A6B]/20"
                >
                  {options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </aside>

        {/* Product grid */}
        <section>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-[#0F1F3D]">
                Sealed Pokémon Product
              </h1>
              <p className="mt-1 text-sm text-stone-400">
                {filtered.length} products found
              </p>
            </div>

            {/* Sort dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-[#0F1F3D] outline-none focus:ring-2 focus:ring-[#1B3A6B]/20"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
                onView={(p) => router.push(`/product/${p.id}`)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
              <p className="text-lg font-bold text-[#0F1F3D]">
                No products found
              </p>
              <p className="mt-2 text-sm text-stone-400">
                Try adjusting your filters
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

"use client";

import { useCart } from "@/context/CartContext";
import { currency } from "@/data/products";
import { Button } from "@/components/ui";
import { Plus, Minus, Trash2 } from "lucide-react";

export default function CartPage() {
  const { cart, cartTotal, updateCart, removeFromCart } = useCart();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 min-h-screen bg-stone-50">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="mb-6 text-3xl font-black">Cart</h1>
          {cart.length === 0 ? (
            <p className="text-stone-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-stone-200 p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-xl object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-stone-500">
                      {item.condition} • {item.set}
                    </p>
                    <p className="mt-2 font-bold">
                      {currency.format(item.shopPrice)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateCart(item.id, -1)}
                      className="rounded-lg border border-stone-200 p-1 hover:bg-stone-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-bold">
                      {item.cartQty}
                    </span>
                    <button
                      onClick={() => updateCart(item.id, 1)}
                      className="rounded-lg border border-stone-200 p-1 hover:bg-stone-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-lg p-1 text-rose-500 hover:bg-rose-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black">Order summary</h2>
          <div className="my-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{currency.format(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated tax</span>
              <span>Calculated later</span>
            </div>
            <div className="flex justify-between border-t border-stone-200 pt-3 text-lg font-black">
              <span>Total</span>
              <span>{currency.format(cartTotal)}</span>
            </div>
          </div>
          <div className="space-y-3">
            <button className="w-full rounded-xl bg-stone-900 py-4 text-white hover:bg-stone-800 font-semibold">
              Checkout
            </button>
            <button className="w-full rounded-xl border border-stone-300 py-4 text-stone-900 hover:bg-stone-100 font-semibold">
              Request local pickup
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

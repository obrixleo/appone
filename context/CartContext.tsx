"use client";

import { createContext, useContext, useState } from "react";
import { Product } from "@/types/product";

type CartItem = Product & {
  cartQty: number;
};

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product) => void;
  updateCart: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.shopPrice * item.cartQty,
    0,
  );
  const cartCount = cart.reduce((sum, item) => sum + item.cartQty, 0);

  function addToCart(product: Product) {
    setCart((items) => {
      const found = items.find((item) => item.id === product.id);
      if (found) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, cartQty: Math.min(item.cartQty + 1, product.quantity) }
            : item,
        );
      }
      return [...items, { ...product, cartQty: 1 }];
    });
  }

  function updateCart(id: string, delta: number) {
    setCart((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              cartQty: Math.max(
                1,
                Math.min(item.quantity, item.cartQty + delta),
              ),
            }
          : item,
      ),
    );
  }

  function removeFromCart(id: string) {
    setCart((items) => items.filter((item) => item.id !== id));
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        updateCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

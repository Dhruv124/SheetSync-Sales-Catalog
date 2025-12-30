'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/data/mockData';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  getTotalItems: () => number;
  getTotalAmount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((i) => i.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
      removeFromCart: (productId) =>
        set((state) => {
          const existing = state.cart.find((i) => i.id === productId);
          if (!existing) return state;
          if (existing.quantity > 1) {
            return {
              cart: state.cart.map((i) =>
                i.id === productId ? { ...i, quantity: i.quantity - 1 } : i,
              ),
            };
          }
          return { cart: state.cart.filter((i) => i.id !== productId) };
        }),
      clearCart: () => set({ cart: [] }),
      getItemQuantity: (productId) => {
        const item = get().cart.find((i) => i.id === productId);
        return item ? item.quantity : 0;
      },
      getTotalItems: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),
      getTotalAmount: () =>
        get().cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'casa-copenhagen-cart',
    },
  ),
);

'use client';

import type { Product } from '@/data/mockData';
import { useCartStore } from '@/store/cartStore';

export default function AddToOrderButton({ product }: { product: Product }) {
  const addToCart = useCartStore((s) => s.addToCart);

  return (
    <button
      onClick={() => addToCart(product)}
      className="w-full bg-casa-magenta text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors opacity-100"
    >
      Add to Order
    </button>
  );
}

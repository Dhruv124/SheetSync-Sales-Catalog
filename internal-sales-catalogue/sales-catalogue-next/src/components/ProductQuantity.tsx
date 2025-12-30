'use client';

import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/data/mockData';
import { useCartStore } from '@/store/cartStore';

export default function ProductQuantity({ product }: { product: Product }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const getItemQuantity = useCartStore((s) => s.getItemQuantity);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  
  const quantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setUpdateTrigger(prev => prev + 1);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
    setUpdateTrigger(prev => prev + 1);
  };

  return (
    <div className="flex items-center gap-4">
      {quantity === 0 ? (
        <button
          onClick={handleAddToCart}
          className="w-full bg-casa-magenta text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
        >
          Add to Order
        </button>
      ) : (
        <div className="flex items-center justify-between bg-gray-100 rounded-lg p-1 w-full">
          <button
            onClick={handleRemoveFromCart}
            className="p-2 bg-transparent text-onyx hover:bg-gray-200 rounded transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="font-semibold text-onyx px-4">{quantity}</span>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-transparent text-onyx hover:bg-gray-200 rounded transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Plus, Minus } from 'lucide-react';
import { Product } from '@/data/mockData';
import ProductImage from './ProductImage';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string) => void;
}

export default function ProductCard({ product, quantity, onAddToCart, onRemoveFromCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/product/${product.id}`} className="block">
        <div className="w-full aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <div className="relative w-full h-full">
              {/* Show first image as main */}
              <ProductImage
                src={product.images[0]}
                alt={product.name}
                width={1000}
                height={1000}
                className="w-full aspect-square object-cover"
              />
              {/* Show image count indicator */}
              {product.images.length > 1 && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  +{product.images.length - 1}
                </div>
              )}
            </div>
          ) : product.image ? (
            <ProductImage
              src={product.image}
              alt={product.name}
              width={1000}
              height={1000}
              className="w-full aspect-square object-cover"
            />
          ) : (
            <ProductImage
              src="/icons/icon-192x192.png"
              alt={product.name}
              width={1000}
              height={1000}
              className="w-full aspect-square object-cover opacity-50"
            />
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-bold text-onyx text-lg mb-1">{product.name}</h3>
        </Link>
        <p className="text-gray-500 text-sm mb-2">{product.size}</p>
        <p className="text-casa-magenta font-bold text-xl mb-4">₹{product.price}</p>
        
        {quantity === 0 ? (
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-casa-magenta text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors opacity-100"
          >
            ADD
          </button>
        ) : (
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onRemoveFromCart(product.id)}
              className="p-2 bg-transparent text-onyx hover:bg-gray-200 rounded transition-colors opacity-100"
            >
              <Minus size={16} />
            </button>
            <span className="font-semibold text-onyx">{quantity}</span>
            <button
              onClick={() => onAddToCart(product)}
              className="p-2 bg-transparent text-onyx hover:bg-gray-200 rounded transition-colors opacity-100"
            >
              <Plus size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import ProductQuantity from '@/components/ProductQuantity';
import ImageSlider from '@/components/ImageSlider';
import Header from '@/components/Header';
import type { Product } from '@/data/mockData';

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cartItemCount = useCartStore((s) => s.getTotalItems());

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { id } = await params;
        console.log(`Product ID requested: ${id}`);

        const response = await fetch(`/api/product/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Product not found');
          } else {
            setError('Failed to load product');
          }
          setLoading(false);
          return;
        }

        const productData = await response.json();
        setProduct(productData);
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-onyx mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-onyx mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-4">
            {error || 'The product you\'re looking for doesn\'t exist.'}
          </p>
          <Link href="/" className="inline-block bg-casa-magenta text-white px-6 py-2 rounded-lg">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header cartItemCount={cartItemCount} onCartClick={() => {}} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="w-full">
            {(() => {
              console.log('[ProductPage] Product images:', product.images, 'Product image:', product.image);
              return null;
            })()}
            <ImageSlider
              images={product.images && product.images.length > 0 ? product.images : product.image ? [product.image] : []}
              alt={product.name}
            />
          </div>

          <div className="w-full">
            <h1 className="text-3xl font-bold text-onyx mb-2">{product.name}</h1>
            <div className="text-gray-600 mb-2">{product.category}</div>
            {product.size ? <div className="text-gray-500 mb-4">{product.size}</div> : null}
            {product.description ? (
              <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
            ) : null}
            <div className="text-2xl font-bold text-casa-magenta mb-6">
              ₹{product.price}
            </div>

            <ProductQuantity product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

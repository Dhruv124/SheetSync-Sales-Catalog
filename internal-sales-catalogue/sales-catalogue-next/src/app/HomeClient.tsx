'use client';

import { useMemo, useState, useEffect } from 'react';
import Header from '@/components/Header';
import CategoryStrip from '@/components/CategoryStrip';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';
import type { Product } from '@/data/mockData';
import { useCartStore } from '@/store/cartStore';

export default function HomeClient({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const cart = useCartStore((s) => s.cart);
  const addToCart = useCartStore((s) => s.addToCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const clearCart = useCartStore((s) => s.clearCart);
  const getItemQuantity = useCartStore((s) => s.getItemQuantity);
  const cartItemCount = useCartStore((s) => s.getTotalItems());
  const [updateTrigger, setUpdateTrigger] = useState(0);

  // Debug logging for cart state changes
  useEffect(() => {
    console.log('[HomeClient] Cart updated:', {
      itemCount: cartItemCount,
      items: cart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity }))
    });
  }, [cart, cartItemCount]);

  // derive unique categories from products, ensure 'All' is first
  const dynamicCategories = useMemo<string[]>(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ['All', ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, products]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setUpdateTrigger(prev => prev + 1);
  };

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
    setUpdateTrigger(prev => prev + 1);
  };

  const handleCheckout = async (
    buyerDetails: { name: string; phone: string },
    salesperson: string,
  ) => {
    try {
      const response = await fetch('/api/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          buyerDetails,
          cartItems: cart,
          salesperson,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setOrderSuccess(true);
      } else {
        console.error('Failed to submit order:', result.message);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const closeCart = () => {
    setIsCartOpen(false);
    if (orderSuccess) {
      setOrderSuccess(false);
      clearCart();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />

      <CategoryStrip
        categories={dynamicCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const quantity = getItemQuantity(product.id);
            return (
            <ProductCard
              key={`${product.id}-${quantity}-${updateTrigger}`}
              product={product}
              quantity={quantity}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
            />
            );
          })}
        </div>
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckout={handleCheckout}
        orderSuccess={orderSuccess}
      />
    </div>
  );
}

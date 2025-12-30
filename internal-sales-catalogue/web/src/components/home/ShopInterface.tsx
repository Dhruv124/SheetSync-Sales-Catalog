"use client";

import { useState, useMemo } from "react";
import { Category, Product } from "@/types";
import StickyCategoryStrip from "@/components/layout/StickyCategoryStrip";
import HeroSection from "@/components/home/HeroSection";
import ProductCard from "@/components/product/ProductCard";
import BottomNav from "@/components/layout/BottomNav";
import ProductDetailView from "@/components/product/ProductDetailView";
import CartSheet from "@/components/cart/CartSheet";
import { AnimatePresence, motion } from "framer-motion";

interface ShopInterfaceProps {
    categories: Category[];
    products: Product[];
}

export default function ShopInterface({ categories, products }: ShopInterfaceProps) {
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Filter products based on active category
    const filteredProducts = useMemo(() => {
        if (!activeCategoryId) return products;
        return products.filter((p) => p.category_id === activeCategoryId);
    }, [activeCategoryId, products]);

    // Handle category selection
    const handleCategorySelect = (id: string | null) => {
        setActiveCategoryId(id);
        // Optional: Scroll to grid top
        const grid = document.getElementById('product-grid');
        if (grid) {
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="min-h-screen bg-background pb-20 md:pb-0">

            {/* Hero Section */}
            <HeroSection />

            {/* Sticky Navigation (Desktop & Mobile) */}
            <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-gray-800 py-4">
                <div className="max-w-7xl mx-auto px-4 md:px-6 overflow-x-auto no-scrollbar scroll-smooth">
                    <div className="flex items-center gap-6 md:gap-8">
                        <button
                            onClick={() => handleCategorySelect(null)}
                            className={`whitespace-nowrap uppercase tracking-widest text-xs md:text-sm font-medium transition-colors ${activeCategoryId === null ? "text-gold" : "text-gray-400 hover:text-gold"
                                }`}
                        >
                            All Products
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategorySelect(category.id)}
                                className={`whitespace-nowrap uppercase tracking-widest text-xs md:text-sm font-medium transition-colors ${activeCategoryId === category.id ? "text-gold" : "text-gray-400 hover:text-gold"
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                    <div className="ml-auto pl-8 border-l border-gray-800 hidden md:block">
                        <CartSheet />
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <main id="product-grid" className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={setSelectedProduct}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 uppercase tracking-widest">No products found in this category.</p>
                    </div>
                )}
            </main>

            {/* Product Detail View (Responsive Modal/Drawer) */}
            <ProductDetailView
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />

        </div>
    );
}

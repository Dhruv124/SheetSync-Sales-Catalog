"use client";

import { useState } from "react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CartSheet from "@/components/cart/CartSheet";

export default function ProductPageContent({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        // We add the item 'quantity' times
        for (let i = 0; i < quantity; i++) {
            addItem(product);
        }
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-gray-800 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href={`/category/${product.category_id}`} className="text-gray-400 hover:text-white">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-xl font-serif text-white uppercase tracking-widest truncate max-w-[200px] md:max-w-md">
                        {product.name}
                    </h1>
                </div>
                <CartSheet />
            </header>

            <main className="max-w-6xl mx-auto p-4 md:p-8">
                <div className="flex flex-col md:flex-row gap-8 lg:gap-16">

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 aspect-[3/4] relative bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                        {product.image_url ? (
                            <Image
                                src={product.image_url}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-700 uppercase tracking-widest">
                                No Image Available
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="w-full md:w-1/2 space-y-8 py-4">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 leading-tight">
                                {product.name}
                            </h2>
                            <p className="text-2xl md:text-3xl text-gold font-mono">
                                ${product.price.toLocaleString()}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-gray-500 text-sm uppercase tracking-widest font-bold">Description</h3>
                            <p className="text-gray-300 leading-relaxed font-light text-lg">
                                {product.description || "A premium offering from our internal collection. Experience quality and exclusivity."}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="pt-8 border-t border-gray-800 space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center border border-gray-700 rounded-none bg-onyx">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-12 text-center font-mono text-lg">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <span className="text-gray-500 text-sm uppercase tracking-wider">
                                    {product.in_stock ? "In Stock" : "Out of Stock"}
                                </span>
                            </div>

                            <Button
                                onClick={handleAddToCart}
                                disabled={!product.in_stock}
                                className={`w-full h-16 text-lg tracking-widest uppercase font-bold rounded-none transition-all duration-300 ${isAdded
                                        ? "bg-green-600 hover:bg-green-700 text-white"
                                        : "bg-gold hover:bg-gold-light text-black"
                                    }`}
                            >
                                {isAdded ? (
                                    <span className="flex items-center gap-3">
                                        <Check size={24} /> Added to Cart
                                    </span>
                                ) : !product.in_stock ? (
                                    "Sold Out"
                                ) : (
                                    "Add to Cart"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

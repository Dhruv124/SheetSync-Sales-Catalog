import { Category } from "@/types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import CartSheet from "@/components/cart/CartSheet";

interface StickyCategoryStripProps {
    categories: Category[];
}

export default function StickyCategoryStrip({ categories }: StickyCategoryStripProps) {
    const [activeId, setActiveId] = useState<string | null>(null);

    return (
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-gray-800 py-4 hidden md:block">
            <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-8">
                    <button
                        onClick={() => setActiveId(null)}
                        className={cn(
                            "whitespace-nowrap uppercase tracking-widest text-sm font-medium transition-colors hover:text-gold",
                            activeId === null ? "text-gold" : "text-gray-400"
                        )}
                    >
                        All Products
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveId(category.id)}
                            className={cn(
                                "whitespace-nowrap uppercase tracking-widest text-sm font-medium transition-colors hover:text-gold",
                                activeId === category.id ? "text-gold" : "text-gray-400"
                            )}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

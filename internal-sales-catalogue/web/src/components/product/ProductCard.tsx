"use client";

import { Product } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProductCardProps {
    product: Product;
    onClick?: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -5 }}
            onClick={() => onClick?.(product)}
            className="group cursor-pointer bg-onyx-dark/50 border border-gray-800 hover:border-gold/50 transition-colors duration-300"
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
                {/* Image Placeholder if url is missing/broken - In real app use specific placeholder */}
                {product.image_url ? (
                    <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700 text-xs uppercase tracking-widest">
                        No Image
                    </div>
                )}

                {!product.in_stock && (
                    <div className="absolute top-2 right-2 bg-red-900/80 text-white text-[10px] px-2 py-1 uppercase tracking-widest font-bold">
                        Sold Out
                    </div>
                )}
            </div>

            <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                    <h3 className="text-gray-200 font-serif text-lg leading-tight group-hover:text-gold transition-colors">
                        {product.name}
                    </h3>
                    <span className="text-gold font-mono text-sm">
                        ${product.price.toLocaleString()}
                    </span>
                </div>
                <p className="text-gray-500 text-xs line-clamp-2 font-light">
                    {product.description}
                </p>
            </div>
        </motion.div>
    );
}

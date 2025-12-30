"use client";

import { Product } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import { useState } from "react";
import { Check } from "lucide-react";

interface ProductDetailViewProps {
    product: Product | null;
    onClose: () => void;
}

export default function ProductDetailView({ product, onClose }: ProductDetailViewProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const addItem = useCartStore((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);

    if (!product) return null;

    const handleAddToCart = () => {
        addItem(product);
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
            onClose();
        }, 1000); // Close after 1s feedback
    };

    const Content = (
        <div className="flex flex-col md:flex-row gap-6 p-4 md:p-0">
            <div className="relative w-full md:w-1/2 aspect-[3/4] bg-gray-900 overflow-hidden rounded-md border border-gray-800">
                {product.image_url ? (
                    <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700">No Image</div>
                )}
            </div>

            <div className="w-full md:w-1/2 space-y-6 flex flex-col justify-center">
                <div>
                    <h2 className="text-2xl md:text-3xl font-serif text-white mb-2">{product.name}</h2>
                    <p className="text-gold text-xl font-mono">${product.price.toLocaleString()}</p>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed">
                    {product.description || "No description available for this premium item."}
                </p>

                <div className="pt-4">
                    <Button
                        onClick={handleAddToCart}
                        disabled={!product.in_stock || isAdded}
                        className={`w-full h-12 rounded-none tracking-widest text-xs uppercase font-bold transition-all duration-300 ${isAdded
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : "bg-gold hover:bg-gold-light text-black hover:text-black"
                            }`}
                    >
                        {isAdded ? (
                            <span className="flex items-center gap-2">
                                <Check size={16} /> Added to Cart
                            </span>
                        ) : !product.in_stock ? (
                            "Out of Stock"
                        ) : (
                            "Add to Cart"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );

    if (isDesktop) {
        return (
            <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
                <DialogContent className="max-w-4xl bg-onyx border-gray-800 text-white p-6">
                    <DialogHeader className="sr-only">
                        <DialogTitle>{product.name}</DialogTitle>
                        <DialogDescription>Product Details</DialogDescription>
                    </DialogHeader>
                    {Content}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={!!product} onOpenChange={(open) => !open && onClose()}>
            <DrawerContent className="bg-onyx border-gray-800 text-white max-h-[90vh]">
                <DrawerHeader className="sr-only">
                    <DrawerTitle>{product.name}</DrawerTitle>
                    <DrawerDescription>Product Details</DrawerDescription>
                </DrawerHeader>
                <div className="overflow-y-auto">
                    {Content}
                </div>
                <DrawerFooter className="pt-2">
                    {/* Footer content if needed */}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

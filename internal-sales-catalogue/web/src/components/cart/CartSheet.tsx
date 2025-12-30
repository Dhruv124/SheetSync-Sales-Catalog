"use client";

import { useCartStore } from "@/store/cart-store";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function CartSheet() {
    const { items, removeItem, total, clearCart } = useCartStore();
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [clientName, setClientName] = useState("");
    const [formattedPhone, setFormattedPhone] = useState("");

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        if (items.length === 0) return;

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/submit-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_name: clientName,
                    phone: formattedPhone,
                    items_json: JSON.stringify(items.map(i => ({ id: i.id, name: i.name, qty: i.quantity }))),
                    total_amount: total(),
                }),
            });

            if (response.ok) {
                clearCart();
                setIsOpen(false);
                // Maybe show success toast
                alert("Order Submitted Successfully!");
            } else {
                alert("Failed to submit order.");
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting order.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <button className="relative p-2 text-gray-400 hover:text-gold transition-colors">
                    <ShoppingBag size={20} />
                    {items.length > 0 && (
                        <span className="absolute top-0 right-0 w-4 h-4 bg-gold text-black text-[10px] font-bold flex items-center justify-center rounded-full">
                            {items.length}
                        </span>
                    )}
                </button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md bg-onyx border-l border-gray-800 text-white flex flex-col h-full">
                <SheetHeader>
                    <SheetTitle className="text-gold font-serif text-2xl tracking-widest uppercase">Your Cart</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-6 space-y-6">
                    {items.length === 0 ? (
                        <p className="text-gray-500 text-center uppercase tracking-widest mt-10">Cart is empty</p>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="relative w-16 h-20 bg-gray-900 rounded overflow-hidden flex-shrink-0">
                                    {item.image_url && <Image src={item.image_url} alt={item.name} fill className="object-cover" />}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-gray-200 line-clamp-1">{item.name}</h4>
                                    <p className="text-gold text-sm font-mono">${item.price}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                                    </div>
                                </div>
                                <button onClick={() => removeItem(item.id)} className="text-gray-600 hover:text-red-500 self-start">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t border-gray-800 pt-6 space-y-6">
                        <div className="flex justify-between items-center text-lg font-serif">
                            <span>Total</span>
                            <span className="text-gold">${total().toLocaleString()}</span>
                        </div>

                        <form onSubmit={handleCheckout} className="space-y-4">
                            <Input
                                placeholder="Client Name"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                required
                                className="bg-gray-900 border-gray-700 text-white focus:border-gold"
                            />
                            <Input
                                placeholder="Phone Number"
                                value={formattedPhone}
                                onChange={(e) => setFormattedPhone(e.target.value)}
                                required
                                className="bg-gray-900 border-gray-700 text-white focus:border-gold"
                            />
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gold hover:bg-gold-light text-black font-bold tracking-widest h-12 rounded-none"
                            >
                                {isSubmitting ? "Submitting..." : "SUBMIT ORDER"}
                            </Button>
                        </form>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}

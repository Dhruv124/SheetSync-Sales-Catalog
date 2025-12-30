"use client";

import { Home, Menu } from "lucide-react";
import Link from "next/link";
import CartSheet from "@/components/cart/CartSheet";

export default function BottomNav() {
    return (
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-onyx border-t border-gray-800 flex items-center justify-around z-40 md:hidden">
            <Link href="/" className="flex flex-col items-center justify-center text-gray-400 active:text-gold transition-colors">
                <Home size={20} />
                <span className="text-[10px] uppercase tracking-wider mt-1">Home</span>
            </Link>

            <Link href="/categories" className="flex flex-col items-center justify-center text-gray-400 active:text-gold transition-colors">
                <Menu size={20} />
                <span className="text-[10px] uppercase tracking-wider mt-1">Menu</span>
            </Link>

            <div className="flex flex-col items-center justify-center text-gray-400 active:text-gold transition-colors">
                <CartSheet />
                <span className="text-[10px] uppercase tracking-wider mt-[-8px] pointer-events-none">Cart</span>
            </div>
        </div>
    );
}

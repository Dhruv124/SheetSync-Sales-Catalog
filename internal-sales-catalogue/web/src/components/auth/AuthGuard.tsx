"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CORRECT_PIN = "9999";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        // Optional: Check local storage for persistent auth
        const storedAuth = localStorage.getItem("sales_auth");
        if (storedAuth === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === CORRECT_PIN) {
            setIsAuthenticated(true);
            localStorage.setItem("sales_auth", "true");
        } else {
            setError(true);
            setPin("");
        }
    };

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="fixed inset-0 bg-onyx flex items-center justify-center z-50 text-white font-serif">
            <div className="w-full max-w-sm p-6 text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-3xl tracking-widest text-gold mb-2">ONYX</h1>
                    <p className="text-gray-400 text-sm tracking-widest uppercase">Internal Sales</p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Input
                            type="password"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={pin}
                            onChange={(e) => {
                                setPin(e.target.value);
                                setError(false);
                            }}
                            placeholder="ENTER PIN"
                            className="bg-transparent border-b border-gray-700 rounded-none text-center text-2xl tracking-[1em] h-14 focus:border-gold transition-colors focus:ring-0 placeholder:text-gray-800"
                            maxLength={4}
                            autoFocus
                        />
                        <AnimatePresence>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-red-500 text-xs tracking-wider"
                                >
                                    ACCESS DENIED
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gold hover:bg-gold-dark text-black font-semibold tracking-widest py-6 rounded-none transition-all duration-300"
                        disabled={pin.length < 4}
                    >
                        UNLOCK
                    </Button>
                </form>
            </div>
        </div>
    );
}

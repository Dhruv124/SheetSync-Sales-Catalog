"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden flex items-center justify-center bg-onyx-dark">
            {/* Background Image Placeholder or Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-onyx-light to-onyx-dark opacity-50" />

            {/* Cinematic Text */}
            <div className="relative z-10 text-center space-y-6 px-4">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gold uppercase tracking-[0.3em] text-sm md:text-base font-medium"
                >
                    Internal Collection 2024
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-5xl md:text-8xl font-serif text-white tracking-wide"
                >
                    ONYX & GOLD
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-400 max-w-lg mx-auto text-sm md:text-lg font-light leading-relaxed"
                >
                    A curated selection of premium products, exclusively available for internal sales.
                </motion.p>
            </div>
        </section>
    );
}

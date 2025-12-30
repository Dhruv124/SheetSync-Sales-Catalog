import { getCategories } from "@/lib/google-sheets";
import Link from "next/link";
import AuthGuard from "@/components/auth/AuthGuard";
import BottomNav from "@/components/layout/BottomNav";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const revalidate = 300;

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <AuthGuard>
            <div className="min-h-screen bg-background pb-20">
                <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-gray-800 p-4 flex items-center gap-4">
                    <Link href="/" className="text-gray-400 hover:text-white">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-xl font-serif text-white uppercase tracking-widest">Menu</h1>
                </header>

                <main className="p-4 md:p-8 max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/category/${category.id}`}
                                className="group relative h-48 md:h-64 overflow-hidden rounded-lg border border-gray-800"
                            >
                                {/* Placeholder or actual image */}
                                <div className="absolute inset-0 bg-onyx-light transition-transform duration-700 group-hover:scale-105">
                                    {category.image_url && (
                                        <Image
                                            src={category.image_url}
                                            alt={category.name}
                                            fill
                                            className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                                        />
                                    )}
                                </div>

                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                                    <h2 className="text-2xl font-serif text-white uppercase tracking-widest border-b-2 border-transparent group-hover:border-gold pb-1 transition-all">
                                        {category.name}
                                    </h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                </main>

                <BottomNav />
            </div>
        </AuthGuard>
    );
}

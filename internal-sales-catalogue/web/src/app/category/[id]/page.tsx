import { getCategories, getProducts } from "@/lib/google-sheets";
import AuthGuard from "@/components/auth/AuthGuard";
import BottomNav from "@/components/layout/BottomNav";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CartSheet from "@/components/cart/CartSheet";

// Generate static params for all known categories (optional but good for performance)
export async function generateStaticParams() {
    const categories = await getCategories();
    return categories.map((cat) => ({
        id: cat.id,
    }));
}

export const revalidate = 300;

export default async function CategoryPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const [categories, products] = await Promise.all([
        getCategories(),
        getProducts()
    ]);

    const category = categories.find(c => c.id === id);
    const categoryProducts = products.filter(p => p.category_id === id);

    return (
        <AuthGuard>
            <div className="min-h-screen bg-background pb-20">
                <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-gray-800 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/categories" className="text-gray-400 hover:text-white">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-xl font-serif text-white uppercase tracking-widest">
                            {category?.name || "Category"}
                        </h1>
                    </div>
                    <CartSheet />
                </header>

                <main className="p-4 md:p-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {categoryProducts.map((product) => (
                            <Link key={product.id} href={`/product/${product.id}`} className="block">
                                <ProductCard
                                    product={product}
                                    onClick={(p) => { }} // Pass empty fn since we use Link wrapper
                                />
                            </Link>
                        ))}
                    </div>

                    {categoryProducts.length === 0 && (
                        <div className="text-center py-20 text-gray-500 uppercase tracking-widest">
                            No products found.
                        </div>
                    )}
                </main>

                <BottomNav />
            </div>
        </AuthGuard>
    );
}

import { getProducts } from "@/lib/google-sheets";
import AuthGuard from "@/components/auth/AuthGuard";
import ProductPageContent from "@/components/product/ProductPageContent";
import BottomNav from "@/components/layout/BottomNav";
import { notFound } from "next/navigation";

// Optional: Generate static params for known products
export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((p) => ({
        id: p.id,
    }));
}

export const revalidate = 300;

export default async function ProductPage({ params }: { params: { id: string } }) {
    const products = await getProducts();
    const product = products.find((p) => p.id === params.id);

    if (!product) {
        notFound();
    }

    return (
        <AuthGuard>
            <ProductPageContent product={product} />
            <BottomNav />
        </AuthGuard>
    );
}

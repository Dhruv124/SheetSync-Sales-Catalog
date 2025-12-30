import { getCategories, getProducts } from '@/lib/google-sheets';
import AuthGuard from '@/components/auth/AuthGuard';
import ShopInterface from '@/components/home/ShopInterface';

export const revalidate = 300; // Revalidate every 5 minutes

export default async function Home() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts()
  ]);

  return (
    <AuthGuard>
      <ShopInterface categories={categories} products={products} />
    </AuthGuard>
  );
}

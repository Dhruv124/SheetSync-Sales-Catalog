import HomeClient from '@/app/HomeClient';
import { mockProducts } from '@/data/mockData';

export default async function Home() {
  let products = mockProducts;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`);
    if (response.ok) {
      products = await response.json();
    } else {
      console.error('[page] Failed to fetch products from API. Falling back to mock data.');
    }
  } catch (e) {
    console.error('[page] Failed to load products from API. Falling back to mock data.', e);
  }

  return <HomeClient products={products} />;
}

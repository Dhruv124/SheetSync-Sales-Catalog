import { NextResponse } from 'next/server';
import { getProductsFromSheet } from '@/lib/google-sheets';

export async function GET() {
  try {
    console.log('API: Fetching all products');
    const products = await getProductsFromSheet();
    return NextResponse.json(products);
  } catch (error) {
    console.error('API: Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

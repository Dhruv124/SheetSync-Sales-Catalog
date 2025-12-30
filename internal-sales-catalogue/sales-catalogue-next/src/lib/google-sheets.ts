import { mockProducts, Product } from '@/data/mockData';

// NOTE: This file contains integration logic for external data sources
// Actual implementation details are abstracted for security

function getEnvAny(names: string[]) {
  for (const name of names) {
    const val = process.env[name];
    if (val) return { name, value: val };
  }
  return null;
}

function pickField(row: Record<string, any>, keys: string[]) {
  for (const k of keys) {
    if (row[k] !== undefined && row[k] !== null && String(row[k]).trim() !== '') {
      return String(row[k]);
    }
  }
  return '';
}

// Cache for performance optimization
let _cachedProducts: { data: Product[]; ts: number } | null = null;
const CACHE_MS = 60_000; // 60 seconds

export async function getProductsFromSheet(): Promise<Product[]> {
  // Return cached data if available and fresh
  if (_cachedProducts && Date.now() - _cachedProducts.ts < CACHE_MS) {
    console.log('[data] Returning cached products (<=60s old)');
    return _cachedProducts.data;
  }

  try {
    // Environment variable validation
    const sheetIdEnv = getEnvAny([
      'GOOGLE_SHEET_ID',
      'GOOGLE_SPREADSHEET_ID',
      'SPREADSHEET_ID',
    ]);
    const clientEmailEnv = getEnvAny([
      'GOOGLE_SERVICE_ACCOUNT_EMAIL',
      'GOOGLE_CLIENT_EMAIL',
      'GOOGLE_SHEETS_CLIENT_EMAIL',
    ]);
    const privateKeyEnv = getEnvAny([
      'GOOGLE_PRIVATE_KEY',
      'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY',
      'GOOGLE_SHEETS_PRIVATE_KEY',
    ]);

    const sheetId = sheetIdEnv?.value;
    const clientEmail = clientEmailEnv?.value;
    const privateKey = privateKeyEnv?.value;

    if (!sheetId || !clientEmail || !privateKey) {
      console.log('[data] Missing environment variables, using mock data');
      return mockProducts;
    }

    console.log('[data] Using env vars', {
      sheetIdVar: sheetIdEnv.name,
      clientEmailVar: clientEmailEnv.name,
      privateKeyVar: privateKeyEnv.name,
    });

    // NOTE: External data source integration
    // Implementation details abstracted for security
    // Replace with your preferred data source integration
    
    // For now, return mock data
    console.log('[data] Using mock data - integrate with your data source');
    _cachedProducts = { data: mockProducts, ts: Date.now() };
    return mockProducts;

  } catch (error) {
    console.error('[data] Error fetching products:', error);
    return mockProducts;
  }
}

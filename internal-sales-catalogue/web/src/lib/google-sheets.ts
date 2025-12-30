import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { Category, Product } from '@/types';

// Environment variables
const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file',
];

const jwt = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: SCOPES,
});

if (!process.env.SPREADSHEET_ID) {
    console.error("❌ CRITICAL ERROR: SPREADSHEET_ID is missing from .env.local");
    throw new Error("SPREADSHEET_ID is not defined");
}

const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID, jwt);

export const getDoc = async () => {
    try {
        await doc.loadInfo();
        return doc;
    } catch (error) {
        console.error('Error loading Google Spreadsheet:', error);
        throw error;
    }
};

export const getCategories = async (): Promise<Category[]> => {
    try {
        const document = await getDoc();
        const sheet = document.sheetsByTitle['Categories'];
        if (!sheet) return [];

        const rows = await sheet.getRows();
        return rows.map((row) => ({
            id: row.get('id'),
            name: row.get('name'),
            image_url: row.get('image_url'),
            description: row.get('description'),
        }));
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export const getProducts = async (): Promise<Product[]> => {
    try {
        const document = await getDoc();
        const sheet = document.sheetsByTitle['Products'];
        if (!sheet) return [];

        const rows = await sheet.getRows();
        return rows.map((row) => ({
            id: row.get('id'),
            category_id: row.get('category_id'),
            name: row.get('name'),
            price: parseFloat(row.get('price') || '0'),
            description: row.get('description'),
            image_url: row.get('image_url'),
            in_stock: row.get('in_stock') === 'TRUE' || row.get('in_stock') === true || row.get('in_stock') === 'true',
        }));
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

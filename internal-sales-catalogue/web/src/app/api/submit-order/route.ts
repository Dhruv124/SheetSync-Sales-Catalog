import { getDoc } from "@/lib/google-sheets";
import { Order } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { client_name, phone, items_json, total_amount } = body;

        const doc = await getDoc();
        // Assuming a sheet named 'Orders' exists. If not, maybe create one or use the first one.
        // The requirement said "Orders" sheet.
        let sheet = doc.sheetsByTitle['Orders'];
        if (!sheet) {
            // Fallback: Create sheet or use first one? User said "Orders" exists in structure.
            // We'll try to add it if missing or just use first one if we want to be safe, but adhering to spec:
            sheet = await doc.addSheet({ title: 'Orders', headerValues: ['date', 'client_name', 'phone', 'items_json', 'total_amount'] });
        }

        const order: Order = {
            date: new Date().toISOString(),
            client_name,
            phone,
            items_json,
            total_amount
        };

        await sheet.addRow(order as any);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Order submission error:", error);
        return NextResponse.json({ success: false, error: "Failed to save order" }, { status: 500 });
    }
}

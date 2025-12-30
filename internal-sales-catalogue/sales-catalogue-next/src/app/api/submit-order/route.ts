import { NextRequest, NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export const runtime = "nodejs";
// Prevent Vercel serverless timeout for heavy google-spreadsheet calls
export const maxDuration = 60;

type CartItem = {
  id: string;
  name: string;
  category?: string;
  size?: string;
  price: number;
  image?: string;
  quantity: number;
};

type RequestBody = {
  buyerDetails: { name: string; phone: string };
  cartItems: CartItem[];
  salesperson?: string;
};

const ORDERS_HEADERS = [
  "Date",
  "Time",
  "Salesperson",
  "Buyer Name",
  "Phone",
  "Items",
  "Quantities",
  "Price",
  "Total",
] as const;

function getEnvAny(names: string[]) {
  for (const name of names) {
    const val = process.env[name];
    if (val) return { name, value: val };
  }
  return null;
}

function normalizePrivateKey(key: string) {
  // in .env files the key is usually stored with literal \n
  return key.replace(/\\n/g, "\n");
}

export async function POST(request: NextRequest) {
  console.log("[submit-order] POST called");

  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
    console.log("[submit-order] Parsed body", {
      buyerName: body?.buyerDetails?.name,
      buyerPhone: body?.buyerDetails?.phone,
      salesperson: body?.salesperson,
      cartCount: body?.cartItems?.length,
    });
  } catch (e) {
    console.error("[submit-order] Invalid JSON body", e);
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400 },
    );
  }

  const sheetIdEnv = getEnvAny([
    "GOOGLE_SHEET_ID",
    "GOOGLE_SPREADSHEET_ID",
    "SPREADSHEET_ID",
  ]);
  const clientEmailEnv = getEnvAny([
    "GOOGLE_SERVICE_ACCOUNT_EMAIL",
    "GOOGLE_CLIENT_EMAIL",
    "GOOGLE_SHEETS_CLIENT_EMAIL",
  ]);
  const privateKeyEnv = getEnvAny([
    "GOOGLE_PRIVATE_KEY",
    "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY",
    "GOOGLE_SHEETS_PRIVATE_KEY",
  ]);

  const sheetId = sheetIdEnv?.value ?? null;
  const clientEmail = clientEmailEnv?.value ?? null;
  const privateKeyRaw = privateKeyEnv?.value ?? null;

  console.log("[submit-order] Env check", {
    sheetIdVar: sheetIdEnv?.name ?? null,
    clientEmailVar: clientEmailEnv?.name ?? null,
    privateKeyVar: privateKeyEnv?.name ?? null,
  });

  if (!sheetId || !clientEmail || !privateKeyRaw) {
    console.warn("[submit-order] Missing env - running in Mock Mode", {
      hasSheetId: Boolean(sheetId),
      hasClientEmail: Boolean(clientEmail),
      hasPrivateKey: Boolean(privateKeyRaw),
    });

    return NextResponse.json({
      success: true,
      message: "Success (Mock Mode)",
    });
  }

  const now = new Date();
  const date = now.toLocaleDateString("en-GB");
  const time = now.toLocaleTimeString("en-GB");

  const productNames = (body.cartItems ?? []).map((i) => i.name).join(", ");
  const quantities = (body.cartItems ?? []).map((i) => String(i.quantity)).join(", ");
  const pricePerPiece = (body.cartItems ?? []).map((i) => String(i.price)).join(", ");
  const totalAmount = (body.cartItems ?? []).reduce(
    (sum, i) => sum + Number(i.price) * Number(i.quantity),
    0,
  );

  const rowPayload: Record<(typeof ORDERS_HEADERS)[number], string> = {
    "Date": date,
    "Time": time,
    "Salesperson": body.salesperson || "",
    "Buyer Name": body.buyerDetails?.name || "",
    "Phone": body.buyerDetails?.phone || "",
    "Items": productNames,
    "Quantities": quantities,
    "Price": pricePerPiece,
    "Total": totalAmount.toFixed(2),
  };

  console.log("[submit-order] Prepared row payload", rowPayload);

  try {
    console.log("[submit-order] Creating JWT auth...");
    const serviceAccountAuth = new JWT({
      email: clientEmail,
      key: normalizePrivateKey(privateKeyRaw),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    console.log("Auth Success");

    console.log("[submit-order] Creating GoogleSpreadsheet doc...");
    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);

    console.log("[submit-order] Loading sheet info...");
    await doc.loadInfo();
    console.log("[submit-order] Sheet loaded", {
      title: doc.title,
      sheetCount: doc.sheetCount,
    });

    let sheet = doc.sheetsByTitle["Orders"];

    if (!sheet) {
      console.warn("[submit-order] Orders tab missing - creating it");
      sheet = await doc.addSheet({
        title: "Orders",
        headerValues: [...ORDERS_HEADERS],
      });
      console.log("[submit-order] Orders tab created", {
        sheetId: sheet.sheetId,
        title: sheet.title,
      });
    } else {
      console.log("[submit-order] Orders tab found", {
        sheetId: sheet.sheetId,
        title: sheet.title,
      });

      // Ensure headers exist. If sheet is empty and has no headers, add them.
      try {
        await sheet.loadHeaderRow();
        const currentHeaders = sheet.headerValues || [];
        if (!currentHeaders.length) {
          console.warn("[submit-order] Orders tab has no headers - setting headers");
          await sheet.setHeaderRow([...ORDERS_HEADERS]);
          console.log("[submit-order] Headers set successfully");
        } else {
          console.log("[submit-order] Existing headers", currentHeaders);
        }
      } catch (e) {
        console.warn("[submit-order] Failed to load/set header row - setting headers", e);
        // Try to set headers anyway
        try {
          await sheet.setHeaderRow([...ORDERS_HEADERS]);
          console.log("[submit-order] Headers set after error");
        } catch (headerError) {
          console.error("[submit-order] Failed to set headers", headerError);
        }
      }
    }

    console.log("[submit-order] Adding row...");
    const addedRow = await sheet.addRow(rowPayload);

    console.log("Row Added");
    console.log("[submit-order] Row added successfully", {
      rowNumber: addedRow.rowNumber,
    });

    return NextResponse.json({
      success: true,
      message: "Order submitted successfully",
    });
  } catch (error) {
    console.error("[submit-order] Failed to write order", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit order to Google Sheet",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

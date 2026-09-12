import { NextResponse, type NextRequest } from "next/server";
import { isAuthenticatedAdminRequest } from "@/lib/auth/verifyAdminRequest";
import { createAdminClient } from "@/lib/supabase/admin";
import { mapRowToProduct, mapProductInputToRow, type ProductRow } from "@/lib/data/products.repo";
import type { ProductInput } from "@/types/product";

export async function GET(request: NextRequest) {
  if (!(await isAuthenticatedAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase isn't configured yet." }, { status: 500 });
  }

  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ products: (data as ProductRow[]).map(mapRowToProduct) });
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticatedAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase isn't configured yet." }, { status: 500 });
  }

  let input: ProductInput;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const row = mapProductInputToRow(input);
  const { data, error } = await supabase.from("products").insert(row).select("*").single();

  if (error) {
    const status = error.code === "23505" ? 409 : 500;
    const message = error.code === "23505" ? "A product with that slug or SKU already exists." : error.message;
    return NextResponse.json({ error: message }, { status });
  }

  return NextResponse.json({ product: mapRowToProduct(data as ProductRow) }, { status: 201 });
}

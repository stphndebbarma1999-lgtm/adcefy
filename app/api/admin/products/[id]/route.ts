import { NextResponse, type NextRequest } from "next/server";
import { isAuthenticatedAdminRequest } from "@/lib/auth/verifyAdminRequest";
import { createAdminClient } from "@/lib/supabase/admin";
import { mapRowToProduct, mapProductInputToRow, type ProductRow } from "@/lib/data/products.repo";
import type { Product } from "@/types/product";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticatedAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase isn't configured yet." }, { status: 500 });
  }

  const { id } = await params;
  let input: Partial<Product>;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const row = mapProductInputToRow(input);
  const { data, error } = await supabase.from("products").update(row).eq("id", id).select("*").single();

  if (error) {
    const status = error.code === "23505" ? 409 : error.code === "PGRST116" ? 404 : 500;
    const message = error.code === "23505" ? "A product with that slug or SKU already exists." : error.message;
    return NextResponse.json({ error: message }, { status });
  }

  return NextResponse.json({ product: mapRowToProduct(data as ProductRow) });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticatedAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase isn't configured yet." }, { status: 500 });
  }

  const { id } = await params;
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

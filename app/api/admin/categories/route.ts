import { NextResponse, type NextRequest } from "next/server";
import { isAuthenticatedAdminRequest } from "@/lib/auth/verifyAdminRequest";
import { createAdminClient } from "@/lib/supabase/admin";
import { mapRowToCategory, mapCategoryInputToRow, type CategoryRow } from "@/lib/data/categories.repo";
import type { Category } from "@/types/category";

export async function GET(request: NextRequest) {
  if (!(await isAuthenticatedAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase isn't configured yet." }, { status: 500 });
  }

  const { data, error } = await supabase.from("categories").select("*").order("sort_order", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ categories: (data as CategoryRow[]).map(mapRowToCategory) });
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticatedAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase isn't configured yet." }, { status: 500 });
  }

  let input: Omit<Category, "id">;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const row = mapCategoryInputToRow(input);
  const { data, error } = await supabase.from("categories").insert(row).select("*").single();

  if (error) {
    const status = error.code === "23505" ? 409 : 500;
    const message = error.code === "23505" ? "A category with that slug already exists." : error.message;
    return NextResponse.json({ error: message }, { status });
  }

  return NextResponse.json({ category: mapRowToCategory(data as CategoryRow) }, { status: 201 });
}

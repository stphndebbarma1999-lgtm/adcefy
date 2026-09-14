import { NextResponse, type NextRequest } from "next/server";
import { isAuthenticatedAdminRequest } from "@/lib/auth/verifyAdminRequest";
import { createAdminClient } from "@/lib/supabase/admin";
import { mapRowToBanner, mapBannerInputToRow, type BannerRow } from "@/lib/data/banners.repo";
import type { Banner } from "@/types/banner";

export async function GET(request: NextRequest) {
  if (!(await isAuthenticatedAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase isn't configured yet." }, { status: 500 });
  }

  const { data, error } = await supabase.from("banners").select("*").order("sort_order", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ banners: (data as BannerRow[]).map(mapRowToBanner) });
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticatedAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase isn't configured yet." }, { status: 500 });
  }

  let input: Omit<Banner, "id">;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const row = mapBannerInputToRow(input);
  const { data, error } = await supabase.from("banners").insert(row).select("*").single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ banner: mapRowToBanner(data as BannerRow) }, { status: 201 });
}

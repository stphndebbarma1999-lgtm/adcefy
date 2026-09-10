import type { Metadata } from "next";
import { CategoryPageContent, categoryMetadata, type SearchParams } from "@/components/category/CategoryPageContent";

export const metadata: Metadata = categoryMetadata("mobile");

export default async function MobilePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  return <CategoryPageContent categorySlug="mobile" searchParams={params} />;
}

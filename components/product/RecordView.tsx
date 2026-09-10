"use client";

import { useRecordRecentlyViewed } from "@/lib/hooks/useRecentlyViewed";

export function RecordView({ slug }: { slug: string }) {
  useRecordRecentlyViewed(slug);
  return null;
}

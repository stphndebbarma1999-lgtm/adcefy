"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "adcefy_recently_viewed";
const MAX_ITEMS = 8;

export function useRecordRecentlyViewed(slug: string) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const slugs: string[] = raw ? JSON.parse(raw) : [];
      const next = [slug, ...slugs.filter((s) => s !== slug)].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  }, [slug]);
}

export function useRecentlyViewedSlugs(excludeSlug?: string): string[] {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    // One-time read from localStorage on mount — see CartContext for rationale.
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: string[] = raw ? JSON.parse(raw) : [];
      setSlugs(parsed.filter((s) => s !== excludeSlug));
    } catch {
      setSlugs([]);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [excludeSlug]);

  return slugs;
}

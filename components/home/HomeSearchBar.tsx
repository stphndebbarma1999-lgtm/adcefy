"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { SearchOverlay } from "@/components/search/SearchOverlay";

export function HomeSearchBar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="container-page py-4">
      <button
        onClick={() => setSearchOpen(true)}
        className="flex h-11 w-full items-center gap-2 rounded-lg border border-border bg-surface-muted px-3.5 text-sm text-muted hover:border-primary/40 lg:mx-auto lg:max-w-md"
      >
        <Search size={16} />
        Search for products...
      </button>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

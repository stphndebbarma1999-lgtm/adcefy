"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { FilterSidebar } from "./FilterSidebar";
import type { FilterDefinition } from "@/types/category";

export function MobileFilterDrawer({ filters }: { filters: FilterDefinition[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-border text-sm font-medium text-ink lg:hidden"
      >
        <SlidersHorizontal size={16} />
        Filters
      </button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Filters" side="bottom" widthClassName="max-w-full">
        <div className="p-4">
          <FilterSidebar filters={filters} />
        </div>
        <div className="sticky bottom-0 border-t border-border bg-white p-4">
          <Button fullWidth onClick={() => setOpen(false)}>
            Show Results
          </Button>
        </div>
      </Drawer>
    </>
  );
}

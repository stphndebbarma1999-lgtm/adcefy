"use client";

import { useState } from "react";
import { ProductImage } from "./ProductImage";
import { cn } from "@/lib/utils/cn";

export function ProductGallery({
  images,
  name,
  categorySlug,
}: {
  images: string[];
  name: string;
  categorySlug: string;
}) {
  const gallery = images.length > 0 ? images : [""];
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-surface-muted">
        <ProductImage src={gallery[active]} alt={name} categorySlug={categorySlug} priority />
      </div>

      {gallery.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={active === i}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2",
                active === i ? "border-primary" : "border-border"
              )}
            >
              <ProductImage src={img} alt={`${name} ${i + 1}`} categorySlug={categorySlug} />
            </button>
          ))}
        </div>
      )}

      {gallery.length > 1 && (
        <div className="flex justify-center gap-1.5 sm:hidden">
          {gallery.map((_, i) => (
            <span key={i} className={cn("h-1.5 w-1.5 rounded-full", active === i ? "bg-primary" : "bg-gray-200")} />
          ))}
        </div>
      )}
    </div>
  );
}

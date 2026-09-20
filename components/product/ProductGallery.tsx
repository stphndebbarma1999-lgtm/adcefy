"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
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
  const [zoomOpen, setZoomOpen] = useState(false);

  const goTo = (index: number) => setActive((index + gallery.length) % gallery.length);
  const showArrows = gallery.length > 1;

  return (
    <div className="flex flex-col gap-3">
      <div className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-surface-muted">
        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          aria-label="Zoom image"
          className="absolute inset-0 z-10 cursor-zoom-in"
        />
        <ProductImage src={gallery[active]} alt={name} categorySlug={categorySlug} priority />

        <span className="pointer-events-none absolute bottom-2.5 right-2.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
          <ZoomIn size={16} />
        </span>

        {showArrows && (
          <>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm hover:bg-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm hover:bg-white"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
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

      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-10"
          onClick={() => setZoomOpen(false)}
        >
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            aria-label="Close zoom"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X size={22} />
          </button>

          <div
            className="relative aspect-square w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <ProductImage src={gallery[active]} alt={name} categorySlug={categorySlug} sizes="90vw" />
          </div>

          {showArrows && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(active - 1);
                }}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(active + 1);
                }}
                aria-label="Next image"
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

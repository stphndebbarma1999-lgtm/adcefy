"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Banner } from "@/types/banner";
import { ProductImage } from "@/components/product/ProductImage";
import { cn } from "@/lib/utils/cn";

export function HeroCarouselClient({ slides }: { slides: Banner[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          const index = slideRefs.current.findIndex((el) => el === visible.target);
          if (index !== -1) setActiveIndex(index);
        }
      },
      { root: track, threshold: 0.6 }
    );

    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [slides.length]);

  const scrollToIndex = (index: number) => {
    slideRefs.current[index]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <section className="relative w-full">
      <div
        ref={trackRef}
        className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, index) => {
          const content = (
            <div className="relative aspect-[2/1] w-full flex-none snap-center overflow-hidden bg-surface-muted">
              <ProductImage src={slide.desktopImage} alt={slide.title} fill priority={index === 0} sizes="100vw" />
            </div>
          );

          return (
            <div key={slide.id} ref={(el) => { slideRefs.current[index] = el; }} className="w-full flex-none snap-center">
              {slide.buttonUrl ? (
                <Link href={slide.buttonUrl} className="block" aria-label={slide.title}>
                  {content}
                </Link>
              ) : (
                content
              )}
            </div>
          );
        })}
      </div>

      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === activeIndex ? "w-5 bg-white" : "w-1.5 bg-white/60"
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}

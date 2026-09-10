"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { getCategoryBySlug } from "@/lib/data/categories";

interface ProductImageProps {
  src?: string;
  alt: string;
  categorySlug?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}

export function ProductImage({
  src,
  alt,
  categorySlug,
  className,
  fill = true,
  width,
  height,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw",
  priority,
}: ProductImageProps) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    const icon = categorySlug ? getCategoryBySlug(categorySlug)?.icon : undefined;
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-surface-muted text-muted",
          fill ? "absolute inset-0" : "",
          className
        )}
      >
        {icon ? <CategoryIcon name={icon} size={40} strokeWidth={1.5} /> : <ImageOff size={32} strokeWidth={1.5} />}
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onError={() => setErrored(true)}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 400}
      height={height ?? 400}
      priority={priority}
      onError={() => setErrored(true)}
      className={cn("object-cover", className)}
    />
  );
}

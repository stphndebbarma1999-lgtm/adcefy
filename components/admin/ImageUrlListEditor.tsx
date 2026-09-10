"use client";

import { Plus, Trash2, GripVertical } from "lucide-react";
import { ProductImage } from "@/components/product/ProductImage";

export function ImageUrlListEditor({
  images,
  onChange,
}: {
  images: string[];
  onChange: (images: string[]) => void;
}) {
  const updateAt = (index: number, value: string) => {
    onChange(images.map((img, i) => (i === index ? value : img)));
  };

  const removeAt = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...images];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-3">
      {images.map((url, index) => (
        <div key={index} className="flex items-center gap-3 rounded-lg border border-border p-2">
          <button
            type="button"
            onClick={() => moveUp(index)}
            aria-label="Move up"
            className="cursor-grab text-muted hover:text-ink"
            disabled={index === 0}
          >
            <GripVertical size={16} />
          </button>
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border bg-surface-muted">
            <ProductImage src={url} alt={`Image ${index + 1}`} />
          </div>
          <input
            value={url}
            onChange={(e) => updateAt(index, e.target.value)}
            placeholder="https://your-account.sirv.com/product-image.jpg"
            className="h-10 flex-1 rounded-lg border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => removeAt(index)}
            aria-label="Remove image"
            className="rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-danger"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...images, ""])}
        className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-border py-2.5 text-sm font-medium text-primary hover:bg-primary-light"
      >
        <Plus size={16} /> Add Another Image
      </button>
      <p className="text-xs text-muted">
        Paste a public image URL (e.g. from your Sirv dashboard). Leave empty to use a neutral placeholder.
      </p>
    </div>
  );
}

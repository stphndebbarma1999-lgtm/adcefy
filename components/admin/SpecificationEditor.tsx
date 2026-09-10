"use client";

import { Plus, Trash2 } from "lucide-react";
import type { ProductSpecification } from "@/types/product";

export function SpecificationEditor({
  specifications,
  onChange,
}: {
  specifications: ProductSpecification[];
  onChange: (specifications: ProductSpecification[]) => void;
}) {
  const update = (index: number, key: keyof ProductSpecification, value: string) => {
    onChange(specifications.map((s, i) => (i === index ? { ...s, [key]: value } : s)));
  };

  const remove = (index: number) => {
    onChange(specifications.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      {specifications.map((spec, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            value={spec.label}
            onChange={(e) => update(index, "label", e.target.value)}
            placeholder="Specification (e.g. RAM)"
            className="h-10 flex-1 rounded-lg border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            value={spec.value}
            onChange={(e) => update(index, "value", e.target.value)}
            placeholder="Value (e.g. 8GB)"
            className="h-10 flex-1 rounded-lg border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            aria-label="Remove specification"
            className="rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-danger"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...specifications, { label: "", value: "" }])}
        className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-border py-2.5 text-sm font-medium text-primary hover:bg-primary-light"
      >
        <Plus size={16} /> Add Specification
      </button>
    </div>
  );
}

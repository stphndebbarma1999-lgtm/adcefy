"use client";

import { Plus, Trash2 } from "lucide-react";
import type { ProductVariantGroup, ProductVariantOption } from "@/types/product";

function generateOptionId() {
  return `opt-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function generateGroupId() {
  return `grp-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function VariantEditor({
  variants,
  onChange,
}: {
  variants: ProductVariantGroup[];
  onChange: (variants: ProductVariantGroup[]) => void;
}) {
  const updateGroup = (index: number, patch: Partial<ProductVariantGroup>) => {
    onChange(variants.map((g, i) => (i === index ? { ...g, ...patch } : g)));
  };

  const removeGroup = (index: number) => {
    onChange(variants.filter((_, i) => i !== index));
  };

  const addOption = (groupIndex: number) => {
    const newOption: ProductVariantOption = { id: generateOptionId(), name: "" };
    updateGroup(groupIndex, { options: [...variants[groupIndex].options, newOption] });
  };

  const updateOption = (groupIndex: number, optionIndex: number, patch: Partial<ProductVariantOption>) => {
    const options = variants[groupIndex].options.map((o, i) => (i === optionIndex ? { ...o, ...patch } : o));
    updateGroup(groupIndex, { options });
  };

  const removeOption = (groupIndex: number, optionIndex: number) => {
    updateGroup(groupIndex, { options: variants[groupIndex].options.filter((_, i) => i !== optionIndex) });
  };

  return (
    <div className="flex flex-col gap-4">
      {variants.map((group, groupIndex) => (
        <div key={group.id} className="rounded-xl border border-border p-4">
          <div className="mb-3 flex items-center gap-2">
            <input
              value={group.name}
              onChange={(e) => updateGroup(groupIndex, { name: e.target.value })}
              placeholder="Variant name (e.g. Storage, Color)"
              className="h-10 flex-1 rounded-lg border border-border px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => removeGroup(groupIndex)}
              aria-label="Remove variant group"
              className="rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-danger"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {group.options.map((option, optionIndex) => (
              <div key={option.id} className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                <input
                  value={option.name}
                  onChange={(e) => updateOption(groupIndex, optionIndex, { name: e.target.value })}
                  placeholder="Option (e.g. 128GB)"
                  className="h-9 rounded-lg border border-border px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary sm:col-span-2"
                />
                <input
                  type="number"
                  value={option.priceAdjustment ?? ""}
                  onChange={(e) => updateOption(groupIndex, optionIndex, { priceAdjustment: e.target.value ? Number(e.target.value) : undefined })}
                  placeholder="+Price"
                  className="h-9 rounded-lg border border-border px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="number"
                  value={option.stock ?? ""}
                  onChange={(e) => updateOption(groupIndex, optionIndex, { stock: e.target.value ? Number(e.target.value) : undefined })}
                  placeholder="Stock"
                  className="h-9 rounded-lg border border-border px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="flex items-center gap-1">
                  <input
                    value={option.sku ?? ""}
                    onChange={(e) => updateOption(groupIndex, optionIndex, { sku: e.target.value })}
                    placeholder="SKU"
                    className="h-9 flex-1 rounded-lg border border-border px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => removeOption(groupIndex, optionIndex)}
                    aria-label="Remove option"
                    className="shrink-0 rounded-lg p-1.5 text-muted hover:bg-surface-muted hover:text-danger"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addOption(groupIndex)}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2 text-xs font-medium text-primary hover:bg-primary-light"
            >
              <Plus size={14} /> Add Option
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...variants, { id: generateGroupId(), name: "", options: [] }])}
        className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-border py-2.5 text-sm font-medium text-primary hover:bg-primary-light"
      >
        <Plus size={16} /> Add Variant
      </button>
    </div>
  );
}

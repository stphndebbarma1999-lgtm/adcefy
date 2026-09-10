"use client";

import { useState } from "react";
import type { Category } from "@/types/category";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type CategoryFormData = Omit<Category, "id" | "filters">;

export function CategoryFormModal({
  open,
  onClose,
  initialCategory,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  initialCategory?: Category;
  onSubmit: (data: CategoryFormData) => void;
}) {
  const [name, setName] = useState(initialCategory?.name ?? "");
  const [slug, setSlug] = useState(initialCategory?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initialCategory));
  const [description, setDescription] = useState(initialCategory?.description ?? "");
  const [image, setImage] = useState(initialCategory?.image ?? "");
  const [sortOrder, setSortOrder] = useState(String(initialCategory?.sortOrder ?? 1));
  const [isActive, setIsActive] = useState(initialCategory?.isActive ?? true);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }
    setError("");
    onSubmit({
      name: name.trim(),
      slug: slug.trim() || slugify(name),
      description: description.trim() || undefined,
      image: image.trim() || undefined,
      icon: initialCategory?.icon ?? "LayoutGrid",
      sortOrder: Number(sortOrder) || 1,
      isActive,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={initialCategory ? "Edit Category" : "Add Category"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          error={error}
        />
        <Input
          label="Slug"
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
        />
        <Textarea label="Description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        <Input label="Category Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        <Input label="Sort Order" type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
        <Toggle checked={isActive} onChange={setIsActive} label="Active" />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{initialCategory ? "Save Changes" : "Add Category"}</Button>
        </div>
      </form>
    </Modal>
  );
}

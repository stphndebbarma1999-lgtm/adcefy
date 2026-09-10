"use client";

import { useState } from "react";
import type { Product, ProductSpecification, ProductStatus, ProductVariantGroup } from "@/types/product";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import { ImageUrlListEditor } from "./ImageUrlListEditor";
import { SpecificationEditor } from "./SpecificationEditor";
import { VariantEditor } from "./VariantEditor";
import { useAdminData } from "@/lib/context/AdminDataContext";

export type ProductFormData = Omit<Product, "id" | "createdAt" | "updatedAt">;

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function isValidImageUrl(url: string) {
  if (!url) return true;
  return /^https?:\/\//i.test(url);
}

export function ProductForm({
  initialProduct,
  onSubmit,
  submitLabel = "Save Product",
}: {
  initialProduct?: Product;
  onSubmit: (data: ProductFormData) => void;
  submitLabel?: string;
}) {
  const { categories } = useAdminData();

  const [name, setName] = useState(initialProduct?.name ?? "");
  const [slug, setSlug] = useState(initialProduct?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initialProduct));
  const [brand, setBrand] = useState(initialProduct?.brand ?? "ADCEFY");
  const [categorySlug, setCategorySlug] = useState(initialProduct?.categorySlug ?? categories[0]?.slug ?? "");
  const [subcategory, setSubcategory] = useState(initialProduct?.subcategory ?? "");
  const [sku, setSku] = useState(initialProduct?.sku ?? "");
  const [shortDescription, setShortDescription] = useState(initialProduct?.shortDescription ?? "");
  const [description, setDescription] = useState(initialProduct?.description ?? "");
  const [price, setPrice] = useState(String(initialProduct?.price ?? ""));
  const [originalPrice, setOriginalPrice] = useState(String(initialProduct?.originalPrice ?? ""));
  const [stock, setStock] = useState(String(initialProduct?.stock ?? "0"));
  const [images, setImages] = useState<string[]>(initialProduct?.images ?? []);
  const [tags, setTags] = useState(initialProduct?.tags.join(", ") ?? "");
  const [specifications, setSpecifications] = useState<ProductSpecification[]>(initialProduct?.specifications ?? []);
  const [variants, setVariants] = useState<ProductVariantGroup[]>(initialProduct?.variants ?? []);
  const [isFeatured, setIsFeatured] = useState(initialProduct?.isFeatured ?? false);
  const [isNew, setIsNew] = useState(initialProduct?.isNew ?? false);
  const [isBestSeller, setIsBestSeller] = useState(initialProduct?.isBestSeller ?? false);
  const [status, setStatus] = useState<ProductStatus>(initialProduct?.status ?? "active");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Product name is required.";
    if (!categorySlug) next.categorySlug = "Category is required.";
    if (!sku.trim()) next.sku = "SKU is required.";
    const priceNum = Number(price);
    if (!price || Number.isNaN(priceNum) || priceNum <= 0) next.price = "Enter a valid price.";
    const stockNum = Number(stock);
    if (stock === "" || Number.isNaN(stockNum) || stockNum < 0) next.stock = "Stock must be 0 or more.";
    if (images.some((img) => !isValidImageUrl(img))) next.images = "Image URLs must start with http:// or https://";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const category = categories.find((c) => c.slug === categorySlug);
    const priceNum = Number(price);
    const originalPriceNum = originalPrice ? Number(originalPrice) : undefined;
    const discountPercentage =
      originalPriceNum && originalPriceNum > priceNum
        ? Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100)
        : undefined;

    onSubmit({
      name: name.trim(),
      slug: slug.trim() || slugify(name),
      brand: brand.trim() || "ADCEFY",
      categoryId: category?.id ?? categorySlug,
      categorySlug,
      subcategory: subcategory.trim() || undefined,
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      price: priceNum,
      originalPrice: originalPriceNum,
      discountPercentage,
      images: images.filter(Boolean),
      rating: initialProduct?.rating ?? 0,
      reviewCount: initialProduct?.reviewCount ?? 0,
      stock: Number(stock),
      sku: sku.trim(),
      specifications: specifications.filter((s) => s.label.trim() && s.value.trim()),
      variants: variants
        .filter((g) => g.name.trim())
        .map((g) => ({ ...g, options: g.options.filter((o) => o.name.trim()) })),
      tags: tags
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
      isFeatured,
      isNew,
      isBestSeller,
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <section className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-ink">Basic Information</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Product Name" value={name} onChange={(e) => handleNameChange(e.target.value)} error={errors.name} />
          <Input
            label="Slug"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            hint="Used in the product URL."
          />
          <Input label="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
          <Select label="Category" value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)} error={errors.categorySlug}>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </Select>
          <Input label="Subcategory (optional)" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} />
          <Input label="SKU" value={sku} onChange={(e) => setSku(e.target.value)} error={errors.sku} />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-ink">Description</h2>
        <div className="flex flex-col gap-4">
          <Input label="Short Description" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
          <Textarea label="Full Description" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-ink">Pricing & Stock</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Input label="Selling Price (₹)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} error={errors.price} />
          <Input label="MRP / Original Price (₹)" type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} hint="Optional — used to show a discount." />
          <Input label="Stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} error={errors.stock} />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-ink">Product Images</h2>
        <ImageUrlListEditor images={images} onChange={setImages} />
        {errors.images && <p className="mt-2 text-xs text-danger">{errors.images}</p>}
      </section>

      <section className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-ink">Specifications</h2>
        <SpecificationEditor specifications={specifications} onChange={setSpecifications} />
      </section>

      <section className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-ink">Variants</h2>
        <VariantEditor variants={variants} onChange={setVariants} />
      </section>

      <section className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-ink">Organization</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
          <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value as ProductStatus)}>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="inactive">Inactive</option>
          </Select>
        </div>
        <div className="mt-4 flex flex-wrap gap-6">
          <Toggle checked={isFeatured} onChange={setIsFeatured} label="Featured" />
          <Toggle checked={isNew} onChange={setIsNew} label="New Arrival" />
          <Toggle checked={isBestSeller} onChange={setIsBestSeller} label="Best Seller" />
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <Button href="/admin/products" variant="outline">
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}

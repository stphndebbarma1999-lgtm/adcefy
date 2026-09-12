"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductForm, type ProductFormData } from "@/components/admin/ProductForm";
import { useAdminData } from "@/lib/context/AdminDataContext";

export default function NewProductPage() {
  const router = useRouter();
  const { addProduct } = useAdminData();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: ProductFormData) => {
    setError(null);
    try {
      await addProduct(data);
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save product.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-bold text-ink">Add Product</h1>
        <p className="text-sm text-muted">Create a new product for your storefront.</p>
      </div>
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-danger">{error}</div>
      )}
      <ProductForm onSubmit={handleSubmit} submitLabel="Save Product" />
    </div>
  );
}

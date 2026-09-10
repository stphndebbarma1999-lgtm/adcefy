"use client";

import { useRouter } from "next/navigation";
import { ProductForm, type ProductFormData } from "@/components/admin/ProductForm";
import { useAdminData } from "@/lib/context/AdminDataContext";

export default function NewProductPage() {
  const router = useRouter();
  const { addProduct } = useAdminData();

  const handleSubmit = (data: ProductFormData) => {
    addProduct(data);
    router.push("/admin/products");
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-bold text-ink">Add Product</h1>
        <p className="text-sm text-muted">Create a new product for your storefront.</p>
      </div>
      <ProductForm onSubmit={handleSubmit} submitLabel="Save Product" />
    </div>
  );
}

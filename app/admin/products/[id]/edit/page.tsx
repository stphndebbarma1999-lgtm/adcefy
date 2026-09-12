"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { ProductForm, type ProductFormData } from "@/components/admin/ProductForm";
import { useAdminData } from "@/lib/context/AdminDataContext";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { products, updateProduct, deleteProduct } = useAdminData();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="rounded-xl border border-dashed border-border py-16 text-center">
        <p className="text-sm font-medium text-ink">Product not found</p>
        <Button href="/admin/products" variant="outline" size="sm" className="mt-3">
          Back to Products
        </Button>
      </div>
    );
  }

  const handleSubmit = async (data: ProductFormData) => {
    setError(null);
    try {
      await updateProduct(product.id, data);
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save product.");
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProduct(product.id);
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product.");
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink">Edit Product</h1>
          <p className="text-sm text-muted">{product.name}</p>
        </div>
        <button
          onClick={() => setConfirmDelete(true)}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-danger hover:bg-red-50"
        >
          <Trash2 size={16} /> Delete Product
        </button>
      </div>
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-danger">{error}</div>
      )}
      <ProductForm initialProduct={product} onSubmit={handleSubmit} submitLabel="Save Changes" />

      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)} title="Delete Product">
        <p className="mb-4 text-sm text-muted">
          Are you sure you want to delete &ldquo;{product.name}&rdquo;? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setConfirmDelete(false)} disabled={deleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useAdminData } from "@/lib/context/AdminDataContext";
import { ProductTable } from "@/components/admin/ProductTable";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { getStockStatus, type ProductStatus, type StockStatus } from "@/types/product";

export default function AdminProductsPage() {
  const { products, categories, deleteProduct } = useAdminData();
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ProductStatus>("all");
  const [stockFilter, setStockFilter] = useState<"all" | StockStatus>("all");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (query && !`${p.name} ${p.sku} ${p.brand}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (categoryFilter !== "all" && p.categorySlug !== categoryFilter) return false;
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (stockFilter !== "all" && getStockStatus(p.stock) !== stockFilter) return false;
      return true;
    });
  }, [products, query, categoryFilter, statusFilter, stockFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-ink">Products</h1>
          <p className="text-sm text-muted">{products.length} total products</p>
        </div>
        <Button href="/admin/products/new">
          <Plus size={16} /> Add Product
        </Button>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, SKU or brand..."
            className="h-10 w-full rounded-lg border border-border pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-10 rounded-lg border border-border px-3 text-sm"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="h-10 rounded-lg border border-border px-3 text-sm"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value as typeof stockFilter)}
          className="h-10 rounded-lg border border-border px-3 text-sm"
        >
          <option value="all">All Stock</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>

      <ProductTable products={filtered} onDelete={setPendingDelete} />

      <Modal open={Boolean(pendingDelete)} onClose={() => setPendingDelete(null)} title="Delete Product">
        <p className="mb-4 text-sm text-muted">
          Are you sure you want to delete this product? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setPendingDelete(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (pendingDelete) deleteProduct(pendingDelete);
              setPendingDelete(null);
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

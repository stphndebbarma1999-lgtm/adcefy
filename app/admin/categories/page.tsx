"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useAdminData } from "@/lib/context/AdminDataContext";
import { Table, Thead, Tbody, Th, Td, Tr } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { CategoryFormModal, type CategoryFormData } from "@/components/admin/CategoryForm";
import type { Category } from "@/types/category";

export default function AdminCategoriesPage() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useAdminData();
  const [editing, setEditing] = useState<Category | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Category | null>(null);

  const handleSubmit = (data: CategoryFormData) => {
    if (editing) updateCategory(editing.id, data);
    else addCategory({ ...data, filters: [] });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-ink">Categories</h1>
          <p className="text-sm text-muted">{categories.length} categories</p>
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          <Plus size={16} /> Add Category
        </Button>
      </div>

      <Table>
        <Thead>
          <Tr>
            <Th>Category</Th>
            <Th>Slug</Th>
            <Th>Products</Th>
            <Th>Sort Order</Th>
            <Th>Status</Th>
            <Th className="text-right">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((category) => (
            <Tr key={category.id}>
              <Td>
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-muted text-ink">
                    <CategoryIcon name={category.icon} size={16} />
                  </span>
                  <span className="font-medium text-ink">{category.name}</span>
                </div>
              </Td>
              <Td className="text-muted">/{category.slug}</Td>
              <Td>{products.filter((p) => p.categorySlug === category.slug).length}</Td>
              <Td>{category.sortOrder}</Td>
              <Td>
                <Badge tone={category.isActive ? "success" : "neutral"}>{category.isActive ? "Active" : "Disabled"}</Badge>
              </Td>
              <Td>
                <div className="flex justify-end gap-1">
                  <button
                    onClick={() => {
                      setEditing(category);
                      setFormOpen(true);
                    }}
                    aria-label="Edit category"
                    className="rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-primary"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => setPendingDelete(category)}
                    aria-label="Delete category"
                    className="rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-danger"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <CategoryFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        initialCategory={editing ?? undefined}
        onSubmit={handleSubmit}
      />

      <Modal open={Boolean(pendingDelete)} onClose={() => setPendingDelete(null)} title="Delete Category">
        <p className="mb-4 text-sm text-muted">
          Are you sure you want to delete &ldquo;{pendingDelete?.name}&rdquo;? Products in this category will remain
          but the category link will no longer appear in navigation.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setPendingDelete(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (pendingDelete) deleteCategory(pendingDelete.id);
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

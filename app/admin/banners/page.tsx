"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useAdminData } from "@/lib/context/AdminDataContext";
import { ProductImage } from "@/components/product/ProductImage";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { BannerFormModal, type BannerFormData } from "@/components/admin/BannerForm";
import type { Banner } from "@/types/banner";

const positionLabels: Record<Banner["position"], string> = {
  hero: "Hero",
  promo: "Promo",
  category: "Category",
  carousel: "Homepage Carousel",
};

export default function AdminBannersPage() {
  const { banners, bannersLoading, categories, addBanner, updateBanner, deleteBanner } = useAdminData();
  const [editing, setEditing] = useState<Banner | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Banner | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleSubmit = async (data: BannerFormData) => {
    setError(null);
    try {
      if (editing) await updateBanner(editing.id, data);
      else await addBanner(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save banner.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await deleteBanner(pendingDelete.id);
      setPendingDelete(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete banner.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-ink">Banners</h1>
          <p className="text-sm text-muted">Manage homepage hero, promo and collection banners.</p>
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          <Plus size={16} /> Add Banner
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-danger">{error}</div>
      )}

      {bannersLoading ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted">
          Loading banners...
        </div>
      ) : (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {banners.map((banner) => (
          <div key={banner.id} className="flex flex-col rounded-xl border border-border bg-white">
            <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl bg-surface-muted">
              <ProductImage src={banner.desktopImage} alt={banner.title} />
              <span className="absolute left-2 top-2 rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-medium text-ink">
                {positionLabels[banner.position]}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-1 p-4">
              <p className="text-sm font-semibold text-ink">{banner.title}</p>
              {banner.subtitle && <p className="line-clamp-2 text-xs text-muted">{banner.subtitle}</p>}
              <p className="text-xs text-muted">
                Linked Category:{" "}
                <span className="font-medium text-ink">
                  {categories.find((c) => c.id === banner.categoryId)?.name ?? "None"}
                </span>
              </p>
              <div className="mt-3 flex items-center justify-between">
                <Toggle
                  checked={banner.isActive}
                  onChange={(v) =>
                    updateBanner(banner.id, { isActive: v }).catch((err) =>
                      setError(err instanceof Error ? err.message : "Failed to update banner.")
                    )
                  }
                  label="Active"
                />
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setEditing(banner);
                      setFormOpen(true);
                    }}
                    aria-label="Edit banner"
                    className="rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-primary"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => setPendingDelete(banner)}
                    aria-label="Delete banner"
                    className="rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-danger"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      <BannerFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        initialBanner={editing ?? undefined}
        categories={categories}
        onSubmit={handleSubmit}
      />

      <Modal open={Boolean(pendingDelete)} onClose={() => setPendingDelete(null)} title="Delete Banner">
        <p className="mb-4 text-sm text-muted">Are you sure you want to delete &ldquo;{pendingDelete?.title}&rdquo;?</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setPendingDelete(null)} disabled={deleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

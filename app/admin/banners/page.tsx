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
};

export default function AdminBannersPage() {
  const { banners, addBanner, updateBanner, deleteBanner } = useAdminData();
  const [editing, setEditing] = useState<Banner | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Banner | null>(null);

  const handleSubmit = (data: BannerFormData) => {
    if (editing) updateBanner(editing.id, data);
    else addBanner(data);
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
              <div className="mt-3 flex items-center justify-between">
                <Toggle checked={banner.isActive} onChange={(v) => updateBanner(banner.id, { isActive: v })} label="Active" />
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

      <BannerFormModal open={formOpen} onClose={() => setFormOpen(false)} initialBanner={editing ?? undefined} onSubmit={handleSubmit} />

      <Modal open={Boolean(pendingDelete)} onClose={() => setPendingDelete(null)} title="Delete Banner">
        <p className="mb-4 text-sm text-muted">Are you sure you want to delete &ldquo;{pendingDelete?.title}&rdquo;?</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setPendingDelete(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (pendingDelete) deleteBanner(pendingDelete.id);
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

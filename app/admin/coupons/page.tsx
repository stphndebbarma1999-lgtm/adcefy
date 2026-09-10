"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useAdminData } from "@/lib/context/AdminDataContext";
import { Table, Thead, Tbody, Th, Td, Tr } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { Modal } from "@/components/ui/Modal";
import { CouponFormModal, type CouponFormData } from "@/components/admin/CouponForm";
import { formatDate, formatPrice } from "@/lib/utils/format";
import type { Coupon } from "@/types/coupon";

export default function AdminCouponsPage() {
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useAdminData();
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Coupon | null>(null);

  const handleSubmit = (data: CouponFormData) => {
    if (editing) updateCoupon(editing.id, data);
    else addCoupon(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-ink">Coupons</h1>
          <p className="text-sm text-muted">{coupons.length} coupons</p>
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          <Plus size={16} /> Create Coupon
        </Button>
      </div>

      <Table>
        <Thead>
          <Tr>
            <Th>Code</Th>
            <Th>Discount</Th>
            <Th>Min Order</Th>
            <Th>Usage</Th>
            <Th>Expiry</Th>
            <Th>Active</Th>
            <Th className="text-right">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {coupons.map((coupon) => (
            <Tr key={coupon.id}>
              <Td className="font-medium text-ink">{coupon.code}</Td>
              <Td>{coupon.discountType === "percentage" ? `${coupon.discountValue}%` : formatPrice(coupon.discountValue)}</Td>
              <Td className="text-muted">{coupon.minOrderValue ? formatPrice(coupon.minOrderValue) : "—"}</Td>
              <Td className="text-muted">
                {coupon.usedCount}
                {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ""}
              </Td>
              <Td className="text-muted">{formatDate(coupon.expiryDate)}</Td>
              <Td>
                <Toggle checked={coupon.isActive} onChange={(v) => updateCoupon(coupon.id, { isActive: v })} />
              </Td>
              <Td>
                <div className="flex justify-end gap-1">
                  <button
                    onClick={() => {
                      setEditing(coupon);
                      setFormOpen(true);
                    }}
                    aria-label="Edit coupon"
                    className="rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-primary"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => setPendingDelete(coupon)}
                    aria-label="Delete coupon"
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

      {coupons.length === 0 && (
        <Badge tone="neutral">No coupons yet — create one to offer a discount at checkout.</Badge>
      )}

      <CouponFormModal open={formOpen} onClose={() => setFormOpen(false)} initialCoupon={editing ?? undefined} onSubmit={handleSubmit} />

      <Modal open={Boolean(pendingDelete)} onClose={() => setPendingDelete(null)} title="Delete Coupon">
        <p className="mb-4 text-sm text-muted">Are you sure you want to delete &ldquo;{pendingDelete?.code}&rdquo;?</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setPendingDelete(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (pendingDelete) deleteCoupon(pendingDelete.id);
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

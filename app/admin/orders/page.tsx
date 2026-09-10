"use client";

import { useMemo, useState } from "react";
import { useAdminData } from "@/lib/context/AdminDataContext";
import { OrderTable } from "@/components/admin/OrderTable";
import { ORDER_STATUS_LABELS, type OrderStatus } from "@/types/order";

export default function AdminOrdersPage() {
  const { orders } = useAdminData();
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");

  const filtered = useMemo(() => {
    const sorted = [...orders].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    if (statusFilter === "all") return sorted;
    return sorted.filter((o) => o.status === statusFilter);
  }, [orders, statusFilter]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-bold text-ink">Orders</h1>
        <p className="text-sm text-muted">{orders.length} total orders</p>
      </div>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
        className="h-10 w-fit rounded-lg border border-border px-3 text-sm"
      >
        <option value="all">All Status</option>
        {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <OrderTable orders={filtered} />
    </div>
  );
}

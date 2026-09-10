import type { Metadata } from "next";
import Link from "next/link";
import { Package } from "lucide-react";
import { getOrders } from "@/lib/data/orders";
import { ORDER_STATUS_LABELS } from "@/types/order";
import { formatDate, formatPrice } from "@/lib/utils/format";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "My Orders",
  alternates: { canonical: "/account/orders" },
};

export default function AccountOrdersPage() {
  const orders = getOrders();

  return (
    <div className="container-page py-8">
      <h1 className="mb-6 text-2xl font-bold text-ink">My Orders</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <Package size={40} className="text-muted" strokeWidth={1.5} />
          <p className="text-sm font-medium text-ink">No orders yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                <div>
                  <p className="text-sm font-semibold text-ink">#{order.orderNumber}</p>
                  <p className="text-xs text-muted">Placed on {formatDate(order.createdAt)}</p>
                </div>
                <Badge tone={order.status === "delivered" ? "success" : order.status === "cancelled" ? "danger" : "primary"}>
                  {ORDER_STATUS_LABELS[order.status]}
                </Badge>
              </div>
              <div className="flex flex-col gap-1 py-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-ink">
                      {item.name} <span className="text-muted">x{item.quantity}</span>
                    </span>
                    <span className="text-muted">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="text-sm font-semibold text-ink">Total: {formatPrice(order.total)}</span>
                <Link href="/track-order" className="text-sm font-medium text-primary hover:underline">
                  Track Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

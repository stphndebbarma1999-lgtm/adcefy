"use client";

import { useParams } from "next/navigation";
import { useAdminData } from "@/lib/context/AdminDataContext";
import { ORDER_STATUS_LABELS, type OrderStatus } from "@/types/order";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate, formatPrice } from "@/lib/utils/format";

export default function AdminOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const { orders, updateOrderStatus } = useAdminData();
  const order = orders.find((o) => o.id === params.id);

  if (!order) {
    return (
      <div className="rounded-xl border border-dashed border-border py-16 text-center">
        <p className="text-sm font-medium text-ink">Order not found</p>
        <Button href="/admin/orders" variant="outline" size="sm" className="mt-3">
          Back to Orders
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-ink">Order #{order.orderNumber}</h1>
          <p className="text-sm text-muted">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted">Status</span>
          <select
            value={order.status}
            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
            className="h-10 rounded-lg border border-border px-3 text-sm"
          >
            {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="rounded-xl border border-border bg-white p-5">
            <h2 className="mb-4 text-sm font-semibold text-ink">Products</h2>
            <div className="flex flex-col divide-y divide-border">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <p className="font-medium text-ink">{item.name}</p>
                    <p className="text-xs text-muted">
                      SKU: {item.sku}
                      {item.variantLabel && ` · ${item.variantLabel}`} · Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium text-ink">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-1.5 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="text-ink">{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted">Discount {order.couponCode && `(${order.couponCode})`}</span>
                  <span className="text-success">-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span className="text-ink">{order.shippingFee === 0 ? "Free" : formatPrice(order.shippingFee)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-1.5 text-base font-semibold">
                <span className="text-ink">Grand Total</span>
                <span className="text-ink">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-border bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-ink">Customer</h2>
            <p className="text-sm text-ink">{order.customerName}</p>
            <p className="text-sm text-muted">{order.email}</p>
            <p className="text-sm text-muted">{order.phone}</p>
          </div>

          <div className="rounded-xl border border-border bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-ink">Shipping Address</h2>
            <p className="text-sm text-ink">{order.shippingAddress.fullName}</p>
            <p className="text-sm text-muted">
              {order.shippingAddress.addressLine1}
              {order.shippingAddress.addressLine2 && `, ${order.shippingAddress.addressLine2}`}
            </p>
            <p className="text-sm text-muted">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
            </p>
            <p className="text-sm text-muted">{order.shippingAddress.phone}</p>
          </div>

          <div className="rounded-xl border border-border bg-white p-5">
            <h2 className="mb-3 text-sm font-semibold text-ink">Payment</h2>
            <p className="text-sm text-ink">Method: <span className="uppercase">{order.paymentMethod}</span></p>
            <p className="mt-1 text-sm">
              Status: <Badge tone={order.paymentStatus === "paid" ? "success" : order.paymentStatus === "failed" ? "danger" : "neutral"}>{order.paymentStatus}</Badge>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

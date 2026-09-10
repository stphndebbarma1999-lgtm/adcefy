"use client";

import { useState } from "react";
import { CheckCircle2, Circle, PackageSearch } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { getOrders } from "@/lib/data/orders";
import { ORDER_STATUS_FLOW, ORDER_STATUS_LABELS, type Order } from "@/types/order";
import { formatDate, formatPrice } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [contact, setContact] = useState("");
  const [result, setResult] = useState<Order | null | undefined>(undefined);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const orders = getOrders();
    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === orderId.trim().toLowerCase() &&
        (o.email.toLowerCase() === contact.trim().toLowerCase() || o.phone.replace(/\D/g, "").endsWith(contact.replace(/\D/g, "")))
    );
    setResult(found ?? null);
  };

  const currentStepIndex = result ? ORDER_STATUS_FLOW.indexOf(result.status) : -1;

  return (
    <div className="container-page py-8">
      <h1 className="mb-2 text-2xl font-bold text-ink">Track Your Order</h1>
      <p className="mb-6 text-sm text-muted">Enter your order ID and the email or phone used at checkout.</p>

      <form onSubmit={handleSearch} className="mb-8 flex max-w-lg flex-col gap-4 rounded-xl border border-border p-5">
        <Input label="Order ID" placeholder="e.g. ADC10002" value={orderId} onChange={(e) => setOrderId(e.target.value)} required />
        <Input label="Email or Phone" value={contact} onChange={(e) => setContact(e.target.value)} required />
        <Button type="submit">Track Order</Button>
      </form>

      {result === null && (
        <div className="flex max-w-lg flex-col items-center gap-2 rounded-xl border border-dashed border-border py-10 text-center">
          <PackageSearch size={36} className="text-muted" strokeWidth={1.5} />
          <p className="text-sm font-medium text-ink">No matching order found</p>
          <p className="text-xs text-muted">Double-check your order ID and contact details.</p>
        </div>
      )}

      {result && (
        <div className="max-w-2xl rounded-xl border border-border p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-ink">#{result.orderNumber}</p>
              <p className="text-xs text-muted">Placed on {formatDate(result.createdAt)}</p>
            </div>
            <span className="text-sm font-semibold text-ink">{formatPrice(result.total)}</span>
          </div>

          {result.status === "cancelled" || result.status === "returned" ? (
            <p className="rounded-lg bg-surface-muted px-4 py-3 text-sm font-medium text-danger">
              This order was {ORDER_STATUS_LABELS[result.status].toLowerCase()}.
            </p>
          ) : (
            <ol className="flex flex-col gap-4">
              {ORDER_STATUS_FLOW.map((step, i) => {
                const done = i <= currentStepIndex;
                return (
                  <li key={step} className="flex items-center gap-3">
                    {done ? (
                      <CheckCircle2 size={20} className="shrink-0 text-success" />
                    ) : (
                      <Circle size={20} className="shrink-0 text-gray-300" />
                    )}
                    <span className={cn("text-sm", done ? "font-medium text-ink" : "text-muted")}>
                      {ORDER_STATUS_LABELS[step]}
                    </span>
                  </li>
                );
              })}
            </ol>
          )}

          <p className="mt-5 text-xs text-muted">
            This reflects the order status on record — not a live courier tracking feed.
          </p>
        </div>
      )}
    </div>
  );
}

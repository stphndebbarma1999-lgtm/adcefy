import Link from "next/link";
import type { Order } from "@/types/order";
import { ORDER_STATUS_LABELS } from "@/types/order";
import { Table, Thead, Tbody, Th, Td, Tr } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatPrice } from "@/lib/utils/format";

const statusTone: Record<Order["status"], "success" | "primary" | "danger" | "neutral"> = {
  pending: "neutral",
  confirmed: "primary",
  packed: "primary",
  shipped: "primary",
  "out-for-delivery": "primary",
  delivered: "success",
  cancelled: "danger",
  returned: "danger",
};

export function OrderTable({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return <p className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted">No orders found.</p>;
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Order ID</Th>
          <Th>Customer</Th>
          <Th>Date</Th>
          <Th>Products</Th>
          <Th>Amount</Th>
          <Th>Payment</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order) => (
          <Tr key={order.id} className="hover:bg-surface-muted">
            <Td>
              <Link href={`/admin/orders/${order.id}`} className="font-medium text-primary hover:underline">
                #{order.orderNumber}
              </Link>
            </Td>
            <Td>{order.customerName}</Td>
            <Td className="text-muted">{formatDate(order.createdAt)}</Td>
            <Td className="text-muted">{order.items.length} item{order.items.length > 1 ? "s" : ""}</Td>
            <Td className="font-medium text-ink">{formatPrice(order.total)}</Td>
            <Td className="uppercase text-muted">{order.paymentMethod}</Td>
            <Td>
              <Badge tone={statusTone[order.status]}>{ORDER_STATUS_LABELS[order.status]}</Badge>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

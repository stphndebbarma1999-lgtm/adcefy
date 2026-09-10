"use client";

import Link from "next/link";
import { DollarSign, ShoppingBag, Package, Users, AlertTriangle } from "lucide-react";
import { useAdminData } from "@/lib/context/AdminDataContext";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { Badge } from "@/components/ui/Badge";
import { Table, Thead, Tbody, Th, Td, Tr } from "@/components/ui/Table";
import { formatDate, formatPrice } from "@/lib/utils/format";
import { ORDER_STATUS_LABELS } from "@/types/order";

export default function AdminDashboardPage() {
  const { products, orders, customers } = useAdminData();

  const totalRevenue = orders.filter((o) => o.paymentStatus === "paid").reduce((sum, o) => sum + o.total, 0);
  const lowStockProducts = products.filter((p) => p.stock > 0 && p.stock <= 5);
  const outOfStockProducts = products.filter((p) => p.stock === 0);
  const recentOrders = [...orders].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 5);
  const topProducts = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-ink">Dashboard</h1>
        <p className="text-sm text-muted">Overview of your store performance.</p>
      </div>

      <DashboardStats
        stats={[
          { label: "Total Revenue", value: formatPrice(totalRevenue), icon: DollarSign, tone: "success" },
          { label: "Total Orders", value: String(orders.length), icon: ShoppingBag, tone: "primary" },
          { label: "Total Products", value: String(products.length), icon: Package, tone: "purple" },
          { label: "Total Customers", value: String(customers.length), icon: Users, tone: "orange" },
          { label: "Low Stock Products", value: String(lowStockProducts.length + outOfStockProducts.length), icon: AlertTriangle, tone: "danger" },
        ]}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-border bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs font-medium text-primary hover:underline">
              View All
            </Link>
          </div>
          <Table>
            <Thead>
              <Tr>
                <Th>Order</Th>
                <Th>Customer</Th>
                <Th>Amount</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {recentOrders.map((order) => (
                <Tr key={order.id}>
                  <Td>
                    <Link href={`/admin/orders/${order.id}`} className="font-medium text-primary hover:underline">
                      #{order.orderNumber}
                    </Link>
                    <p className="text-xs text-muted">{formatDate(order.createdAt)}</p>
                  </Td>
                  <Td>{order.customerName}</Td>
                  <Td>{formatPrice(order.total)}</Td>
                  <Td>
                    <Badge tone={order.status === "delivered" ? "success" : order.status === "cancelled" ? "danger" : "primary"}>
                      {ORDER_STATUS_LABELS[order.status]}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>

        <div className="rounded-xl border border-border bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold text-ink">Top Selling Products</h2>
          <Table>
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Price</Th>
                <Th>Reviews</Th>
              </Tr>
            </Thead>
            <Tbody>
              {topProducts.map((product) => (
                <Tr key={product.id}>
                  <Td>
                    <Link href={`/admin/products/${product.id}/edit`} className="font-medium text-ink hover:text-primary">
                      {product.name}
                    </Link>
                  </Td>
                  <Td>{formatPrice(product.price)}</Td>
                  <Td>{product.reviewCount.toLocaleString("en-IN")}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      </div>

      {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
        <div className="rounded-xl border border-border bg-white p-4">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
            <AlertTriangle size={16} className="text-accent-orange" /> Low Stock Alerts
          </h2>
          <Table>
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>SKU</Th>
                <Th>Stock</Th>
              </Tr>
            </Thead>
            <Tbody>
              {[...lowStockProducts, ...outOfStockProducts].map((product) => (
                <Tr key={product.id}>
                  <Td>
                    <Link href={`/admin/products/${product.id}/edit`} className="font-medium text-ink hover:text-primary">
                      {product.name}
                    </Link>
                  </Td>
                  <Td>{product.sku}</Td>
                  <Td>
                    <Badge tone={product.stock === 0 ? "danger" : "neutral"}>{product.stock === 0 ? "Out of Stock" : `${product.stock} left`}</Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

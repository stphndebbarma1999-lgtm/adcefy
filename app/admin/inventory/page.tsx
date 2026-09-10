"use client";

import { useState } from "react";
import { useAdminData } from "@/lib/context/AdminDataContext";
import { Table, Thead, Tbody, Th, Td, Tr } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { getStockStatus } from "@/types/product";

export default function AdminInventoryPage() {
  const { products, adjustStock } = useAdminData();
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const statusTone = { "in-stock": "success", "low-stock": "neutral", "out-of-stock": "danger" } as const;
  const statusLabel = { "in-stock": "In Stock", "low-stock": "Low Stock", "out-of-stock": "Out of Stock" } as const;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-bold text-ink">Inventory</h1>
        <p className="text-sm text-muted">Adjust stock levels across your catalog.</p>
      </div>

      <Table>
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th>SKU</Th>
            <Th>Variants</Th>
            <Th>Available Stock</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => {
            const status = getStockStatus(product.stock);
            const draftValue = drafts[product.id] ?? String(product.stock);
            return (
              <Tr key={product.id}>
                <Td className="font-medium text-ink">{product.name}</Td>
                <Td className="text-muted">{product.sku}</Td>
                <Td className="text-muted">
                  {product.variants.length > 0 ? product.variants.map((v) => v.name).join(", ") : "—"}
                </Td>
                <Td>
                  <input
                    type="number"
                    min={0}
                    value={draftValue}
                    onChange={(e) => setDrafts((d) => ({ ...d, [product.id]: e.target.value }))}
                    onBlur={(e) => {
                      const value = Math.max(0, Number(e.target.value) || 0);
                      adjustStock(product.id, value);
                      setDrafts((d) => ({ ...d, [product.id]: String(value) }));
                    }}
                    className="h-9 w-20 rounded-lg border border-border px-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </Td>
                <Td>
                  <Badge tone={statusTone[status]}>{statusLabel[status]}</Badge>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </div>
  );
}

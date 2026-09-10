"use client";

import Link from "next/link";
import { Eye, Pencil, Trash2, Star } from "lucide-react";
import type { Product } from "@/types/product";
import { Table, Thead, Tbody, Th, Td, Tr } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { ProductImage } from "@/components/product/ProductImage";
import { formatPrice } from "@/lib/utils/format";
import { getStockStatus } from "@/types/product";

export function ProductTable({ products, onDelete }: { products: Product[]; onDelete: (id: string) => void }) {
  if (products.length === 0) {
    return <p className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted">No products match your filters.</p>;
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Image</Th>
          <Th>Product</Th>
          <Th>SKU</Th>
          <Th>Category</Th>
          <Th>Price</Th>
          <Th>Stock</Th>
          <Th>Status</Th>
          <Th>Featured</Th>
          <Th className="text-right">Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map((product) => {
          const stockStatus = getStockStatus(product.stock);
          return (
            <Tr key={product.id}>
              <Td>
                <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-border">
                  <ProductImage src={product.images[0]} alt={product.name} categorySlug={product.categorySlug} />
                </div>
              </Td>
              <Td>
                <p className="font-medium text-ink">{product.name}</p>
                <p className="text-xs text-muted">{product.brand}</p>
              </Td>
              <Td className="text-muted">{product.sku}</Td>
              <Td className="capitalize text-muted">{product.categorySlug.replace(/-/g, " ")}</Td>
              <Td className="font-medium text-ink">{formatPrice(product.price)}</Td>
              <Td>
                <Badge tone={stockStatus === "out-of-stock" ? "danger" : stockStatus === "low-stock" ? "neutral" : "success"}>
                  {product.stock}
                </Badge>
              </Td>
              <Td>
                <Badge tone={product.status === "active" ? "success" : product.status === "draft" ? "neutral" : "danger"}>
                  {product.status}
                </Badge>
              </Td>
              <Td>{product.isFeatured && <Star size={16} className="fill-amber-400 text-amber-400" />}</Td>
              <Td>
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/product/${product.slug}`}
                    target="_blank"
                    aria-label="View product"
                    className="rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-ink"
                  >
                    <Eye size={16} />
                  </Link>
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    aria-label="Edit product"
                    className="rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-primary"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => onDelete(product.id)}
                    aria-label="Delete product"
                    className="rounded-lg p-2 text-muted hover:bg-surface-muted hover:text-danger"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

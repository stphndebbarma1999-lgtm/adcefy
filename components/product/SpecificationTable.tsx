import type { ProductSpecification } from "@/types/product";

export function SpecificationTable({ specifications }: { specifications: ProductSpecification[] }) {
  if (specifications.length === 0) {
    return <p className="text-sm text-muted">No specifications available for this product.</p>;
  }

  return (
    <dl className="divide-y divide-border rounded-xl border border-border">
      {specifications.map((spec) => (
        <div key={spec.label} className="grid grid-cols-2 gap-4 px-4 py-3 text-sm">
          <dt className="text-muted">{spec.label}</dt>
          <dd className="font-medium text-ink">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}

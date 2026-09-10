import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getActiveBanners } from "@/lib/data/banners";

const cardStyles = ["bg-surface-muted", "bg-amber-50"];

export function FeaturedCollections() {
  const collections = getActiveBanners("category");
  if (collections.length === 0) return null;

  return (
    <section className="container-page py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-ink">Featured Collections</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {collections.map((banner, i) => (
          <Link
            key={banner.id}
            href={banner.buttonUrl ?? "/"}
            className={`group relative flex min-h-[180px] flex-col justify-end overflow-hidden rounded-2xl p-6 ${cardStyles[i % cardStyles.length]}`}
          >
            <h3 className="text-xl font-bold text-ink">{banner.title}</h3>
            <p className="mb-3 text-sm text-muted">{banner.subtitle}</p>
            <span className="flex items-center gap-1 text-sm font-medium text-primary">
              {banner.buttonText ?? "Shop Collection"}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

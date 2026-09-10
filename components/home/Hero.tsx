import { Laptop, Smartphone, Headphones, Watch, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getActiveBanners } from "@/lib/data/banners";

const collageIcons = [
  { icon: Smartphone, label: "Mobile" },
  { icon: Laptop, label: "Laptop" },
  { icon: Headphones, label: "Accessories" },
  { icon: Watch, label: "Gadgets" },
];

export function Hero() {
  const [banner] = getActiveBanners("hero");

  return (
    <section className="bg-primary-light">
      <div className="container-page grid grid-cols-1 items-center gap-10 py-10 lg:grid-cols-2 lg:py-16">
        <div className="flex flex-col gap-5">
          <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            New Collection 2026
          </span>
          <h1 className="text-4xl font-bold leading-tight text-ink sm:text-5xl">
            Latest Technology.
            <br />
            <span className="text-primary">Better Prices.</span>
          </h1>
          <p className="max-w-md text-base text-muted">
            {banner?.subtitle ??
              "Shop mobiles, laptops, gadgets, accessories and computer products at ADCEFY."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={banner?.buttonUrl ?? "/mobile"} size="lg">
              {banner?.buttonText ?? "Shop Now"}
            </Button>
            <Button href="/gadgets" variant="outline" size="lg">
              Explore Deals
            </Button>
          </div>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex -space-x-2">
              {["A", "P", "R", "S"].map((letter) => (
                <span
                  key={letter}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-primary text-xs font-semibold text-white"
                >
                  {letter}
                </span>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">25K+ Happy Customers</p>
              <div className="flex items-center gap-1 text-xs text-muted">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className="fill-amber-400" />
                  ))}
                </div>
                4.9/5 (2.5K Reviews)
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="grid grid-cols-2 gap-4 rounded-3xl bg-white p-6 shadow-sm">
            {collageIcons.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-surface-muted py-8"
              >
                <Icon size={36} strokeWidth={1.5} className="text-primary" />
                <span className="text-xs font-medium text-muted">{label}</span>
              </div>
            ))}
          </div>
          <div className="absolute -top-4 -right-4 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-primary text-center text-white shadow-lg">
            <span className="text-[10px] font-medium uppercase leading-none">Up to</span>
            <span className="text-xl font-bold leading-tight">50%</span>
            <span className="text-[10px] font-medium uppercase leading-none">Off</span>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

export function Logo({ className, imageClassName }: { className?: string; imageClassName?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 shrink-0", className)}>
      {siteConfig.logo.url ? (
        // The logo graphic already includes the "Adcefy" wordmark, so no
        // separate text label is rendered alongside it.
        <Image
          src={siteConfig.logo.url}
          alt={siteConfig.name}
          width={220}
          height={98}
          priority
          className={imageClassName ?? "h-8 w-auto sm:h-9"}
        />
      ) : (
        <>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
            A
          </span>
          <span className="text-xl font-bold tracking-tight text-ink">{siteConfig.name}</span>
        </>
      )}
    </Link>
  );
}

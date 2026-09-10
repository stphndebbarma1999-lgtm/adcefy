"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getActiveBanners } from "@/lib/data/banners";

function getTimeLeft(target: number) {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function FlashSale() {
  const [banner] = getActiveBanners("promo");
  const [target] = useState(() => Date.now() + 1000 * 60 * 60 * 62); // ~2.5 days from load
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Marks client-mounted and starts the countdown — must run after mount to
    // avoid a server/client render mismatch on the live clock value.
    /* eslint-disable react-hooks/set-state-in-effect */
    setMounted(true);
    const interval = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    setTimeLeft(getTimeLeft(target));
    /* eslint-enable react-hooks/set-state-in-effect */
    return () => clearInterval(interval);
  }, [target]);

  if (!banner) return null;

  const units: { label: string; value: number }[] = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <section className="container-page py-6">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-dark px-6 py-8 text-white sm:flex-row sm:justify-between sm:px-10">
        <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-400">
            <Zap size={14} className="fill-amber-400" /> Flash Sale
          </span>
          <h2 className="text-3xl font-bold">{banner.subtitle?.split(".")[0] ?? "Up to 70% Off"}</h2>
          <p className="text-sm text-white/70">Limited time offer on selected accessories.</p>
          <Button href={banner.buttonUrl ?? "/gadgets"} variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-ink">
            {banner.buttonText ?? "Shop Now"}
          </Button>
        </div>

        <div className="flex items-center gap-3" suppressHydrationWarning>
          {units.map((u) => (
            <div key={u.label} className="flex w-16 flex-col items-center rounded-xl bg-white/10 py-3">
              <span className="text-2xl font-bold tabular-nums">{mounted ? String(u.value).padStart(2, "0") : "00"}</span>
              <span className="text-[10px] uppercase text-white/60">{u.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

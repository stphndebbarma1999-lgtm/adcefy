"use client";

import { useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export function DeliveryChecker() {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "result">("idle");
  const [error, setError] = useState("");

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setError("Enter a valid 6-digit PIN code.");
      setStatus("idle");
      return;
    }
    setError("");
    setStatus("checking");
    setTimeout(() => setStatus("result"), 600);
  };

  return (
    <div className="rounded-xl border border-border p-4">
      <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-ink">
        <MapPin size={16} /> Check Delivery
      </p>
      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="Enter Delivery PIN Code"
          inputMode="numeric"
          className="h-10 flex-1 rounded-lg border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="h-10 shrink-0 rounded-lg bg-ink px-4 text-sm font-medium text-white hover:bg-black"
        >
          Check
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-danger">{error}</p>}
      {status === "checking" && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
          <Loader2 size={12} className="animate-spin" /> Checking availability...
        </p>
      )}
      {status === "result" && (
        <p className="mt-2 text-xs text-success">
          Estimated delivery in {siteConfig.shipping.standardDeliveryDays} business days to {pincode}.
        </p>
      )}
      <p className="mt-2 text-[11px] text-muted">
        Estimate only, based on order status — not live courier tracking.
      </p>
    </div>
  );
}

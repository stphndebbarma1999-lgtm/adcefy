"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useAdminData } from "@/lib/context/AdminDataContext";
import { Input } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import type { StoreSettings } from "@/types/settings";

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useAdminData();
  const [form, setForm] = useState<StoreSettings>(settings);
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof StoreSettings>(key: K, value: StoreSettings[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
  };

  return (
    <form onSubmit={handleSave} className="flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-ink">Settings</h1>
        <p className="text-sm text-muted">Configure your store without touching source code.</p>
      </div>

      <section className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-ink">Store</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Store Name" value={form.storeName} onChange={(e) => update("storeName", e.target.value)} />
          <Input label="Logo URL" value={form.logoUrl} onChange={(e) => update("logoUrl", e.target.value)} />
          <Input label="Favicon URL" value={form.faviconUrl} onChange={(e) => update("faviconUrl", e.target.value)} />
          <Input label="Support Email" value={form.supportEmail} onChange={(e) => update("supportEmail", e.target.value)} />
          <Input label="Support Phone" value={form.supportPhone} onChange={(e) => update("supportPhone", e.target.value)} />
          <Input label="Business Address" value={form.address} onChange={(e) => update("address", e.target.value)} className="sm:col-span-2" />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-ink">Shipping</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Default Shipping Fee (₹)"
            type="number"
            value={form.defaultShippingFee}
            onChange={(e) => update("defaultShippingFee", Number(e.target.value))}
          />
          <Input
            label="Free Shipping Threshold (₹)"
            type="number"
            value={form.freeShippingThreshold}
            onChange={(e) => update("freeShippingThreshold", Number(e.target.value))}
          />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-ink">Payments</h2>
        <div className="flex flex-wrap gap-6">
          <Toggle checked={form.codEnabled} onChange={(v) => update("codEnabled", v)} label="Cash on Delivery" />
          <Toggle checked={form.upiEnabled} onChange={(v) => update("upiEnabled", v)} label="UPI" />
          <Toggle checked={form.cardsEnabled} onChange={(v) => update("cardsEnabled", v)} label="Cards" />
          <Toggle checked={form.netBankingEnabled} onChange={(v) => update("netBankingEnabled", v)} label="Net Banking" />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-ink">Social</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Instagram URL" value={form.instagram} onChange={(e) => update("instagram", e.target.value)} />
          <Input label="Facebook URL" value={form.facebook} onChange={(e) => update("facebook", e.target.value)} />
          <Input label="YouTube URL" value={form.youtube} onChange={(e) => update("youtube", e.target.value)} />
        </div>
      </section>

      <div className="flex items-center gap-3">
        <Button type="submit">Save Settings</Button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-success">
            <CheckCircle2 size={16} /> Saved
          </span>
        )}
      </div>
    </form>
  );
}

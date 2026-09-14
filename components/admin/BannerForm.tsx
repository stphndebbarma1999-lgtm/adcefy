"use client";

import { useState } from "react";
import type { Banner, BannerPosition } from "@/types/banner";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

export type BannerFormData = Omit<Banner, "id">;

export function BannerFormModal({
  open,
  onClose,
  initialBanner,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  initialBanner?: Banner;
  onSubmit: (data: BannerFormData) => void;
}) {
  const [title, setTitle] = useState(initialBanner?.title ?? "");
  const [subtitle, setSubtitle] = useState(initialBanner?.subtitle ?? "");
  const [desktopImage, setDesktopImage] = useState(initialBanner?.desktopImage ?? "");
  const [mobileImage, setMobileImage] = useState(initialBanner?.mobileImage ?? "");
  const [buttonText, setButtonText] = useState(initialBanner?.buttonText ?? "");
  const [buttonUrl, setButtonUrl] = useState(initialBanner?.buttonUrl ?? "");
  const [position, setPosition] = useState<BannerPosition>(initialBanner?.position ?? "carousel");
  const [sortOrder, setSortOrder] = useState(String(initialBanner?.sortOrder ?? 1));
  const [isActive, setIsActive] = useState(initialBanner?.isActive ?? true);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setError("");
    onSubmit({
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      desktopImage: desktopImage.trim(),
      mobileImage: mobileImage.trim() || undefined,
      buttonText: buttonText.trim() || undefined,
      buttonUrl: buttonUrl.trim() || undefined,
      position,
      sortOrder: Number(sortOrder) || 1,
      isActive,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={initialBanner ? "Edit Banner" : "Add Banner"} className="max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} error={error} />
        <Input label="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
        <Input label="Desktop Image URL" value={desktopImage} onChange={(e) => setDesktopImage(e.target.value)} />
        <Input label="Mobile Image URL (optional)" value={mobileImage} onChange={(e) => setMobileImage(e.target.value)} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Button Text" value={buttonText} onChange={(e) => setButtonText(e.target.value)} />
          <Input label="Button URL" value={buttonUrl} onChange={(e) => setButtonUrl(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select label="Position" value={position} onChange={(e) => setPosition(e.target.value as BannerPosition)}>
            <option value="carousel">Homepage Carousel</option>
            <option value="hero">Hero</option>
            <option value="promo">Promo</option>
            <option value="category">Category</option>
          </Select>
          <Input label="Sort Order" type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
        </div>
        <Toggle checked={isActive} onChange={setIsActive} label="Active" />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{initialBanner ? "Save Changes" : "Add Banner"}</Button>
        </div>
      </form>
    </Modal>
  );
}

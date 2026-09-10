"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Drawer({
  open,
  onClose,
  title,
  side = "right",
  children,
  widthClassName = "max-w-md",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  side?: "left" | "right" | "bottom";
  children: ReactNode;
  widthClassName?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const positionClasses =
    side === "right"
      ? cn("right-0 top-0 h-full w-full", widthClassName)
      : side === "left"
        ? cn("left-0 top-0 h-full w-full", widthClassName)
        : "bottom-0 left-0 w-full max-h-[85vh] rounded-t-2xl";

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <button aria-label="Close" className="absolute inset-0 bg-black/50" onClick={onClose} tabIndex={-1} />
      <div className={cn("absolute flex flex-col bg-white shadow-xl", positionClasses)}>
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          {title && <h2 className="text-base font-semibold text-ink">{title}</h2>}
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-auto rounded-md p-1.5 text-muted hover:bg-surface-muted hover:text-ink"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

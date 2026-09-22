import {
  Smartphone,
  Headphones,
  Laptop,
  Watch,
  Monitor,
  LayoutGrid,
  Tablet,
  Camera,
  Gamepad2,
  Speaker,
  Mouse,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

const iconMap: Record<string, ComponentType<LucideProps>> = {
  Smartphone,
  Headphones,
  Laptop,
  Watch,
  Monitor,
  LayoutGrid,
  Tablet,
  Camera,
  Gamepad2,
  Speaker,
  Mouse,
};

export function CategoryIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = iconMap[name] ?? LayoutGrid;
  return <Icon {...props} />;
}

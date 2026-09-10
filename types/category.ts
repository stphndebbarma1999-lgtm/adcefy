export type FilterInputType = "checkbox" | "range" | "toggle";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterDefinition {
  id: string;
  label: string;
  type: FilterInputType;
  options?: FilterOption[];
  min?: number;
  max?: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  /** lucide-react icon name, resolved via components/ui/CategoryIcon */
  icon: string;
  sortOrder: number;
  isActive: boolean;
  filters: FilterDefinition[];
}

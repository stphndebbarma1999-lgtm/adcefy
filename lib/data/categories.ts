import type { Category, FilterDefinition } from "@/types/category";

const priceFilter: FilterDefinition = {
  id: "price",
  label: "Price",
  type: "range",
  min: 0,
  max: 200000,
};

const ratingFilter: FilterDefinition = {
  id: "rating",
  label: "Rating",
  type: "checkbox",
  options: [
    { label: "4★ & above", value: "4" },
    { label: "3★ & above", value: "3" },
    { label: "2★ & above", value: "2" },
  ],
};

function brandFilter(options: string[]): FilterDefinition {
  return {
    id: "brand",
    label: "Brand",
    type: "checkbox",
    options: options.map((b) => ({ label: b, value: b })),
  };
}

export const categories: Category[] = [
  {
    id: "cat-mobile",
    slug: "mobile",
    name: "Mobile",
    description: "Smartphones from the latest flagships to reliable everyday phones.",
    icon: "Smartphone",
    sortOrder: 1,
    isActive: true,
    filters: [
      brandFilter(["Apple", "Samsung", "OnePlus", "Xiaomi"]),
      priceFilter,
      {
        id: "ram",
        label: "RAM",
        type: "checkbox",
        options: [
          { label: "4GB", value: "4gb" },
          { label: "6GB", value: "6gb" },
          { label: "8GB", value: "8gb" },
          { label: "12GB", value: "12gb" },
        ],
      },
      {
        id: "storage",
        label: "Storage",
        type: "checkbox",
        options: [
          { label: "64GB", value: "64gb" },
          { label: "128GB", value: "128gb" },
          { label: "256GB", value: "256gb" },
          { label: "512GB", value: "512gb" },
        ],
      },
      {
        id: "5g",
        label: "5G Enabled",
        type: "toggle",
      },
      ratingFilter,
    ],
  },
  {
    id: "cat-mobile-accessories",
    slug: "mobile-accessories",
    name: "Mobile Accessories",
    description: "Chargers, cables, cases and everything to complete your phone setup.",
    icon: "Headphones",
    sortOrder: 2,
    isActive: true,
    filters: [
      {
        id: "type",
        label: "Type",
        type: "checkbox",
        options: [
          { label: "Chargers", value: "chargers" },
          { label: "Cables", value: "cables" },
          { label: "Cases & Covers", value: "cases" },
          { label: "Screen Protectors", value: "screen-protectors" },
        ],
      },
      brandFilter(["ADCEFY", "Anker", "Belkin", "Spigen"]),
      {
        id: "compatibility",
        label: "Compatibility",
        type: "checkbox",
        options: [
          { label: "Apple", value: "apple" },
          { label: "Android", value: "android" },
          { label: "Universal", value: "universal" },
        ],
      },
      priceFilter,
    ],
  },
  {
    id: "cat-laptop",
    slug: "laptop",
    name: "Laptop",
    description: "Laptops built for work, study, gaming and everyday computing.",
    icon: "Laptop",
    sortOrder: 3,
    isActive: true,
    filters: [
      brandFilter(["Dell", "HP", "Lenovo", "ASUS", "Apple"]),
      {
        id: "processor",
        label: "Processor",
        type: "checkbox",
        options: [
          { label: "Intel Core i3", value: "i3" },
          { label: "Intel Core i5", value: "i5" },
          { label: "Intel Core i7", value: "i7" },
          { label: "AMD Ryzen", value: "ryzen" },
          { label: "Apple Silicon", value: "apple-silicon" },
        ],
      },
      {
        id: "ram",
        label: "RAM",
        type: "checkbox",
        options: [
          { label: "8GB", value: "8gb" },
          { label: "16GB", value: "16gb" },
          { label: "32GB", value: "32gb" },
        ],
      },
      {
        id: "storage",
        label: "Storage",
        type: "checkbox",
        options: [
          { label: "512GB SSD", value: "512gb" },
          { label: "1TB SSD", value: "1tb" },
        ],
      },
      {
        id: "screen-size",
        label: "Screen Size",
        type: "checkbox",
        options: [
          { label: "13\"", value: "13" },
          { label: "14\"", value: "14" },
          { label: "15.6\"", value: "15.6" },
          { label: "16\"", value: "16" },
        ],
      },
      priceFilter,
    ],
  },
  {
    id: "cat-gadgets",
    slug: "gadgets",
    name: "Gadgets",
    description: "Smartwatches, earbuds, speakers and other everyday tech.",
    icon: "Watch",
    sortOrder: 4,
    isActive: true,
    filters: [
      {
        id: "type",
        label: "Type",
        type: "checkbox",
        options: [
          { label: "Smartwatch", value: "smartwatch" },
          { label: "Earbuds", value: "earbuds" },
          { label: "Speaker", value: "speaker" },
        ],
      },
      brandFilter(["ADCEFY", "JBL", "Fossil", "boAt"]),
      {
        id: "connectivity",
        label: "Connectivity",
        type: "checkbox",
        options: [
          { label: "Bluetooth", value: "bluetooth" },
          { label: "Wi-Fi", value: "wifi" },
          { label: "NFC", value: "nfc" },
        ],
      },
      priceFilter,
    ],
  },
  {
    id: "cat-computer",
    slug: "computer",
    name: "Computer",
    description: "Keyboards, mice, monitors and computer accessories.",
    icon: "Monitor",
    sortOrder: 5,
    isActive: true,
    filters: [
      {
        id: "product-type",
        label: "Product Type",
        type: "checkbox",
        options: [
          { label: "Keyboard", value: "keyboard" },
          { label: "Mouse", value: "mouse" },
          { label: "Monitor", value: "monitor" },
        ],
      },
      brandFilter(["Logitech", "Dell", "ADCEFY", "Keychron"]),
      {
        id: "connectivity",
        label: "Connectivity",
        type: "checkbox",
        options: [
          { label: "Wired", value: "wired" },
          { label: "Wireless", value: "wireless" },
          { label: "Bluetooth", value: "bluetooth" },
        ],
      },
      priceFilter,
    ],
  },
];

export function getCategories(): Category[] {
  return categories.filter((c) => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

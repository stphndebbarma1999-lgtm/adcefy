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
    name: "Mobile Phones",
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
    name: "Laptops",
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
  {
    id: "cat-headphones-earbuds",
    slug: "headphones-earbuds",
    name: "Headphones & Earbuds",
    description: "Wired and wireless headphones and earbuds for every budget.",
    icon: "Headphones",
    sortOrder: 6,
    isActive: true,
    filters: [
      {
        id: "type",
        label: "Type",
        type: "checkbox",
        options: [
          { label: "In-Ear", value: "in-ear" },
          { label: "On-Ear", value: "on-ear" },
          { label: "Over-Ear", value: "over-ear" },
        ],
      },
      brandFilter(["ADCEFY", "JBL", "boAt", "Sony"]),
      {
        id: "connectivity",
        label: "Connectivity",
        type: "checkbox",
        options: [
          { label: "Wired", value: "wired" },
          { label: "Bluetooth", value: "bluetooth" },
        ],
      },
      priceFilter,
      ratingFilter,
    ],
  },
  {
    id: "cat-smartwatches",
    slug: "smartwatches",
    name: "Watches",
    description: "Fitness trackers and smartwatches to stay connected on the go.",
    icon: "Watch",
    sortOrder: 7,
    isActive: true,
    filters: [
      brandFilter(["ADCEFY", "Fossil", "boAt", "Apple"]),
      {
        id: "display",
        label: "Display",
        type: "checkbox",
        options: [
          { label: "AMOLED", value: "amoled" },
          { label: "LCD", value: "lcd" },
        ],
      },
      priceFilter,
      ratingFilter,
    ],
  },
  {
    id: "cat-tablets",
    slug: "tablets",
    name: "Tablets",
    description: "Tablets for work, study and entertainment.",
    icon: "Tablet",
    sortOrder: 8,
    isActive: true,
    filters: [
      brandFilter(["Apple", "Samsung", "Lenovo"]),
      {
        id: "storage",
        label: "Storage",
        type: "checkbox",
        options: [
          { label: "64GB", value: "64gb" },
          { label: "128GB", value: "128gb" },
          { label: "256GB", value: "256gb" },
        ],
      },
      priceFilter,
    ],
  },
  {
    id: "cat-cameras",
    slug: "cameras",
    name: "Cameras",
    description: "DSLRs, mirrorless and point-and-shoot cameras.",
    icon: "Camera",
    sortOrder: 9,
    isActive: true,
    filters: [
      {
        id: "type",
        label: "Type",
        type: "checkbox",
        options: [
          { label: "DSLR", value: "dslr" },
          { label: "Mirrorless", value: "mirrorless" },
          { label: "Point & Shoot", value: "point-shoot" },
        ],
      },
      brandFilter(["Canon", "Nikon", "Sony"]),
      priceFilter,
    ],
  },
  {
    id: "cat-gaming",
    slug: "gaming",
    name: "Gaming Monitors",
    description: "Consoles, controllers and gaming accessories.",
    icon: "Gamepad2",
    sortOrder: 10,
    isActive: true,
    filters: [
      {
        id: "type",
        label: "Type",
        type: "checkbox",
        options: [
          { label: "Console", value: "console" },
          { label: "Controller", value: "controller" },
          { label: "Headset", value: "headset" },
        ],
      },
      brandFilter(["Sony", "Microsoft", "Logitech", "ADCEFY"]),
      priceFilter,
    ],
  },
  {
    id: "cat-computer-accessories",
    slug: "computer-accessories",
    name: "Computer Accessories",
    description: "Pen drives, external storage, webcams, cooling pads and other computer add-ons.",
    icon: "Mouse",
    sortOrder: 12,
    isActive: true,
    filters: [
      {
        id: "type",
        label: "Type",
        type: "checkbox",
        options: [
          { label: "Pen Drive", value: "pen-drive" },
          { label: "External Hard Disk", value: "external-hdd" },
          { label: "Webcam", value: "webcam" },
          { label: "Cooling Pad", value: "cooling-pad" },
          { label: "USB Hub", value: "usb-hub" },
          { label: "Laptop Bag", value: "laptop-bag" },
        ],
      },
      brandFilter(["Logitech", "SanDisk", "WD", "Seagate", "ADCEFY"]),
      priceFilter,
    ],
  },
  {
    id: "cat-speakers",
    slug: "speakers",
    name: "Speakers",
    description: "Portable and home speakers for every occasion.",
    icon: "Speaker",
    sortOrder: 11,
    isActive: true,
    filters: [
      brandFilter(["JBL", "boAt", "Sony", "ADCEFY"]),
      {
        id: "connectivity",
        label: "Connectivity",
        type: "checkbox",
        options: [
          { label: "Bluetooth", value: "bluetooth" },
          { label: "Wired", value: "wired" },
          { label: "Wi-Fi", value: "wifi" },
        ],
      },
      priceFilter,
      ratingFilter,
    ],
  },
];

export function getCategories(): Category[] {
  return categories.filter((c) => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

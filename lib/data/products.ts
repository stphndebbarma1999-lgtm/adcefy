import type { Product, ProductSpecification, ProductVariantGroup } from "@/types/product";

let seq = 0;
function nextId(prefix: string) {
  seq += 1;
  return `${prefix}-${seq}`;
}

interface SeedProduct {
  name: string;
  brand: string;
  categorySlug: string;
  categoryId: string;
  subcategory?: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  sku: string;
  rating: number;
  reviewCount: number;
  specifications: ProductSpecification[];
  variants?: ProductVariantGroup[];
  tags: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

function seed(p: SeedProduct): Product {
  const discountPercentage = p.originalPrice
    ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
    : undefined;

  const slug = p.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const now = new Date().toISOString();

  return {
    id: nextId("prod"),
    slug,
    name: p.name,
    brand: p.brand,
    categoryId: p.categoryId,
    categorySlug: p.categorySlug,
    subcategory: p.subcategory,
    shortDescription: p.shortDescription,
    description: p.description,
    price: p.price,
    originalPrice: p.originalPrice,
    discountPercentage,
    images: [],
    rating: p.rating,
    reviewCount: p.reviewCount,
    stock: p.stock,
    sku: p.sku,
    specifications: p.specifications,
    variants: p.variants ?? [],
    tags: p.tags,
    isFeatured: p.isFeatured ?? false,
    isNew: p.isNew ?? false,
    isBestSeller: p.isBestSeller ?? false,
    status: "active",
    createdAt: now,
    updatedAt: now,
  };
}

export const products: Product[] = [
  // ---------------- MOBILE ----------------
  seed({
    name: "Premium 5G Smartphone",
    brand: "ADCEFY",
    categorySlug: "mobile",
    categoryId: "cat-mobile",
    shortDescription: "Flagship 5G smartphone with a pro-grade camera system.",
    description:
      "Experience the pinnacle of mobile technology with the Premium 5G Smartphone. A stunning edge-to-edge display, flagship-class processor, and a versatile triple-camera system come together in a precision-crafted aluminum-and-glass body built for everyday flagship performance.",
    price: 79999,
    originalPrice: 89999,
    stock: 24,
    sku: "MOB-PRM-001",
    rating: 4.6,
    reviewCount: 1248,
    tags: ["5g", "flagship", "smartphone"],
    isFeatured: true,
    isBestSeller: true,
    specifications: [
      { label: "Display", value: "6.7\" AMOLED, 120Hz" },
      { label: "Processor", value: "Octa-core 3.2GHz" },
      { label: "RAM", value: "12GB" },
      { label: "Storage", value: "256GB" },
      { label: "Rear Camera", value: "50MP + 12MP + 10MP" },
      { label: "Front Camera", value: "32MP" },
      { label: "Battery", value: "5000mAh" },
      { label: "Charging", value: "65W Fast Charging" },
      { label: "5G", value: "Yes" },
      { label: "Operating System", value: "Android 15" },
      { label: "Warranty", value: "1 Year Manufacturer Warranty" },
    ],
    variants: [
      {
        id: "v-color",
        name: "Color",
        options: [
          { id: "black", name: "Midnight Black" },
          { id: "blue", name: "Ocean Blue" },
          { id: "white", name: "Pearl White" },
        ],
      },
      {
        id: "v-storage",
        name: "Storage",
        options: [
          { id: "256", name: "256GB" },
          { id: "512", name: "512GB", priceAdjustment: 8000 },
        ],
      },
    ],
  }),
  seed({
    name: "Mid-Range 5G Smartphone",
    brand: "ADCEFY",
    categorySlug: "mobile",
    categoryId: "cat-mobile",
    shortDescription: "Balanced 5G performance with all-day battery life.",
    description:
      "The Mid-Range 5G Smartphone delivers smooth everyday performance, a large high-refresh display, and an all-day battery — a dependable choice for work, streaming and social media without the flagship price tag.",
    price: 24999,
    originalPrice: 27999,
    stock: 40,
    sku: "MOB-MID-002",
    rating: 4.3,
    reviewCount: 612,
    tags: ["5g", "smartphone", "value"],
    isNew: true,
    specifications: [
      { label: "Display", value: "6.5\" IPS LCD, 90Hz" },
      { label: "Processor", value: "Octa-core 2.4GHz" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "128GB" },
      { label: "Rear Camera", value: "50MP + 8MP" },
      { label: "Battery", value: "5000mAh" },
      { label: "Charging", value: "33W Fast Charging" },
      { label: "5G", value: "Yes" },
      { label: "Warranty", value: "1 Year Manufacturer Warranty" },
    ],
    variants: [
      {
        id: "v-color",
        name: "Color",
        options: [
          { id: "black", name: "Graphite Black" },
          { id: "green", name: "Forest Green" },
        ],
      },
      {
        id: "v-storage",
        name: "Storage",
        options: [
          { id: "128", name: "128GB" },
          { id: "256", name: "256GB", priceAdjustment: 2500 },
        ],
      },
    ],
  }),
  seed({
    name: "Budget Smartphone",
    brand: "ADCEFY",
    categorySlug: "mobile",
    categoryId: "cat-mobile",
    shortDescription: "Reliable everyday smartphone at an unbeatable price.",
    description:
      "A no-nonsense smartphone for calls, messaging, and everyday apps. The Budget Smartphone keeps things simple with a large battery and durable build, ideal as a first phone or a backup device.",
    price: 9999,
    originalPrice: 11999,
    stock: 65,
    sku: "MOB-BUD-003",
    rating: 4.0,
    reviewCount: 389,
    tags: ["smartphone", "budget"],
    specifications: [
      { label: "Display", value: "6.5\" HD+ LCD" },
      { label: "Processor", value: "Octa-core 2.0GHz" },
      { label: "RAM", value: "4GB" },
      { label: "Storage", value: "64GB" },
      { label: "Rear Camera", value: "13MP" },
      { label: "Battery", value: "5000mAh" },
      { label: "5G", value: "No" },
      { label: "Warranty", value: "1 Year Manufacturer Warranty" },
    ],
    variants: [
      {
        id: "v-color",
        name: "Color",
        options: [
          { id: "black", name: "Black" },
          { id: "blue", name: "Blue" },
        ],
      },
    ],
  }),

  // ---------------- MOBILE ACCESSORIES ----------------
  seed({
    name: "Fast Charging Adapter",
    brand: "ADCEFY",
    categorySlug: "mobile-accessories",
    categoryId: "cat-mobile-accessories",
    subcategory: "chargers",
    shortDescription: "65W GaN fast charger, compact and travel-friendly.",
    description:
      "Charge your devices at full speed with this compact 65W GaN charging adapter. Its foldable-pin design and multi-device compatibility make it the perfect everyday companion for phones, tablets and laptops.",
    price: 1299,
    originalPrice: 1799,
    stock: 120,
    sku: "ACC-CHG-001",
    rating: 4.5,
    reviewCount: 843,
    tags: ["charger", "fast-charging", "gan"],
    isBestSeller: true,
    specifications: [
      { label: "Output", value: "65W Max" },
      { label: "Ports", value: "1x USB-C, 1x USB-A" },
      { label: "Compatibility", value: "Universal" },
      { label: "Cable Included", value: "No" },
      { label: "Warranty", value: "6 Months" },
    ],
    variants: [
      {
        id: "v-color",
        name: "Color",
        options: [
          { id: "white", name: "White" },
          { id: "black", name: "Black" },
        ],
      },
    ],
  }),
  seed({
    name: "USB-C Charging Cable",
    brand: "ADCEFY",
    categorySlug: "mobile-accessories",
    categoryId: "cat-mobile-accessories",
    subcategory: "cables",
    shortDescription: "Braided USB-C to USB-C cable, 1.5 meters.",
    description:
      "A durable braided USB-C to USB-C cable rated for fast charging and data transfer. Reinforced connectors are tested for 10,000+ bend cycles for long-lasting daily use.",
    price: 399,
    originalPrice: 599,
    stock: 200,
    sku: "ACC-CBL-002",
    rating: 4.4,
    reviewCount: 521,
    tags: ["cable", "usb-c"],
    isNew: true,
    specifications: [
      { label: "Length", value: "1.5m" },
      { label: "Connector", value: "USB-C to USB-C" },
      { label: "Max Output", value: "60W" },
      { label: "Compatibility", value: "Universal" },
      { label: "Warranty", value: "6 Months" },
    ],
    variants: [
      {
        id: "v-color",
        name: "Color",
        options: [
          { id: "black", name: "Black" },
          { id: "white", name: "White" },
        ],
      },
      {
        id: "v-length",
        name: "Length",
        options: [
          { id: "1.5m", name: "1.5m" },
          { id: "2m", name: "2m", priceAdjustment: 100 },
        ],
      },
    ],
  }),
  seed({
    name: "Protective Phone Case",
    brand: "ADCEFY",
    categorySlug: "mobile-accessories",
    categoryId: "cat-mobile-accessories",
    subcategory: "cases",
    shortDescription: "Military-grade drop protection with a slim profile.",
    description:
      "Keep your phone safe without adding bulk. This case combines a shock-absorbent frame with military-grade drop protection, raised bezels for screen and camera protection, and a soft-touch finish.",
    price: 599,
    originalPrice: 999,
    stock: 150,
    sku: "ACC-CSE-003",
    rating: 4.6,
    reviewCount: 967,
    tags: ["case", "protection"],
    isFeatured: true,
    specifications: [
      { label: "Material", value: "TPU + Polycarbonate" },
      { label: "Drop Protection", value: "Up to 2m" },
      { label: "Compatibility", value: "Universal fit guide" },
      { label: "Warranty", value: "3 Months" },
    ],
    variants: [
      {
        id: "v-color",
        name: "Color",
        options: [
          { id: "clear", name: "Clear" },
          { id: "black", name: "Black" },
          { id: "navy", name: "Navy" },
        ],
      },
    ],
  }),

  // ---------------- LAPTOP ----------------
  seed({
    name: "Performance Laptop",
    brand: "ADCEFY",
    categorySlug: "laptop",
    categoryId: "cat-laptop",
    shortDescription: "High-performance laptop for creators and gamers.",
    description:
      "Built for demanding workloads, the Performance Laptop pairs a powerful processor and discrete graphics with a fast SSD and a vivid high-refresh display — equally at home rendering timelines or dominating the game.",
    price: 89999,
    originalPrice: 99999,
    stock: 15,
    sku: "LAP-PRF-001",
    rating: 4.7,
    reviewCount: 356,
    tags: ["laptop", "performance", "gaming"],
    isFeatured: true,
    isBestSeller: true,
    specifications: [
      { label: "Processor", value: "Intel Core i7, 13th Gen" },
      { label: "RAM", value: "16GB DDR5" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: "15.6\" QHD 165Hz" },
      { label: "Graphics", value: "6GB Dedicated GPU" },
      { label: "Operating System", value: "Windows 11" },
      { label: "Battery", value: "Up to 8 hours" },
      { label: "Weight", value: "2.1kg" },
      { label: "Warranty", value: "1 Year Manufacturer Warranty" },
    ],
    variants: [
      {
        id: "v-ram",
        name: "RAM",
        options: [
          { id: "16gb", name: "16GB" },
          { id: "32gb", name: "32GB", priceAdjustment: 12000 },
        ],
      },
      {
        id: "v-storage",
        name: "Storage",
        options: [
          { id: "512gb", name: "512GB" },
          { id: "1tb", name: "1TB", priceAdjustment: 6000 },
        ],
      },
    ],
  }),
  seed({
    name: "Thin & Light Laptop",
    brand: "ADCEFY",
    categorySlug: "laptop",
    categoryId: "cat-laptop",
    shortDescription: "Ultraportable laptop with all-day battery life.",
    description:
      "Slim, light and quiet — the Thin & Light Laptop is designed for life on the move. A crisp full-HD display and long battery life keep you productive from your desk to your daily commute.",
    price: 64999,
    originalPrice: 72999,
    stock: 22,
    sku: "LAP-THN-002",
    rating: 4.5,
    reviewCount: 289,
    tags: ["laptop", "ultrabook", "portable"],
    isNew: true,
    specifications: [
      { label: "Processor", value: "Intel Core i5, 13th Gen" },
      { label: "RAM", value: "16GB LPDDR5" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: "14\" FHD IPS" },
      { label: "Weight", value: "1.3kg" },
      { label: "Battery", value: "Up to 14 hours" },
      { label: "Operating System", value: "Windows 11" },
      { label: "Warranty", value: "1 Year Manufacturer Warranty" },
    ],
    variants: [
      {
        id: "v-color",
        name: "Color",
        options: [
          { id: "silver", name: "Silver" },
          { id: "graphite", name: "Space Graphite" },
        ],
      },
    ],
  }),
  seed({
    name: "Student Laptop",
    brand: "ADCEFY",
    categorySlug: "laptop",
    categoryId: "cat-laptop",
    shortDescription: "Affordable and dependable laptop for study and work.",
    description:
      "A practical everyday laptop built for browsing, documents and online classes. The Student Laptop balances battery life and performance in a durable, easy-to-carry design.",
    price: 34999,
    originalPrice: 39999,
    stock: 30,
    sku: "LAP-STD-003",
    rating: 4.2,
    reviewCount: 174,
    tags: ["laptop", "budget", "student"],
    specifications: [
      { label: "Processor", value: "Intel Core i3, 12th Gen" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: "15.6\" FHD" },
      { label: "Battery", value: "Up to 10 hours" },
      { label: "Operating System", value: "Windows 11" },
      { label: "Warranty", value: "1 Year Manufacturer Warranty" },
    ],
    variants: [
      {
        id: "v-storage",
        name: "Storage",
        options: [
          { id: "512gb", name: "512GB" },
          { id: "1tb", name: "1TB", priceAdjustment: 4000 },
        ],
      },
    ],
  }),

  // ---------------- GADGETS ----------------
  seed({
    name: "Smart Watch",
    brand: "ADCEFY",
    categorySlug: "gadgets",
    categoryId: "cat-gadgets",
    subcategory: "smartwatch",
    shortDescription: "Fitness tracking smartwatch with AMOLED display.",
    description:
      "Track workouts, monitor heart rate and stay connected on the go with a vivid always-on AMOLED display and up to 7 days of battery life. Water-resistant and ready for everyday training.",
    price: 4999,
    originalPrice: 6999,
    stock: 55,
    sku: "GAD-SWT-001",
    rating: 4.4,
    reviewCount: 1102,
    tags: ["smartwatch", "fitness", "wearable"],
    isFeatured: true,
    specifications: [
      { label: "Display", value: "1.43\" AMOLED" },
      { label: "Battery", value: "Up to 7 days" },
      { label: "Water Resistance", value: "5 ATM" },
      { label: "Connectivity", value: "Bluetooth 5.2" },
      { label: "Sensors", value: "Heart Rate, SpO2, Accelerometer" },
      { label: "Compatibility", value: "Android & iOS" },
      { label: "Warranty", value: "1 Year Manufacturer Warranty" },
    ],
    variants: [
      {
        id: "v-color",
        name: "Strap Color",
        options: [
          { id: "black", name: "Black" },
          { id: "beige", name: "Beige" },
          { id: "olive", name: "Olive" },
        ],
      },
    ],
  }),
  seed({
    name: "Wireless Earbuds",
    brand: "ADCEFY",
    categorySlug: "gadgets",
    categoryId: "cat-gadgets",
    subcategory: "earbuds",
    shortDescription: "True wireless earbuds with active noise cancellation.",
    description:
      "Immerse yourself in rich sound with active noise cancellation, a secure comfort-fit design, and a compact charging case that delivers up to 30 hours of combined playback.",
    price: 2499,
    originalPrice: 3499,
    stock: 88,
    sku: "GAD-EAR-002",
    rating: 4.5,
    reviewCount: 1365,
    tags: ["earbuds", "anc", "audio"],
    isNew: true,
    isBestSeller: true,
    specifications: [
      { label: "Driver Size", value: "10mm Dynamic" },
      { label: "Noise Cancellation", value: "Active (ANC)" },
      { label: "Battery Life", value: "8h (Buds) + 22h (Case)" },
      { label: "Connectivity", value: "Bluetooth 5.3" },
      { label: "Water Resistance", value: "IPX4" },
      { label: "Warranty", value: "1 Year Manufacturer Warranty" },
    ],
    variants: [
      {
        id: "v-color",
        name: "Color",
        options: [
          { id: "black", name: "Black" },
          { id: "white", name: "White" },
        ],
      },
    ],
  }),
  seed({
    name: "Bluetooth Speaker",
    brand: "ADCEFY",
    categorySlug: "gadgets",
    categoryId: "cat-gadgets",
    subcategory: "speaker",
    shortDescription: "Portable speaker with deep bass and 12-hour battery.",
    description:
      "A compact, rugged Bluetooth speaker that delivers punchy bass and clear vocals wherever you go. IPX7 water resistance means it's ready for the pool, the trail, or the shower.",
    price: 1999,
    originalPrice: 2999,
    stock: 70,
    sku: "GAD-SPK-003",
    rating: 4.3,
    reviewCount: 754,
    tags: ["speaker", "bluetooth", "portable"],
    specifications: [
      { label: "Output Power", value: "20W" },
      { label: "Battery Life", value: "Up to 12 hours" },
      { label: "Connectivity", value: "Bluetooth 5.1" },
      { label: "Water Resistance", value: "IPX7" },
      { label: "Warranty", value: "1 Year Manufacturer Warranty" },
    ],
    variants: [
      {
        id: "v-color",
        name: "Color",
        options: [
          { id: "black", name: "Black" },
          { id: "red", name: "Red" },
          { id: "blue", name: "Blue" },
        ],
      },
    ],
  }),

  // ---------------- COMPUTER ----------------
  seed({
    name: "Mechanical Keyboard",
    brand: "ADCEFY",
    categorySlug: "computer",
    categoryId: "cat-computer",
    subcategory: "keyboard",
    shortDescription: "Hot-swappable mechanical keyboard with RGB backlight.",
    description:
      "A tactile, hot-swappable mechanical keyboard with per-key RGB lighting and a durable double-shot keycap set — built for both productivity and gaming.",
    price: 3499,
    originalPrice: 4499,
    stock: 42,
    sku: "COM-KEY-001",
    rating: 4.6,
    reviewCount: 892,
    tags: ["keyboard", "mechanical", "rgb"],
    isNew: true,
    specifications: [
      { label: "Switch Type", value: "Hot-swappable Mechanical" },
      { label: "Backlight", value: "Per-key RGB" },
      { label: "Connectivity", value: "USB-C Wired / Bluetooth 5.0" },
      { label: "Layout", value: "75%" },
      { label: "Warranty", value: "1 Year Manufacturer Warranty" },
    ],
    variants: [
      {
        id: "v-switch",
        name: "Switch",
        options: [
          { id: "red", name: "Linear Red" },
          { id: "brown", name: "Tactile Brown" },
        ],
      },
    ],
  }),
  seed({
    name: "Wireless Mouse",
    brand: "ADCEFY",
    categorySlug: "computer",
    categoryId: "cat-computer",
    subcategory: "mouse",
    shortDescription: "Ergonomic wireless mouse with silent clicks.",
    description:
      "A precise, ergonomic wireless mouse with a silent click mechanism and up to 18 months of battery life on a single AA battery — comfortable for all-day use.",
    price: 999,
    originalPrice: 1499,
    stock: 96,
    sku: "COM-MOU-002",
    rating: 4.4,
    reviewCount: 664,
    tags: ["mouse", "wireless", "ergonomic"],
    isBestSeller: true,
    specifications: [
      { label: "Connectivity", value: "2.4GHz Wireless" },
      { label: "DPI", value: "Up to 4000" },
      { label: "Battery Life", value: "Up to 18 months" },
      { label: "Buttons", value: "6 Programmable" },
      { label: "Warranty", value: "1 Year Manufacturer Warranty" },
    ],
    variants: [
      {
        id: "v-color",
        name: "Color",
        options: [
          { id: "black", name: "Black" },
          { id: "grey", name: "Grey" },
        ],
      },
    ],
  }),
  seed({
    name: "Computer Monitor",
    brand: "ADCEFY",
    categorySlug: "computer",
    categoryId: "cat-computer",
    subcategory: "monitor",
    shortDescription: "27-inch QHD monitor with a 100Hz refresh rate.",
    description:
      "A crisp 27-inch QHD IPS monitor with a 100Hz refresh rate, slim bezels and flexible height/tilt adjustment — well suited for productivity, browsing and casual gaming.",
    price: 12999,
    originalPrice: 15999,
    stock: 18,
    sku: "COM-MON-003",
    rating: 4.5,
    reviewCount: 421,
    tags: ["monitor", "qhd", "ips"],
    isFeatured: true,
    specifications: [
      { label: "Screen Size", value: "27\"" },
      { label: "Resolution", value: "2560x1440 (QHD)" },
      { label: "Panel Type", value: "IPS" },
      { label: "Refresh Rate", value: "100Hz" },
      { label: "Ports", value: "HDMI, DisplayPort" },
      { label: "Warranty", value: "3 Years Manufacturer Warranty" },
    ],
    variants: [],
  }),
];

export function getAllProducts(): Product[] {
  return products.filter((p) => p.status === "active");
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getAllProducts().filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return getAllProducts()
    .filter((p) => p.isFeatured)
    .slice(0, limit);
}

export function getNewArrivals(limit = 8): Product[] {
  return getAllProducts()
    .filter((p) => p.isNew)
    .slice(0, limit);
}

export function getBestSellers(limit = 8): Product[] {
  return getAllProducts()
    .filter((p) => p.isBestSeller)
    .slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return getAllProducts()
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return getAllProducts().filter((p) => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.categorySlug.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.specifications.some((s) => s.value.toLowerCase().includes(q))
    );
  });
}

import type { Order } from "@/types/order";
import { products } from "./products";

const p = (slug: string) => products.find((x) => x.slug === slug)!;

export const orders: Order[] = [
  {
    id: "ord-1",
    orderNumber: "ADC10001",
    customerId: "cust-1",
    customerName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98200 11122",
    shippingAddress: {
      fullName: "Aarav Sharma",
      phone: "+91 98200 11122",
      addressLine1: "12 MG Road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560001",
    },
    items: [
      {
        productId: p("premium-5g-smartphone").id,
        name: "Premium 5G Smartphone",
        image: "",
        sku: "MOB-PRM-001",
        variantLabel: "Midnight Black / 256GB",
        quantity: 1,
        price: 79999,
      },
    ],
    subtotal: 79999,
    discount: 0,
    shippingFee: 0,
    total: 79999,
    paymentMethod: "upi",
    paymentStatus: "paid",
    status: "delivered",
    createdAt: "2026-08-01T10:00:00.000Z",
    updatedAt: "2026-08-05T10:00:00.000Z",
  },
  {
    id: "ord-2",
    orderNumber: "ADC10002",
    customerId: "cust-2",
    customerName: "Priya Nair",
    email: "priya.nair@example.com",
    phone: "+91 98450 22233",
    shippingAddress: {
      fullName: "Priya Nair",
      phone: "+91 98450 22233",
      addressLine1: "45 Marine Drive",
      city: "Kochi",
      state: "Kerala",
      pincode: "682001",
    },
    items: [
      {
        productId: p("wireless-earbuds").id,
        name: "Wireless Earbuds",
        image: "",
        sku: "GAD-EAR-002",
        variantLabel: "Black",
        quantity: 2,
        price: 2499,
      },
      {
        productId: p("fast-charging-adapter").id,
        name: "Fast Charging Adapter",
        image: "",
        sku: "ACC-CHG-001",
        variantLabel: "White",
        quantity: 1,
        price: 1299,
      },
    ],
    subtotal: 6297,
    discount: 300,
    shippingFee: 0,
    total: 5997,
    couponCode: "WELCOME10",
    paymentMethod: "card",
    paymentStatus: "paid",
    status: "shipped",
    createdAt: "2026-09-01T10:00:00.000Z",
    updatedAt: "2026-09-03T10:00:00.000Z",
  },
  {
    id: "ord-3",
    orderNumber: "ADC10003",
    customerId: "cust-3",
    customerName: "Rohan Verma",
    email: "rohan.verma@example.com",
    phone: "+91 99870 33344",
    shippingAddress: {
      fullName: "Rohan Verma",
      phone: "+91 99870 33344",
      addressLine1: "88 Sector 21",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122001",
    },
    items: [
      {
        productId: p("smart-watch").id,
        name: "Smart Watch",
        image: "",
        sku: "GAD-SWT-001",
        variantLabel: "Black",
        quantity: 1,
        price: 4999,
      },
    ],
    subtotal: 4999,
    discount: 0,
    shippingFee: 99,
    total: 5098,
    paymentMethod: "cod",
    paymentStatus: "pending",
    status: "pending",
    createdAt: "2026-09-08T10:00:00.000Z",
    updatedAt: "2026-09-08T10:00:00.000Z",
  },
];

export function getOrders(): Order[] {
  return [...orders].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}

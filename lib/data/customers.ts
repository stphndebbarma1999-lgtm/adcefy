import type { Customer } from "@/types/customer";

export const customers: Customer[] = [
  {
    id: "cust-1",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98200 11122",
    addresses: [
      {
        id: "addr-1",
        fullName: "Aarav Sharma",
        phone: "+91 98200 11122",
        addressLine1: "12 MG Road",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560001",
        isDefault: true,
      },
    ],
    orderCount: 3,
    totalSpend: 154997,
    createdAt: "2026-02-14T10:00:00.000Z",
  },
  {
    id: "cust-2",
    name: "Priya Nair",
    email: "priya.nair@example.com",
    phone: "+91 98450 22233",
    addresses: [
      {
        id: "addr-2",
        fullName: "Priya Nair",
        phone: "+91 98450 22233",
        addressLine1: "45 Marine Drive",
        city: "Kochi",
        state: "Kerala",
        pincode: "682001",
        isDefault: true,
      },
    ],
    orderCount: 2,
    totalSpend: 27998,
    createdAt: "2026-03-02T10:00:00.000Z",
  },
  {
    id: "cust-3",
    name: "Rohan Verma",
    email: "rohan.verma@example.com",
    phone: "+91 99870 33344",
    addresses: [
      {
        id: "addr-3",
        fullName: "Rohan Verma",
        phone: "+91 99870 33344",
        addressLine1: "88 Sector 21",
        city: "Gurugram",
        state: "Haryana",
        pincode: "122001",
        isDefault: true,
      },
    ],
    orderCount: 1,
    totalSpend: 4999,
    createdAt: "2026-04-18T10:00:00.000Z",
  },
];

export function getCustomers(): Customer[] {
  return customers;
}

export function getCustomerById(id: string): Customer | undefined {
  return customers.find((c) => c.id === id);
}

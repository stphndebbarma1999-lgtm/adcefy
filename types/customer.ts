import type { Address } from "./order";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  orderCount: number;
  totalSpend: number;
  createdAt: string;
}

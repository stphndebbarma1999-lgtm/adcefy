"use client";

import { useAdminData } from "@/lib/context/AdminDataContext";
import { Table, Thead, Tbody, Th, Td, Tr } from "@/components/ui/Table";
import { formatDate, formatPrice } from "@/lib/utils/format";

export default function AdminCustomersPage() {
  const { customers } = useAdminData();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-bold text-ink">Customers</h1>
        <p className="text-sm text-muted">{customers.length} registered customers</p>
      </div>

      <Table>
        <Thead>
          <Tr>
            <Th>Customer</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Orders</Th>
            <Th>Total Spend</Th>
            <Th>Joined</Th>
          </Tr>
        </Thead>
        <Tbody>
          {customers.map((customer) => (
            <Tr key={customer.id}>
              <Td className="font-medium text-ink">{customer.name}</Td>
              <Td className="text-muted">{customer.email}</Td>
              <Td className="text-muted">{customer.phone}</Td>
              <Td>{customer.orderCount}</Td>
              <Td className="font-medium text-ink">{formatPrice(customer.totalSpend)}</Td>
              <Td className="text-muted">{formatDate(customer.createdAt)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

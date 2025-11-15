"use client";

import { DataTable } from "@/components/ui/data-table";
import { fundingColumns } from "./funding-column";

const fundingData = [
  {
    id: "1",
    amount: 10000,
    transactionId: "1234567890",
    totalAmount: 10000,
    status: "pending",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
  },
  {
    id: "2",
    amount: 20000,
    transactionId: "1234567890",
    totalAmount: 20000,
    status: "completed",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
  },
  {
    id: "3",
    amount: 30000,
    transactionId: "1234567890",
    totalAmount: 30000,
    status: "failed",
    createdAt: "2021-01-01",
    updatedAt: "2021-01-01",
  },
]

export default function FundingTable() {
  return <DataTable columns={fundingColumns} data={fundingData} />;
}
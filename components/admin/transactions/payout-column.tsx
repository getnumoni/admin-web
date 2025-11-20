"use client";

import { formatDateReadable, formatValue } from "@/lib/helper";
import { Payout } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";


export const payoutColumns: ColumnDef<Payout>[] = [
  {
    id: "serialNumber",
    header: "S/N",
    cell: ({ row }) => {
      const serialNumber = row.index + 1;
      return (
        <div className="text-gray-600 text-sm text-center">
          {serialNumber}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "merchantId",
    header: "Merchant ID",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm font-mono">
        {row.getValue("merchantId")}
      </div>
    ),
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => {
      const transactionId = row.getValue("transactionId") as string | null;
      return (
        <div className="text-gray-600 text-sm font-mono">
          {transactionId || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="text-gray-900 text-sm font-medium">
        {formatValue(row.getValue("amount"), true)}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string | null;
      if (!status) {
        return (
          <div className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border bg-gray-100 text-gray-800 border-gray-200">
            N/A
          </div>
        );
      }
      
      const normalizedStatus = status.toUpperCase();
      const statusColor = normalizedStatus === "SUCCESSFUL"
        ? "bg-green-100 text-green-800 border-green-200"
        : normalizedStatus === "FAILURE" || normalizedStatus === "FAILED"
          ? "bg-red-100 text-red-800 border-red-200"
          : "bg-gray-100 text-gray-800 border-gray-200";

      return (
        <div className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${statusColor}`}>
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">
        {formatDateReadable(row.getValue("date"))}
      </div>
    ),
  },
];


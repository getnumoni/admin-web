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
    accessorKey: "merchantName",
    header: "Merchant Name",
    cell: ({ row }) => (
      <div className="text-gray-900 text-sm font-medium">
        {row.getValue("merchantName")}
      </div>
    ),
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
    accessorKey: "branchName",
    header: "Branch Name",
    cell: ({ row }) => {
      const branchName = row.getValue("branchName") as string | null;
      return (
        <div className="text-gray-600 text-sm">
          {branchName || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "payoutAmount",
    header: "Payout Amount",
    cell: ({ row }) => (
      <div className="text-gray-900 text-sm font-medium">
        {formatValue(row.getValue("payoutAmount"), true)}
      </div>
    ),
  },
  {
    accessorKey: "providerFee",
    header: "Provider Fee",
    cell: ({ row }) => {
      const fee = row.getValue("providerFee") as number | null;
      return (
        <div className="text-gray-600 text-sm">
          {fee !== null ? formatValue(fee, true) : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "settlementReference",
    header: "Settlement Reference",
    cell: ({ row }) => {
      const settlementRef = row.getValue("settlementReference") as string | null;
      return (
        <div className="text-gray-600 text-sm font-mono">
          {settlementRef || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "payonusReference",
    header: "Payonus Reference",
    cell: ({ row }) => {
      const payonusRef = row.getValue("payonusReference") as string | null;
      return (
        <div className="text-gray-600 text-sm font-mono">
          {payonusRef || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "merchantBankName",
    header: "Bank Name",
    cell: ({ row }) => {
      const bankName = row.getValue("merchantBankName") as string | null;
      return (
        <div className="text-gray-600 text-sm">
          {bankName || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "accountNumber",
    header: "Account Number",
    cell: ({ row }) => {
      const accountNumber = row.getValue("accountNumber") as string | null;
      return (
        <div className="text-gray-600 text-sm font-mono">
          {accountNumber || "N/A"}
        </div>
      );
    },
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
    accessorKey: "payoutDate",
    header: "Payout Date",
    cell: ({ row }) => {
      const date = row.getValue("payoutDate") as string;
      return (
        <div className="text-gray-600 text-sm">
          {formatDateReadable(date)}
        </div>
      );
    },
  },
];


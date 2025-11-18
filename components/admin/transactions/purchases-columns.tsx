"use client";

import { formatDateReadable, formatValue } from "@/lib/helper";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

export interface PurchaseData {
  source: string | null;
  customerId: string;
  dealId: string | null;
  dealType: string | null;
  units: number | null;
  branchName: string;
  amountPaid: number;
  redeemedPoints: number;
  numoniPoints: number;
  settledAmount: number;
  fees: number;
  issuedPoints: number | null;
  transactionCategory: string | null;
  transactionType: string;
  transactionId: string;
  transactionDescription: string | null;
  purchaseId: string;
  timestamp: string;
}

export const purchasesColumns: ColumnDef<PurchaseData>[] = [
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
    accessorKey: "source",
    header: "Customer Name",
    cell: ({ row }) => (
      <div className="text-gray-900 text-sm font-medium">
        {row.getValue("source") || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "customerId",
    header: "Customer ID",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">
        {row.getValue("customerId")}
      </div>
    ),
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm font-mono">
        {row.getValue("transactionId")}
      </div>
    ),
  },
  {
    accessorKey: "purchaseId",
    header: "Purchase ID",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm font-mono">
        {row.getValue("purchaseId")}
      </div>
    ),
  },
  {
    accessorKey: "dealId",
    header: "Deal ID",
    cell: ({ row }) => {
      const dealId = row.getValue("dealId") as string | null;
      return (
        <div className="text-gray-600 text-sm">
          {dealId || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "dealType",
    header: "Deal Type",
    cell: ({ row }) => {
      const dealType = row.getValue("dealType") as string | null;
      return (
        <div className="text-gray-600 text-sm">
          {dealType || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "branchName",
    header: "Branch",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">
        {row.getValue("branchName")}
      </div>
    ),
  },
  {
    accessorKey: "amountPaid",
    header: "Amount Paid",
    cell: ({ row }) => (
      <div className="text-gray-900 text-sm font-medium">
        {formatValue(row.getValue("amountPaid"), true)}
      </div>
    ),
  },
  {
    accessorKey: "redeemedPoints",
    header: "Redeemed Points",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">
        {formatValue(row.getValue("redeemedPoints"), false)}
      </div>
    ),
  },
  {
    accessorKey: "numoniPoints",
    header: "Numoni Points",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">
        {formatValue(row.getValue("numoniPoints"), false)}
      </div>
    ),
  },
  {
    accessorKey: "settledAmount",
    header: "Settled Amount",
    cell: ({ row }) => (
      <div className="text-gray-900 text-sm font-medium">
        {formatValue(row.getValue("settledAmount"), true)}
      </div>
    ),
  },
  {
    accessorKey: "fees",
    header: "Fees",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">
        {formatValue(row.getValue("fees"), true)}
      </div>
    ),
  },
  {
    accessorKey: "issuedPoints",
    header: "Issued Points",
    cell: ({ row }) => {
      const issuedPoints = row.getValue("issuedPoints") as number | null;
      return (
        <div className="text-gray-600 text-sm">
          {issuedPoints !== null ? formatValue(issuedPoints, false) : "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "timestamp",
    header: "Date",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">
        {formatDateReadable(row.getValue("timestamp"))}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const purchase = row.original;
      return (
        <div className="flex items-center space-x-2">
          <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
            <Eye className="h-4 w-4" />
            View
          </button>
        </div>
      );
    },
  },
];


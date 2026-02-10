"use client";

import { formatDateReadable, formatValue } from "@/lib/helper";
import { FundingReconciliation } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";


export const fundingColumns: ColumnDef<FundingReconciliation>[] = [
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
    accessorKey: "customerId",
    header: "Customer ID",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">
        {row.getValue("customerId")}
      </div>
    ),
  },
  {
    accessorKey: "senderName",
    header: "Sender Name",
    cell: ({ row }) => {
      const senderName = row.original.senderName;
      return (
        <div className="text-gray-900 text-sm font-medium">
          {senderName || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "transactionReference",
    header: "Transaction Reference",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm font-mono">
        {row.getValue("transactionReference")}
      </div>
    ),
  },
  {
    accessorKey: "sessionId",
    header: "Session ID",
    cell: ({ row }) => {
      const sessionId = row.original.sessionId;
      return (
        <div className="text-gray-600 text-sm font-mono">
          {sessionId || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "providerId",
    header: "Provider ID",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm font-mono">
        {row.getValue("providerId")}
      </div>
    ),
  },
  {
    accessorKey: "dynamicAccountNumber",
    header: "Account Number",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">
        {row.getValue("dynamicAccountNumber")}
      </div>
    ),
  },
  {
    accessorKey: "collectionBank",
    header: "Collection Bank",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">
        {row.getValue("collectionBank")}
      </div>
    ),
  },
  {
    accessorKey: "senderBank",
    header: "Sender Bank",
    cell: ({ row }) => {
      const senderBank = row.original.senderBank;
      return (
        <div className="text-gray-600 text-sm">
          {senderBank || "N/A"}
        </div>
      );
    },
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
    accessorKey: "fees",
    header: "Fees",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">
        {formatValue(row.getValue("fees"), true)}
      </div>
    ),
  },
  {
    accessorKey: "pointsIssued",
    header: "Points Issued",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">
        {formatValue(row.getValue("pointsIssued"), false)}
      </div>
    ),
  },
  {
    accessorKey: "providerStatus",
    header: "Provider Status",
    cell: ({ row }) => {
      const status = row.original.providerStatus;
      const statusColor = status === "SUCCESSFUL"
        ? "bg-green-100 text-green-800 border-green-200"
        : status === "Initiative"
          ? "bg-yellow-100 text-yellow-800 border-yellow-200"
          : "bg-gray-100 text-gray-800 border-gray-200";

      return (
        <div className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${statusColor}`}>
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "numoniStatus",
    header: "Numoni Status",
    cell: ({ row }) => {
      const status = row.original.numoniStatus;
      const statusColor = status === "SUCCESSFUL"
        ? "bg-green-100 text-green-800 border-green-200"
        : status === "Initiative"
          ? "bg-yellow-100 text-yellow-800 border-yellow-200"
          : "bg-gray-100 text-gray-800 border-gray-200";

      return (
        <div className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${statusColor}`}>
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "timestamp",
    header: "Date",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">
        {formatDateReadable(row.original.timestamp)}
      </div>
    ),
  },
  // {
  //   id: "actions",
  //   header: "Action",
  //   cell: ({ row }) => {
  //     const funding = row.original;
  //     return (
  //       <div className="flex items-center space-x-2">
  //         <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
  //           <Eye className="h-4 w-4" />
  //           View
  //         </button>
  //       </div>
  //     );
  //   },
  // },
];


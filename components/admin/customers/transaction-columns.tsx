"use client";

import { Badge } from "@/components/ui/badge";
import { formatDateReadable, getTransactionTypeColor } from "@/lib/helper";
import { CustomerTransaction } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";


// Column definitions
export const customerTransactionColumns: ColumnDef<CustomerTransaction>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => {
      const transaction = row.original;
      const customerName = transaction.customerName || "Unknown Customer";
      const customerId = transaction.customerId || "N/A";

      return (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
            {customerName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {customerName}
            </div>
            <div className="text-xs text-gray-500">ID: {customerId}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date & Time",
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <div className="text-gray-600 text-sm">
          <div>{formatDateReadable(transaction.date)}</div>
          <div className="text-xs text-gray-500">{transaction.time}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => {
      const transactionId = row.getValue("transactionId") as string;
      return (
        <div className="text-gray-600 text-sm font-mono">
          {transactionId.slice(-8)}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <Badge
          variant="outline"
          className={`${getTransactionTypeColor(type)} text-xs`}
        >
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      return (
        <div className="text-gray-900 text-sm font-medium">
          ₦{amount.toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: "pointIssued",
    header: "Points Issued",
    cell: ({ row }) => {
      const points = row.getValue("pointIssued") as number | null;
      return (
        <div className="text-gray-600 text-sm">
          {points ? points.toLocaleString() : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string | null;
      return (
        <Badge
          variant="outline"
          className={
            status === "SUCCESSFUL"
              ? "bg-green-100 text-green-800 border-green-200"
              : "bg-gray-100 text-gray-800 border-gray-200"
          }
        >
          {status || "-"}
        </Badge>
      );
    },
  },
];

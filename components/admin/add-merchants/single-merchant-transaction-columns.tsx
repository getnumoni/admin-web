"use client";

import { Badge } from "@/components/ui/badge";
import { Transaction } from "@/data/transactions-data";
import { formatCurrency } from "@/lib/helper";
import { ColumnDef } from "@tanstack/react-table";

export const singleMerchantTransactionColumns: ColumnDef<Transaction>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
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
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => {
      const transactionId = row.getValue("transactionId") as string;
      return (
        <div className="font-medium text-gray-900 truncate" title={transactionId}>
          {transactionId?.length > 12 ? `${transactionId.slice(0, 8)}...` : transactionId}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "customer",
  //   header: "Customer",
  //   cell: ({ row }) => (
  //     <div className="text-gray-900">
  //       {row.getValue("customer")}
  //     </div>
  //   ),
  // },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const typeColors = {
        Purchase: "bg-blue-100 text-blue-800",
        Redemption: "bg-green-100 text-green-800",
        Donation: "bg-purple-100 text-purple-800",
      };
      return (
        <Badge className={typeColors[type as keyof typeof typeColors] || "bg-gray-100 text-gray-800"}>
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return (
        <div className="text-gray-900 font-medium">
          {formatCurrency(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => {
      const balance = row.getValue("balance") as number;
      return (
        <div className="text-gray-900">
          {formatCurrency(balance)}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusColors = {
        Completed: "bg-green-100 text-green-800",
        Processing: "bg-yellow-100 text-yellow-800",
        Pending: "bg-blue-100 text-blue-800",
        Failed: "bg-red-100 text-red-800",
      };
      return (
        <Badge className={statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return (
        <div className="text-gray-900">
          {date.toLocaleDateString()}
        </div>
      );
    },
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const transaction = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(transaction.txnId)}
  //           >
  //             Copy transaction ID
  //           </DropdownMenuItem>
  //           <DropdownMenuItem>View details</DropdownMenuItem>
  //           <DropdownMenuItem>Edit transaction</DropdownMenuItem>
  //           <DropdownMenuItem className="text-red-600">
  //             Delete transaction
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

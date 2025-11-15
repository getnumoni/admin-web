import { Funding } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";


export const fundingColumns: ColumnDef<Funding>[] = [
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
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => {
      const transactionId = row.getValue("transactionId") as string;
      return (
        <div className="text-gray-900 text-sm font-medium">
          {transactionId}
        </div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const totalAmount = row.getValue("totalAmount") as number;
      return (
        <div className="text-gray-900 text-sm font-medium">
          {totalAmount}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="text-gray-900 text-sm font-medium">
          {status}
        </div>
      );
    },
  },
];


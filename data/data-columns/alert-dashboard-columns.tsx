import { ColumnDef } from "@tanstack/react-table";
import { RapidTransfer, LargeTransaction, DuplicateWallet } from "@/schema/alert-dashboard-types";
import { formatCurrency, formatDateReadable } from "@/lib/helper";
import { Badge } from "@/components/ui/badge";

/**
 * Columns for Rapid Transfer Alerts
 * Shows customers who made multiple transfers in a short time
 */
export const rapidTransferColumns: ColumnDef<RapidTransfer>[] = [
  {
    accessorKey: "customerId",
    header: "Customer ID",
    cell: ({ row }) => (
      <span className="font-mono text-sm font-medium text-gray-800">
        {row.original.customerId}
      </span>
    ),
  },
  {
    accessorKey: "count",
    header: "Transfer Count",
    cell: ({ row }) => (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        {row.original.count} transfers
      </Badge>
    ),
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {formatDateReadable(row.original.startTime)}
      </span>
    ),
  },
  {
    accessorKey: "endTime",
    header: "End Time",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {formatDateReadable(row.original.endTime)}
      </span>
    ),
  },
];

/**
 * Columns for Large Transaction Alerts
 * Shows transactions exceeding safety thresholds
 */
export const largeTransactionColumns: ColumnDef<LargeTransaction>[] = [
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-gray-500">
        {row.original.transactionId}
      </span>
    ),
  },
  {
    accessorKey: "customerId",
    header: "Customer ID",
    cell: ({ row }) => (
      <span className="font-mono text-sm font-medium text-gray-800">
        {row.original.customerId}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="text-sm font-semibold text-gray-900">
        {formatCurrency(row.original.amount)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status.toLowerCase();
      const variant = status === 'successful' ? 'default' : 'destructive';
      return (
        <Badge variant={variant} className="capitalize">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {formatDateReadable(row.original.date)}
      </span>
    ),
  },
];

/**
 * Columns for Duplicate Wallet Alerts
 * Shows customers sharing the same email or phone number
 */
export const duplicateWalletColumns: ColumnDef<DuplicateWallet>[] = [
  {
    accessorKey: "value",
    header: "Identifier Value",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-gray-800">
        {row.original.value}
      </span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.type}
      </Badge>
    ),
  },
  {
    accessorKey: "customerIds",
    header: "Linked Customer IDs",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1 max-w-[300px]">
        {row.original.customerIds.map((id) => (
          <Badge key={id} variant="secondary" className="text-[10px] font-mono">
            {id}
          </Badge>
        ))}
      </div>
    ),
  },
];

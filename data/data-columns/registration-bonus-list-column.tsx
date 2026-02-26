import { formatCurrency, formatDateForAPI, getApprovalStatusColor } from "@/lib/helper";
import { RegistrationBonus } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";


export const registrationBonusListColumns: ColumnDef<RegistrationBonus>[] = [
  {
    accessorKey: "customerId",
    header: "Customer ID",
    cell: ({ row }) => (
      <span className="font-mono text-sm font-medium text-gray-800" >
        {row.original.customerId}
      </span>
    ),
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
    cell: ({ row }) => (
      <span className="text-sm text-gray-700" >
        {row.original.customerName ?? <span className="text-gray-400 italic"> N / A </span>}
      </span>
    ),
  },
  {
    accessorKey: "bonusAmount",
    header: "Bonus Amount",
    cell: ({ row }) => (
      <span className="text-sm font-semibold text-gray-800" >
        {formatCurrency(row.original.bonusAmount)}
      </span>
    ),
  },
  {
    accessorKey: "expireAmount",
    header: "Expire Amount",
    cell: ({ row }) => (
      <span className="text-sm text-gray-700" >
        {formatCurrency(row.original.expireAmount ?? 0)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getApprovalStatusColor(status) ?? "bg-gray-100 text-gray-600"}`
          }
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600 whitespace-nowrap" >
        {formatDateForAPI(row.original.createdAt)}
      </span>
    ),
  },
  {
    accessorKey: "expiredAt",
    header: "Expired At",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600 whitespace-nowrap" >
        {formatDateForAPI(row.original.expiredAt ?? "")}
      </span>
    ),
  },
];

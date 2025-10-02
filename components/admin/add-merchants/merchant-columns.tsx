"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import Link from "next/link";

// Merchant type definition
export type Merchant = {
  id: number;
  name: string;
  logo: string;
  dateJoined: string;
  email: string;
  phone: string;
  category: string;
  status: "Verified" | "Pending" | "Suspended";
  statusColor: "green" | "orange" | "red";
};

// Status color mapping
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Verified':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-orange-100 text-orange-800';
    case 'Suspended':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Column definitions
export const merchantColumns: ColumnDef<Merchant>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "merchant",
    header: "Merchant",
    cell: ({ row }) => {
      const merchant = row.original;
      return (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
            {merchant.logo}
          </div>
          <div>
            <Link href={`/admin/merchants/${merchant.id}/?merchantName=${encodeURIComponent(merchant.name)}`}>
              <div className="font-medium text-gray-900 hover:text-theme-dark-green cursor-pointer transition-colors">
                {merchant.name}
              </div>
            </Link>
            <div className="text-xs text-gray-500">ID: {merchant.id}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "dateJoined",
    header: "Date Joined",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">{row.getValue("dateJoined")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email Address",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View Profile
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <MoreVertical className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      );
    },
  },
];

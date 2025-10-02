"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Charity } from "@/data/charity-data";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreVertical } from "lucide-react";
import Link from "next/link";

// Column definitions
export const charityColumns: ColumnDef<Charity>[] = [
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
    accessorKey: "charity",
    header: "Charity",
    cell: ({ row }) => {
      const charity = row.original;
      return (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
            {charity.logo}
          </div>
          <div>
            <Link href={`/admin/charity/${charity.id}/?charityName=${encodeURIComponent(charity.name)}`}>
              <div className="font-medium text-gray-900 hover:text-theme-dark-green cursor-pointer transition-colors">
                {charity.name}
              </div>
            </Link>
            <div className="text-xs text-gray-500">#{charity.charityId}</div>
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
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm max-w-xs truncate" title={row.getValue("address")}>
        {row.getValue("address")}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
            <Eye className="h-4 w-4" />
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

"use client";

import { ActivityLog } from "@/lib/types/activity-log";
import { ColumnDef } from "@tanstack/react-table";

// Column definitions
export const activityLogColumns: ColumnDef<ActivityLog>[] = [
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => (
      <div className="text-sm text-gray-900 font-medium">
        {row.getValue("timestamp")}
      </div>
    ),
  },
  {
    accessorKey: "user",
    header: "User/Actor",
    cell: ({ row }) => (
      <div className="text-sm text-gray-900">
        {row.getValue("user")}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="text-sm text-gray-900">
        {row.getValue("role")}
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="text-sm text-gray-900">
        {row.getValue("action")}
      </div>
    ),
  },
  {
    accessorKey: "details",
    header: "Details",
    cell: ({ row }) => (
      <div className="text-sm text-gray-900 max-w-md">
        {row.getValue("details")}
      </div>
    ),
  },
  {
    accessorKey: "ipAddress",
    header: "IP Address",
    cell: ({ row }) => (
      <div className="text-sm text-gray-900 text-right font-mono">
        {row.getValue("ipAddress")}
      </div>
    ),
  },
];

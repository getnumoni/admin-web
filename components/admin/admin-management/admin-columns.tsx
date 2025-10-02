"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Admin } from "@/lib/types/admin";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import Link from "next/link";

// Status color mapping
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800';
    case 'Suspended':
      return 'bg-red-100 text-red-800';
    case 'Pending':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Column definitions
export const adminColumns: ColumnDef<Admin>[] = [
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
    accessorKey: "admin",
    header: "Full Name",
    cell: ({ row }) => {
      const admin = row.original;
      return (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
            {admin.avatar}
          </div>
          <div>
            <Link href={`/admin/admin-management/${admin.id}/?adminName=${encodeURIComponent(admin.name)}`}>
              <div className="font-medium text-gray-900 hover:text-theme-dark-green cursor-pointer transition-colors">
                {admin.name}
              </div>
            </Link>
            <div className="text-xs text-gray-500">{admin.adminId}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">{row.getValue("dateCreated")}</div>
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
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">{row.getValue("role")}</div>
    ),
  },
  {
    accessorKey: "team",
    header: "Team",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">{row.getValue("team")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-green-500' :
            status === 'Suspended' ? 'bg-red-500' :
              'bg-orange-500'
            }`}></div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const admin = row.original;

      const handleViewProfile = () => {
        console.log('View Profile for:', admin.name);
        // Navigate to profile page or open modal
      };

      const handleEditUser = () => {
        console.log('Edit User for:', admin.name);
        // Navigate to edit page or open edit modal
      };

      const handleSuspendUser = () => {
        console.log('Suspend User:', admin.name);
        // Implement suspend logic
      };

      const handleActivateUser = () => {
        console.log('Activate User:', admin.name);
        // Implement activate logic
      };

      const handleDeactivateUser = () => {
        console.log('Deactivate User:', admin.name);
        // Implement deactivate logic
      };

      const handleDeleteUser = () => {
        console.log('Delete User:', admin.name);
        // Implement delete logic with confirmation
        if (confirm(`Are you sure you want to delete ${admin.name}?`)) {
          // Proceed with deletion
        }
      };

      return (
        <div className="flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none">
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={handleViewProfile}
                className="cursor-pointer"
              >
                View Profile
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleEditUser}
                disabled
                className="cursor-not-allowed text-gray-400"
              >
                Edit User Details
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleSuspendUser}
                disabled
                className="cursor-not-allowed text-gray-400"
              >
                Suspend User
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleActivateUser}
                disabled
                className="cursor-not-allowed text-gray-400"
              >
                Activate User
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleDeactivateUser}
                disabled
                className="cursor-not-allowed text-gray-400"
              >
                Deactivate User
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleDeleteUser}
                className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

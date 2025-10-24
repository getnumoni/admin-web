"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Admin } from "@/lib/types/admin";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import EditAdminModal from "./edit-admin-modal";


// Login access color mapping
const getLoginAccessColor = (loginAccess: boolean) => {
  return loginAccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
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
    accessorKey: "name",
    header: "Full Name",
    cell: ({ row }) => {
      const admin = row.original;
      return (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
            {admin.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <Link href={`/admin/admin-management/${admin.id}/?adminName=${encodeURIComponent(admin.name)}`}>
              <div className="font-medium text-gray-900 hover:text-theme-dark-green cursor-pointer transition-colors">
                {admin.name}
              </div>
            </Link>
            <div className="text-xs text-gray-500">{admin.id}</div>
          </div>
        </div>
      );
    },
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
    accessorKey: "roleName",
    header: "Role",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">{row.getValue("roleName")}</div>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      const department = row.getValue("department") as string | null;
      return (
        <div className="text-gray-600 text-sm">{department || 'N/A'}</div>
      );
    },
  },
  {
    accessorKey: "loginAccess",
    header: "Access Status",
    cell: ({ row }) => {
      const loginAccess = row.getValue("loginAccess") as boolean;
      return (
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${loginAccess ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLoginAccessColor(loginAccess)}`}>
            {loginAccess ? 'Active' : 'Inactive'}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className="text-gray-600 text-sm">
          {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <ActionCell admin={row.original} />;
    },
  },
];

// Action Cell Component
function ActionCell({ admin }: { admin: Admin }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleViewProfile = () => {
    console.log('View Profile for:', admin.name);
    // Navigate to profile page or open modal
  };

  const handleEditUser = () => {
    setIsEditModalOpen(true);
  };

  // const handleDeleteUser = () => {
  //   console.log('Delete User:', admin.name);
  //   // Implement delete logic with confirmation
  //   if (confirm(`Are you sure you want to delete ${admin.name}?`)) {
  //     // Proceed with deletion
  //   }
  // };

  return (
    <>
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
              className="cursor-pointer"
            >
              Edit User Details
            </DropdownMenuItem>

            {/* <DropdownMenuSeparator /> */}
            {/* 
            <DropdownMenuItem
              onClick={handleDeleteUser}
              className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Delete User
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <EditAdminModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        admin={admin}
      />
    </>
  );
}

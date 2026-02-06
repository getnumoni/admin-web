"use client";

import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteCustomer } from "@/hooks/mutation/useDeleteCustomer";
import { getAccountStatusColor } from "@/lib/helper";
import { Customer } from "@/lib/types/customer";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Column definitions
export const customerColumns: ColumnDef<Customer>[] = [
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
    id: "serialNumber",
    header: "S/N",
    cell: ({ row }) => {
      // Serial number starts from 1 for the current page
      // For pagination-aware serial numbers, you would need to pass currentPage and itemsPerPage
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
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.original;
      const customerName = customer.customer || 'Unknown Customer';
      const initials = customerName.split(' ').map(n => n[0]).join('').toUpperCase();
      return (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
            {initials}
          </div>
          <div>
            <Link href={`/dashboard/customers/${customer.userId}/?customerName=${encodeURIComponent(customerName)}`}>
              <div className="font-medium text-gray-900 hover:text-theme-dark-green cursor-pointer transition-colors">
                {customerName}
              </div>
            </Link>
            <div className="text-xs text-gray-500">ID: {customer.customerId}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "emailAddress",
    header: "Email Address",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">{row.getValue("emailAddress")}</div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => (
      <div className="text-gray-600 text-sm">{row.getValue("phoneNumber")}</div>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const address = row.original.address;
      return (
        <div className="text-gray-600 text-sm">{address ?? 0}</div>
      );
    },
  },
  // {
  //   id: "location",
  //   header: "Location",
  //   cell: ({ row }) => {
  //     const street = row.original.street;
  //     const city = row.original.city;

  //     // Build location string
  //     const locationParts = [street, city].filter(Boolean);
  //     const location = locationParts.length > 0 ? locationParts.join(', ') : 'N/A';

  //     return (
  //       <div className="text-gray-600 text-sm max-w-xs truncate" title={location}>
  //         {location}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "kycStatus",
    header: "KYC Status",
    cell: ({ row }) => {
      const kycStatus = row.original.kycStatus;
      if (!kycStatus) {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            N/A
          </span>
        );
      }
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAccountStatusColor(kycStatus)}`}>
          {kycStatus.charAt(0).toUpperCase() + kycStatus.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "walletBalance",
    header: "Wallet Balance",
    cell: ({ row }) => {
      const walletBalance = row.original.walletBalance;
      return (
        <div className="text-gray-600 text-sm">{walletBalance ?? 0}</div>
      );
    },
  },
  {
    accessorKey: "dateJoined",
    header: "Date Joined",
    cell: ({ row }) => {
      const date = new Date(row.original.dateJoined);
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
    header: "Action",
    cell: ({ row }) => {
      return <ActionCell customer={row.original} />;
    },
  },
];

// Action Cell Component
function ActionCell({ customer }: Readonly<{ customer: Customer }>) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { handleDeleteCustomer, isPending, isSuccess } = useDeleteCustomer();
  const router = useRouter();

  const handleViewProfile = () => {
    // Navigate to profile page
    const customerName = customer.customer || 'Unknown Customer';
    router.push(`/dashboard/customers/${customer.userId}/?customerName=${encodeURIComponent(customerName)}`);
  };

  const handleDeleteCustomerClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    handleDeleteCustomer(customer.customerId);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsDeleteDialogOpen(false);
    }
  }, [isSuccess]);

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
              onClick={handleDeleteCustomerClick}
              className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Delete Customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Customer"
        description="This will permanently delete the customer and all associated data."
        itemName={customer.customer || 'Unknown Customer'}
        isLoading={isPending}
      />
    </>
  );
}

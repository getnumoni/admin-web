"use client";

import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteDeals } from "@/hooks/mutation/useDeleteDeals";
import { useUpdateDeals } from "@/hooks/mutation/useUpdateDeals";
import { formatCurrency, formatDateReadable, generateRandomBadgeColor, getDealStatusColor, getDealStatusText } from "@/lib/helper";
import { DealData, EditDealPayload } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, Package } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import EditDealDialog from "./edit-deal-dialog";


// Column definitions
export const dealsColumns: ColumnDef<DealData>[] = [
  {
    accessorKey: "name",
    header: "Deal Title",
    cell: ({ row }) => {
      const deal = row.original;
      return (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            {deal.imagePath && deal.imagePath.length > 0 ? (
              <Image
                src={deal.imagePath[0].imagePath}
                alt={deal.name}
                className="w-10 h-10 rounded-lg object-cover"
                width={40}
                height={40}
              />
            ) : (
              <Package className="h-5 w-5 text-gray-400" />
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900 hover:text-theme-dark-green cursor-pointer transition-colors">
              {deal.name}
            </div>
            <div className="text-xs text-gray-500">{deal.merchantName}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "availableStock",
    header: "Available Stock",
    cell: ({ row }) => (
      <div className="flex items-center space-x-1 text-gray-600 text-sm">
        <span>{row.getValue("availableStock")}</span>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const categories = row.getValue("category") as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {categories.map((category, index) => (
            <span
              key={index}
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${generateRandomBadgeColor(category)}`}
            >
              {category}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "dealType",
    header: "Deal Type",
    cell: ({ row }) => (
      <div className="flex items-center space-x-1 text-gray-600 text-sm">
        <span className="font-medium">{row.getValue("dealType")}</span>
      </div>
    ),
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => (
      <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
        <span>{row.getValue("discount") ?? "0"}</span>
      </div>
    ),
  },
  {
    accessorKey: "initialPrice",
    header: "Initial Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("initialPrice") ?? "0");
      return (
        <div className="flex items-center space-x-1 text-gray-600 text-sm">
          <span>{formatCurrency(price) ?? "-"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const dateStr = row.getValue("startDate") as string;
      // Convert DD-MM-YYYY to YYYY-MM-DD for proper parsing
      const [day, month, year] = dateStr.split('-');
      const formattedDate = `${year}-${month}-${day}`;
      return (
        <div className="flex items-center space-x-1 text-gray-600 text-sm">
          <span>{formatDateReadable(formattedDate)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const dateStr = row.getValue("endDate") as string;
      // Convert DD-MM-YYYY to YYYY-MM-DD for proper parsing
      const [day, month, year] = dateStr.split('-');
      const formattedDate = `${year}-${month}-${day}`;
      return (
        <div className="flex items-center space-x-1 text-gray-600 text-sm">
          <span>{formatDateReadable(formattedDate)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "dealStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("dealStatus") as string;
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDealStatusColor(status)}`}>
          {getDealStatusText(status)}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      return <ActionCell deal={row.original} />;
    },
  },
];

// Action Cell Component
function ActionCell({ deal }: { deal: DealData }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { handleDeleteDeals, isPending, isSuccess } = useDeleteDeals();
  const { handleUpdateDeals, isPending: isUpdatePending, isSuccess: isUpdateSuccess } = useUpdateDeals();

  const handleDeleteDealClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleEditDealClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    handleDeleteDeals({ dealId: deal.id });
  };

  const handleEditSave = (data: Omit<EditDealPayload, 'dealId'>) => {
    handleUpdateDeals({ ...data, dealId: deal.id });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsDeleteDialogOpen(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isUpdateSuccess) {
      setIsEditDialogOpen(false);
    }
  }, [isUpdateSuccess]);

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
              onClick={handleEditDealClick}
              className="cursor-pointer"
            >
              Edit Deal
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleDeleteDealClick}
              className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Delete Deal
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Deal"
        description="This will permanently delete the deal and all associated data."
        itemName={deal.name}
        isLoading={isPending}
      />

      <EditDealDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        deal={deal}
        onSave={handleEditSave}
        isLoading={isUpdatePending}
      />
    </>
  );
}

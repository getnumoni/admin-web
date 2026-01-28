"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { formatValue } from "@/lib/helper";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreVertical } from "lucide-react";
import { useState } from "react";
import EditExpiryDialog from "./edit-expiry-dialog";

export interface PointAllocation {
  id: string;
  name: string;
  userId: string;
  pointBalance: number;
  expiresOn: string;
  location: string;
}

interface PointAllocationColumnsProps {
  onEditExpiry: (id: string, data: { expiryDate: Date; reason: string }) => void;
  onEditPoints: (id: string, data: { newPoints: number; expiryDate: Date; reason: string }) => void;
}

export const createPointAllocationColumns = ({
  onEditExpiry: _onEditExpiry,
  onEditPoints: _onEditPoints,
  currentPage = 0,
  pageSize = 20,
}: PointAllocationColumnsProps & { currentPage?: number; pageSize?: number }): ColumnDef<PointAllocation>[] => {
  return [
    {
      id: "serialNumber",
      header: "S/N",
      cell: ({ row }) => {
        const serialNumber = currentPage * pageSize + row.index + 1;
        return (
          <div className="text-gray-600 text-sm text-center">
            {serialNumber}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: "Customer",
      cell: ({ row }) => {
        const allocation = row.original;
        return (
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{allocation.name}</span>
            <span className="text-sm text-gray-600">{allocation.userId}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "pointBalance",
      header: "Point Balance",
      cell: ({ row }) => {
        const balance = row.getValue("pointBalance") as number;
        return (
          <div className="font-semibold text-gray-900">
            {formatValue(balance, true)}
          </div>
        );
      },
    },
    {
      accessorKey: "expiresOn",
      header: "Expires On",
      cell: ({ row }) => {
        const expiresOn = row.getValue("expiresOn") as string;
        return (
          <div className="text-sm text-gray-600">
            {expiresOn}
          </div>
        );
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => {
        const location = row.getValue("location") as string;
        return (
          <div className="text-sm text-gray-600">
            {location || "N/A"}
          </div>
        );
      },
    },
    // {
    //   id: "actions",
    //   header: "Actions",
    //   cell: ({ row }) => {
    //     const allocation = row.original;
    //     return <PointAllocationActions
    //       allocation={allocation}
    //       onEditExpiry={onEditExpiry}
    //       onEditPoints={onEditPoints}
    //     />;
    //   },
    //   enableSorting: false,
    // },
  ];
};

function PointAllocationActions({
  allocation,
  onEditExpiry,
  onEditPoints: _onEditPoints,
}: {
  allocation: PointAllocation;
  onEditExpiry: (id: string, data: { expiryDate: Date; reason: string }) => void;
  onEditPoints: (id: string, data: { newPoints: number; expiryDate: Date; reason: string }) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditExpiryDialogOpen, setIsEditExpiryDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => setIsEditExpiryDialogOpen(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Expiry Date
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Expiry Dialog */}
      <EditExpiryDialog
        isOpen={isEditExpiryDialogOpen}
        onClose={() => setIsEditExpiryDialogOpen(false)}
        onConfirm={(data) => {
          onEditExpiry(allocation.id, data);
          setIsEditExpiryDialogOpen(false);
        }}
        userName={allocation.name}
        userId={allocation.userId}
        currentExpiryDate={allocation.expiresOn}
      />
    </>
  );
}


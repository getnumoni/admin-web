"use client";

import { DeleteConfirmationDialog } from "@/components/ui/delete-confirmation-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteSponsoredDeal } from "@/hooks/mutation/useDeleteSponsoredDeal";
import { getDealStatusColor } from "@/lib/helper";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import UpdateSponsoredDealDialog from "./update-sponsored-deal-dialog";

export interface SponsorDeal {
  id: string;
  heading: string;
  description: string;
  dealId: string;
  backgroundImage: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SponsorDealColumnsProps {
  onImageClick: (imageUrl: string) => void;
  currentPage?: number;
  pageSize?: number;
}

interface SponsorDealImageCellProps {
  imageUrl: string | null | undefined;
  onImageClick: (imageUrl: string) => void;
}

const SponsorDealImageCell = ({ imageUrl, onImageClick }: SponsorDealImageCellProps) => {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = "/assets/icons/store-icon.svg";

  // Reset error state when imageUrl changes
  useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  const displayImage = imageUrl && !imageError ? imageUrl : fallbackImage;
  const hasValidImage = imageUrl && !imageError;
  const isExternalUrl = imageUrl?.includes('?') || imageUrl?.includes('&') || imageUrl?.startsWith('http');

  return (
    <div className="flex items-center gap-2">
      <div
        className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 cursor-pointer group"
        onClick={() => {
          if (hasValidImage) {
            onImageClick(imageUrl!);
          }
        }}
      >
        <Image
          key={imageUrl || 'fallback'}
          src={displayImage}
          alt="Sponsor deal background"
          fill
          className="object-cover group-hover:opacity-80 transition-opacity"
          onError={() => setImageError(true)}
          unoptimized={isExternalUrl}
        />
        {hasValidImage && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <Eye className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
      </div>
    </div>
  );
};

export const createSponsorDealColumns = ({
  onImageClick,
  currentPage = 0,
  pageSize = 10,
}: SponsorDealColumnsProps): ColumnDef<SponsorDeal>[] => {
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
      accessorKey: "backgroundImage",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.getValue("backgroundImage") as string;
        return (
          <SponsorDealImageCell
            imageUrl={imageUrl}
            onImageClick={onImageClick}
          />
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "heading",
      header: "Heading",
      cell: ({ row }) => {
        const heading = row.getValue("heading") as string;
        return (
          <div className="text-sm text-gray-900 font-medium">
            {heading || "—"}
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const description = row.getValue("description") as string;
        return (
          <div className="text-sm text-gray-600 max-w-md">
            {description || "—"}
          </div>
        );
      },
    },
    {
      accessorKey: "dealId",
      header: "Deal ID",
      cell: ({ row }) => {
        const dealId = row.getValue("dealId") as string;
        return (
          <div className="text-sm text-gray-600 font-mono">
            {dealId || "—"}
          </div>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.getValue("isActive") as boolean;
        const status = isActive ? "active" : "inactive";
        const statusText = isActive ? "Active" : "Inactive";
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDealStatusColor(status)}`}>
            {statusText}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt") as string;
        return (
          <div className="text-sm text-gray-600">
            {createdAt || "—"}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        return <SponsorDealActionCell deal={row.original} />;
      },
      enableSorting: false,
    },
  ];
};

// Action Cell Component
function SponsorDealActionCell({ deal }: { deal: SponsorDeal }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const { handleDeleteSponsoredDeal, isPending, isSuccess } = useDeleteSponsoredDeal();

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateClick = () => {
    setIsUpdateDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    handleDeleteSponsoredDeal({ id: deal.id });
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
              onSelect={(e) => {
                e.preventDefault();
                handleUpdateClick();
              }}
              className="cursor-pointer"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Update
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                handleDeleteClick();
              }}
              className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Sponsored Deal"
        description={`This will permanently delete the sponsored deal and all associated data. Deal ID: ${deal.id}`}
        itemName={deal.heading}
        isLoading={isPending}
      />

      <UpdateSponsoredDealDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
        deal={deal}
      />
    </>
  );
}


"use client";

import { getDealStatusColor } from "@/lib/helper";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Image from "next/image";

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
          <div className="flex items-center gap-2">
            {imageUrl ? (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 cursor-pointer group"
                onClick={() => onImageClick(imageUrl)}
              >
                <Image
                  src={imageUrl}
                  alt="Sponsor deal background"
                  fill
                  className="object-cover group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Eye className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-lg border border-gray-200 bg-gray-100 flex items-center justify-center">
                <span className="text-xs text-gray-400">No Image</span>
              </div>
            )}
          </div>
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
  ];
};


"use client";

import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { formatActivityTimestamp } from "@/lib/helper";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface Review {
  id: string;
  merchantId: string | null;
  customerId: string;
  dealId: string | null;
  createdBy: string | null;
  rating: number;
  comment: string;
  createdDt: string;
  updatedDt: string;
}

interface CustomerReviewTableProps {
  reviews: Review[];
  currentPage?: number;
  pageSize?: number;
  totalRows?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

// Create columns function that accepts pagination props
const createReviewColumns = (currentPage: number = 0, pageSize: number = 10): ColumnDef<Review>[] => [
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
    accessorKey: "merchantId",
    header: "Merchant ID",
    cell: ({ row }) => {
      const merchantId = row.getValue("merchantId") as string | null;
      return (
        <div className="text-gray-900 text-sm font-medium">
          {merchantId || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      const getRatingColor = (rating: number) => {
        if (rating >= 4) return "bg-green-100 text-green-800 border-green-200";
        if (rating >= 3) return "bg-yellow-100 text-yellow-800 border-yellow-200";
        return "bg-red-100 text-red-800 border-red-200";
      };

      return (
        <div className="flex items-center gap-2">
          <Badge className={getRatingColor(rating)}>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              <span>{rating}</span>
            </div>
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => {
      const comment = row.getValue("comment") as string;
      return (
        <div className="text-gray-900 text-sm max-w-md">
          {comment || "No comment"}
        </div>
      );
    },
  },
  {
    accessorKey: "dealId",
    header: "Deal ID",
    cell: ({ row }) => {
      const dealId = row.getValue("dealId") as string | null;
      return (
        <div className="text-gray-600 text-sm">
          {dealId || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "createdDt",
    header: "Date Created",
    cell: ({ row }) => {
      const date = row.getValue("createdDt") as string;
      return (
        <div className="text-gray-600 text-sm">
          {formatActivityTimestamp(date)}
        </div>
      );
    },
  },
];

export default function CustomerReviewTable({
  reviews = [],
  currentPage = 0,
  pageSize = 10,
  totalRows = 0,
  totalPages = 0,
  onPageChange,
}: CustomerReviewTableProps) {
  const [internalPage, setInternalPage] = useState(currentPage);

  // Sync internal page with prop when it changes
  useEffect(() => {
    setInternalPage(currentPage);
  }, [currentPage]);

  // Create columns with current pagination state
  const reviewColumns = useMemo(
    () => createReviewColumns(internalPage, pageSize),
    [internalPage, pageSize]
  );

  // Calculate pagination if not provided
  const itemsPerPage = pageSize;
  const totalItems = totalRows || reviews.length;
  const totalPagesCalculated = totalPages || Math.ceil(totalItems / itemsPerPage);
  const startIndex = internalPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // Slice reviews for current page if pagination is handled internally
  const paginatedReviews = useMemo(() => {
    if (onPageChange) {
      // External pagination - use all reviews
      return reviews;
    }
    // Internal pagination - slice the array
    return reviews.slice(startIndex, endIndex);
  }, [reviews, startIndex, endIndex, onPageChange]);

  const handlePreviousPage = () => {
    const newPage = Math.max(internalPage - 1, 0);
    setInternalPage(newPage);
    onPageChange?.(newPage);
  };

  const handleNextPage = () => {
    const newPage = Math.min(internalPage + 1, totalPagesCalculated - 1);
    setInternalPage(newPage);
    onPageChange?.(newPage);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-0">
          <DataTable columns={reviewColumns} data={paginatedReviews} />
        </div>
      </div>

      {/* Pagination Controls */}
      {totalItems > 0 && (
        <div className="p-4 border border-gray-200 bg-gray-50 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Row Count */}
            <div className="text-sm text-gray-600 order-2 sm:order-1">
              Showing {startIndex + 1}-{endIndex} of {totalItems}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-2 order-1 sm:order-3">
              <button
                onClick={handlePreviousPage}
                disabled={internalPage === 0}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-3 py-1 text-sm text-gray-600 whitespace-nowrap">
                Page {internalPage + 1} of {totalPagesCalculated || 1}
              </span>
              <button
                onClick={handleNextPage}
                disabled={internalPage >= totalPagesCalculated - 1 || totalPagesCalculated === 0}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import SearchInput from "@/components/common/search-input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import useGetDealList from "@/hooks/query/useGetDealList";
import { useDebounce } from "@/hooks/utils/useDebounce";
import { DealData } from "@/lib/types";
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { dealsColumns } from "./deals-columns";

export default function AllDealsData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(0);
  const [size] = useState(20);

  // Debounce search term to avoid too many API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(0);
  }, [debouncedSearchTerm, statusFilter]);

  // Map status filter to API format
  const apiStatus = statusFilter === "all" ? undefined : statusFilter.toUpperCase();

  const { data, isPending, isError, error, refetch } = useGetDealList({
    page,
    size,
    dealName: debouncedSearchTerm || undefined,
    status: apiStatus,
  });

  const dealsData = data?.data?.data?.pageData as DealData[] | undefined;

  const handleResetFilter = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setPage(0);
  };

  // Show loading state
  if (isPending) {
    return <LoadingSpinner message="Loading Deals and Promo..." />;
  }

  // Show error state
  if (isError) {
    return (
      <div className="bg-white rounded-lg">
        <div className="p-6">
          <ErrorState
            title="Error Loading Deals"
            message={error?.message || "Failed to load deals. Please try again."}
            onRetry={refetch}
            retryText="Try Again"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg">
      {/* Header with search and filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <SearchInput
              placeholder="Search deals, merchants, or categories..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="paused">Paused</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilter}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="p-6">
        {dealsData && dealsData.length > 0 ? (
          <DataTable
            columns={dealsColumns}
            data={dealsData}
          />
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg font-medium mb-2">
              {searchTerm || statusFilter !== "all"
                ? "No deals found matching your criteria"
                : "No deals available"}
            </div>
            <div className="text-gray-400 text-sm">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Deals will appear here once they are created"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
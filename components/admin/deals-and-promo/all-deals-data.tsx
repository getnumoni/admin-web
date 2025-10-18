"use client";


import SearchInput from "@/components/common/search-input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { AxiosError, DealData } from "@/lib/types";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { dealsColumns } from "./deals-columns";

interface AllDealsDataProps {
  dealsData: DealData[] | undefined;
  isPending: boolean;
  isError: boolean;
  error: AxiosError | undefined;
  refetch: () => void;
}

export default function AllDealsData({ dealsData, isPending, isError, error, refetch }: AllDealsDataProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter data based on search term and status
  const filteredData = dealsData?.filter((deal) => {
    const matchesSearch = deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.category.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "all" || deal.dealStatus.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  }) || [];

  const handleResetFilter = () => {
    setSearchTerm("");
    setStatusFilter("all");
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
    <div className="bg-white rounded-lg ">
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
        {filteredData.length > 0 ? (
          <DataTable
            columns={dealsColumns}
            data={filteredData}
          />
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg font-medium mb-2">
              {searchTerm || statusFilter !== "all" ? "No deals found matching your criteria" : "No deals available"}
            </div>
            <div className="text-gray-400 text-sm">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Deals will appear here once they are created"
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
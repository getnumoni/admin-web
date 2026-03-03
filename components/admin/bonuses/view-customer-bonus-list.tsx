'use client'

import SearchInput from "@/components/common/search-input";
import { DataTable } from "@/components/ui/data-table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { registrationBonusListColumns } from "@/data/data-columns/registration-bonus-list-column";
import useGetRegistrationBonusList from "@/hooks/query/useGetRegistrationBonusList";
import { extractErrorMessage } from "@/lib/helper";
import { BonusStatus, RegistrationBonus, SearchType } from "@/lib/types";
import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";


const STATUS_OPTIONS: { label: string; value: BonusStatus }[] = [
  { label: "All Statuses", value: "" },
  { label: "Active", value: "ACTIVE" },
  { label: "Processing", value: "PROCESSING" },
  { label: "Used", value: "USED" },
  { label: "Expired", value: "EXPIRED" },
];

const SEARCH_TYPE_OPTIONS: { label: string; value: SearchType }[] = [
  { label: "Search by…", value: "" },
  { label: "Customer ID", value: "customerId" },
  { label: "Customer Name", value: "customerName" },
];

const SEARCH_PLACEHOLDERS: Record<SearchType, string> = {
  customerId: "Enter customer ID…",
  customerName: "Enter customer name…",
  "": "Select a search type first",
};

export function ViewCustomerBonusList() {
  const [statusFilter, setStatusFilter] = useState<BonusStatus>("");
  const [searchType, setSearchType] = useState<SearchType>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(30);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 800);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [statusFilter, debouncedSearch, searchType]);

  // Clear search when search type changes
  useEffect(() => {
    setSearchTerm("");
    setDebouncedSearch("");
  }, [searchType]);

  // Build API params
  const apiParams: {
    page: number;
    size: number;
    status?: string;
    customerId?: string;
  } = {
    page: currentPage,
    size: pageSize,
    ...(statusFilter ? { status: statusFilter } : {}),
    // For now the API only supports customerId — customerName search will be wired when backend supports it
    ...(searchType === "customerId" && debouncedSearch
      ? { customerId: debouncedSearch }
      : {}),
  };

  const { data, isPending, error, isError, refetch } =
    useGetRegistrationBonusList(apiParams);

  const apiData = data?.data?.data;
  const bonuses: RegistrationBonus[] = apiData?.pageData ?? [];
  const totalRows: number = apiData?.totalItems ?? 0;
  const totalPages: number = apiData?.totalPages ?? 0;

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0);
  };

  const handleReset = () => {
    setStatusFilter("");
    setSearchType("");
    setSearchTerm("");
    setDebouncedSearch("");
    setCurrentPage(0);
  };

  if (isPending) {
    return <LoadingSpinner message="Fetching registration bonus list…" />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Error Loading Bonus List"
        message={
          extractErrorMessage(error) ||
          "Failed to load registration bonus list. Please try again."
        }
        onRetry={refetch}
        retryText="Retry"
      />
    );
  }

  return (
    <main>
      <h2 className="text-xl font-semibold mb-4">Customer Bonus List</h2>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {/* ── Filters Header ── */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col gap-4">
            {/* Row 1: Search type + Search input */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search type dropdown */}
              <div className="w-full sm:w-48 shrink-0">
                <Select
                  value={searchType || "__none__"}
                  onValueChange={(v) => setSearchType(v === "__none__" ? "" : (v as SearchType))}
                >
                  <SelectTrigger className="w-full h-[42px] shadow-none">
                    <SelectValue placeholder="Search by…" />
                  </SelectTrigger>
                  <SelectContent>
                    {SEARCH_TYPE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value || "__none__"} value={opt.value || "__none__"}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search input */}
              <div className="flex-1">
                <SearchInput
                  placeholder={SEARCH_PLACEHOLDERS[searchType]}
                  value={searchTerm}
                  onChange={setSearchTerm}
                  disabled={!searchType}
                />
              </div>
            </div>

            {/* Row 2: Status filter + Reset */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
              {/* Status filter dropdown */}
              <div className="w-full sm:w-56">
                <Select
                  value={statusFilter || "__all__"}
                  onValueChange={(v) =>
                    setStatusFilter(v === "__all__" ? "" : (v as BonusStatus))
                  }
                >
                  <SelectTrigger className="w-full h-[42px] shadow-none">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value || "__all__"} value={opt.value || "__all__"}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Reset button */}
              <div className="flex items-center">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer h-[42px]"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span className="hidden sm:inline">Reset Filter</span>
                  <span className="sm:hidden">Reset</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="p-0">
          {bonuses.length === 0 ? (
            <EmptyState
              title="No Bonus Records Found"
              description="No registration bonuses match your current filters. Try adjusting your search criteria."
            />
          ) : (
            <DataTable columns={registrationBonusListColumns} data={bonuses} />
          )}
        </div>

        {/* ── Pagination ── */}
        {bonuses.length > 0 && (
          <DataTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalRows={totalRows}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>
    </main>
  );
}
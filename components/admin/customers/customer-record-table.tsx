'use client'

import { DataTable } from "@/components/ui/data-table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { ADMIN_CUSTOMERS_ADD_URL } from "@/constant/routes";
import useGetCustomers from "@/hooks/query/useGetCustomers";
import { extractErrorMessage, formatDateForAPI, getSearchPlaceholder, getTimelineDates, parseCustomerSearchTerm } from "@/lib/helper";
import { DateRangeOption, FilterType } from "@/lib/types";
import { Customer } from "@/lib/types/customer";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { customerColumns } from "./customer-columns";
import CustomersHeaderSection from "./customers-header-section";

export default function CustomerRecordTable() {

  const [filterType, setFilterType] = useState<FilterType>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // 0-based for server-side pagination
  const [pageSize, setPageSize] = useState(20);
  const [dateRangeOption, setDateRangeOption] = useState<DateRangeOption>(null);
  const [customStartDate, setCustomStartDate] = useState<Date | undefined>(undefined);
  const [customEndDate, setCustomEndDate] = useState<Date | undefined>(undefined);

  // Convert date range option to API date strings in dd-mm-yyyy format
  const { startDate, endDate } = useMemo(() => {
    if (dateRangeOption === 'Custom Range') {
      // Use custom dates if Custom Range is selected
      if (customStartDate && customEndDate) {
        // Format dates as dd-mm-yyyy
        const formatDate = (date: Date): string => {
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          return `${day}-${month}-${year}`;
        };
        return {
          startDate: formatDate(customStartDate),
          endDate: formatDate(customEndDate),
        };
      }
      return { startDate: undefined, endDate: undefined };
    }

    if (dateRangeOption === null) {
      return { startDate: undefined, endDate: undefined };
    }

    // Use getTimelineDates for predefined ranges (returns yyyy-MM-dd)
    // Convert to dd-mm-yyyy format using formatDateForAPI
    const dates = getTimelineDates(dateRangeOption);
    return {
      startDate: formatDateForAPI(dates.startDate),
      endDate: formatDateForAPI(dates.endDate),
    };
  }, [dateRangeOption, customStartDate, customEndDate]);


  // Debounce search term - wait 1 second after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // Parse search term based on selected filter type
  const searchFilters = parseCustomerSearchTerm(debouncedSearchTerm, filterType);

  // Use parsed search filters, pass page (0-based) and size
  const { data, isPending, error, isError, refetch } = useGetCustomers({
    page: currentPage,
    size: pageSize,
    ...searchFilters,
    startDate,
    endDate,
  });

  // Extract customers data from API response
  const apiData = data?.data?.data;
  const customers: Customer[] = apiData?.pageData || [];
  const totalRows = apiData?.totalRows || 0;
  const totalPages = apiData?.totalPages || 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0); // Reset to first page when page size changes
  };

  // Reset to first page when debounced search term, filter type, or date range changes
  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearchTerm, filterType, dateRangeOption, customStartDate, customEndDate]);

  // Clear search term when filter type changes
  useEffect(() => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
  }, [filterType]);

  const handleDateRangeDatesChange = (start: Date | undefined, end: Date | undefined) => {
    setCustomStartDate(start);
    setCustomEndDate(end);
  };

  const handleResetFilter = () => {
    setFilterType('');
    setSearchTerm('');
    setDebouncedSearchTerm('');
    setDateRangeOption(null);
    setCustomStartDate(undefined);
    setCustomEndDate(undefined);
    setCurrentPage(0); // Reset to first page when clearing filters
  };

  // Show loading state
  if (isPending) {
    return (
      <LoadingSpinner message="Loading customers..." />
    );
  }

  // Show error state
  if (isError) {
    return (
      <ErrorState title="Error Loading Customers" message={extractErrorMessage(error) || "Failed to load customers. Please try again."} onRetry={refetch} retryText="Retry" />
    );
  }
  return (
    <main>
      <h2 className="text-xl font-semibold mb-4">Customer Records</h2>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {/* Header with Search and Filters */}
        <CustomersHeaderSection
          filterType={filterType}
          onFilterTypeChange={setFilterType}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder={getSearchPlaceholder(filterType)}
          dateRangeOption={dateRangeOption}
          onDateRangeChange={setDateRangeOption}
          onDateRangeDatesChange={handleDateRangeDatesChange}
          onResetFilter={handleResetFilter}
        />

        {/* Data Table */}
        <div className="p-0">
          {customers.length === 0 ? (
            // Empty State
            <EmptyState
              title="No Customers Found"
              description="No customers match your current search criteria. Try adjusting your search terms."
              actionButton={
                <Link href={ADMIN_CUSTOMERS_ADD_URL}>
                  <button className="flex items-center gap-2 bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer">
                    <Plus className="h-5 w-5" />
                    Add Customers
                  </button>
                </Link>
              }
            />
          ) : (
            // Data Table
            <DataTable columns={customerColumns} data={customers} />
          )}
        </div>

        {/* Pagination */}
        {customers.length > 0 && (
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
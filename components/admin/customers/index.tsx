'use client';

import SearchInput from '@/components/common/search-input';
import { DataTable } from '@/components/ui/data-table';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { ADMIN_CUSTOMERS_ADD_URL } from '@/constant/routes';
import useGetCustomers from '@/hooks/query/useGetCustomers';
import { Customer } from '@/lib/types/customer';
import { ChevronLeft, ChevronRight, Download, Info, Plus, RefreshCw, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { customerColumns } from './customer-columns';

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // 0-based for server-side pagination

  const itemsPerPage = 20;

  // Use searchTerm as name filter, pass page (0-based) and size
  const { data, isPending, error, isError, refetch } = useGetCustomers({
    page: currentPage,
    size: itemsPerPage,
    name: searchTerm.trim() || undefined, // Send search term as name filter
  });

  // Extract customers data from API response
  const apiData = data?.data?.data;
  const customers: Customer[] = apiData?.pageData || [];
  const totalRows = apiData?.totalRows || 0;
  const totalPages = apiData?.totalPages || 0;

  // Calculate pagination display values
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalRows);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  };

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  const handleResetFilter = () => {

    setSearchTerm('');
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
      <ErrorState title="Error Loading Customers" message={error?.message || "Failed to load customers. Please try again."} onRetry={refetch} retryText="Retry" />
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      {/* Header with Search and Filters */}
      <div className="p-4 sm:p-6 border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          {/* Search Input */}
          <div className="w-full lg:max-w-md">
            <SearchInput
              placeholder="Search Customers Name"
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">

            <button
              onClick={handleResetFilter}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset Filter</span>
              <span className="sm:hidden">Reset</span>
            </button>
          </div>
        </div>
      </div>

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

      {/* Pagination and Row Actions */}
      {customers.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Row Count */}
            <div className="text-sm text-gray-600 order-2 sm:order-1">
              Showing {startIndex + 1}-{endIndex} of {totalRows}
            </div>

            {/* Row Action Icons */}
            <div className="flex items-center gap-2 sm:gap-4 order-1 sm:order-2">
              <button
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="Download"
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="Information"
              >
                <Info className="h-4 w-4" />
              </button>
              <button
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-2 order-3">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-3 py-1 text-sm text-gray-600 whitespace-nowrap">
                Page {currentPage + 1} of {totalPages || 1}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1 || totalPages === 0}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
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
'use client';

import { DataTable } from '@/components/ui/data-table';
import { EmptyState } from '@/components/ui/empty-state';
import LoadingSpinner from '@/components/ui/loading-spinner';
import useGetTransactionByMerchantId from '@/hooks/query/useGetTransactionByMerchantId';
import { ChevronLeft, ChevronRight, Download, Info, RefreshCw, Search, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { singleMerchantTransactionColumns } from './single-merchant-transaction-columns';

export default function SingleMerchantTransaction({ merchantId }: { merchantId: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // 0-based for API
  const itemsPerPage = 30;

  const { data, isPending, error, isError, refetch } = useGetTransactionByMerchantId({
    merchantId,
    page: currentPage,
    size: itemsPerPage,
    searchTerm: searchTerm.trim() || undefined,
  });

  // Get transactions from API data
  const apiTransactions = data?.data?.data?.content || data?.data?.data || [];
  const totalRows = data?.data?.data?.totalElements || data?.data?.data?.totalRows || 0;
  const totalPages = data?.data?.data?.totalPages || 0;

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  };

  const handleResetFilter = () => {
    setSearchTerm('');
    setCurrentPage(0);
  };

  const handleSearch = () => {
    setCurrentPage(0); // Reset to first page when searching
    refetch();
  };

  // Render function for data table content
  const renderDataTableContent = () => {
    if (isPending) {
      return <LoadingSpinner message="Loading transactions..." />;
    }

    if (isError) {
      return (
        <EmptyState
          title="Error Loading Transactions"
          description={`${error?.message || 'There was an error loading the transaction data. Please try again.'}`}
          actionButton={
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </button>
          }
        />
      );
    }

    if (apiTransactions.length === 0) {
      return (
        <EmptyState
          title={searchTerm ? "No Matching Transactions" : "No Transactions Found"}
          description={
            searchTerm
              ? "No transactions match your current search criteria. Try adjusting your search terms."
              : "This merchant has no transactions yet. Transactions will appear here once the merchant starts processing orders."
          }
        />
      );
    }

    return <DataTable columns={singleMerchantTransactionColumns} data={apiTransactions} />;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      {/* Header with Search and Filters */}
      <div className="p-6 border-gray-200">
        <div className="flex items-center justify-between mb-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Search and Reset Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSearch}
              disabled={isPending}
              className="flex items-center gap-2 px-4 py-2 bg-theme-dark-green text-white rounded-lg hover:bg-theme-dark-green/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
            <button
              onClick={handleResetFilter}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="p-0">
        {renderDataTableContent()}
      </div>

      {/* Pagination and Row Actions */}
      {apiTransactions.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            {/* Row Count */}
            <div className="text-sm text-gray-600">
              Showing {currentPage * itemsPerPage + 1}-{Math.min((currentPage + 1) * itemsPerPage, totalRows)} of {totalRows}
            </div>

            {/* Row Action Icons */}
            <div className="flex items-center gap-4">
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
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Page {currentPage + 1} of {totalPages || 1}
              </span>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0 || isPending}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1 || isPending}
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
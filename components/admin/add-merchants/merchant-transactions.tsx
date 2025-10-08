'use client';

import { DataTable } from '@/components/ui/data-table';
import { EmptyState } from '@/components/ui/empty-state';
import LoadingSpinner from '@/components/ui/loading-spinner';

import { Button } from '@/components/ui/button';
import useGetMerchantTransactions from '@/hooks/query/useGetMerchantTransactions';
import { MerchantTransaction } from '@/lib/types';
import { ChevronLeft, ChevronRight, Download, Info, RefreshCw, Search, Trash2, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { transactionColumns } from './transaction-columns';

export default function MerchantTransactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isPending, error, isError } = useGetMerchantTransactions();
  const apiData = data?.data?.data;
  const transactionsData: MerchantTransaction[] = apiData?.pageData || [];
  // const totalRows = apiData?.totalRows || 0;
  // const totalPages = apiData?.totalPages || 1;
  // const currentApiPage = apiData?.currentPage || 0;

  const itemsPerPage = 12; // Based on the design showing 12 items

  // Filter transactions based on search term only
  const filteredTransactions = useMemo(() => {
    if (!searchTerm.trim()) return transactionsData;

    const searchLower = searchTerm.toLowerCase().trim();
    return transactionsData.filter(transaction =>
      transaction.merchantName.toLowerCase().includes(searchLower) ||
      transaction.transactionId.toLowerCase().includes(searchLower) ||
      transaction.type.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleResetFilter = () => {
    setSearchTerm('');
  };

  // Show loading state after all hooks
  if (isPending) {
    return <LoadingSpinner />;
  }

  // Show error state
  if (isError) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <div className="text-center">
          <div className="text-red-500 text-lg font-semibold mb-2">Error Loading Transactions</div>
          <div className="text-gray-600 mb-4">
            {error?.message || "Failed to load transactions. Please try again."}
          </div>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="px-4 py-2  text-white rounded-lg  transition-colors"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Render function for data table content
  const renderDataTableContent = () => {
    if (currentTransactions.length === 0) {
      return (
        <EmptyState
          title="No Transactions Found"
          description="No transactions match your current search or filter criteria. Try adjusting your search terms or filters."
        />
      );
    }

    return <DataTable columns={transactionColumns} data={currentTransactions} />;
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

          {/* Reset Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetFilter}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Search
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="p-0">
        {renderDataTableContent()}
      </div>

      {/* Pagination and Row Actions */}
      {currentTransactions.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            {/* Row Count */}
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredTransactions.length)} of {filteredTransactions.length}
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
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
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
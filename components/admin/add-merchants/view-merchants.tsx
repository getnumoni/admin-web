'use client';

import SearchInput from '@/components/common/search-input';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { EmptyState } from '@/components/ui/empty-state';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { ADMIN_MERCHANTS_ADD_URL } from '@/constant/routes';
import useGetAllMerchants from '@/hooks/query/useGetAllMerchants';
import { ChevronLeft, ChevronRight, Download, Info, Plus, RefreshCw, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Merchant, merchantColumns } from './merchant-columns';

export default function ViewMerchants() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // const [filterBy, setFilterBy] = useState('');
  // const [dateFilter, setDateFilter] = useState('');
  // const [orderStatus, setOrderStatus] = useState('');
  // const [showFilters, setShowFilters] = useState(false);
  const { data, isPending, error, isError, refetch } = useGetAllMerchants();

  // Extract merchants data from API response
  const apiData = data?.data?.data;
  const merchantsData: Merchant[] = apiData?.pageData || [];
  // const totalRows = apiData?.totalRows || 0;
  // const totalPages = apiData?.totalPages || 1;
  // const currentApiPage = apiData?.currentPage || 0;

  // Filter merchants based on search term
  const filteredMerchants = useMemo(() => {
    if (!searchTerm.trim()) return merchantsData;

    const searchLower = searchTerm.toLowerCase().trim();
    return merchantsData.filter(merchant =>
      merchant.businessName.toLowerCase().includes(searchLower) ||
      merchant.email.toLowerCase().includes(searchLower) ||
      merchant.category.some(cat => cat.toLowerCase().includes(searchLower))
    );
  }, [searchTerm, merchantsData]);

  const itemsPerPage = 20;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMerchants = filteredMerchants.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredMerchants.length / itemsPerPage)));
  };

  const handleResetFilter = () => {
    // setFilterBy('');
    // setDateFilter('');
    // setOrderStatus('');
    setSearchTerm('');
  };

  // Render function for data table content
  const renderDataTableContent = () => {
    if (currentMerchants.length === 0) {
      return (
        <EmptyState
          title="No Merchants Found"
          description="No merchants match your current search or filter criteria. Try adjusting your search terms or filters."
          actionButton={
            <Link href={ADMIN_MERCHANTS_ADD_URL}>
              <Button className="flex items-center gap-2 bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer">
                <Plus className="h-5 w-5" />
                Add Merchants
              </Button>
            </Link>
          }
        />
      );
    }

    return <DataTable columns={merchantColumns} data={currentMerchants} />;
  };

  // Show loading state
  if (isPending) {
    return (
      <LoadingSpinner />
    );
  }

  // Show error state
  if (isError) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-gray-200">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-red-500 text-center">
              <h3 className="text-lg font-semibold mb-2">Error Loading Merchants</h3>
              <p className="text-gray-600 mb-4">{error?.message || "Failed to load merchants. Please try again."}</p>
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-theme-dark-green text-white rounded-lg hover:bg-theme-dark-green/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      {/* Header with Search and Filters */}
      <div className="p-6  border-gray-200">
        <div className="flex items-center justify-between mb-4">
          {/* Search Input */}
          <SearchInput
            placeholder="Search by name, email, or category..."
            value={searchTerm}
            onChange={setSearchTerm}
          />

          {/* Filter Buttons */}
          <div className="flex items-center gap-3">
            {/* <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filter By
            </button>

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Date
              <ChevronDown className="h-4 w-4" />
            </button>

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Order Status
              <ChevronDown className="h-4 w-4" />
            </button> */}

            <button
              onClick={handleResetFilter}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Filter
            </button>
          </div>
        </div>

      </div>

      {/* Data Table */}
      <div className="p-0">
        {renderDataTableContent()}
      </div>

      {/* Pagination and Row Actions */}
      {currentMerchants.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            {/* Row Count */}
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredMerchants.length)} of {filteredMerchants.length} merchants
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
              <span className="text-sm text-gray-600 px-3">
                Page {currentPage} of {Math.ceil(filteredMerchants.length / itemsPerPage)}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(filteredMerchants.length / itemsPerPage)}
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
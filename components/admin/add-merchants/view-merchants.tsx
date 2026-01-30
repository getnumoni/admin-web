'use client';

import { DataTable } from '@/components/ui/data-table';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { ADMIN_MERCHANTS_ADD_URL } from '@/constant/routes';
import useGetAllMerchants from '@/hooks/query/useGetAllMerchants';
import { extractErrorMessage, formatDateForAPI, getTimelineDates } from '@/lib/helper';
import { DateRangeOption } from '@/lib/types';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Merchant, merchantColumns } from './merchant-columns';
import MerchantsHeaderSection from './merchants-header-section';

type FilterType = 'businessName' | 'merchantEmail' | 'merchantPhoneNo' | 'merchantId' | '';

export default function ViewMerchants() {
  const [filterType, setFilterType] = useState<FilterType>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // 0-based for server-side pagination
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [dateRangeOption, setDateRangeOption] = useState<DateRangeOption>(null);
  const [customStartDate, setCustomStartDate] = useState<Date | undefined>(undefined);
  const [customEndDate, setCustomEndDate] = useState<Date | undefined>(undefined);
  const [approvalStatus, setApprovalStatus] = useState('');

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

  // Parse search term based on selected filter type
  const parseSearchTerm = (searchValue: string, type: FilterType) => {
    const trimmed = searchValue.trim();
    if (!trimmed || !type) {
      return {
        businessName: undefined,
        merchantEmail: undefined,
        merchantPhoneNo: undefined,
        merchantId: undefined,
      };
    }

    // Apply filter based on selected type
    switch (type) {
      case 'businessName':
        return {
          businessName: trimmed,
          merchantEmail: undefined,
          merchantPhoneNo: undefined,
          merchantId: undefined,
        };
      case 'merchantEmail':
        return {
          businessName: undefined,
          merchantEmail: trimmed,
          merchantPhoneNo: undefined,
          merchantId: undefined,
        };
      case 'merchantPhoneNo': {
        // Clean phone number (remove spaces, dashes, parentheses, keep + if present)
        const digitsOnly = trimmed.replaceAll(/\D/g, '');
        const hasPlus = trimmed.startsWith('+');
        const cleanedPhone = hasPlus ? '+' + digitsOnly : digitsOnly;
        return {
          businessName: undefined,
          merchantEmail: undefined,
          merchantPhoneNo: cleanedPhone,
          merchantId: undefined,
        };
      }
      case 'merchantId':
        return {
          businessName: undefined,
          merchantEmail: undefined,
          merchantPhoneNo: undefined,
          merchantId: trimmed,
        };
      default:
        return {
          businessName: undefined,
          merchantEmail: undefined,
          merchantPhoneNo: undefined,
          merchantId: undefined,
        };
    }
  };

  // Get placeholder text based on filter type
  const getSearchPlaceholder = (type: FilterType): string => {
    switch (type) {
      case 'businessName':
        return 'Enter business name';
      case 'merchantEmail':
        return 'Enter merchant email';
      case 'merchantPhoneNo':
        return 'Enter phone number';
      case 'merchantId':
        return 'Enter merchant ID';
      default:
        return 'Select filter type first';
    }
  };

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
  const searchFilters = parseSearchTerm(debouncedSearchTerm, filterType);

  // Use parsed search filters, pass page (0-based) and size
  const { data, isPending, error, isError, refetch } = useGetAllMerchants({
    page: currentPage,
    size: itemsPerPage,
    ...searchFilters,
    startDate,
    endDate,
    approvalStatus: approvalStatus && approvalStatus !== 'all' ? approvalStatus : undefined,
  });

  // Extract merchants data from API response
  const apiData = data?.data?.data;
  const merchants: Merchant[] = apiData?.pageData || [];
  const totalRows = apiData?.totalRows || 0;
  const totalPages = apiData?.totalPages || 0;

  const handleResetFilter = () => {
    setFilterType('');
    setSearchTerm('');
    setDebouncedSearchTerm('');
    setDateRangeOption(null);
    setCustomStartDate(undefined);
    setCustomEndDate(undefined);
    setApprovalStatus('');
    setCurrentPage(0); // Reset to first page when clearing filters
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setItemsPerPage(size);
    setCurrentPage(0); // Reset to first page when page size changes
  };

  const handleDateRangeDatesChange = (start: Date | undefined, end: Date | undefined) => {
    setCustomStartDate(start);
    setCustomEndDate(end);
  };

  // Reset to first page when debounced search term, filter type, date range, or approval status changes
  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearchTerm, filterType, dateRangeOption, customStartDate, customEndDate, approvalStatus]);

  // Clear search term when filter type changes
  useEffect(() => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
  }, [filterType]);

  // Render function for data table content
  const renderDataTableContent = () => {
    if (merchants.length === 0) {
      return (
        <EmptyState
          title="No Merchants Found"
          description="No merchants match your current search criteria. Try adjusting your search terms."
          actionButton={
            <Link href={ADMIN_MERCHANTS_ADD_URL}>
              <button className="flex items-center gap-2 bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer">
                <Plus className="h-5 w-5" />
                Add Merchants
              </button>
            </Link>
          }
        />
      );
    }

    return <DataTable columns={merchantColumns} data={merchants} />;
  };

  // Show loading state
  if (isPending) {
    return (
      <LoadingSpinner message="Loading merchants..." />
    );
  }

  // Show error state
  if (isError) {
    return (
      <ErrorState
        title="Error Loading Merchants"
        message={extractErrorMessage(error) || "Failed to load merchants. Please try again."}
        retryText="Retry"
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      {/* Header with Search and Filters */}
      <MerchantsHeaderSection
        filterType={filterType}
        onFilterTypeChange={setFilterType}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder={getSearchPlaceholder(filterType)}
        dateRangeOption={dateRangeOption}
        onDateRangeChange={setDateRangeOption}
        onDateRangeDatesChange={handleDateRangeDatesChange}
        approvalStatus={approvalStatus}
        onApprovalStatusChange={setApprovalStatus}
        onResetFilter={handleResetFilter}
      />

      {/* Data Table */}
      <div className="p-0">
        {renderDataTableContent()}
      </div>

      {/* Pagination */}
      {merchants.length > 0 && (
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalRows={totalRows}
          pageSize={itemsPerPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}
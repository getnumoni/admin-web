'use client'

import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import useGetFundingReconciliation from "@/hooks/query/useGetFundingReconciliation";
import { useFundingFilters } from "@/hooks/utils/useFundingFilters";
import { usePurchasesPagination } from "@/hooks/utils/usePurchasesPagination";
import { FundingReconciliation, PaginatedFundingReconciliationData } from "@/lib/types";
import { fundingColumns } from './funding-column';
import FundingDataSection from './funding-data-section';
import FundingHeaderSection from './funding-header-section';
import FundingPagination from './funding-pagination';

const ITEMS_PER_PAGE = 20;

export default function FundingTable() {
  const {
    filters,
    debouncedFilters,
    setFilter,
    resetFilters,
    currentPage,
    setCurrentPage,
    showFilters,
    toggleFilters,
  } = useFundingFilters();

  const { data, isPending, error, isError, refetch } = useGetFundingReconciliation({
    page: currentPage,
    size: ITEMS_PER_PAGE,
    sessionId: debouncedFilters.sessionId.trim() || undefined,
    providerId: debouncedFilters.providerId.trim() || undefined,
    senderName: debouncedFilters.senderName.trim() || undefined,
    customerId: debouncedFilters.customerId.trim() || undefined,
    startDate: debouncedFilters.startDate.trim() || undefined,
    endDate: debouncedFilters.endDate.trim() || undefined,
  });

  // Extract funding data from API response
  // API response structure can be:
  // 1. Paginated: { data: { data: [], totalRows: number, totalPages: number }, success: boolean }
  // 2. Non-paginated: { data: [], success: boolean }
  const apiData = data?.data;

  // Check if response is paginated (has nested data structure)
  // isPaginated is true if apiData exists, is NOT an array, and has a 'data' property
  const isPaginated = apiData && !Array.isArray(apiData) && 'data' in apiData;

  // Type guard to check if apiData is paginated
  const paginatedData = isPaginated ? apiData as PaginatedFundingReconciliationData : null;

  // Get all funding records
  // If paginated, extract from paginatedData.data
  // Otherwise, apiData is the array directly (since isPaginated already checked !Array.isArray)
  const allFunding: FundingReconciliation[] = isPaginated
    ? paginatedData?.data || []
    : (apiData as FundingReconciliation[]) || [];

  // Get totalRows from API if paginated, otherwise use array length
  const totalRows = isPaginated
    ? paginatedData?.totalRows || paginatedData?.total || allFunding.length
    : allFunding.length;

  // Get totalPages from API if paginated, otherwise calculate
  const totalPages = isPaginated
    ? paginatedData?.totalPages || Math.ceil(totalRows / ITEMS_PER_PAGE)
    : Math.ceil(totalRows / ITEMS_PER_PAGE);

  // If API doesn't paginate, do client-side pagination
  const funding: FundingReconciliation[] = isPaginated
    ? allFunding // API already paginated
    : allFunding.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE); // Client-side pagination

  const { startIndex, endIndex, handlePreviousPage, handleNextPage } = usePurchasesPagination(
    currentPage,
    totalRows,
    ITEMS_PER_PAGE,
    totalPages,
    setCurrentPage
  );

  if (isPending) {
    return <LoadingSpinner message="Loading funding records..." />
  }

  if (isError) {
    return <ErrorState title="Error Loading Funding Records" message={error?.message || "Failed to load funding records. Please try again."} onRetry={refetch} retryText="Retry" />
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mt-8">
      <FundingHeaderSection
        customerId={filters.customerId}
        onCustomerIdChange={(value) => setFilter('customerId', value)}
        sessionId={filters.sessionId}
        onSessionIdChange={(value) => setFilter('sessionId', value)}
        providerId={filters.providerId}
        onProviderIdChange={(value) => setFilter('providerId', value)}
        senderName={filters.senderName}
        onSenderNameChange={(value) => setFilter('senderName', value)}
        startDate={filters.startDate}
        onStartDateChange={(value) => setFilter('startDate', value)}
        endDate={filters.endDate}
        onEndDateChange={(value) => setFilter('endDate', value)}
        onResetFilter={resetFilters}
        showFilters={showFilters}
        onToggleFilters={toggleFilters}
      />

      <FundingDataSection data={funding} columns={fundingColumns} />

      {funding?.length > 0 && (
        <FundingPagination
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalRows}
          currentPage={currentPage + 1}
          totalPages={totalPages}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      )}
    </div>
  )
}
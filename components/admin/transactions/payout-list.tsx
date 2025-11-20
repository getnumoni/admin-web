'use client'

import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import useGetPayoutList from "@/hooks/query/useGetPayoutList";
import { usePayoutFilters } from "@/hooks/utils/usePayoutFilters";
import { usePurchasesPagination } from "@/hooks/utils/usePurchasesPagination";
import { PaginatedPayoutData, Payout } from "@/lib/types";
import { payoutColumns } from './payout-column';
import PayoutDataSection from './payout-data-section';
import PayoutHeaderSection from './payout-header-section';
import PayoutPagination from './payout-pagination';

const ITEMS_PER_PAGE = 20;

export default function PayoutList() {
  const {
    filters,
    debouncedFilters,
    setFilter,
    resetFilters,
    currentPage,
    setCurrentPage,
    showFilters,
    toggleFilters,
  } = usePayoutFilters();

  const { data, isPending, error, isError, refetch } = useGetPayoutList({
    page: currentPage,
    size: ITEMS_PER_PAGE,
    merchantId: debouncedFilters.merchantId.trim() || undefined,
    transactionId: debouncedFilters.transactionId.trim() || undefined,
    startDate: debouncedFilters.startDate.trim() || undefined,
    endDate: debouncedFilters.endDate.trim() || undefined,
    status: debouncedFilters.status.trim() || undefined,
  });

  // Extract payout data from API response
  // API response structure can be:
  // 1. Paginated: { data: { data: [], totalRows: number, totalPages: number }, success: boolean }
  // 2. Non-paginated: { data: [], success: boolean }
  const apiData = data?.data;

  // Check if response is paginated (has nested data structure)
  // isPaginated is true if apiData exists, is NOT an array, and has a 'data' property
  const isPaginated = apiData && !Array.isArray(apiData) && 'data' in apiData;

  // Type guard to check if apiData is paginated
  const paginatedData = isPaginated ? apiData as PaginatedPayoutData : null;

  // Get all payout records
  // If paginated, extract from paginatedData.data
  // Otherwise, apiData is the array directly (since isPaginated already checked !Array.isArray)
  const allPayouts: Payout[] = isPaginated
    ? paginatedData?.data || []
    : (apiData as Payout[]) || [];

  // Get totalRows from API if paginated, otherwise use array length
  const totalRows = isPaginated
    ? paginatedData?.totalRows || paginatedData?.total || allPayouts.length
    : allPayouts.length;

  // Get totalPages from API if paginated, otherwise calculate
  const totalPages = isPaginated
    ? paginatedData?.totalPages || Math.ceil(totalRows / ITEMS_PER_PAGE)
    : Math.ceil(totalRows / ITEMS_PER_PAGE);

  // If API doesn't paginate, do client-side pagination
  const payouts: Payout[] = isPaginated
    ? allPayouts // API already paginated
    : allPayouts.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE); // Client-side pagination

  const { startIndex, endIndex, handlePreviousPage, handleNextPage } = usePurchasesPagination(
    currentPage,
    totalRows,
    ITEMS_PER_PAGE,
    totalPages,
    setCurrentPage
  );

  if (isPending) {
    return <LoadingSpinner message="Loading payout records..." />
  }

  if (isError) {
    return <ErrorState title="Error Loading Payout Records" message={error?.message || "Failed to load payout records. Please try again."} onRetry={refetch} retryText="Retry" />
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mt-8">
      <PayoutHeaderSection
        merchantId={filters.merchantId}
        onMerchantIdChange={(value) => setFilter('merchantId', value)}
        transactionId={filters.transactionId}
        onTransactionIdChange={(value) => setFilter('transactionId', value)}
        startDate={filters.startDate}
        onStartDateChange={(value) => setFilter('startDate', value)}
        endDate={filters.endDate}
        onEndDateChange={(value) => setFilter('endDate', value)}
        status={filters.status}
        onStatusChange={(value) => setFilter('status', value)}
        onResetFilter={resetFilters}
        showFilters={showFilters}
        onToggleFilters={toggleFilters}
      />

      <PayoutDataSection data={payouts} columns={payoutColumns} />

      {payouts?.length > 0 && (
        <PayoutPagination
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
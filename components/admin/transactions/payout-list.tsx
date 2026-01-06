'use client'

import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import useGetPayoutList from "@/hooks/query/useGetPayoutList";
import { usePayoutFilters } from "@/hooks/utils/usePayoutFilters";
import { usePurchasesPagination } from "@/hooks/utils/usePurchasesPagination";
import { extractErrorMessage } from "@/lib/helper";
import { Payout } from "@/lib/types";
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
    settlementRefId: debouncedFilters.settlementRefId.trim() || undefined,
    payonusRefId: debouncedFilters.payonusRefId.trim() || undefined,
    status: debouncedFilters.status.trim() || undefined,
  });

  // Extract payout data from API response
  // API response structure: { pagination: {...}, data: [...], success: boolean, message: string }
  const apiData = data?.data;
  const pagination = data?.data?.pagination;

  // Get all payout records
  const allPayouts: Payout[] = apiData?.data || [];

  // Get pagination info from API response
  const totalRows = pagination?.totalElements || allPayouts.length;
  const totalPages = pagination?.totalPages || Math.ceil(totalRows / ITEMS_PER_PAGE);

  // API already paginates the data, so use it directly
  const payouts: Payout[] = allPayouts;

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
    return <ErrorState title="Error Loading Payout Records" message={extractErrorMessage(error) || "Failed to load payout records. Please try again."} onRetry={refetch} retryText="Retry" />
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mt-8">
      <PayoutHeaderSection
        merchantId={filters.merchantId}
        onMerchantIdChange={(value) => setFilter('merchantId', value)}
        settlementRefId={filters.settlementRefId}
        onSettlementRefIdChange={(value) => setFilter('settlementRefId', value)}
        payonusRefId={filters.payonusRefId}
        onPayonusRefIdChange={(value) => setFilter('payonusRefId', value)}
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
'use client'

import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import useGetFundingReconciliation from "@/hooks/query/useGetFundingReconciliation";
import { useFundingFilters } from "@/hooks/utils/useFundingFilters";
import { usePurchasesPagination } from "@/hooks/utils/usePurchasesPagination";
import { extractErrorMessage } from "@/lib/helper";
import { FundingReconciliation } from "@/lib/types";
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
  // New API response structure:
  // { pagination: { totalPages, pageSize, currentPage, totalElements }, data: [], success: boolean, message: string }
  const apiResponse = data?.data;

  // Extract pagination info
  const pagination = apiResponse?.pagination;
  const funding: FundingReconciliation[] = apiResponse?.data || [];

  // Get pagination values from API response
  const totalRows = pagination?.totalElements || funding.length;
  const totalPages = pagination?.totalPages || Math.ceil(totalRows / ITEMS_PER_PAGE);

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
    return <ErrorState title="Error Loading Funding Records" message={extractErrorMessage(error) || "Failed to load funding records. Please try again."} onRetry={refetch} retryText="Retry" />
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
'use client'

import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import useGetAdminPurchases from "@/hooks/query/useGetAdminPurchases";
import { usePurchasesFilters } from "@/hooks/utils/usePurchasesFilters";
import { usePurchasesPagination } from "@/hooks/utils/usePurchasesPagination";
import { extractErrorMessage } from "@/lib/helper";
import { PurchaseData, purchasesColumns } from './purchases-columns';
import PurchasesDataSection from './purchases-data-section';
import PurchasesHeaderSection from './purchases-header-section';
import PurchasesPagination from './purchases-pagination';

const ITEMS_PER_PAGE = 20;

export function PurchasesTable() {
  const {
    filters,
    debouncedFilters,
    setFilter,
    resetFilters,
    currentPage,
    setCurrentPage,
    showFilters,
    toggleFilters,
  } = usePurchasesFilters();

  const { data, isPending, error, isError, refetch } = useGetAdminPurchases({
    page: currentPage,
    size: ITEMS_PER_PAGE,
    customerName: debouncedFilters.customerName.trim() || undefined,
    dealName: debouncedFilters.dealName.trim() || undefined,
    transactionId: debouncedFilters.transactionId.trim() || undefined,
    dealId: debouncedFilters.dealId.trim() || undefined,
    purchaseId: debouncedFilters.purchaseId.trim() || undefined,
  });

  // Extract purchase data from API response
  const apiData = data?.data;
  const purchases: PurchaseData[] = apiData?.data || [];
  const totalRows = apiData?.totalRows || apiData?.total || purchases.length;
  const totalPages = apiData?.totalPages || Math.ceil(totalRows / ITEMS_PER_PAGE);

  const { startIndex, endIndex, handlePreviousPage, handleNextPage } = usePurchasesPagination(
    currentPage,
    totalRows,
    ITEMS_PER_PAGE,
    totalPages,
    setCurrentPage
  );

  if (isPending) {
    return <LoadingSpinner message="Loading purchases..." />
  }

  if (isError) {
    return <ErrorState title="Error Loading Purchases" message={extractErrorMessage(error) || "Failed to load purchases. Please try again."} onRetry={refetch} retryText="Retry" />
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mt-8">
      <PurchasesHeaderSection
        customerName={filters.customerName}
        onCustomerNameChange={(value) => setFilter('customerName', value)}
        dealName={filters.dealName}
        onDealNameChange={(value) => setFilter('dealName', value)}
        transactionId={filters.transactionId}
        onTransactionIdChange={(value) => setFilter('transactionId', value)}
        dealId={filters.dealId}
        onDealIdChange={(value) => setFilter('dealId', value)}
        purchaseId={filters.purchaseId}
        onPurchaseIdChange={(value) => setFilter('purchaseId', value)}
        onResetFilter={resetFilters}
        showFilters={showFilters}
        onToggleFilters={toggleFilters}
      />

      <PurchasesDataSection data={purchases} columns={purchasesColumns} />

      {purchases?.length > 0 && (
        <PurchasesPagination
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
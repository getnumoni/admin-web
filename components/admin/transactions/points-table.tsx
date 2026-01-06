'use client'

import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import useGetCustomerSharedPoint from "@/hooks/query/useGetCustomerSharedPoint";
import { usePurchasesPagination } from "@/hooks/utils/usePurchasesPagination";
import { extractErrorMessage } from "@/lib/helper";
import { useState } from "react";
import { PointsTransactionData, pointsColumns } from './points-columns';
import PointsDataSection from './points-data-section';
import PointsPagination from './points-pagination';

const ITEMS_PER_PAGE = 20;

export default function PointsTable() {
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isPending, error, isError, refetch } = useGetCustomerSharedPoint({
    page: currentPage,
    size: ITEMS_PER_PAGE,
  });

  // Extract points data from API response
  const apiData = data?.data?.data;
  const points: PointsTransactionData[] = apiData?.pageData || [];
  const totalRows = apiData?.totalElements || points.length;
  const totalPages = apiData?.totalPages || Math.ceil(totalRows / ITEMS_PER_PAGE);

  const { startIndex, endIndex, handlePreviousPage, handleNextPage } = usePurchasesPagination(
    currentPage,
    totalRows,
    ITEMS_PER_PAGE,
    totalPages,
    setCurrentPage
  );

  if (isPending) {
    return <LoadingSpinner message="Loading customer shared points..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Error Loading Customer Shared Points"
        message={extractErrorMessage(error) || "Failed to load customer shared points. Please try again."}
        onRetry={refetch}
        retryText="Retry"
      />
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mt-8">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Points Transactions</h1>
      </div>

      <PointsDataSection data={points} columns={pointsColumns} />

      {points?.length > 0 && (
        <PointsPagination
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
  );
}
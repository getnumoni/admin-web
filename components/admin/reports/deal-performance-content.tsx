'use client';

import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { DealPerformanceChart } from "./deal-performance-chart";

type DealPerformanceItem = {
  purchases: number;
  week: number;
  totalDeals: number;
};

interface DealPerformanceContentProps {
  hasAttemptedFetch: boolean;
  isPending: boolean;
  isError: boolean;
  error: unknown;
  rawData: DealPerformanceItem[] | undefined;
  onRetry: () => void;
}

export function DealPerformanceContent({
  hasAttemptedFetch,
  isPending,
  isError,
  error,
  rawData,
  onRetry,
}: DealPerformanceContentProps) {
  // Show empty state if no fetch has been attempted yet
  if (!hasAttemptedFetch && !rawData) {
    return (
      <EmptyState
        title="No Data Available"
        description="Select a date range and click Search to view deal performance data."
      />
    );
  }

  // Show loading spinner only when actively fetching and we've attempted a fetch
  if (isPending && hasAttemptedFetch) {
    return <LoadingSpinner message="Loading deal performance..." />;
  }

  // Show error state
  if (isError) {
    return (
      <ErrorState
        title="Error Loading Deal Performance"
        message={(error as { message?: string })?.message || "Failed to load deal performance."}
        onRetry={onRetry}
      />
    );
  }

  // Show empty state if data was fetched but is empty
  if (!rawData || rawData.length === 0) {
    return (
      <EmptyState
        title="No Records Found"
        description="No deal performance data found for the selected date range."
      />
    );
  }

  return <DealPerformanceChart data={rawData} />;
}


'use client';

import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { MerchantUsageChart } from "./merchant-usage-chart";

type MerchantUsageItem = {
  purchaseCount: number;
  merchantId: string;
  budgetCap: number;
  purchaseRate: number; // 0..1
};

interface MerchantUsageContentProps {
  hasAttemptedFetch: boolean;
  isPending: boolean;
  isError: boolean;
  error: unknown;
  rawData: MerchantUsageItem[] | undefined;
  onRetry: () => void;
}

export function MerchantUsageContent({
  hasAttemptedFetch,
  isPending,
  isError,
  error,
  rawData,
  onRetry,
}: MerchantUsageContentProps) {
  // Show empty state if no fetch has been attempted yet
  if (!hasAttemptedFetch && !rawData) {
    return (
      <EmptyState
        title="No Data Available"
        description="Select a date range and click Search to view merchant budget usage data."
      />
    );
  }

  // Show loading spinner only when actively fetching and we've attempted a fetch
  if (isPending && hasAttemptedFetch) {
    return <LoadingSpinner message="Loading merchant usage..." />;
  }

  // Show error state
  if (isError) {
    return (
      <ErrorState
        title="Error Loading Merchant Budget Usage"
        message={(error as { message?: string })?.message || "Failed to load merchant usage."}
        onRetry={onRetry}
      />
    );
  }

  // Show empty state if data was fetched but is empty
  if (!rawData || rawData.length === 0) {
    return (
      <EmptyState
        title="No Records Found"
        description="No merchant budget usage data found for the selected date range."
      />
    );
  }

  // Transform data for chart
  const chartData = rawData.map((m) => ({
    label: m.merchantId,
    value: Number((m.purchaseRate * 100).toFixed(2)), // percentage
  }));

  return <MerchantUsageChart data={chartData} />;
}


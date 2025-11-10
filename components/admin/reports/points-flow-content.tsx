'use client';

import { CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { ChartConfig } from "@/components/ui/chart";
import { PointsFlowChart } from "./points-flow-chart";

type PointFlowData = {
  percentage: { redeemed: number; earned: number };
  totalPoints: number;
  distribution: { redeemed: number; earned: number; expired: number; donated: number };
};

interface PointsFlowContentProps {
  hasAttemptedFetch: boolean;
  isPending: boolean;
  isError: boolean;
  error: unknown;
  pointFlowData: PointFlowData | undefined;
  onRetry: () => void;
}

const chartConfig: ChartConfig = {
  earned: { label: "Earned Points", color: "#10b981" },
  redeemed: { label: "Redeemed Points", color: "#3b82f6" },
  donated: { label: "Donated Points", color: "#f97316" },
  expired: { label: "Expired Points", color: "#f59e0b" },
};

export function PointsFlowContent({
  hasAttemptedFetch,
  isPending,
  isError,
  error,
  pointFlowData,
  onRetry,
}: PointsFlowContentProps) {
  // Show empty state if no fetch has been attempted yet
  if (!hasAttemptedFetch && !pointFlowData) {
    return (
      <CardContent className="flex-1 pb-0">
        <EmptyState
          title="No Data Available"
          description="Select a date range and click Search to view points flow distribution data."
        />
      </CardContent>
    );
  }

  // Show loading spinner only when actively fetching and we've attempted a fetch
  if (isPending && hasAttemptedFetch) {
    return (
      <CardContent className="flex-1 pb-0">
        <LoadingSpinner message="Loading points flow..." />
      </CardContent>
    );
  }

  // Show error state
  if (isError) {
    return (
      <CardContent className="flex-1 pb-0">
        <ErrorState
          title="Error Loading Points Flow"
          message={(error as { message?: string })?.message || "Failed to load points flow."}
          onRetry={onRetry}
        />
      </CardContent>
    );
  }

  // Show empty state if data was fetched but is empty
  if (!pointFlowData || !pointFlowData.distribution) {
    return (
      <CardContent className="flex-1 pb-0">
        <EmptyState
          title="No Records Found"
          description="No points flow data found for the selected date range."
        />
      </CardContent>
    );
  }

  // Transform data for chart
  const chartData = [
    { key: "earned", label: "Earned Points", value: pointFlowData.distribution.earned ?? 0, fill: "var(--color-earned)" },
    { key: "redeemed", label: "Redeemed Points", value: pointFlowData.distribution.redeemed ?? 0, fill: "var(--color-redeemed)" },
    { key: "donated", label: "Donated Points", value: pointFlowData.distribution.donated ?? 0, fill: "var(--color-donated)" },
    { key: "expired", label: "Expired Points", value: pointFlowData.distribution.expired ?? 0, fill: "var(--color-expired)" },
  ];

  const total = pointFlowData.totalPoints ?? 0;

  return <PointsFlowChart chartData={chartData} chartConfig={chartConfig} total={total} />;
}


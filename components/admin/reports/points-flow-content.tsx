'use client';

import { CardContent } from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { PointFlowData } from "@/lib/types";
import { PointsFlowChart } from "./points-flow-chart";

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
  redeemedPercentage: { label: "Redeemed Percentage", color: "#8b5cf6" },
  earnedPercentage: { label: "Earned Percentage", color: "#ec4899" },
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
  if (!pointFlowData) {
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
  const redeemedPercentageValue = pointFlowData.redeemedPercentage ? parseFloat(pointFlowData.redeemedPercentage) : 0;
  const earnedPercentageValue = pointFlowData.earnedPercentage ? parseFloat(pointFlowData.earnedPercentage) : 0;

  const chartData = [
    { key: "earned", label: "Earned Points", value: pointFlowData.earnedPoints ?? 0, fill: "var(--color-earned)" },
    { key: "redeemed", label: "Redeemed Points", value: pointFlowData.redeemedPoints ?? 0, fill: "var(--color-redeemed)" },
    { key: "donated", label: "Donated Points", value: pointFlowData.donatedPoints ?? 0, fill: "var(--color-donated)" },
    { key: "expired", label: "Expired Points", value: pointFlowData.expiredPoints ?? 0, fill: "var(--color-expired)" },
    { key: "redeemedPercentage", label: "Redeemed Percentage", value: redeemedPercentageValue, fill: "var(--color-redeemedPercentage)" },
    { key: "earnedPercentage", label: "Earned Percentage", value: earnedPercentageValue, fill: "var(--color-earnedPercentage)" },
  ];

  const total = pointFlowData.totalPoints ?? 0;

  return <PointsFlowChart chartData={chartData} chartConfig={chartConfig} total={total} />;
}


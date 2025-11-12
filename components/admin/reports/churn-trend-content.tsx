import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";



interface ChurnTrendContentProps {
  hasAttemptedFetch: boolean;
  isPending: boolean;
  isError: boolean;
  error: unknown;
  // churnRateTrend: any[];
  onRetry: () => void;
}
export function ChurnTrendContent({
  hasAttemptedFetch,
  isPending,
  isError,
  error,
  // churnRateTrend,
  onRetry,
}: ChurnTrendContentProps) {
  if (!hasAttemptedFetch) {
    return (
      <EmptyState
        title="No Data Available"
        description="Select a date range and click Search to view churn rate trend data."
      />
    );
  }

  if (isPending) {
    return <LoadingSpinner message="Loading churn rate trend..." />;
  }

  if (isError) {
    return <ErrorState title="Error Loading Churn Rate Trend" message={(error as { message?: string })?.message || "Failed to load churn rate trend."} onRetry={onRetry} />;
  }

  // return <ChurnTrendChart data={churnRateTrend} />;
}
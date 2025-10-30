import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import useGetTransactionListByCustomerId from "@/hooks/query/useGetTransactionListByCustomerId";

export default function CustomerTransactionById({ customerId }: { customerId: string }) {

  // console.log('customerId', customerId);
  const { data, isPending, error, isError, refetch } = useGetTransactionListByCustomerId({ customerId });

  console.log('data', data);
  if (isPending) {
    return <LoadingSpinner message="Loading transaction list..." />;
  }
  if (isError) {
    return <ErrorState title="Error Loading Transaction List" message={error?.message || "Failed to load transaction list. Please try again."} onRetry={refetch} retryText="Retry" />;
  }
  return <div>CustomerTransactionById</div>;
}
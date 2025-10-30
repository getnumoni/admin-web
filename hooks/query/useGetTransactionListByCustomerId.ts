import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetTransactionListByCustomerId = ({ customerId }: { customerId: string }) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["transaction-list", customerId],
    enabled: !!customerId && customerId.trim() !== "",
    queryFn: () => api.get(`/admin/getTransactionListByCustomerId?customerId=${customerId}`),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetTransactionListByCustomerId;
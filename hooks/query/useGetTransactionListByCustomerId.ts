import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetTransactionListByCustomerId = ({
  customerId,
  page = 0,
  size = 10,
}: {
  customerId: string;
  page?: number;
  size?: number;
}) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["transaction-list", customerId, page, size],
    enabled: !!customerId && customerId.trim() !== "",
    queryFn: () =>
      api.get(
        `/admin/getTransactionListByCustomerId?customerId=${customerId}&page=${page}&size=${size}`
      ),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetTransactionListByCustomerId;
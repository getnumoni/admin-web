import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetMerchantTransactionsParams {
  page?: number;
  size?: number;
  merchantName?: string;
  sort?: string[];
}

const useGetMerchantTransactions = (params: GetMerchantTransactionsParams = {}) => {
  const {
    page = 0,
    size = 20,
    merchantName,
    sort = [],
  } = params;

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["merchant-transactions", page, size, merchantName, sort],
    queryFn: () => {
      const queryParams = new URLSearchParams();

      // Top-level pagination parameters
      queryParams.append("page", String(page));
      queryParams.append("size", String(size));

      // Optional filter parameters
      if (merchantName) queryParams.append("merchantName", merchantName);

      // Optional sort parameters
      for (const s of sort) {
        queryParams.append("sort", s);
      }

      return api.get(`/admin/getMerchantTransacionList?${queryParams.toString()}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetMerchantTransactions;
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetTransactionByMerchantIdParams {
  merchantId: string;
  page?: number;
  size?: number;
  searchTerm?: string;
}

const useGetTransactionByMerchantId = (params: GetTransactionByMerchantIdParams) => {
  const {
    merchantId,
    page = 0,
    size = 30,
    searchTerm,
  } = params;

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["merchant-transactions", merchantId, page, size, searchTerm],
    enabled: !!merchantId && merchantId.trim() !== "",
    queryFn: () => {
      const queryParams = new URLSearchParams();

      // Required pagination parameters
      queryParams.append("page", page.toString());
      queryParams.append("size", size.toString());

      // Optional search parameter
      if (searchTerm && searchTerm.trim()) {
        queryParams.append("searchTerm", searchTerm.trim());
      }

      const queryString = queryParams.toString();
      return api.get(`/admin/getTransactionByMerchantId/${merchantId}?${queryString}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetTransactionByMerchantId;
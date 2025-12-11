import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetMerchantTransactionDetailsByIdParams {
  transactionId: string;
}

const useGetMerchantTransactionDetailsById = (params: GetMerchantTransactionDetailsByIdParams) => {
  const {
    transactionId,
  } = params;

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["merchant-transaction-details", transactionId],
    enabled: !!transactionId && transactionId.trim() !== "",
    queryFn: () => {
      return api.get(`/admin/getMerchantTransactionDetailsById?transactionId=${transactionId}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetMerchantTransactionDetailsById;
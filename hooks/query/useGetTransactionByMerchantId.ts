import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetTransactionByMerchantId = ({ merchantId }: { merchantId: string }) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["merchant-transactions", merchantId],
    enabled: !!merchantId && merchantId.trim() !== "",
    queryFn: () => api.get(`/admin/getTransactionByMerchantId/${merchantId}`),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetTransactionByMerchantId;
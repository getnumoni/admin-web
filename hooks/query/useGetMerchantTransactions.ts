import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetMerchantTransactions = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["merchant-transactions"],
    queryFn: () => api.get("/admin/getMerchantTransacionList"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetMerchantTransactions;
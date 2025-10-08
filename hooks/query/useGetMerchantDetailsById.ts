import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetMerchantDetailsById = ({ merchantId }: { merchantId: string }) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["merchants", merchantId],
    enabled: !!merchantId && merchantId.trim() !== "",
    queryFn: () => api.get(`/admin/merchantDetails?merchantId=${merchantId}`),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetMerchantDetailsById;
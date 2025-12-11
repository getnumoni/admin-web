import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetMerchantRewardPointById = ({ merchantId }: { merchantId: string }) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["merchant-reward-points", merchantId],
    enabled: !!merchantId && merchantId.trim() !== "",
    queryFn: () => api.get(`/admin/getRewordOverViewBymerchantId/${merchantId}`),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetMerchantRewardPointById;
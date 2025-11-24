import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetMerchantRewardByIdParams {
  merchantId: string;
  page?: number;
  size?: number;
}

const useGetMerchantRewardById = ({ merchantId, page = 0, size = 20 }: GetMerchantRewardByIdParams) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["merchant-points-allocated", merchantId, page, size],
    enabled: !!merchantId && merchantId.trim() !== "",
    queryFn: () => {
      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("size", size.toString());
      return api.get(`/admin/getRewardsById/${merchantId}?${queryParams.toString()}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetMerchantRewardById;
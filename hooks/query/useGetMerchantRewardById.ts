import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetMerchantRewardByIdParams {
  userId: string | null;
  page?: number;
  size?: number;
}

const useGetMerchantRewardById = ({ userId, page = 0, size = 20 }: GetMerchantRewardByIdParams) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["merchant-points-allocated", userId, page, size],
    enabled: !!userId && userId.trim() !== "",
    queryFn: () => {
      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("size", size.toString());
      return api.get(`/admin/getRewardsById/${userId}?${queryParams.toString()}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetMerchantRewardById;
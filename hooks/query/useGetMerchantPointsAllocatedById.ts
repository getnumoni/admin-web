import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetMerchantPointsAllocatedParams {
  merchantId: string;
  page?: number;
  size?: number;
}

const useGetMerchantPointsAllocatedById = ({ merchantId, page = 0, size = 20 }: GetMerchantPointsAllocatedParams) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["merchant-points-allocated", merchantId, page, size],
    enabled: !!merchantId && merchantId.trim() !== "",
    queryFn: () => {
      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("size", size.toString());
      return api.get(`/admin/getPointsAllocationById/${merchantId}?${queryParams.toString()}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetMerchantPointsAllocatedById;
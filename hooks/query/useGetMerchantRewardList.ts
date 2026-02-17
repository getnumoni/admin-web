import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetRewardListByMerchantIdParams {
  merchantId: string | null;
  fromDate?: string;
  toDate?: string;
  size?: number;
  page?: number;
}

const useGetRewardListByMerchantId = ({ merchantId, fromDate, toDate, page = 0, size = 20 }: GetRewardListByMerchantIdParams) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["merchant-reward-list", merchantId, fromDate, toDate, page, size],
    enabled: !!merchantId && merchantId.trim() !== "",
    queryFn: () => {
      const queryParams = new URLSearchParams();
      if (fromDate) queryParams.append("fromDate", fromDate);
      if (toDate) queryParams.append("toDate", toDate);
      queryParams.append("page", page.toString());
      queryParams.append("size", size.toString());
      return api.get(`/merchant/getMerchantRewardList?merchantId=${merchantId}&${queryParams.toString()}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetRewardListByMerchantId;
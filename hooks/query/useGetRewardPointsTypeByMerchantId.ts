'use client'

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetRewardPointsTypeByMerchantId = ({ merchantId }: { merchantId: string }) => {

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["reward-points-type", merchantId],
    enabled: !!merchantId && merchantId.trim() !== "",
    queryFn: () => api.get(`/admin/getRewardPointsTypeByMerchantId/${merchantId}`),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetRewardPointsTypeByMerchantId;
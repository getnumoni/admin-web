import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGerReviewsByMerchantId = ({ merchantId }: { merchantId: string }) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["merchant-reviews", merchantId],
    enabled: !!merchantId && merchantId.trim() !== "",
    queryFn: () => api.get(`/admin/reviewsForMerchantId/${merchantId}`),
  });

  return { data, isPending, error, isError, refetch };
}

export default useGerReviewsByMerchantId;
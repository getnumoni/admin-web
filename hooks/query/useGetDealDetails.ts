import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetDealDetails = ({ dealId }: { dealId: string }) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["deal-details", "deal", dealId],
    queryFn: () => api.get(`/admin/deals?dealId=${dealId}`),
    enabled: !!dealId && dealId.trim() !== "",
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetDealDetails;
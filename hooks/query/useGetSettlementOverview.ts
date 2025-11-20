import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetSettlementOverview = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["payout", "payout-list"],
    queryFn: () => api.get("/admin/getSettlementOverview"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetSettlementOverview;
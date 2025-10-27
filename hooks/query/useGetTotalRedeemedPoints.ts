import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetTotalRedeemedPoints = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["total-redeemed-points"],
    queryFn: () => api.get(`/admin/total-redeemedPoints`),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetTotalRedeemedPoints;
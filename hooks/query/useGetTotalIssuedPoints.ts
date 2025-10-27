import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetTotalIssuedPoints = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["total-issued-points"],
    queryFn: () => api.get(`/admin/total-issued`),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetTotalIssuedPoints;
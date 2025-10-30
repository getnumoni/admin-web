import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetDealsStatistics = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["deals-statistics"],
    queryFn: () => api.get("/admin/dealstatistics"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetDealsStatistics;
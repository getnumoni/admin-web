import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetAllRegions = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["regions"],
    queryFn: () => api.get("/merchant/regions/unique-regions"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAllRegions;
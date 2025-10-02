import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetStates = ({ region }: { region: string }) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["states", region],
    queryFn: () => api.get(`/merchant/regions/${region}/states `),
    enabled: !!region && region.trim() !== "",
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetStates;
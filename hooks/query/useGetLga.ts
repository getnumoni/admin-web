import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetLga = ({ state }: { state: string }) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["lga", state],
    queryFn: () => api.get(`/merchant/regions/states/${state}/lgas`),
    enabled: !!state && state.trim() !== "",
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetLga;     
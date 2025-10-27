import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetMostSupportedCharity = () => {

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["most-supported-charity"],
    queryFn: () => api.get(`/admin/most-supported-charity`),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetMostSupportedCharity;
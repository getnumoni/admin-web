import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetTopMerchants = () => {

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["top-merchants"],
    queryFn: () => api.get(`/admin/top-merchants`),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetTopMerchants;
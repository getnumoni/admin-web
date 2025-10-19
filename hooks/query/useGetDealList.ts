import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetDealList = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["deals"],
    queryFn: () => api.get("/admin/dealsList"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetDealList;
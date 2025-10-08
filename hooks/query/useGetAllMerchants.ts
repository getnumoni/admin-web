import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetAllMerchants = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["merchants"],
    queryFn: () => api.get("/admin/getMerchantList"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAllMerchants;
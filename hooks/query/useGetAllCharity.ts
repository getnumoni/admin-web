import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetAllCharity = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["charity"],
    queryFn: () => api.get("/admin/getCharityList"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAllCharity;
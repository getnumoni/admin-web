import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetAllModules = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["modules", "roles"],
    queryFn: () => api.get("/admin/getAllModules"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAllModules;
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetAllRoles = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["roles", "modules", "privileges"],
    queryFn: () => api.get("/admin/getAllRoles"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAllRoles;
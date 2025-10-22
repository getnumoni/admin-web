import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetModulePrivileges = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["modules", "privileges", "roles"],
    queryFn: () => api.get("/admin/getModulePrivileges"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetModulePrivileges;
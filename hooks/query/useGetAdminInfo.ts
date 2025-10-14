import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetAdminInfo = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["admin-info"],
    queryFn: () => api.get("/admin/info"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAdminInfo;
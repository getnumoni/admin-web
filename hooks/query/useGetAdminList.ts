import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetAdminList = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["admin"],
    queryFn: () => api.get("/admin/getEmployeeList"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAdminList;
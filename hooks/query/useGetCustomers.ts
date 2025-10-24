import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetCustomers = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["customers"],
    queryFn: () => api.get("/admin/getCustomerList"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetCustomers;
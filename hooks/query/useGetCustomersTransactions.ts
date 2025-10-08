import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetCustomersTransactions = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["customers-transactions"],
    queryFn: () => api.get("/admin/getCustomerTransacionList"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetCustomersTransactions;
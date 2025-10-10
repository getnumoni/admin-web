import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetCustomerDetailsById = ({ customerId }: { customerId: string }) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["customers", customerId],
    enabled: !!customerId && customerId.trim() !== "",
    queryFn: () => api.get(`/admin/CustomerDetails?customerId=${customerId}`),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetCustomerDetailsById;
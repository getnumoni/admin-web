import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetCustomerCountParams {
  startDate?: string;
  endDate?: string;
}

const useGetCustomerCount = (params: GetCustomerCountParams = {}) => {
  const {
    startDate,
    endDate,
  } = params;

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["customer-count", startDate, endDate],
    queryFn: () => {
      const queryParams = new URLSearchParams();

      // Top-level pagination parameters (Spring Pageable defaults)

      // Optional filters
      if (startDate) queryParams.append("startDate", startDate);
      if (endDate) queryParams.append("endDate", endDate);

      return api.get(`/admin/totalCustomers?${queryParams.toString()}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetCustomerCount;
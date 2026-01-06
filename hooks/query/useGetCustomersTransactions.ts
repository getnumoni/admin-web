import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetCustomersTransactionsParams {
  customerName?: string;
  transactionType?: string;
}

const useGetCustomersTransactions = (params: GetCustomersTransactionsParams = {}) => {
  const { customerName, transactionType } = params;

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["customers-transactions", customerName, transactionType],
    queryFn: () => {
      const queryParams = new URLSearchParams();

      // Optional filter parameters
      if (customerName) {
        queryParams.append("customerName", customerName);
      }
      if (transactionType) {
        queryParams.append("transactionType", transactionType);
      }

      const queryString = queryParams.toString();
      return api.get(`/admin/getCustomerTransacionList${queryString ? `?${queryString}` : ""}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetCustomersTransactions;
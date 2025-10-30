import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface CharityTransactionsParams {
  page?: number;
  size?: number;
  charityName?: string;
  transactionType?: string;
  status?: string;
  fromDate?: string; // yyyy-MM-dd
  toDate?: string;   // yyyy-MM-dd
  sort?: string[];   // e.g. ["createdDt,desc"]
}

const useGetAllCharityTransactions = (params: CharityTransactionsParams = {}) => {
  const {
    page = 0,
    size = 10,
    charityName,
    transactionType,
    status,
    fromDate,
    toDate,
    sort = ["createdDt,desc"],
  } = params;

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: [
      "charity-transactions",
      page,
      size,
      charityName,
      transactionType,
      status,
      fromDate,
      toDate,
      sort.join("|"),
    ],
    queryFn: () => {
      const queryParams = new URLSearchParams();

      // Required pagination parameters
      queryParams.append("page", page.toString());
      queryParams.append("size", size.toString());

      // Optional filters
      if (charityName) queryParams.append("charityName", charityName);
      if (transactionType) queryParams.append("transactionType", transactionType);
      if (status) queryParams.append("status", status);
      if (fromDate) queryParams.append("fromDate", fromDate);
      if (toDate) queryParams.append("toDate", toDate);
      if (Array.isArray(sort)) sort.forEach((s) => queryParams.append("sort", s));

      const queryString = queryParams.toString();
      return api.get(`/admin/charity/charityTransactions?${queryString}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAllCharityTransactions;
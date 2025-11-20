'use client'

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetPayoutListParams {
  page?: number;
  size?: number;
  merchantId?: string;
  transactionId?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}

const useGetPayoutList = (params: GetPayoutListParams = {}) => {
  const {
    page = 0,
    size = 20,
    merchantId,
    transactionId,
    startDate,
    endDate,
    status,
  } = params;

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["payout-list", page, size, merchantId, transactionId, startDate, endDate, status],
    queryFn: () => {
      const queryParams = new URLSearchParams();

      // Required pagination parameters (always send them)
      queryParams.append("page", page.toString());
      queryParams.append("size", size.toString());

      // Optional filter parameters
      if (merchantId) queryParams.append("merchantId", merchantId);
      if (transactionId) queryParams.append("transactionId", transactionId);
      if (startDate) queryParams.append("startDate", startDate);
      if (endDate) queryParams.append("endDate", endDate);
      if (status) queryParams.append("status", status);

      const queryString = queryParams.toString();
      return api.get(`/admin/getPayoutList?${queryString}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetPayoutList;
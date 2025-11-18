'use client'

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetAdminPurchasesParams {
  page?: number;
  size?: number;
  dealName?: string;
  transactionId?: string;
  dealId?: string;
  customerName?: string;
  purchaseId?: string;
}

const useGetAdminPurchases = (params: GetAdminPurchasesParams = {}) => {
  const {
    page = 0,
    size = 20,
    dealName,
    transactionId,
    dealId,
    customerName,
    purchaseId,
  } = params;

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["admin-purchases", page, size, dealName, transactionId, dealId, customerName, purchaseId],
    queryFn: () => {
      const queryParams = new URLSearchParams();

      // Required pagination parameters
      queryParams.append("page", page.toString());
      queryParams.append("size", size.toString());

      // Optional filter parameters
      if (dealName) queryParams.append("dealName", dealName);
      if (transactionId) queryParams.append("transactionId", transactionId);
      if (dealId) queryParams.append("dealId", dealId);
      if (customerName) queryParams.append("customerName", customerName);
      if (purchaseId) queryParams.append("purchaseId", purchaseId);

      const queryString = queryParams.toString();
      return api.get(`/admin/adminpurchases?${queryString}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAdminPurchases;
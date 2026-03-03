'use client'

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetRegistrationBonusListRequestParams {
  page?: number;
  size?: number;
  customerId?: string;
  status?: string;
}

const useGetRegistrationBonusList = (params: GetRegistrationBonusListRequestParams = {}) => {
  const {
    page = 0,
    size = 10,
    customerId,
    status
  } = params;

  const { data, isPending, error, isError, refetch, isRefetching } = useQuery({
    queryKey: ["registration-bonus-list", page, size, customerId, status],
    queryFn: () => {
      const queryParams = new URLSearchParams();

      // Required pagination parameters
      queryParams.append("page", page.toString());
      queryParams.append("size", size.toString());

      if (customerId) {
        queryParams.append("customerId", customerId);
      }

      if (status) {
        queryParams.append("status", status);
      }

      const queryString = queryParams.toString();
      return api.get(`/customer/admin/registration-bonus-list?${queryString}`);
    },
  });

  return { data, isPending, error, isError, refetch, isRefetching };
};

export default useGetRegistrationBonusList;
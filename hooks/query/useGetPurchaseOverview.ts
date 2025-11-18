'use client'

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetPurchaseOverview = () => {

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["purchases"],
    queryFn: () => api.get(`/admin/getPurchaseOverview`),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetPurchaseOverview;
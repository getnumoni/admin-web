'use client'

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetFundingOverview = () => {

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["funding-overview"],
    queryFn: () => api.get(`/admin/getFundingOverview`),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetFundingOverview;
'use client'

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetRevenueDashboard = () => {

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["revenue-dashboard"],
    queryFn: () => api.get(`/admin/revenue-dashboard`),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetRevenueDashboard;
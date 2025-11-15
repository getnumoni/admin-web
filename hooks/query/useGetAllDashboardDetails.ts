// admin / getalldashbordDetails


import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetAllDashboardDetails = () => {

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["dashboard-details"],
    queryFn: () => api.get(`/admin/getalldashbordDetails`),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAllDashboardDetails;
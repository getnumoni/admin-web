import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetReportCharitySummary = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["report-charity-summary"],
    queryFn: () => api.get(`/admin/Report/summary`),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetReportCharitySummary;
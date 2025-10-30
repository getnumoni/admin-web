import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetReportDonationTrend = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["report-donation-trend"],
    queryFn: () => api.get(`/admin/Report/donation-trend`),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetReportDonationTrend;
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const useGetChurnRateTrend = (startDate: Date | null, endDate: Date | null) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["report-church-rate-trend", startDate, endDate],
    queryFn: () => {
      const params = new URLSearchParams();
      if (startDate) {
        params.append("startDate", format(startDate, "dd-MM-yyyy"));
      }
      if (endDate) {
        params.append("endDate", format(endDate, "dd-MM-yyyy"));
      }
      const qs = params.toString();
      return api.get(`/admin/Report/churn-trends?${qs}`);
    },
    enabled: false, // Never auto-fetch, only manual refetch
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetChurnRateTrend;
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetReportPointSummary = (period: string) => {
  const normalized = (period || "").trim();

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["report-point-summary", normalized],
    queryFn: () => {
      const params = new URLSearchParams();
      params.append("period", normalized);
      const qs = params.toString();
      return api.get(`/admin/Report/points-summary?${qs}`);
    },
    enabled: normalized.length > 0,
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetReportPointSummary;
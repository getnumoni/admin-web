import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetReportPointFlow = (period: string) => {
  const normalized = (period || "").trim();

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["report-point-flow", normalized],
    queryFn: () => {
      const params = new URLSearchParams();
      params.append("period", normalized);
      const qs = params.toString();
      return api.get(`/admin/Report/points-flow?${qs}`);
    },
    enabled: normalized.length > 0,
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetReportPointFlow;
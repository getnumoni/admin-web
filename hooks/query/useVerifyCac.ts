import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useVerifyCac = ({ cacNo }: { cacNo: string }) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["verify-cac", cacNo],
    queryFn: () => api.get(`/admin/verifyme/cacVerification?cacNo=${cacNo}`),
    enabled: false, // Don't auto-fetch, only fetch when refetch is called
  });

  return { data, isPending, error, isError, refetch };
};

export default useVerifyCac;     
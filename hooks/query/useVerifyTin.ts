import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useVerifyTin = ({ tinNo }: { tinNo: string }) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["verify-tin", tinNo],
    queryFn: () => api.get(`/admin/verifyme/tinVerification?tinNo=${tinNo}`),
    enabled: false, // Don't auto-fetch, only fetch when refetch is called
  });

  return { data, isPending, error, isError, refetch };
};

export default useVerifyTin;     
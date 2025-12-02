import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useVerifyNin = ({ ninNo }: { ninNo: string }) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["verify-nin", ninNo],
    queryFn: () => api.get(`/admin/verifyme/ninVerification?ninNo=${ninNo}`),
    enabled: false, // Don't auto-fetch, only fetch when refetch is called
  });

  return { data, isPending, error, isError, refetch };
};

export default useVerifyNin;     
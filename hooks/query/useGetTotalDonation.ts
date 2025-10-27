import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetTotalDonation = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["total-donation"],
    queryFn: () => api.get(`/admin/total-donations`),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetTotalDonation;
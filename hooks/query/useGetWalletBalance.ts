import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetWalletBalance = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["wallets",],
    queryFn: () => api.get(`/admin/wallet-balances`),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetWalletBalance;
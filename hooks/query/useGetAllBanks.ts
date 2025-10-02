import bankApi from "@/lib/bank-api";
import { useQuery } from "@tanstack/react-query";


const useGetAllBanks = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["banks"],
    queryFn: () => bankApi.get("/v1/banks"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAllBanks;
import payOnUsApi from "@/lib/pay-on-us-api";
import { useQuery } from "@tanstack/react-query";


const useGeneratePayOnUsBankList = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["pay-on-us-banks"],
    queryFn: () => payOnUsApi.get("/api/v1/banks"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGeneratePayOnUsBankList;
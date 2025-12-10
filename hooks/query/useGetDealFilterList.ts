import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetDealListParams {
  dealName?: string;

}

const useGetDealFilterList = (params: GetDealListParams = {}) => {
  const {
    dealName,

  } = params;

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: [
      "deal-filter-list",
      dealName,
    ],
    queryFn: () => {
      const queryParams = new URLSearchParams();

      // Add filter parameters
      if (dealName) queryParams.append("dealName", dealName);

      const queryString = queryParams.toString();
      return api.get(`/admin/dealFilterList?${queryString}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetDealFilterList;
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetSponsorDealsParams {
  page?: number;
  size?: number;
  dealId?: string;
}

const useGetSponsorDeals = ({ page = 0, size = 10, dealId }: GetSponsorDealsParams = {}) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["sponsor-deals", page, size, dealId],
    queryFn: () => {
      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("size", size.toString());
      if (dealId?.trim()) {
        queryParams.append("dealId", dealId.trim());
      }
      return api.get(`/customer/sponsored-deals/admin/all?${queryParams.toString()}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetSponsorDeals;
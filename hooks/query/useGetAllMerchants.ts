import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetAllMerchantsParams {
  page?: number;
  size?: number;
  businessName?: string;
  createdDate?: string;
}

const useGetAllMerchants = (params: GetAllMerchantsParams = {}) => {
  const {
    page = 0,
    size = 10,
    businessName,
    createdDate,
  } = params;

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["merchants", page, size, businessName, createdDate],
    queryFn: () => {
      const queryParams = new URLSearchParams();

      // Required pagination parameters
      queryParams.append("page", page.toString());
      queryParams.append("size", size.toString());

      // Optional filter parameters
      if (businessName) queryParams.append("businessName", businessName);
      if (createdDate) queryParams.append("createdDate", createdDate);

      const queryString = queryParams.toString();
      return api.get(`/admin/getMerchantList?${queryString}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAllMerchants;
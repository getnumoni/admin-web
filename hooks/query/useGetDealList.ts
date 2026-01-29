import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetDealListParams {
  page?: number;
  size?: number;
  sort?: string[]; // e.g. ["createdDt,desc"]
  dealName?: string;
  merchantId?: string;
  category?: string;
  startDate?: string; // Format: dd-MM-yyyy
  endDate?: string; // Format: dd-MM-yyyy
  status?: string; // ACTIVE, INACTIVE
}

const useGetDealList = (params: GetDealListParams = {}) => {
  const {
    page = 0,
    size = 20,
    sort = [],
    dealName,
    merchantId,
    category,
    startDate,
    endDate,
    status,
  } = params;

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: [
      "deals",
      "dealList",
      page,
      size,
      sort.join("|"),
      dealName,
      merchantId,
      category,
      startDate,
      endDate,
      status,
    ],
    queryFn: () => {
      const queryParams = new URLSearchParams();

      // Add filter parameters
      if (dealName) queryParams.append("dealName", dealName);
      if (merchantId) queryParams.append("merchantId", merchantId);
      if (category) queryParams.append("category", category);
      if (startDate) queryParams.append("startDate", startDate);
      if (endDate) queryParams.append("endDate", endDate);
      if (status) queryParams.append("status", status);

      // Build pageable object
      const pageable: { page: number; size: number; sort?: string[] } = {
        page,
        size,
      };

      if (sort.length > 0) {
        pageable.sort = sort;
      }

      // Add pageable as JSON string
      queryParams.append("pageable", JSON.stringify(pageable));

      const queryString = queryParams.toString();
      return api.get(`/admin/dealsList?${queryString}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetDealList;
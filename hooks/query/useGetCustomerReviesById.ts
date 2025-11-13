import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetCustomerReviewsByIdParams {
  customerId: string;
  page?: number;
  size?: number;
  sort?: string[];
}

const useGetCustomerReviewsById = (params: GetCustomerReviewsByIdParams) => {
  const {
    customerId,
    page = 0,
    size = 10,
    sort = [],
  } = params;

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["customer-reviews", customerId, page, size, sort],
    queryFn: () => {
      const queryParams = new URLSearchParams();

      // Build pageable object
      const pageable: { page: number; size: number; sort?: string[] } = {
        page,
        size,
      };

      if (sort.length > 0) {
        pageable.sort = sort;
      }

      // Add pageable as JSON string (Spring Boot can accept this format)
      queryParams.append("pageable", JSON.stringify(pageable));

      const queryString = queryParams.toString();
      return api.get(`/admin/reviewsForCustomerId/${customerId}?${queryString}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetCustomerReviewsById;
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetCustomersParams {
  page?: number;
  size?: number;
  name?: string;
  createdDate?: string;
  sort?: string[];
}

const useGetCustomers = (params: GetCustomersParams = {}) => {
  const {
    page = 0,
    size = 20,
    name,
    createdDate,
    sort = [],
  } = params;

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["customers", page, size, name, createdDate, sort],
    queryFn: () => {
      const queryParams = new URLSearchParams();

      // Top-level pagination parameters (Spring Pageable defaults)
      queryParams.append("page", String(page));
      queryParams.append("size", String(size));

      // Optional filters
      if (name) queryParams.append("name", name);
      if (createdDate) queryParams.append("createdDate", createdDate);

      // Optional sort parameters (e.g., field,asc)
      for (const s of sort) {
        queryParams.append("sort", s);
      }

      return api.get(`/admin/getCustomerList?${queryParams.toString()}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetCustomers;
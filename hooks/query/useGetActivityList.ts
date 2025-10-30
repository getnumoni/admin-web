import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface ActivityListParams {
  page?: number;
  size?: number;
  sort?: string[];
  userName?: string;
  action?: string;
  fromDate?: string;
  toDate?: string;
  userId?: string;
}

const useGetActivityList = (params: ActivityListParams = {}) => {
  const {
    page = 0,
    size = 10,
    sort = [],
    userName,
    action,
    fromDate,
    toDate,
    userId,
  } = params;

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["activity-list", page, size, sort, userName, action, fromDate, toDate, userId],
    queryFn: () => {
      // Build query string with pageable object as JSON
      const queryParams = new URLSearchParams();

      // Add filter parameters
      if (userName) queryParams.append("userName", userName);
      if (action) queryParams.append("action", action);
      if (fromDate) queryParams.append("fromDate", fromDate);
      if (toDate) queryParams.append("toDate", toDate);
      if (userId) queryParams.append("userId", userId);

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
      return api.get(`/admin/activityList?${queryString}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetActivityList;
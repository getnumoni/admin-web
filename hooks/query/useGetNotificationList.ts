import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface GetNotificationListParams {
  page?: number;
  size?: number;
  title?: string;
  createdDate?: string;
}

const useGetNotificationList = (params: GetNotificationListParams = {}) => {
  const {
    page = 0,
    size = 20,
    title,
    createdDate,
  } = params;

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["notification", page, size, title, createdDate],
    queryFn: () => {
      const queryParams = new URLSearchParams();

      // Required pagination parameters
      queryParams.append("page", page.toString());
      queryParams.append("size", size.toString());

      // Optional filters
      if (title) queryParams.append("title", title);
      if (createdDate) queryParams.append("createdDate", createdDate);

      return api.get(`/admin/notificationsList?${queryParams.toString()}`);
    },
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetNotificationList;
// admin/alerts-dashboard

import api from "@/lib/api";
import { AlertDashboardResponse } from "@/schema/alert-dashboard-types";
import { useQuery } from "@tanstack/react-query";


const useGetAlertDashboard = () => {
  const { data, isPending, error, isError, refetch } = useQuery<AlertDashboardResponse>({
    queryKey: ["alert-dashboard"],
    queryFn: () => api.get("/admin/alerts-dashboard").then(res => res.data),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetAlertDashboard;
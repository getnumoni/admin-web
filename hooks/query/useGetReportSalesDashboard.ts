import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const useGetReportSalesDashboard = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["report", "sales", "dashboard"],
    queryFn: () => api.get("/admin/Report/salesDashBoard"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetReportSalesDashboard;
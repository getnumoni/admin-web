import api from "@/lib/api";
import { getCurrentDate } from "@/lib/helper";
import { useQuery } from "@tanstack/react-query";

interface DashboardInfoParams {
  fromDate?: string;
  toDate?: string;
}

const useGetDashboardInfo = ({ fromDate, toDate }: DashboardInfoParams = {}) => {
  const defaultFromDate = fromDate || getCurrentDate('dd-mm-yyyy');
  const defaultToDate = toDate || getCurrentDate('dd-mm-yyyy');

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["dashboard", defaultFromDate, defaultToDate],
    queryFn: () => api.get(`/admin/dashboard?fromDate=${defaultFromDate}&toDate=${defaultToDate}`),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetDashboardInfo;
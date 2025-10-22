import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetSupportTicketList = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["supports"],
    queryFn: () => api.get("/admin/supportTicketList"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetSupportTicketList;
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetTicketTypeList = () => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => api.get("/admin/ticketTypeList"),
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetTicketTypeList;
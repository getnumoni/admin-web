import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetSupportTicketById = ({ ticketId }: { ticketId: string }) => {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["supports", ticketId],
    queryFn: () => api.get(`/admin/supportTicket/${ticketId}`),
    enabled: !!ticketId,
  });

  return { data, isPending, error, isError, refetch };
};

export default useGetSupportTicketById;
// admin / save

import api from "@/lib/api";
import { CreateTicketTypePayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const useCreateTicketType = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: CreateTicketTypePayload) => api.post("/admin/saveTicketType", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Ticket type created successfully");

      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(error?.response?.data?.message ?? "Failed to create ticket type");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      queryClient.invalidateQueries({ queryKey: ["support"] });
    },
  });

  const handleCreateTicketType = (data: CreateTicketTypePayload) => {
    mutate(data);
  };

  return { handleCreateTicketType, isPending, isSuccess };
};
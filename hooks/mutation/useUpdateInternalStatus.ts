import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type UpdateInternalStatusPayload = {
  email: string;
  isInternal: boolean;
  userType: "MERCHANT" | "CUSTOMER" | "CHARITY";
};

export const useUpdateInternalStatus = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: UpdateInternalStatusPayload) => api.post(`/admin/updateInternalStatus?email=${data.email}&isInternal=${data.isInternal}&userType=${data.userType}`),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Internal status updated successfully");

      }
    },
    onError: (error: { response: { data: { message: string } } }) => {

      toast.error(error?.response?.data?.message ?? "Failed to update internal status");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["merchants"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["charities"] });
    },
  });

  const handleUpdateInternalStatus = (data: UpdateInternalStatusPayload) => {
    mutate(data);
  };

  return { handleUpdateInternalStatus, isPending, isSuccess };
};

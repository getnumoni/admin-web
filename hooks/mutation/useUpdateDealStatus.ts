import api from "@/lib/api";
import { UpdateDealStatusPayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const useUpdateDealStatus = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: (data: UpdateDealStatusPayload) => api.put("/admin/updateDealStatus", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Deal status updated successfully");
        queryClient.invalidateQueries({ queryKey: ["deals"] });
        queryClient.invalidateQueries({ queryKey: ["deals-promo"] });
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log("Failed to update deal status", error);
      toast.error(error?.response?.data?.message ?? "Failed to update deal status");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      queryClient.invalidateQueries({ queryKey: ["deals-promo"] });
    },
  });

  const handleUpdateDealStatus = (data: UpdateDealStatusPayload) => {
    mutate(data);
  };

  return { handleUpdateDealStatus, isPending, isSuccess, isError };
};
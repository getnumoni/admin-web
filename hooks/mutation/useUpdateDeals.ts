import api from "@/lib/api";
import { EditDealPayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const useUpdateDeals = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: EditDealPayload) => api.put("/admin/deals", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Deals updated successfully");
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log("Failed to create deals", error);
      toast.error(error?.response?.data?.message ?? "Failed to update deals");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
    },
  });

  const handleUpdateDeals = (data: EditDealPayload) => {
    mutate(data);
  };

  return { handleUpdateDeals, isPending, isSuccess };
};
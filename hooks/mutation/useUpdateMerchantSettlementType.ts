// admin / save

import api from "@/lib/api";
import { UpdateMerchantSettlementPayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateMerchantSettlementType = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: UpdateMerchantSettlementPayload) => api.put("/admin/updateMerchantSettlementType", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Merchant settlement type updated successfully");
        queryClient.invalidateQueries({ queryKey: ["merchants"] });
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {

      toast.error(error?.response?.data?.message ?? "Failed to update merchant settlement type");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["merchants"] });
    },
  });

  const handleUpdateMerchantSettlementType = (data: UpdateMerchantSettlementPayload) => {
    mutate(data);
  };

  return { handleUpdateMerchantSettlementType, isPending, isSuccess };
};
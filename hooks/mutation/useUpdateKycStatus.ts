import api from "@/lib/api";
import { UpdateKycStatusPayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const useUpdateKycStatus = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: UpdateKycStatusPayload) => api.put("/admin/updateKycStatus", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "KYC updated successfully");

      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(error?.response?.data?.message ?? "Failed to update KYC");
    },
    onSettled: (_data, _error, variables) => {
      // Invalidate merchant details query to refresh data
      queryClient.invalidateQueries({ queryKey: ["merchants", variables.merchantId] });
    },
  });

  const handleUpdateKyc = (data: UpdateKycStatusPayload) => {
    mutate(data);
  };

  return { handleUpdateKyc, isPending, isSuccess };
};
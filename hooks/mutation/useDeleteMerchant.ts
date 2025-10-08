import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface DeleteMerchantPayload {
  merchantId: string;
}

export const useDeleteMerchant = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: DeleteMerchantPayload) =>
      api.delete(`/admin/deleteMerchant?merchantId=${data.merchantId}`),
    onSuccess: (data) => {
      toast.success(data?.data?.message ?? "Merchant deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["merchants"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log("Failed to delete merchant", error);
      toast.error(error?.response?.data?.message ?? "Failed to delete merchant");
    },
  });

  const handleDeleteMerchant = (merchantId: string) => {
    mutate({ merchantId });
  };

  return { handleDeleteMerchant, isPending, isSuccess };
};

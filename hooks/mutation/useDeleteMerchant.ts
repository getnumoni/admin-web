import { ADMIN_MERCHANTS_URL } from "@/constant/routes";
import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DeleteMerchantPayload {
  merchantId: string;
}

export const useDeleteMerchant = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: DeleteMerchantPayload) =>
      api.delete(`/admin/deleteMerchantById?merchantId=${data.merchantId}`),
    onSuccess: (data) => {
      toast.success(data?.data?.message ?? "Merchant deleted successfully");
      router.push(ADMIN_MERCHANTS_URL);
      queryClient.invalidateQueries({ queryKey: ["merchants"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {

      toast.error(error?.response?.data?.message ?? "Failed to delete merchant");
    },
  });

  const handleDeleteMerchant = (merchantId: string) => {
    mutate({ merchantId });
  };

  return { handleDeleteMerchant, isPending, isSuccess };
};

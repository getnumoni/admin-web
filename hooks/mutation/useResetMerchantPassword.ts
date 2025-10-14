import { ADMIN_MERCHANTS_URL } from "@/constant/routes";
import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ResetMerchantPasswordPayload {
  id: string;
  newPassword: string;
}

export const useResetMerchantPassword = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: ResetMerchantPasswordPayload) =>
      api.put(`/admin/resetPasswordToMerchant`, data),
    onSuccess: (data) => {
      toast.success(data?.data?.message ?? "Merchant password reset successfully");
      router.push(ADMIN_MERCHANTS_URL);
      queryClient.invalidateQueries({ queryKey: ["merchants"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log("Failed to reset merchant password", error);
      toast.error(error?.response?.data?.message ?? "Failed to reset merchant password");
    },
  });

  const handleResetMerchantPassword = (data: ResetMerchantPasswordPayload) => {
    mutate(data);
  };

  return { handleResetMerchantPassword, isPending, isSuccess };
};

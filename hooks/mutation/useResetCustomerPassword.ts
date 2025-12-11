import { ADMIN_CUSTOMERS_URL } from "@/constant/routes";
import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ResetCustomerPasswordPayload {
  id: string;
  newPassword: string;
}

export const useResetCustomerPassword = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: ResetCustomerPasswordPayload) =>
      api.put(`/admin/resetPasswordToCustomer`, data),
    onSuccess: (data) => {
      toast.success(data?.data?.message ?? "Customer password reset successfully");
      router.push(ADMIN_CUSTOMERS_URL);
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(error?.response?.data?.message ?? "Failed to reset customer password");
    },
  });

  const handleResetCustomerPassword = (data: ResetCustomerPasswordPayload) => {
    mutate(data);
  };

  return { handleResetCustomerPassword, isPending, isSuccess };
};

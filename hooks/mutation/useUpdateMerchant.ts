// admin / save

import { ADMIN_MERCHANTS_URL } from "@/constant/routes";
import api from "@/lib/api";
import { UpdateMerchantPayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useUpdateMerchant = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: UpdateMerchantPayload) => api.put("/admin/update", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Merchant updated successfully");
        router.push(ADMIN_MERCHANTS_URL);
        queryClient.invalidateQueries({ queryKey: ["merchants"] });
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {

      toast.error(error?.response?.data?.message ?? "Failed to update merchant");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["merchants"] });
    },
  });

  const handleUpdateMerchant = (data: UpdateMerchantPayload) => {
    mutate(data);
  };

  return { handleUpdateMerchant, isPending, isSuccess };
};
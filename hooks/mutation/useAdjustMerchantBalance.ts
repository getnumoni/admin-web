// admin / adjust-merchant-points

import { ADMIN_MERCHANTS_URL } from "@/constant/routes";
import api from "@/lib/api";
import { AdjustBalancePayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useAdjustMerchantBalance = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: AdjustBalancePayload) => api.post("/admin/adjustBalance", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Merchant balance adjusted successfully");
        router.push(ADMIN_MERCHANTS_URL);
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      // console.log("Failed to adjust merchant points", error);
      toast.error(error?.response?.data?.message ?? "Failed to adjust merchant balance");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["merchants"] });
    },
  });

  const handleAdjustMerchantBalance = (data: AdjustBalancePayload) => {
    mutate(data);
  };

  return { handleAdjustMerchantBalance, isPending, isSuccess };
};
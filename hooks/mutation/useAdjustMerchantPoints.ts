// admin / adjust-merchant-points

import { ADMIN_MERCHANTS_URL } from "@/constant/routes";
import api from "@/lib/api";
import { AdjustPointPayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useAdjustMerchantPoints = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: AdjustPointPayload) => api.post("/admin/adjustPoints", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Merchant points adjusted successfully");
        router.push(ADMIN_MERCHANTS_URL);
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      // console.log("Failed to adjust merchant points", error);
      toast.error(error?.response?.data?.message ?? "Failed to adjust merchant points");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["merchants"] });
    },
  });

  const handleAdjustMerchantPoints = (data: AdjustPointPayload) => {
    mutate(data);
  };

  return { handleAdjustMerchantPoints, isPending, isSuccess };
};
// admin / adjust-merchant-points

import { ADMIN_CUSTOMERS_URL } from "@/constant/routes";
import api from "@/lib/api";
import { AdjustPointPayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useAdjustCustomerPoint = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: AdjustPointPayload) => api.post("/admin/adjustPointsForCustomer", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Customer points adjusted successfully");
        router.push(ADMIN_CUSTOMERS_URL);
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      // console.log("Failed to adjust merchant points", error);
      toast.error(error?.response?.data?.message ?? "Failed to adjust customer points");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  const handleAdjustCustomerPoint = (data: AdjustPointPayload) => {
    mutate(data);
  };

  return { handleAdjustCustomerPoint, isPending, isSuccess };
};
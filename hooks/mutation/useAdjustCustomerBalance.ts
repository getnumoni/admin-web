// admin / adjust-merchant-points

import { ADMIN_CUSTOMERS_URL } from "@/constant/routes";
import api from "@/lib/api";
import { AdjustBalancePayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useAdjustCustomerBalance = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: AdjustBalancePayload) => api.post("/admin/adjustBalanceForCustomer", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Customer balance adjusted successfully");
        router.push(ADMIN_CUSTOMERS_URL);
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      // console.log("Failed to adjust merchant points", error);
      toast.error(error?.response?.data?.message ?? "Failed to adjust customer balance");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  const handleAdjustCustomerBalance = (data: AdjustBalancePayload) => {
    mutate(data);
  };

  return { handleAdjustCustomerBalance, isPending, isSuccess };
};
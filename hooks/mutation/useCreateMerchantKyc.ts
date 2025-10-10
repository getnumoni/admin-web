// admin / save

import { ADMIN_MERCHANTS_URL } from "@/constant/routes";
import api from "@/lib/api";
import { CreateCustomerKycPayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateMerchantKyc = (merchantId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: CreateCustomerKycPayload) => api.post(`admin/kycdocuments?merchantId=${merchantId}`, data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Customer KYC documents created successfully");
        router.push(ADMIN_MERCHANTS_URL);
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log("Failed to create customer KYC documents", error);
      toast.error(error?.response?.data?.message ?? "Failed to create customer KYC documents");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["merchant"] });
    },
  });

  const handleCreateMerchantKyc = (data: CreateCustomerKycPayload) => {
    console.log('handleCreateMerchantKyc called with data:', data);
    console.log('merchantId:', merchantId);
    mutate(data);
  };

  return { handleCreateMerchantKyc, isPending, isSuccess };
};
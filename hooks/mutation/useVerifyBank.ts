import bankApi from "@/lib/bank-api";
import { VerifyBankPayload } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";


export const useVerifyBank = () => {
  const { mutate, isPending, isSuccess, data } = useMutation({
    mutationFn: (data: VerifyBankPayload) => bankApi.post("/v1/ng/identities/nuban", data),
    onSuccess: (response) => {
      console.log("verification response", response);
      toast.success("Account verified successfully");
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(error?.response?.data?.message ?? "Failed to verify bank");
    }
  })

  const handleVerifyBank = useCallback((data: VerifyBankPayload) => {
    mutate(data);
  }, [mutate]);

  // Extract account name from response
  const accountName = data?.data?.nuban?.accountName || "";

  return { handleVerifyBank, isPending, isSuccess, accountName, data };

}
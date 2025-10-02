import { useBankStore } from "@/stores/bank-store";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";


export const useGenerateBankToken = () => {

  const { setToken } = useBankStore();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async () => {
      // Call our server-side API instead of bank API directly
      const response = await fetch("/api/generateBankToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate bank token");
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Extract token data from response
      const tokenData = data;
      // console.log("Bank token response", tokenData);
      if (tokenData && tokenData.accessToken) {
        // Save token to store
        setToken({
          accessToken: tokenData.accessToken,
          expiresIn: tokenData.expiresIn,
          tokenType: tokenData.tokenType
        });
        // toast.success("Bank token generated successfully");
      } else {
        toast.error("Invalid token response format");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to generate bank token");
    },
  })

  const handleGenerateBankToken = useCallback(() => {
    mutate();
  }, [mutate]);

  return { handleGenerateBankToken, isPending, isSuccess };

}
import { usePayOnUsStore } from "@/stores/pay-on-us-store";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";


export const useGeneratePayOnUsToken = () => {
  const { setToken } = usePayOnUsStore();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/pay-on-us/generate-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate pay on us token");
      }
      return response.json();
    },
    onSuccess: (data) => {
      // console.log("pay on us token response", data);
      if (data?.data) {
        setToken({
          access_token: data.data.access_token,
          token_type: data.data.token_type,
          expires_in: data.data.expires_in
        });
      }
    },
    onError: (error: { message: string }) => {
      toast.error(error.message ?? "Failed to generate pay on us token");
    },
  });

  const handleGeneratePayOnUsToken = useCallback(() => {
    mutate();
  }, [mutate]);

  return { handleGeneratePayOnUsToken, isPending, isSuccess };
};
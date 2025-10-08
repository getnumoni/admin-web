// admin / save

import { ADMIN_MERCHANTS_URL } from "@/constant/routes";
import api from "@/lib/api";
import { CreateMerchantsPayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useCreateMerchants = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: CreateMerchantsPayload) => api.post("/admin/save", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Merchants created successfully");
        router.push(ADMIN_MERCHANTS_URL);
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log("Failed to create merchants", error);
      toast.error(error?.response?.data?.message ?? "Failed to create merchants");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["merchants"] });
    },
  });

  const handleCreateMerchants = (data: CreateMerchantsPayload) => {
    mutate(data);
  };

  return { handleCreateMerchants, isPending, isSuccess };
};
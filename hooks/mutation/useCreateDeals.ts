import { ADMIN_DEALS_PROMO_URL } from "@/constant/routes";
import api from "@/lib/api";
import { CreateDealsPayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useCreateDeals = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: CreateDealsPayload) => api.post("/admin/deals", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Deals created successfully");
        router.push(ADMIN_DEALS_PROMO_URL);
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log("Failed to create deals", error);
      toast.error(error?.response?.data?.message ?? "Failed to create deals");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
    },
  });

  const handleCreateDeals = (data: CreateDealsPayload) => {
    mutate(data);
  };

  return { handleCreateDeals, isPending, isSuccess };
};
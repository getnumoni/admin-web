import { ADMIN_DEALS_PROMO_URL } from "@/constant/routes";
import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


interface DeleteDealsPayload {
  dealId: string;
}

export const useDeleteDeals = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: DeleteDealsPayload) => api.delete(`/admin/deleteDeals?dealId=${data.dealId}`),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Deals deleted successfully");
        router.push(ADMIN_DEALS_PROMO_URL);
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(error?.response?.data?.message ?? "Failed to delete deal");
    },
    onSettled: () => {
      // Invalidate all deal-related queries at once
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      queryClient.invalidateQueries({ queryKey: ["deals-promo"] });
    },
  });

  const handleDeleteDeals = (data: DeleteDealsPayload) => {
    mutate(data);
  };

  return { handleDeleteDeals, isPending, isSuccess };
};
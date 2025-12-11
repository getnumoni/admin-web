import { ADMIN_DEALS_PROMO_SPONSORED_DEAL_URL } from "@/constant/routes";
import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DeleteSponsoredDealPayload {
  id: string;
}

export const useDeleteSponsoredDeal = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: DeleteSponsoredDealPayload) => api.delete(`/customer/sponsored-deals/${data.id}`),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Sponsored deal deleted successfully");
        router.push(ADMIN_DEALS_PROMO_SPONSORED_DEAL_URL);
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log("Failed to delete sponsored deal", error);
      toast.error(error?.response?.data?.message ?? "Failed to delete sponsored deal");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["sponsored-deals"] });
      queryClient.invalidateQueries({ queryKey: ["deals-promo"] });
    },
  });

  const handleDeleteSponsoredDeal = (data: DeleteSponsoredDealPayload) => {
    mutate(data);
  };

  return { handleDeleteSponsoredDeal, isPending, isSuccess };
};


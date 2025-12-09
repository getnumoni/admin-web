import { ADMIN_DEALS_PROMO_SPONSORED_DEAL_URL } from "@/constant/routes";
import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UpdateSponsoredDealPayload {
  id: string;
  heading: string;
  description: string;
  dealId?: string;
  backgroundImage: string;
  isActive: boolean;
}

export const useUpdateSponsoredDeal = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: UpdateSponsoredDealPayload) => api.put(`/customer/sponsored-deals/${data.id}`, data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Sponsored deal updated successfully");
        router.push(ADMIN_DEALS_PROMO_SPONSORED_DEAL_URL);
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log("Failed to update sponsored deal", error);
      toast.error(error?.response?.data?.message ?? "Failed to update sponsored deal");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["sponsored-deals"] });
      queryClient.invalidateQueries({ queryKey: ["deals-promo"] });
    },
  });

  const handleUpdateSponsoredDeal = (data: UpdateSponsoredDealPayload) => {
    mutate(data);
  };

  return { handleUpdateSponsoredDeal, isPending, isSuccess };
};


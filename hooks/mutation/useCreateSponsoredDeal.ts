import { ADMIN_DEALS_PROMO_SPONSORED_DEAL_URL } from "@/constant/routes";
import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateSponsoredDealPayload {
  heading: string;
  description: string;
  dealId: string;
  backgroundImage: string;
  isActive: boolean;
}

export const useCreateSponsoredDeal = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: CreateSponsoredDealPayload) => api.post("/customer/sponsored-deals", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Sponsored deal created successfully");
        router.push(ADMIN_DEALS_PROMO_SPONSORED_DEAL_URL);
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log("Failed to create sponsored deal", error);
      toast.error(error?.response?.data?.message ?? "Failed to create sponsored deal");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["sponsored-deals"] });
      queryClient.invalidateQueries({ queryKey: ["deals-promo"] });
    },
  });

  const handleCreateSponsoredDeal = (data: CreateSponsoredDealPayload) => {
    mutate(data);
  };

  return { handleCreateSponsoredDeal, isPending, isSuccess };
};


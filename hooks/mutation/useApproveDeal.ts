import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ApproveDealPayload {
  dealId: string;
  approvalStatus: "APPROVED" | "REJECTED";
  adminComments?: string;
  adminUsername?: string;
  rejectionReason?: string;
  priority?: string;
  approved: boolean;
}

export const useApproveDeal = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: ApproveDealPayload) => api.put("/admin/deals/approve", data),
    onSuccess: (data) => {
      if (data) {
        const status = data?.data?.data?.approvalStatus === "APPROVED" ? "approved" : "rejected";
        toast.success(data?.data?.message ?? `Deal ${status} successfully`);
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log("Failed to approve/reject deal", error);
      toast.error(error?.response?.data?.message ?? "Failed to update deal approval status");
    },
    onSettled: () => {
      // Invalidate all deal-related queries
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      queryClient.invalidateQueries({ queryKey: ["deals-promo"] });
    },
  });

  const handleApproveDeal = (data: ApproveDealPayload) => {
    mutate(data);
  };

  return { handleApproveDeal, isPending, isSuccess };
};


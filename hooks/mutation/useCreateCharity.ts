import { ADMIN_CHARITY_URL } from "@/constant/routes";
import api from "@/lib/api";
import { CreateCharityPayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useCreateCharity = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: CreateCharityPayload) => api.post("/admin/charity/createCharity", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Charity created successfully");
        router.push(ADMIN_CHARITY_URL);
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log("Failed to create charity", error);
      toast.error(error?.response?.data?.message ?? "Failed to create charity");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["charity"] });
    },
  });

  const handleCreateCharity = (data: CreateCharityPayload) => {
    mutate(data);
  };

  return { handleCreateCharity, isPending, isSuccess };
};
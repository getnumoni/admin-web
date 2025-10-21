// admin / save

import api from "@/lib/api";
import { CreateModulePayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const useCreateModule = () => {
  const queryClient = useQueryClient();


  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: CreateModulePayload) => api.post("/admin/saveModule", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Module created successfully");

      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(error?.response?.data?.message ?? "Failed to create merchants");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  const handleCreateModule = (data: CreateModulePayload) => {
    mutate(data);
  };

  return { handleCreateModule, isPending, isSuccess };
};
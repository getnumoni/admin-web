// admin / save

import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const useDeleteModule = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: { moduleId: string }) => api.delete(`/admin/deleteModule?moduleId=${data.moduleId}`),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Module deleted successfully");
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      // console.log("Failed to delete module", error);
      toast.error(error?.response?.data?.message ?? "Failed to delete module");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  const handleDeleteModule = (data: { moduleId: string }) => {
    mutate(data);
  };

  return { handleDeleteModule, isPending, isSuccess };
};
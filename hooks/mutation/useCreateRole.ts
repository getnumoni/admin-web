// admin / save

import api from "@/lib/api";
import { CreateRolePayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const useCreateRole = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: CreateRolePayload) => api.post("/admin/saveRole", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Role created successfully");

      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(error?.response?.data?.message ?? "Failed to create merchants");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },
  });

  const handleCreateRole = (data: CreateRolePayload) => {
    mutate(data);
  };

  return { handleCreateRole, isPending, isSuccess };
};
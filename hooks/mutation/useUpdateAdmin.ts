import api from "@/lib/api";
import { CreateAdminPayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();


  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: CreateAdminPayload) => api.put("/admin/employee", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Admin updated successfully");

      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(error?.response?.data?.message ?? "Failed to update admin");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });

  const handleUpdateAdmin = (data: CreateAdminPayload) => {
    mutate(data);
  };

  return { handleUpdateAdmin, isPending, isSuccess };
};
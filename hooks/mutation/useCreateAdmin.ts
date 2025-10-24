import { ADMIN_MANAGEMENT_URL } from "@/constant/routes";
import api from "@/lib/api";
import { CreateAdminPayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useCreateAdmin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: CreateAdminPayload) => api.post("/admin/employee", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Admin created successfully");
        router.push(ADMIN_MANAGEMENT_URL);
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(error?.response?.data?.message ?? "Failed to create admin");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });

  const handleCreateAdmin = (data: CreateAdminPayload) => {
    mutate(data);
  };

  return { handleCreateAdmin, isPending, isSuccess };
};
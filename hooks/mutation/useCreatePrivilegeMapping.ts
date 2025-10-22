// admin / save

import { ADMIN_MERCHANTS_ROLES_URL } from "@/constant/routes";
import api from "@/lib/api";
import { CreatePrivilegeMappingPayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useCreatePrivilegeMapping = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: CreatePrivilegeMappingPayload) => api.post("/admin/saveModulePrivilegeMapping", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Privilege mapping created successfully");
        router.push(ADMIN_MERCHANTS_ROLES_URL);
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(error?.response?.data?.message ?? "Failed to create privilege mapping");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["modules"] });
      queryClient.invalidateQueries({ queryKey: ["privileges"] });
    },
  });

  const handleCreatePrivilegeMapping = (data: CreatePrivilegeMappingPayload) => {
    mutate(data);
  };

  return { handleCreatePrivilegeMapping, isPending, isSuccess };
};
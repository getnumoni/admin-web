import { ADMIN_CUSTOMERS_URL } from "@/constant/routes";
import api from "@/lib/api";
import { CreateCustomersPayload } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export const useCreateCustomers = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: CreateCustomersPayload) => api.post("/admin/saveCustomer", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Customers created successfully");
        router.push(ADMIN_CUSTOMERS_URL);
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log("Failed to create customers", error);
      toast.error(error?.response?.data?.message ?? "Failed to create customers");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  const handleCreateCustomers = (data: CreateCustomersPayload) => {
    mutate(data);
  };

  return { handleCreateCustomers, isPending, isSuccess };
};
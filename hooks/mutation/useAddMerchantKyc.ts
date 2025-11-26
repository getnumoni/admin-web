import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type AddMerchantKycPayload = {
  id: string;
  identificationType: string;
  identificationTypeNumber?: string;
  cacIdentificationNumber?: string;
  tinIdentificationNumber?: string;
  businessRegistrationNumber: string;
  documentUrl: string;
  verificationStatus: boolean;
}


export const useAddMerchantKyc = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: AddMerchantKycPayload) => api.post("/admin/addKycForMerchant", data),
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "KYC added successfully");
        queryClient.invalidateQueries({ queryKey: ["merchants"] });


      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      toast.error(error?.response?.data?.message ?? "Failed to add KYC");
    },
    onSettled: (_data, _error, variables) => {
      // Invalidate merchant details query to refresh data
      queryClient.invalidateQueries({ queryKey: ["merchants", variables.id] });
    },
  });

  const handleAddMerchantKyc = (data: AddMerchantKycPayload) => {
    mutate(data);
  };

  return { handleAddMerchantKyc, isPending, isSuccess };
};
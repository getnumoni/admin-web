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
    mutationFn: (data: CreateCharityPayload) => {
      const formData = new FormData();
      // Append scalar fields
      formData.append('charityName', data.charityName);
      formData.append('charityRegNumber', data.charityRegNumber);
      formData.append('charityAddress', data.charityAddress);
      formData.append('country', data.country);
      formData.append('state', data.state);
      formData.append('city', data.contactState);
      formData.append('description', data.description);
      formData.append('contactPersonName', data.contactPersonName);
      formData.append('contactEmail', data.contactEmail);
      formData.append('contactPhoneNumber', data.contactPhoneNumber);
      formData.append('password', data.password);
      formData.append('contactAddress', data.contactAddress);
      formData.append('contactCountry', data.contactCountry);
      formData.append('contactState', data.contactState);
      formData.append('contactCity', data.contactCity);
      formData.append('bankName', data.bankName);
      formData.append('bankAccountNumber', data.bankAccountNumber);
      formData.append('accountName', data.accountName);
      formData.append('verifiedAccountName', data.verifiedAccountName);

      // Append array fields (repeat the key for each value)
      if (Array.isArray(data.associatedBrandsIds)) {
        data.associatedBrandsIds.forEach((id) => {
          formData.append('associatedBrandsIds', id);
        });
      }

      return api.post("/admin/charity/createCharity", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    },
    onSuccess: (data) => {
      if (data) {
        toast.success(data?.data?.message ?? "Charity created successfully");
        router.push(ADMIN_CHARITY_URL);
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {

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
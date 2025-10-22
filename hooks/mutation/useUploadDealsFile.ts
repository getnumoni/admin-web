import api from "@/lib/api";
import { useUploadStore } from "@/lib/stores/upload-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export const useUploadDealsFile = () => {
  const queryClient = useQueryClient();

  const { addImagePath } = useUploadStore();

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: (data: FormData) => api.post("/admin/uploadDealsFile", data),
    onSuccess: (data) => {
      // console.log("Deals file uploaded successfully", data?.data?.data?.imageUrl);

      if (data) {

        const imagePath = data?.data?.data?.imageUrl;
        console.log('imagePath', imagePath);
        if (imagePath) {
          addImagePath(imagePath);
        }
        toast.success(data?.data?.message ?? "Deals file uploaded successfully");
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log("Failed to upload deals file", error);
      toast.error(error?.response?.data?.message ?? "Failed to upload deals file");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
    },
  });

  const handleUploadDealsFile = async (data: FormData) => {
    const result = await mutateAsync(data);
    return result?.data?.data?.imageUrl;
  };

  return { handleUploadDealsFile, isPending, isSuccess };
};
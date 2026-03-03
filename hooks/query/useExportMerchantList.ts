import api from "@/lib/api";
import { ExportTypeMerchant } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useExportMerchantList = () => {
  const { mutate, isPending, isSuccess, reset } = useMutation({
    mutationFn: async (params: ExportTypeMerchant) => {
      const response = await api.get(`/admin/getMerchantList/export`, {
        params,
        responseType: "blob", // Important for file downloads
      });
      return response;
    },
    onSuccess: (response) => {
      // Handle file download
      const blob = new Blob([response.data], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Try to get filename from Content-Disposition header, fallback to default
      const contentDisposition = response.headers["content-disposition"];
      let filename = "merchants-list.csv"; // default filename

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(
          /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        );
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1].replace(/['"]/g, "");
        }
      }

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Merchant list exported successfully");
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(
        error?.response?.data?.message ?? "Failed to export merchant list"
      );
    },
  });

  const handleExportMerchantList = (params: ExportTypeMerchant) => {
    mutate(params);
  };

  return { handleExportMerchantList, isPending, isSuccess, reset };
};

export default useExportMerchantList;
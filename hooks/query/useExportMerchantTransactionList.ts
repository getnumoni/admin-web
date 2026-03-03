import api from "@/lib/api";
import { ExportTypeMerchant } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


const useExportMerchantTransactionList = () => {
  const { mutate, mutateAsync, isPending, isSuccess, reset } = useMutation({
    mutationFn: async (params: ExportTypeMerchant) => {
      const response = await api.get(`/admin/getMerchantTransactionList/export`, {
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
      let filename = "merchant-transaction-list.csv"; // default filename

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

      toast.success("Merchant transaction list exported successfully");
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(
        error?.response?.data?.message ?? "Failed to export merchant transaction list"
      );
    },
  });

  const handleExportMerchantTransactionList = (params: ExportTypeMerchant) => {
    mutate(params);
  };

  return { handleExportMerchantTransactionList, exportMutateAsync: mutateAsync, isPending, isSuccess, reset };
};

export default useExportMerchantTransactionList;
import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export interface ExportCustomerSharePointParams {
  customerId?: string;
  startDate: string;
  endDate: string;
}

const useExportCustomerSharePoint = () => {
  const { mutate, mutateAsync, isPending, isSuccess, reset } = useMutation({
    mutationFn: async (params: ExportCustomerSharePointParams) => {
      const response = await api.get(`/admin/customerSharePoints/export`, {
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
      let filename = "customer-sharepoint.csv"; // default filename

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

      toast.success("Customer sharepoint exported successfully");
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(
        error?.response?.data?.message ?? "Failed to export customer sharepoint"
      );
    },
  });

  const handleExportCustomerSharePoint = (params: ExportCustomerSharePointParams) => {
    mutate(params);
  };

  return { handleExportCustomerSharePoint, exportMutateAsync: mutateAsync, isPending, isSuccess, reset };
};

export default useExportCustomerSharePoint;
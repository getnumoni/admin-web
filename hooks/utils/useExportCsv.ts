import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";

interface UseExportCsvOptions {
  /** API endpoint path, e.g. "/admin/dealsList/export" */
  endpoint: string;
  /** Fallback filename if Content-Disposition header is absent */
  defaultFilename: string;
  /** Toast message shown on success */
  successMessage: string;
  /** Toast message shown on failure */
  errorMessage: string;
}

/**
 * Generic reusable hook for CSV export endpoints.
 *
 * All export hooks share the same flow:
 *  1. GET request with query params, responseType "blob"
 *  2. Parse Content-Disposition header for filename (fallback to defaultFilename)
 *  3. Trigger browser download
 *  4. Show success / error toast
 *
 * Use this hook as the implementation layer and expose domain-specific
 * wrappers (e.g. useExportDealList) on top for a clean public API.
 */
const useExportCsv = <TParams extends Record<string, unknown>>(
  options: UseExportCsvOptions
) => {
  const { endpoint, defaultFilename, successMessage, errorMessage } = options;

  const { mutate, mutateAsync, isPending, isSuccess, reset } = useMutation({
    mutationFn: async (params: TParams) => {
      const response = await api.get(endpoint, {
        params,
        responseType: "blob",
      });
      return response;
    },
    onSuccess: (response) => {
      const blob = new Blob([response.data], { type: "text/csv;charset=utf-8;" });
      const url = globalThis.URL.createObjectURL(blob);
      const link = globalThis.document.createElement("a");
      link.href = url;

      // Prefer server-provided filename from Content-Disposition header
      const contentDisposition = response.headers["content-disposition"];
      let filename = defaultFilename;

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(
          /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        );
        if (filenameMatch?.[1]) {
          filename = filenameMatch[1].replaceAll(/['"]/g, "");
        }
      }

      // Postfix filename with current date
      const dateString = format(new Date(), "dd-MM-yyyy");
      const nameParts = filename.split('.');
      const extension = nameParts.length > 1 ? nameParts.pop() : 'csv';
      const baseName = nameParts.join('.');
      const finalFilename = `${baseName}-${dateString}.${extension}`;

      link.setAttribute("download", finalFilename);
      globalThis.document.body.appendChild(link);
      link.click();
      link.remove();
      globalThis.URL.revokeObjectURL(url);

      toast.success(successMessage);
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error?.response?.data?.message ?? errorMessage);
    },
  });

  const exportCsv = (params: TParams) => {
    mutate(params);
  };

  return { exportCsv, exportMutateAsync: mutateAsync, isPending, isSuccess, reset };
};

export default useExportCsv;

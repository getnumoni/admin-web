import useExportCsv from "@/hooks/utils/useExportCsv";
import { ExportCustomerSharePointParams } from "@/lib/types";



const useExportCustomerSharePoint = () => {
  const { exportCsv, exportMutateAsync, isPending, isSuccess, reset } = useExportCsv<ExportCustomerSharePointParams>({
    endpoint: "/admin/customerSharePoints/export",
    defaultFilename: "customer-sharepoint.csv",
    successMessage: "Customer sharepoint exported successfully",
    errorMessage: "Failed to export customer sharepoint",
  });

  return { handleExportCustomerSharePoint: exportCsv, exportMutateAsync, isPending, isSuccess, reset };
};

export default useExportCustomerSharePoint;
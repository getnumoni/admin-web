import useExportCsv from "@/hooks/utils/useExportCsv";
import { customerListExportParam } from "@/lib/types";

const useExportCustomerList = () => {
  const { exportCsv, exportMutateAsync, isPending, isSuccess, reset } = useExportCsv<customerListExportParam>({
    endpoint: "/admin/getCustomerList/export",
    defaultFilename: "customer-list.csv",
    successMessage: "Customer list exported successfully",
    errorMessage: "Failed to export customer list",
  });

  return { handleExportCustomerList: exportCsv, exportMutateAsync, isPending, isSuccess, reset };
};

export default useExportCustomerList;
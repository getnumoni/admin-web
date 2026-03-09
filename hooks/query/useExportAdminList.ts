import useExportCsv from "@/hooks/utils/useExportCsv";
import { exportAdminListParams } from "@/lib/types";

const useExportAdminList = () => {
  const { exportCsv, exportMutateAsync, isPending, isSuccess, reset } = useExportCsv<exportAdminListParams>({
    endpoint: "/admin/getEmployeeList/export",
    defaultFilename: "admin-list.csv",
    successMessage: "Admin list exported successfully",
    errorMessage: "Failed to export admin list",
  });

  return { handleExportAdminList: exportCsv, exportMutateAsync, isPending, isSuccess, reset };
};

export default useExportAdminList;
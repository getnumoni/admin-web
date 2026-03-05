import useExportCsv from "@/hooks/utils/useExportCsv";
import { charityListParams } from "@/lib/types";

const useExportCharityList = () => {
  const { exportCsv, exportMutateAsync, isPending, isSuccess, reset } = useExportCsv<charityListParams>({
    endpoint: "/admin/getCharityList/export",
    defaultFilename: "charity-list.csv",
    successMessage: "Charity list exported successfully",
    errorMessage: "Failed to export charity list",
  });

  return { handleExportCharityList: exportCsv, exportMutateAsync, isPending, isSuccess, reset };
};

export default useExportCharityList;
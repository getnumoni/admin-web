import useExportCsv from "@/hooks/utils/useExportCsv";
import { ExportDealListParams } from "@/lib/types";

const useExportDealList = () => {
  const { exportCsv, exportMutateAsync, isPending, isSuccess, reset } = useExportCsv<ExportDealListParams>({
    endpoint: "/admin/dealsList/export",
    defaultFilename: "deal-list.csv",
    successMessage: "Deal list exported successfully",
    errorMessage: "Failed to export deal list",
  });

  return { handleExportDealList: exportCsv, exportMutateAsync, isPending, isSuccess, reset };
};

export default useExportDealList;
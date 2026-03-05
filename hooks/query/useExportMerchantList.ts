import useExportCsv from "@/hooks/utils/useExportCsv";
import { ExportTypeMerchant } from "@/lib/types";

const useExportMerchantList = () => {
  const { exportCsv, isPending, isSuccess, reset } = useExportCsv<ExportTypeMerchant>({
    endpoint: "/admin/getMerchantList/export",
    defaultFilename: "merchants-list.csv",
    successMessage: "Merchant list exported successfully",
    errorMessage: "Failed to export merchant list",
  });

  return { handleExportMerchantList: exportCsv, isPending, isSuccess, reset };
};

export default useExportMerchantList;
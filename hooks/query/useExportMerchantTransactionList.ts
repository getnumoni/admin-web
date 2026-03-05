import useExportCsv from "@/hooks/utils/useExportCsv";
import { ExportTypeMerchant } from "@/lib/types";

const useExportMerchantTransactionList = () => {
  const { exportCsv, exportMutateAsync, isPending, isSuccess, reset } = useExportCsv<ExportTypeMerchant>({
    endpoint: "/admin/getMerchantTransactionList/export",
    defaultFilename: "merchant-transaction-list.csv",
    successMessage: "Merchant transaction list exported successfully",
    errorMessage: "Failed to export merchant transaction list",
  });

  return { handleExportMerchantTransactionList: exportCsv, exportMutateAsync, isPending, isSuccess, reset };
};

export default useExportMerchantTransactionList;
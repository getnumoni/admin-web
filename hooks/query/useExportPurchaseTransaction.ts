import useExportCsv from "@/hooks/utils/useExportCsv";
import { PurchaseTransactionExportParam } from "@/lib/types";

const useExportPurchaseTransaction = () => {
  const { exportCsv, exportMutateAsync, isPending, isSuccess, reset } = useExportCsv<PurchaseTransactionExportParam>({
    endpoint: "/admin/adminpurchases/export",
    defaultFilename: "purchase-transactions.csv",
    successMessage: "Purchase transactions exported successfully",
    errorMessage: "Failed to export purchase transactions",
  });

  return { handleExportPurchaseTransaction: exportCsv, exportMutateAsync, isPending, isSuccess, reset };
};

export default useExportPurchaseTransaction;
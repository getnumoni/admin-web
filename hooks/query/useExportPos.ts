import useExportCsv from "@/hooks/utils/useExportCsv";
import { ExportPosParam } from "@/lib/types";

const useExportPos = () => {
  const { exportCsv, exportMutateAsync, isPending, isSuccess, reset } = useExportCsv<ExportPosParam>({
    endpoint: "/admin/pos/export",
    defaultFilename: "pos-list.csv",
    successMessage: "POS list exported successfully",
    errorMessage: "Failed to export POS list",
  });

  return { handleExportPos: exportCsv, exportMutateAsync, isPending, isSuccess, reset };
};

export default useExportPos;
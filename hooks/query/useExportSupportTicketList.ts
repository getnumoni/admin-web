import useExportCsv from "@/hooks/utils/useExportCsv";
import { exportSupportTicketListParams } from "@/lib/types";

const useExportSupportTicketList = () => {
  const { exportCsv, exportMutateAsync, isPending, isSuccess, reset } = useExportCsv<exportSupportTicketListParams>({
    endpoint: "/admin/supportTicketList/export",
    defaultFilename: "support-ticket-list.csv",
    successMessage: "Support ticket list exported successfully",
    errorMessage: "Failed to export support ticket list",
  });

  return { handleExportSupportTicketList: exportCsv, exportMutateAsync, isPending, isSuccess, reset };
};

export default useExportSupportTicketList;
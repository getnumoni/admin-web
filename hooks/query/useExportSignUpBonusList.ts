import useExportCsv from "@/hooks/utils/useExportCsv";
import { exportSignUpBonusListParams } from "@/lib/types";

const useExportSignUpBonusList = () => {
  const { exportCsv, exportMutateAsync, isPending, isSuccess, reset } = useExportCsv<exportSignUpBonusListParams>({
    endpoint: "/customer/admin/signup-bonus-requests/export",
    defaultFilename: "sign-up-bonus-list.csv",
    successMessage: "Sign up bonus list exported successfully",
    errorMessage: "Failed to export sign up bonus list",
  });

  return { handleExportSignUpBonusList: exportCsv, exportMutateAsync, isPending, isSuccess, reset };
};

export default useExportSignUpBonusList;
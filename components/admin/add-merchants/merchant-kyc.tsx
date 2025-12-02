import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { MerchantDetailsResponse } from "@/lib/types";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { useDocumentVerification } from "@/hooks/utils/useDocumentVerification";
import { useKycStatus } from "@/hooks/utils/useKycStatus";
import { getDocumentDisplayName, hasKycData } from "@/lib/merchant-kyc-helpers";
import { CacVerificationSheet } from "./cac-verification-sheet";
import { KycDocumentList } from "./kyc-document-list";
import MerchantKycDialog from "./merchant-kyc-dialog";
import RejectKycDialog from "./reject-kyc-dialog";

export default function MerchantKyc({
  merchantDetails,
  merchantId
}: {
  merchantDetails: MerchantDetailsResponse;
  merchantId: string | string[] | undefined;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isCacSheetOpen, setIsCacSheetOpen] = useState(false);

  // Custom hooks for managing KYC operations
  const {
    rejectingDocumentType,
    setRejectingDocumentType,
    getDocumentStatus,
    isDocumentPending,
    handleApprove,
    handleReject,
    handleConfirmReject,
    isLoadingReject,
  } = useKycStatus(merchantId);

  const { handleVerify, verifyCacData, verifyCacIsPending, cacVerificationCompleted, setCacVerificationCompleted } = useDocumentVerification(merchantDetails);

  // Open CAC verification sheet when verification succeeds
  useEffect(() => {
    if (cacVerificationCompleted && verifyCacData && !verifyCacIsPending) {
      // Extract the actual response data from axios response
      // verifyCacData is the axios response, so verifyCacData.data is the API response
      const apiResponse = verifyCacData?.data;

      // Check if we have valid data - open sheet if data exists
      if (apiResponse?.data) {
        setIsCacSheetOpen(true);
        // Reset the flag so it doesn't open again
        setCacVerificationCompleted(false);
      }
    }
  }, [cacVerificationCompleted, verifyCacData, verifyCacIsPending, setCacVerificationCompleted]);

  return (
    <main>
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-8 py-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex"
        >
          <Plus className="h-4 w-4" />
          Add KYC
        </Button>
      </div>

      {!hasKycData(merchantDetails) ? (
        <div className="bg-white rounded-lg border border-gray-200">
          <EmptyState
            title="No KYC Information"
            description="This merchant hasn't submitted any KYC documents yet. Click 'Add KYC' to start the verification process."
          />
        </div>
      ) : (
        <KycDocumentList
          merchantDetails={merchantDetails}
          getDocumentStatus={getDocumentStatus}
          isDocumentPending={isDocumentPending}
          onApprove={handleApprove}
          onReject={(documentType) => {
            handleReject(documentType);
            setIsRejectDialogOpen(true);
          }}
          onVerify={handleVerify}
        />
      )}

      <MerchantKycDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        businessName={merchantDetails?.businessName}
        merchantId={Array.isArray(merchantId) ? merchantId[0] : merchantId || ""}
        existingKycData={{
          menuPath: merchantDetails?.menuPath
        }}
      />

      {rejectingDocumentType && (
        <RejectKycDialog
          isOpen={isRejectDialogOpen}
          onClose={() => {
            setIsRejectDialogOpen(false);
            setRejectingDocumentType(null);
          }}
          onConfirm={handleConfirmReject}
          documentType={rejectingDocumentType}
          documentName={getDocumentDisplayName(rejectingDocumentType)}
          isLoading={isLoadingReject}
        />
      )}

      <CacVerificationSheet
        isOpen={isCacSheetOpen}
        onClose={() => {
          setIsCacSheetOpen(false);
          setCacVerificationCompleted(false);
        }}
        verificationData={verifyCacData?.data || null}
      />
    </main>
  );
}

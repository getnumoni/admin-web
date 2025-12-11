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
import { NinVerificationSheet } from "./nin-verification-sheet";
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
  const [isNinSheetOpen, setIsNinSheetOpen] = useState(false);

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

  const {
    handleVerify,
    verifyCacData,
    verifyCacIsPending,
    cacVerificationCompleted,
    setCacVerificationCompleted,
    verifyNinData,
    verifyNinIsPending,
    ninVerificationCompleted,
    setNinVerificationCompleted,
  } = useDocumentVerification(merchantDetails);

  // Open CAC verification sheet when verification succeeds
  useEffect(() => {
    if (cacVerificationCompleted && verifyCacData && !verifyCacIsPending) {
      // verifyCacData is the axios response, so verifyCacData.data is the API response
      // API response structure: { data: CacVerificationData, message: string, status: number }
      const apiResponse = verifyCacData?.data;

      // Check if we have valid data - open sheet if data exists
      if (apiResponse?.data) {
        setIsCacSheetOpen(true);
        // Reset the flag so it doesn't open again
        setCacVerificationCompleted(false);
      }
    }
  }, [cacVerificationCompleted, verifyCacData, verifyCacIsPending, setCacVerificationCompleted]);

  // Open NIN verification sheet when verification succeeds
  useEffect(() => {
    if (ninVerificationCompleted && verifyNinData && !verifyNinIsPending) {
      // verifyNinData is the axios response, so verifyNinData.data is the API response
      // API response structure: { data: NinVerificationData, message: string, status: number }
      const apiResponse = verifyNinData?.data;

      // Check if we have valid data - open sheet if data exists
      if (apiResponse?.data) {
        setIsNinSheetOpen(true);
        // Reset the flag so it doesn't open again
        setNinVerificationCompleted(false);
      }
    }
  }, [ninVerificationCompleted, verifyNinData, verifyNinIsPending, setNinVerificationCompleted]);

  // Reset verification state when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup: reset state when component unmounts
      setCacVerificationCompleted(false);
      setIsCacSheetOpen(false);
      setNinVerificationCompleted(false);
      setIsNinSheetOpen(false);
    };
  }, [setCacVerificationCompleted, setNinVerificationCompleted]);

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
        verificationData={
          // verifyCacData is the axios response, so verifyCacData.data is the API response
          // API response structure: { data: CacVerificationData, message: string, status: number }
          // This matches CacVerificationResponse interface expected by CacVerificationSheet
          // Pass verifyCacData.data directly (not verifyCacData.data.data) since it already has the correct structure
          (verifyCacData?.data as {
            data: {
              headOfficeAddress: string;
              companyEmail: string;
              city: string;
              rcNumber: string;
              companyName: string;
              cac_status: string;
              id: number;
              state: string;
              cac_check: string;
              status: string;
            };
            message: string;
            status: number;
          } | undefined) || null
        }
      />

      <NinVerificationSheet
        isOpen={isNinSheetOpen}
        onClose={() => {
          setIsNinSheetOpen(false);
          setNinVerificationCompleted(false);
        }}
        verificationData={
          // verifyNinData is the axios response, so verifyNinData.data is the API response
          // API response structure: { data: NinVerificationData, message: string, status: number }
          // This matches NinVerificationResponse interface expected by NinVerificationSheet
          // Pass verifyNinData.data directly (not verifyNinData.data.data) since it already has the correct structure
          (verifyNinData?.data as {
            data: {
              nin: string;
              firstname: string;
              phone: string;
              middlename: string;
              id: number;
              state: string;
              nin_check: string;
              status: string;
              lastname: string;
            };
            message: string;
            status: number;
          } | undefined) || null
        }
      />
    </main>
  );
}

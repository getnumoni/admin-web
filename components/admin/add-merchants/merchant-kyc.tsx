import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { MerchantDetailsResponse, UpdateKycStatusPayload } from "@/lib/types";
import { Plus } from "lucide-react";

import { useUpdateKycStatus } from "@/hooks/mutation/useUpdateKycStatus";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getDocumentDisplayName, hasKycData } from "@/lib/merchant-kyc-helpers";
import { KycDocumentSection } from "./kyc-document-section";
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
  const [rejectingDocumentType, setRejectingDocumentType] = useState<string | null>(null);
  const [documentStatus, setDocumentStatus] = useState<Record<string, 'pending' | 'approved' | 'rejected'>>({});
  const [pendingDocumentType, setPendingDocumentType] = useState<string | null>(null);
  const [loadingToastId, setLoadingToastId] = useState<string | number | null>(null);

  const { isPending, handleUpdateKyc, isSuccess } = useUpdateKycStatus();

  // Reset pending state when operation completes
  useEffect(() => {
    if (!isPending && pendingDocumentType) {
      setPendingDocumentType(null);
      if (loadingToastId !== null) {
        toast.dismiss(loadingToastId);
        setLoadingToastId(null);
      }
    }
  }, [isPending, pendingDocumentType, loadingToastId]);

  // Close reject dialog on success
  useEffect(() => {
    if (isSuccess) {
      setIsRejectDialogOpen(false);
      setRejectingDocumentType(null);
    }
  }, [isSuccess]);

  const handleApprove = (documentType: string) => {
    setPendingDocumentType(documentType);
    setDocumentStatus(prev => ({ ...prev, [documentType]: 'approved' }));

    const documentName = getDocumentDisplayName(documentType);
    const toastId = toast.loading(`Approving ${documentName}...`);
    setLoadingToastId(toastId);

    const payload: UpdateKycStatusPayload = {
      merchantId: merchantId as string,
      documentType,
      status: 'APPROVE'
    };

    handleUpdateKyc(payload);
  };

  const handleReject = (documentType: string) => {
    setRejectingDocumentType(documentType);
    setIsRejectDialogOpen(true);
  };

  const handleConfirmReject = (reason: string) => {
    if (!rejectingDocumentType) return;

    setPendingDocumentType(rejectingDocumentType);
    setDocumentStatus(prev => ({ ...prev, [rejectingDocumentType]: 'rejected' }));

    const payload: UpdateKycStatusPayload = {
      merchantId: merchantId as string,
      documentType: rejectingDocumentType,
      status: 'REJECT',
      reason
    };

    handleUpdateKyc(payload);
  };

  const getDocumentStatus = (documentType: string): 'pending' | 'approved' | 'rejected' => {
    return documentStatus[documentType] || 'pending';
  };

  const isDocumentPending = (documentType: string): boolean => {
    return pendingDocumentType === documentType;
  };

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
        <div className="space-y-6">
          <KycDocumentSection
            title="CAC Documents"
            documentType="CAC"
            documentPath={merchantDetails?.cacDocumentPath}
            merchantDetails={merchantDetails}
            status={getDocumentStatus('CAC')}
            isPending={isDocumentPending('CAC')}
            onApprove={() => handleApprove('CAC')}
            onReject={() => handleReject('CAC')}
          />

          <KycDocumentSection
            title="TIN Documents"
            documentType="TIN"
            documentPath={merchantDetails?.tinPath}
            merchantDetails={merchantDetails}
            status={getDocumentStatus('TIN')}
            isPending={isDocumentPending('TIN')}
            onApprove={() => handleApprove('TIN')}
            onReject={() => handleReject('TIN')}
          />

          <KycDocumentSection
            title="Tax Certificate"
            documentType="TAX"
            documentPath={merchantDetails?.reqCertificatePath}
            merchantDetails={merchantDetails}
            status={getDocumentStatus('TAX')}
            isPending={isDocumentPending('TAX')}
            onApprove={() => handleApprove('TAX')}
            onReject={() => handleReject('TAX')}
          />

          <KycDocumentSection
            title="NIN Documents"
            documentType="NIN"
            documentPath={merchantDetails?.menuPath}
            merchantDetails={merchantDetails}
            status={getDocumentStatus('NIN')}
            isPending={isDocumentPending('NIN')}
            onApprove={() => handleApprove('NIN')}
            onReject={() => handleReject('NIN')}
          />
        </div>
      )}

      <MerchantKycDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        businessName={merchantDetails.businessName}
        merchantId={Array.isArray(merchantId) ? merchantId[0] : merchantId || ""}
        existingKycData={{
          menuPath: merchantDetails?.menuPath,
          reqCertificatePath: merchantDetails?.reqCertificatePath
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
          isLoading={isPending && pendingDocumentType === rejectingDocumentType}
        />
      )}
    </main>
  );
}

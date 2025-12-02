import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useUpdateKycStatus } from "@/hooks/mutation/useUpdateKycStatus";
import { UpdateKycStatusPayload } from "@/lib/types";
import { getDocumentDisplayName } from "@/lib/merchant-kyc-helpers";

export const useKycStatus = (merchantId: string | string[] | undefined) => {
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

  return {
    rejectingDocumentType,
    setRejectingDocumentType,
    getDocumentStatus,
    isDocumentPending,
    handleApprove,
    handleReject,
    handleConfirmReject,
    isPending: isPending && pendingDocumentType !== null,
    isLoadingReject: isPending && pendingDocumentType === rejectingDocumentType,
  };
};


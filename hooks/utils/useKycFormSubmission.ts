import { useAddMerchantKyc } from "@/hooks/mutation/useAddMerchantKyc";
import { useMerchantKycStore } from "@/lib/stores/merchant-kyc-store";
import { KycFormValues } from "@/components/admin/add-merchants/merchant-kyc-dialog-schema";
import { useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";

/**
 * Custom hook to handle KYC form submission and document path synchronization
 * Manages form submission logic and syncs uploaded document paths with form fields
 * 
 * @param form - React Hook Form instance
 * @param merchantId - Merchant ID for the KYC submission
 * @param isOpen - Whether the dialog is open (for cleanup)
 * @param onClose - Callback to close the dialog
 * @returns Object containing submission handler and loading state
 */
export const useKycFormSubmission = (
  form: UseFormReturn<KycFormValues>,
  merchantId: string,
  isOpen: boolean,
  onClose: () => void
) => {
  const { handleAddMerchantKyc, isPending, isSuccess } = useAddMerchantKyc();
  const { documentPaths, clearAllPaths } = useMerchantKycStore();

  /**
   * Syncs document paths from the store to form fields when documents are uploaded
   * This ensures the form fields are updated when files are uploaded via the upload component
   */
  useEffect(() => {
    if (documentPaths.cacDocumentPath) {
      form.setValue("cacDocumentPath", documentPaths.cacDocumentPath, { shouldValidate: true });
    }
    if (documentPaths.tinPath) {
      form.setValue("tinPath", documentPaths.tinPath, { shouldValidate: true });
    }
    if (documentPaths.reqCertificatePath) {
      form.setValue("reqCertificatePath", documentPaths.reqCertificatePath, { shouldValidate: true });
    }
    if (documentPaths.menuPath) {
      form.setValue("menuPath", documentPaths.menuPath, { shouldValidate: true });
    }
  }, [documentPaths, form]);

  /**
   * Handles form submission
   * Transforms form data into the API payload format based on identification type
   * 
   * @param data - Form values from the KYC form
   */
  const onSubmit = (data: KycFormValues) => {
    let payload: {
      id: string;
      identificationType: string;
      identificationTypeNumber?: string;
      cacIdentificationNumber?: string;
      tinIdentificationNumber?: string;
      businessRegistrationNumber: string;
      documentUrl: string;
    };

    const basePayload = {
      id: merchantId,
      identificationType: data.identificationType,
      businessRegistrationNumber: data.businessRegNo,
    };

    // Build payload based on identification type
    switch (data.identificationType) {
      case "CAC":
        payload = {
          ...basePayload,
          identificationTypeNumber: data.identificationTypeNumber || "",
          cacIdentificationNumber: data.identificationTypeNumber || "",
          documentUrl: data.cacDocumentPath || documentPaths.cacDocumentPath || "",
        };
        break;

      case "TIN":
        payload = {
          ...basePayload,
          tinIdentificationNumber: data.tinNo || "",
          documentUrl: data.tinPath || documentPaths.tinPath || "",
        };
        break;

      case "TAX":
        payload = {
          ...basePayload,
          documentUrl: data.reqCertificatePath || documentPaths.reqCertificatePath || "",
        };
        break;

      case "NIN":
        payload = {
          ...basePayload,
          identificationTypeNumber: data.identificationTypeNumber || "",
          documentUrl: data.menuPath || documentPaths.menuPath || "",
        };
        break;

      default:
        console.error('Invalid identification type:', data.identificationType);
        return;
    }

    handleAddMerchantKyc(payload);
  };

  /**
   * Closes dialog and clears paths after successful submission
   */
  useEffect(() => {
    if (isSuccess) {
      clearAllPaths(); // Clear store paths after successful submission
      onClose();
    }
  }, [isSuccess, onClose, clearAllPaths]);

  /**
   * Clears store paths when dialog closes
   * Prevents stale paths from persisting between dialog opens
   */
  useEffect(() => {
    if (!isOpen) {
      clearAllPaths();
    }
  }, [isOpen, clearAllPaths]);

  return {
    onSubmit,
    isPending,
  };
};


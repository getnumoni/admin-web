import useVerifyCac from "@/hooks/query/useVerifyCac";
import useVerifyNin from "@/hooks/query/useVerifyNin";
import useVerifyTin from "@/hooks/query/useVerifyTin";
import { getDocumentDisplayName, getDocumentNumber } from "@/lib/merchant-kyc-helpers";
import { MerchantDetailsResponse } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const useDocumentVerification = (merchantDetails: MerchantDetailsResponse | null | undefined) => {
  // Initialize verification hooks
  const verifyTin = useVerifyTin({ tinNo: merchantDetails?.tinNo || "" });
  const verifyCac = useVerifyCac({ cacNo: merchantDetails?.cacNo || merchantDetails?.businessReqNo || "" });
  const verifyNin = useVerifyNin({ ninNo: merchantDetails?.ninNo || "" });

  // Track if verification was just triggered (to prevent showing toasts from cached data)
  const verificationTriggeredRef = useRef<{
    TIN: boolean;
    CAC: boolean;
    NIN: boolean;
  }>({
    TIN: false,
    CAC: false,
    NIN: false,
  });

  // Track previous data states to detect new verifications
  const previousDataRef = useRef<{
    tin: unknown;
    cac: unknown;
    nin: unknown;
  }>({
    tin: null,
    cac: null,
    nin: null,
  });

  // Track if CAC verification just completed successfully
  const [cacVerificationCompleted, setCacVerificationCompleted] = useState(false);

  // Track if NIN verification just completed successfully
  const [ninVerificationCompleted, setNinVerificationCompleted] = useState(false);

  // Handle TIN verification responses - only show toast if verification was triggered
  useEffect(() => {
    const dataChanged = previousDataRef.current.tin !== verifyTin.data;
    if (verifyTin.data && !verifyTin.isPending && dataChanged && verificationTriggeredRef.current.TIN) {
      toast.success("TIN verification successful!");
      verificationTriggeredRef.current.TIN = false;
    }
    if (dataChanged) {
      previousDataRef.current.tin = verifyTin.data;
    }
  }, [verifyTin.data, verifyTin.isPending]);

  useEffect(() => {
    if (verifyTin.isError && !verifyTin.isPending && verifyTin.error && verificationTriggeredRef.current.TIN) {
      const apiError = verifyTin.error as ApiError;
      const errorMessage = apiError?.response?.data?.message
        || apiError?.message
        || "TIN verification failed. Please try again.";
      toast.error(errorMessage);
      verificationTriggeredRef.current.TIN = false;
    }
  }, [verifyTin.isError, verifyTin.isPending, verifyTin.error]);

  // Handle CAC verification responses - only show toast/sheet if verification was triggered
  useEffect(() => {
    const dataChanged = previousDataRef.current.cac !== verifyCac.data;
    if (verifyCac.data && !verifyCac.isPending && dataChanged && verificationTriggeredRef.current.CAC) {
      const apiResponse = verifyCac.data?.data;
      if (apiResponse?.data) {
        toast.success("CAC verification successful!");
        setCacVerificationCompleted(true);
        verificationTriggeredRef.current.CAC = false;
      }
    } else if (verifyCac.isPending) {
      setCacVerificationCompleted(false);
    }
    if (dataChanged) {
      previousDataRef.current.cac = verifyCac.data;
    }
  }, [verifyCac.data, verifyCac.isPending]);

  useEffect(() => {
    if (verifyCac.isError && !verifyCac.isPending && verifyCac.error && verificationTriggeredRef.current.CAC) {
      const apiError = verifyCac.error as ApiError;
      const errorMessage = apiError?.response?.data?.message
        || apiError?.message
        || "CAC verification failed. Please try again.";
      toast.error(errorMessage);
      verificationTriggeredRef.current.CAC = false;
    }
  }, [verifyCac.isError, verifyCac.isPending, verifyCac.error]);

  // Handle NIN verification responses - only show toast if verification was triggered
  useEffect(() => {
    const dataChanged = previousDataRef.current.nin !== verifyNin.data;
    if (verifyNin.data && !verifyNin.isPending && dataChanged && verificationTriggeredRef.current.NIN) {
      const apiResponse = verifyNin.data?.data;
      if (apiResponse?.data) {
        toast.success("NIN verification successful!");
        setNinVerificationCompleted(true);
        verificationTriggeredRef.current.NIN = false;
      }
    }
    if (dataChanged) {
      previousDataRef.current.nin = verifyNin.data;
    }
  }, [verifyNin.data, verifyNin.isPending]);

  useEffect(() => {
    if (verifyNin.isError && !verifyNin.isPending && verifyNin.error && verificationTriggeredRef.current.NIN) {
      const apiError = verifyNin.error as ApiError;
      const errorMessage = apiError?.response?.data?.message
        || apiError?.message
        || "NIN verification failed. Please try again.";
      toast.error(errorMessage);
      verificationTriggeredRef.current.NIN = false;
    }
  }, [verifyNin.isError, verifyNin.isPending, verifyNin.error]);

  const handleVerify = async (documentType: string) => {
    const documentName = getDocumentDisplayName(documentType);
    const documentNumber = getDocumentNumber(documentType, merchantDetails);

    if (!documentNumber || documentNumber.trim() === '') {
      toast.error(`No ${documentName} number found`);
      return;
    }

    // Mark that verification was triggered for this document type
    if (documentType === 'TIN' || documentType === 'TAX') {
      verificationTriggeredRef.current.TIN = true;
    } else if (documentType === 'CAC') {
      verificationTriggeredRef.current.CAC = true;
    } else if (documentType === 'NIN') {
      verificationTriggeredRef.current.NIN = true;
    }

    const toastId = toast.loading(`Verifying ${documentName} with number ${documentNumber}...`);

    try {
      let result;

      // Handle different document types
      if (documentType === 'TIN' || documentType === 'TAX') {
        result = await verifyTin.refetch();
      } else if (documentType === 'CAC') {
        result = await verifyCac.refetch();
      } else if (documentType === 'NIN') {
        result = await verifyNin.refetch();
      } else {
        toast.dismiss(toastId);
        toast.info(`Verification for ${documentName} is not available yet`);
        return;
      }

      toast.dismiss(toastId);

      // Check if the result has an error
      if (result.error) {
        const apiError = result.error as ApiError;
        const errorMessage = apiError?.response?.data?.message
          || apiError?.message
          || `Failed to verify ${documentName}`;
        toast.error(errorMessage);
        // Reset trigger flag on error
        if (documentType === 'TIN' || documentType === 'TAX') {
          verificationTriggeredRef.current.TIN = false;
        } else if (documentType === 'CAC') {
          verificationTriggeredRef.current.CAC = false;
        } else if (documentType === 'NIN') {
          verificationTriggeredRef.current.NIN = false;
        }
      }
    } catch (error) {
      toast.dismiss(toastId);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message
        || apiError?.message
        || `Failed to verify ${documentName}`;
      toast.error(errorMessage);
      console.error(`Error verifying ${documentType}:`, error);
      // Reset trigger flag on error
      if (documentType === 'TIN' || documentType === 'TAX') {
        verificationTriggeredRef.current.TIN = false;
      } else if (documentType === 'CAC') {
        verificationTriggeredRef.current.CAC = false;
      } else if (documentType === 'NIN') {
        verificationTriggeredRef.current.NIN = false;
      }
    }
  };

  return {
    handleVerify,
    verifyCacData: verifyCac.data,
    verifyCacIsPending: verifyCac.isPending,
    cacVerificationCompleted,
    setCacVerificationCompleted,
    verifyNinData: verifyNin.data,
    verifyNinIsPending: verifyNin.isPending,
    ninVerificationCompleted,
    setNinVerificationCompleted,
  };
};


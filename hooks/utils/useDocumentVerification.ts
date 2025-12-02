import useVerifyCac from "@/hooks/query/useVerifyCac";
import useVerifyNin from "@/hooks/query/useVerifyNin";
import useVerifyTin from "@/hooks/query/useVerifyTin";
import { getDocumentDisplayName, getDocumentNumber } from "@/lib/merchant-kyc-helpers";
import { MerchantDetailsResponse } from "@/lib/types";
import { useEffect, useState } from "react";
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

  // Track if CAC verification just completed successfully
  const [cacVerificationCompleted, setCacVerificationCompleted] = useState(false);

  // Handle TIN verification responses
  useEffect(() => {
    if (verifyTin.data && !verifyTin.isPending) {
      toast.success("TIN verification successful!");
    }
  }, [verifyTin.data, verifyTin.isPending]);

  useEffect(() => {
    if (verifyTin.isError && !verifyTin.isPending && verifyTin.error) {
      const apiError = verifyTin.error as ApiError;
      const errorMessage = apiError?.response?.data?.message
        || apiError?.message
        || "TIN verification failed. Please try again.";
      toast.error(errorMessage);
    }
  }, [verifyTin.isError, verifyTin.isPending, verifyTin.error]);

  // Handle CAC verification responses
  useEffect(() => {
    if (verifyCac.data && !verifyCac.isPending) {
      const apiResponse = verifyCac.data?.data;
      if (apiResponse?.data) {
        toast.success("CAC verification successful!");
        setCacVerificationCompleted(true);
      }
    } else if (verifyCac.isPending) {
      setCacVerificationCompleted(false);
    }
  }, [verifyCac.data, verifyCac.isPending]);

  useEffect(() => {
    if (verifyCac.isError && !verifyCac.isPending && verifyCac.error) {
      const apiError = verifyCac.error as ApiError;
      const errorMessage = apiError?.response?.data?.message
        || apiError?.message
        || "CAC verification failed. Please try again.";
      toast.error(errorMessage);
    }
  }, [verifyCac.isError, verifyCac.isPending, verifyCac.error]);

  // Handle NIN verification responses
  useEffect(() => {
    if (verifyNin.data && !verifyNin.isPending) {
      toast.success("NIN verification successful!");
    }
  }, [verifyNin.data, verifyNin.isPending]);

  useEffect(() => {
    if (verifyNin.isError && !verifyNin.isPending && verifyNin.error) {
      const apiError = verifyNin.error as ApiError;
      const errorMessage = apiError?.response?.data?.message
        || apiError?.message
        || "NIN verification failed. Please try again.";
      toast.error(errorMessage);
    }
  }, [verifyNin.isError, verifyNin.isPending, verifyNin.error]);

  const handleVerify = async (documentType: string) => {
    const documentName = getDocumentDisplayName(documentType);
    const documentNumber = getDocumentNumber(documentType, merchantDetails);

    if (!documentNumber || documentNumber.trim() === '') {
      toast.error(`No ${documentName} number found`);
      return;
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
      }
    } catch (error) {
      toast.dismiss(toastId);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message
        || apiError?.message
        || `Failed to verify ${documentName}`;
      toast.error(errorMessage);
      console.error(`Error verifying ${documentType}:`, error);
    }
  };

  return {
    handleVerify,
    verifyCacData: verifyCac.data,
    verifyCacIsPending: verifyCac.isPending,
    cacVerificationCompleted,
    setCacVerificationCompleted,
  };
};


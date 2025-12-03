import api from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast } from "sonner";

/**
 * Custom hook to handle KYC document verification (CAC, TIN, NIN)
 * Manages verification state and API calls for document verification
 * 
 * @returns Object containing verification handlers, pending states, and verification data
 */
export const useKycVerification = () => {
  const queryClient = useQueryClient();

  // Track verification pending state for each document type
  const [isVerifyingCac, setIsVerifyingCac] = useState(false);
  const [isVerifyingTin, setIsVerifyingTin] = useState(false);
  const [isVerifyingNin, setIsVerifyingNin] = useState(false);

  // Track CAC verification data and completion state
  interface CacVerificationResponse {
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
  }

  const [cacVerificationData, setCacVerificationData] = useState<CacVerificationResponse | null>(null);
  const [cacVerificationCompleted, setCacVerificationCompleted] = useState(false);

  /**
   * Handles CAC document verification
   * Validates the CAC number and calls the verification API
   * 
   * @param cacNo - CAC identification number to verify
   */
  const handleVerifyCac = async (cacNo: string) => {
    if (!cacNo || cacNo.trim() === '') {
      toast.error("Please enter a CAC number");
      return;
    }

    setIsVerifyingCac(true);
    const toastId = toast.loading(`Verifying CAC with number ${cacNo}...`);

    try {
      const result = await queryClient.fetchQuery({
        queryKey: ["verify-cac", cacNo],
        queryFn: () => api.get(`/admin/verifyme/cacVerification?cacNo=${cacNo}`),
      });

      toast.dismiss(toastId);
      setIsVerifyingCac(false);

      // result is the axios response, so result.data is the API response
      // API response structure: { data: CacVerificationData, message: string, status: number }
      if (result?.data?.data) {
        toast.success("CAC verification successful!");
        // Store the API response data (not the axios wrapper)
        setCacVerificationData(result.data);
        setCacVerificationCompleted(true);
      }
    } catch (error) {
      toast.dismiss(toastId);
      setIsVerifyingCac(false);
      const errorMessage = (error as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message
        || (error as { message?: string })?.message
        || "CAC verification failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  /**
   * Handles TIN document verification
   * Validates the TIN number and calls the verification API
   * 
   * @param tinNo - TIN number to verify
   */
  const handleVerifyTin = async (tinNo: string) => {
    if (!tinNo || tinNo.trim() === '') {
      toast.error("Please enter a TIN number");
      return;
    }

    setIsVerifyingTin(true);
    const toastId = toast.loading(`Verifying TIN with number ${tinNo}...`);

    try {
      const result = await queryClient.fetchQuery({
        queryKey: ["verify-tin", tinNo],
        queryFn: () => api.get(`/admin/verifyme/tinVerification?tinNo=${tinNo}`),
      });

      toast.dismiss(toastId);
      setIsVerifyingTin(false);

      if (result?.data) {
        toast.success("TIN verification successful!");
      }
    } catch (error) {
      toast.dismiss(toastId);
      setIsVerifyingTin(false);
      const errorMessage = (error as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message
        || (error as { message?: string })?.message
        || "TIN verification failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  /**
   * Handles NIN document verification
   * Validates the NIN number and calls the verification API
   * 
   * @param ninNo - NIN identification number to verify
   */
  const handleVerifyNin = async (ninNo: string) => {
    if (!ninNo || ninNo.trim() === '') {
      toast.error("Please enter a NIN number");
      return;
    }

    setIsVerifyingNin(true);
    const toastId = toast.loading(`Verifying NIN with number ${ninNo}...`);

    try {
      const result = await queryClient.fetchQuery({
        queryKey: ["verify-nin", ninNo],
        queryFn: () => api.get(`/admin/verifyme/ninVerification?ninNo=${ninNo}`),
      });

      toast.dismiss(toastId);
      setIsVerifyingNin(false);

      if (result?.data) {
        toast.success("NIN verification successful!");
      }
    } catch (error) {
      toast.dismiss(toastId);
      setIsVerifyingNin(false);
      const errorMessage = (error as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message
        || (error as { message?: string })?.message
        || "NIN verification failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  /**
   * Resets all verification states and data
   * Useful for cleaning up when dialog closes or component unmounts
   * Memoized with useCallback to prevent unnecessary re-renders
   */
  const resetVerification = useCallback(() => {
    setIsVerifyingCac(false);
    setIsVerifyingTin(false);
    setIsVerifyingNin(false);
    setCacVerificationData(null);
    setCacVerificationCompleted(false);
  }, []); // Empty dependency array since we're only resetting state

  return {
    // Verification handlers
    handleVerifyCac,
    handleVerifyTin,
    handleVerifyNin,
    // Pending states
    isVerifyingCac,
    isVerifyingTin,
    isVerifyingNin,
    // CAC verification data and state
    cacVerificationData,
    cacVerificationCompleted,
    setCacVerificationCompleted,
    // Reset function
    resetVerification,
  };
};


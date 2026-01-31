"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { FormInputTopLabel } from "@/components/ui/form-input";
import { FormSelectTopLabel } from "@/components/ui/form-select";
import { useKycFormSubmission } from "@/hooks/utils/useKycFormSubmission";
import { useKycVerification } from "@/hooks/utils/useKycVerification";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CacVerificationSheet } from "./cac-verification-sheet";
import { KycDocumentUploadSection } from "./kyc-document-upload-section";
import { KycIdentificationInput } from "./kyc-identification-input";
import {
  createKycSchema,
  identificationTypes,
  MerchantKycDialogProps,
} from "./merchant-kyc-dialog-schema";
import { NinVerificationSheet } from "./nin-verification-sheet";

/**
 * Main dialog component for adding KYC information to a merchant
 * 
 * This component allows users to:
 * - Select an identification type (CAC, TIN, TAX, or NIN)
 * - Enter identification numbers with verification
 * - Upload required documents
 * - Submit KYC information
 * 
 * The component is broken down into smaller pieces:
 * - Schema and types: merchant-kyc-dialog-schema.ts
 * - Verification logic: useKycVerification hook
 * - Form submission: useKycFormSubmission hook
 * - Identification input: KycIdentificationInput component
 * - Document upload: KycDocumentUploadSection component
 */
export default function MerchantKycDialog({
  isOpen,
  onClose,
  merchantId,
  businessName,
  // existingKycData,
}: Readonly<MerchantKycDialogProps>) {
  // Initialize form with validation schema
  const form = useForm({
    resolver: zodResolver(createKycSchema()),
    mode: "onSubmit",
    defaultValues: {
      identificationType: "",
      identificationTypeNumber: "",
      businessRegNo: "",
      cacDocumentPath: "",
      reqCertificatePath: "",
      tinNo: "",
      tinPath: "",
      menuPath: "",
      verifiedNin: false,
      verifiedTinNo: false,
      verifiedCac: false,
      verifiedTax: false,
    },
  });

  // Watch form values for conditional rendering and verification
  const selectedIdentificationType = form.watch("identificationType");
  const identificationTypeNumber = form.watch("identificationTypeNumber");
  const tinNo = form.watch("tinNo");

  // State to control CAC and NIN verification sheet visibility
  const [isCacSheetOpen, setIsCacSheetOpen] = useState(false);
  const [isNinSheetOpen, setIsNinSheetOpen] = useState(false);

  // Custom hooks for verification and form submission
  const {
    handleVerifyCac,
    handleVerifyTin,
    handleVerifyNin,
    isVerifyingCac,
    isVerifyingTin,
    isVerifyingNin,
    cacVerificationData,
    cacVerificationCompleted,
    setCacVerificationCompleted,
    ninVerificationData,
    ninVerificationCompleted,
    setNinVerificationCompleted,
    resetVerification,
  } = useKycVerification();

  // Open CAC verification sheet when verification succeeds
  useEffect(() => {
    if (cacVerificationCompleted && cacVerificationData) {
      // cacVerificationData is already the API response (not axios wrapped)
      // Structure: { data: CacVerificationData, message: string, status: number }
      // Check if we have valid data - open sheet if data exists
      if (cacVerificationData?.data) {
        setIsCacSheetOpen(true);
        // Reset the flag so it doesn't open again
        setCacVerificationCompleted(false);
      }
    }
  }, [cacVerificationCompleted, cacVerificationData, setCacVerificationCompleted]);

  // Open NIN verification sheet when verification succeeds
  useEffect(() => {
    if (ninVerificationCompleted && ninVerificationData) {
      // ninVerificationData is already the API response (not axios wrapped)
      // Structure: { data: NinVerificationData, message: string, status: number }
      // Check if we have valid data - open sheet if data exists
      if (ninVerificationData?.data) {
        setIsNinSheetOpen(true);
        // Reset the flag so it doesn't open again
        setNinVerificationCompleted(false);
      }
    }
  }, [ninVerificationCompleted, ninVerificationData, setNinVerificationCompleted]);

  const { onSubmit, isPending } = useKycFormSubmission(
    form,
    merchantId,
    isOpen,
    onClose
  );

  // Track previous isOpen value to detect when dialog closes
  const prevIsOpenRef = useRef(isOpen);

  // Store reset functions in refs to avoid dependency issues
  const resetVerificationRef = useRef(resetVerification);
  const formResetRef = useRef(form.reset);

  // Update refs when values change
  useEffect(() => {
    resetVerificationRef.current = resetVerification;
    formResetRef.current = form.reset;
  }, [resetVerification, form.reset]);

  // Reset form and verification state when dialog closes (transitions from open to closed)
  useEffect(() => {
    // Only reset when dialog transitions from open (true) to closed (false)
    if (prevIsOpenRef.current && !isOpen) {
      // Reset form to default values
      formResetRef.current({
        identificationType: "",
        identificationTypeNumber: "",
        businessRegNo: "",
        cacDocumentPath: "",
        reqCertificatePath: "",
        tinNo: "",
        tinPath: "",
        menuPath: "",
        verifiedNin: false,
        verifiedTinNo: false,
        verifiedCac: false,
        verifiedTax: false,
      });

      // Reset verification states and data
      setIsCacSheetOpen(false);
      setIsNinSheetOpen(false);
      resetVerificationRef.current();
    }

    // Update ref for next render
    prevIsOpenRef.current = isOpen;
  }, [isOpen]); // Only depend on isOpen - functions accessed via refs

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[860px] max-h-[90vh] overflow-y-auto">
        {/* Dialog Header */}
        <DialogHeader>
          <DialogTitle>Add KYC Information for {businessName}</DialogTitle>
          <DialogDescription>
            Please fill in the required KYC information for the merchant.
          </DialogDescription>
        </DialogHeader>

        {/* Form Section */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Identification Type and Number Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Identification Type Selector */}
                <FormSelectTopLabel
                  control={form.control}
                  name="identificationType"
                  label="Identification Type"
                  options={identificationTypes}
                  placeholder="Select identification type"
                  required
                />

                {/* Dynamic Identification Number Input with Verify Button */}
                <div className="transition-all duration-300 ease-in-out">
                  {(selectedIdentificationType === "CAC" ||
                    selectedIdentificationType === "NIN" ||
                    selectedIdentificationType === "TIN") && (
                      <KycIdentificationInput
                        control={form.control}
                        identificationType={
                          selectedIdentificationType as "CAC" | "TIN" | "NIN"
                        }
                        identificationNumber={identificationTypeNumber || ""}
                        tinNo={tinNo}
                        onVerifyCac={handleVerifyCac}
                        onVerifyTin={handleVerifyTin}
                        onVerifyNin={handleVerifyNin}
                        isVerifyingCac={isVerifyingCac}
                        isVerifyingTin={isVerifyingTin}
                        isVerifyingNin={isVerifyingNin}
                      />
                    )}
                </div>
              </div>

              {/* Business Registration Number Input */}
              <div className="w-full transition-all duration-300 ease-in-out">
                <FormInputTopLabel
                  control={form.control}
                  name="businessRegNo"
                  label="Business Registration Number"
                  placeholder="Enter business registration number"
                  required
                  transform={(value) => value?.toUpperCase()}
                />
              </div>
            </div>

            {/* Document Upload Section */}
            <KycDocumentUploadSection
              control={form.control}
              selectedIdentificationType={selectedIdentificationType}
              formErrors={form.formState.errors}
            />

            {/* Dialog Footer with Action Buttons */}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="px-8 py-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-8 py-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                isLoading={isPending}
                loadingText="Creating..."
              >
                Create KYC
              </Button>
            </DialogFooter>
          </form>
        </Form>

        {/* CAC Verification Sheet - Shows verification details on successful CAC verification */}
        <CacVerificationSheet
          isOpen={isCacSheetOpen}
          onClose={() => {
            setIsCacSheetOpen(false);
            setCacVerificationCompleted(false); // Reset flag on close
          }}
          verificationData={cacVerificationData}
        />

        {/* NIN Verification Sheet - Shows verification details on successful NIN verification */}
        <NinVerificationSheet
          isOpen={isNinSheetOpen}
          onClose={() => {
            setIsNinSheetOpen(false);
            setNinVerificationCompleted(false); // Reset flag on close
          }}
          verificationData={ninVerificationData}
        />
      </DialogContent>
    </Dialog>
  );
}

import * as z from "zod";

/**
 * Available identification types for KYC verification
 * Currently only NIN is enabled, but CAC, TIN, and TAX are available in the schema
 */
export const identificationTypes = [
  { value: "CAC", label: "CAC" },
  // { value: "TIN", label: "TIN" },
  // { value: "TAX", label: "TAX" },
  { value: "NIN", label: "NIN" }
];

/**
 * Creates a Zod schema for KYC form validation
 * Validates different fields based on the selected identification type
 * 
 * @param existingKycData - Optional existing KYC data to pre-populate fields
 * @returns Zod schema object for form validation
 */
export const createKycSchema = (existingKycData?: { menuPath?: string | null; reqCertificatePath?: string | null }) =>
  z.object({
    identificationType: z.string().min(1, "Please select an identification type"),
    identificationTypeNumber: z.string().optional(),
    businessRegNo: z.string().min(1, "Business registration number is required"),
    cacDocumentPath: z.string().optional(),
    reqCertificatePath: z.string().optional(),
    tinNo: z.string().optional(),
    tinPath: z.string().optional(),
    menuPath: z.string().optional(),
    verifiedNin: z.boolean(),
    verifiedTinNo: z.boolean(),
    verifiedCac: z.boolean(),
    verifiedTax: z.boolean(),
  }).refine((data) => {
    // CAC validation: requires identification number and document
    if (data.identificationType === "CAC") {
      if (!data.identificationTypeNumber) {
        return false;
      }
      if (!data.cacDocumentPath) {
        return false;
      }
      return true;
    }

    // TIN validation: requires TIN number and document
    if (data.identificationType === "TIN") {
      if (!data.tinNo) {
        return false;
      }
      if (!data.tinPath) {
        return false;
      }
      return true;
    }

    // TAX validation: requires tax certificate document
    if (data.identificationType === "TAX") {
      if (!data.reqCertificatePath) {
        return false;
      }
      return true;
    }

    // NIN validation: requires identification number and document
    if (data.identificationType === "NIN") {
      if (!data.identificationTypeNumber) {
        return false;
      }
      if (!data.menuPath) {
        return false;
      }
      return true;
    }

    return true;
  }, {
    message: "Please fill in all required fields for the selected identification type",
    path: ["identificationType"]
  });

/**
 * Type inference for KYC form values based on the schema
 */
export type KycFormValues = z.infer<ReturnType<typeof createKycSchema>>;

/**
 * Props interface for the Merchant KYC Dialog component
 */
export interface MerchantKycDialogProps {
  isOpen: boolean;
  onClose: () => void;
  merchantId: string;
  businessName: string;
  existingKycData?: {
    menuPath?: string | null;
    reqCertificatePath?: string | null;
  };
}


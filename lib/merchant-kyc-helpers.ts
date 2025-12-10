import { MerchantDetailsResponse } from "@/lib/types";

/**
 * Document type mapping for display names
 */
export const DOCUMENT_NAME_MAP: Record<string, string> = {
  'CAC': 'CAC Document',
  'TIN': 'TIN Document',
  'TAX': 'Tax Certificate',
  'NIN': 'NIN Document'
};

/**
 * Get display name for a document type
 */
export const getDocumentDisplayName = (documentType: string): string => {
  return DOCUMENT_NAME_MAP[documentType] || 'Document';
};

/**
 * Check if a document type is verified based on merchant details
 */
export const isDocumentVerified = (
  documentType: string,
  merchantDetails: MerchantDetailsResponse | null | undefined
): boolean => {
  if (!merchantDetails) return false;

  switch (documentType) {
    case 'NIN':
      return merchantDetails.verifiedNin === true;
    case 'TIN':
      return merchantDetails.verifiedTin === true;
    case 'CAC':
      return merchantDetails.verifiedCac === true;
    case 'TAX':
      // Note: There might not be a verifiedTax field, adjust if needed
      return false;
    default:
      return false;
  }
};

/**
 * Get document number for a specific document type
 */
export const getDocumentNumber = (
  documentType: string,
  merchantDetails: MerchantDetailsResponse | null | undefined
): string | null => {
  if (!merchantDetails) return null;

  switch (documentType) {
    case 'CAC':
      // Use cacNo if available, otherwise fall back to businessReqNo
      return merchantDetails.cacNo || merchantDetails.businessReqNo || null;
    case 'TIN':
      return merchantDetails.tinNo || null;
    case 'NIN':
      // Use ninNo only, no fallback
      return merchantDetails.ninNo || null;
    case 'TAX':
      // Tax certificate uses tinNo
      return merchantDetails.tinNo || null;
    default:
      return null;
  }
};

/**
 * Check if merchant has any KYC data
 */
export const hasKycData = (merchantDetails: MerchantDetailsResponse | null | undefined): boolean => {
  if (!merchantDetails) return false;

  return !!(
    merchantDetails.cacDocumentPath ||
    merchantDetails.businessReqNo
  );
};

/**
 * Calculate file size from base64 string
 */
export const calculateBase64FileSize = (base64String: string): string => {
  if (!base64String.startsWith('data:application/pdf;base64,')) {
    return "30kb";
  }

  const base64Length = base64String.split(',')[1]?.length || 0;
  const sizeInBytes = (base64Length * 3) / 4;

  if (sizeInBytes > 1024 * 1024) {
    return `${(sizeInBytes / (1024 * 1024)).toFixed(1)}MB`;
  } else {
    return `${(sizeInBytes / 1024).toFixed(1)}KB`;
  }
};

/**
 * Handle document preview
 */
export const previewDocument = (documentPath: string): void => {
  window.open(documentPath, '_blank');
};

/**
 * Handle document download
 */
export const downloadDocument = (documentPath: string, documentName: string): void => {
  const link = document.createElement('a');
  link.href = documentPath;
  link.download = documentName;

  if (!documentPath.startsWith('data:')) {
    link.target = '_blank';
  }

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


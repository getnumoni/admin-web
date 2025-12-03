"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { KycFormValues } from "./merchant-kyc-dialog-schema";
import { KycPdfUpload } from "./kyc-pdf-upload";

interface KycDocumentUploadSectionProps {
  control: Control<KycFormValues>;
  selectedIdentificationType: string;
  formErrors: {
    cacDocumentPath?: { message?: string };
    tinPath?: { message?: string };
    reqCertificatePath?: { message?: string };
    menuPath?: { message?: string };
  };
}

/**
 * Component for rendering document upload sections based on identification type
 * Shows the appropriate document upload field for CAC, TIN, TAX, or NIN
 */
export function KycDocumentUploadSection({
  control,
  selectedIdentificationType,
  formErrors,
}: KycDocumentUploadSectionProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900">Document Uploads</h4>
      <p className="text-xs text-gray-500">
        Upload PDF or image documents (PDF, JPEG, JPG, PNG - Max 500KB each)
      </p>

      {/* CAC Document Upload */}
      {selectedIdentificationType === "CAC" && (
        <FormField
          control={control}
          name="cacDocumentPath"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <KycPdfUpload
                  label="CAC Document"
                  onPdfChange={field.onChange}
                  currentValue={field.value}
                  required
                  maxSize="500kb"
                  error={formErrors.cacDocumentPath?.message}
                  fieldName="cacDocumentPath"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* TIN Document Upload */}
      {selectedIdentificationType === "TIN" && (
        <FormField
          control={control}
          name="tinPath"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <KycPdfUpload
                  label="TIN Document"
                  onPdfChange={field.onChange}
                  currentValue={field.value}
                  required
                  maxSize="500kb"
                  error={formErrors.tinPath?.message}
                  fieldName="tinPath"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* TAX Certificate Upload */}
      {selectedIdentificationType === "TAX" && (
        <FormField
          control={control}
          name="reqCertificatePath"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <KycPdfUpload
                  label="Tax Certificate"
                  onPdfChange={field.onChange}
                  currentValue={field.value}
                  required
                  maxSize="500kb"
                  error={formErrors.reqCertificatePath?.message}
                  fieldName="reqCertificatePath"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* NIN Document Upload */}
      {selectedIdentificationType === "NIN" && (
        <FormField
          control={control}
          name="menuPath"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <KycPdfUpload
                  label="NIN Document"
                  onPdfChange={field.onChange}
                  currentValue={field.value}
                  required
                  maxSize="500kb"
                  error={formErrors.menuPath?.message}
                  fieldName="menuPath"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}


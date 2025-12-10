"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { KycFormValues } from "./merchant-kyc-dialog-schema";

interface KycIdentificationInputProps {
  control: Control<KycFormValues>;
  identificationType: "CAC" | "TIN" | "NIN";
  identificationNumber: string;
  tinNo?: string;
  onVerifyCac?: (cacNo: string) => void;
  onVerifyTin?: (tinNo: string) => void;
  onVerifyNin?: (ninNo: string) => void;
  isVerifyingCac?: boolean;
  isVerifyingTin?: boolean;
  isVerifyingNin?: boolean;
}

/**
 * Component for rendering identification number input fields with verify buttons
 * Supports CAC, TIN, and NIN identification types
 * Shows verify button only when user starts typing
 */
export function KycIdentificationInput({
  control,
  identificationType,
  identificationNumber,
  tinNo,
  onVerifyCac,
  onVerifyTin,
  onVerifyNin,
  isVerifyingCac = false,
  isVerifyingTin = false,
  isVerifyingNin = false,
}: KycIdentificationInputProps) {
  // Render CAC or NIN input (both use identificationTypeNumber)
  if (identificationType === "CAC" || identificationType === "NIN") {
    const fieldName = "identificationTypeNumber";
    const label = identificationType === "CAC" ? "CAC Identification Number" : "NIN Identification Number";
    const placeholder = `Enter ${identificationType} identification number`;
    const handleVerify = identificationType === "CAC" ? onVerifyCac : onVerifyNin;
    const isVerifying = identificationType === "CAC" ? isVerifyingCac : isVerifyingNin;
    const verifyButtonText = identificationType === "CAC" ? "Verify CAC" : "Verify NIN";

    return (
      <FormField
        control={control}
        name={fieldName}
        render={({ field, fieldState: { error } }) => (
          <FormItem className="w-full">
            <label htmlFor={fieldName} className="mb-1 block text-sm font-medium text-[#838383]">
              {label} <span className="text-red-500">*</span>
            </label>
            <FormControl>
              <div className="relative">
                <input
                  {...field}
                  id={fieldName}
                  type="text"
                  placeholder={placeholder}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    field.onChange(value);
                  }}
                  className={`w-full rounded-lg border px-4 py-3 pr-24 text-base text-gray-900 placeholder-gray-400 ${error
                    ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                />
                {/* Show verify button only when user has entered text */}
                {identificationNumber && identificationNumber.trim() !== '' && handleVerify && (
                  <Button
                    type="button"
                    onClick={() => handleVerify(identificationNumber)}
                    disabled={isVerifying}
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-theme-dark-green hover:bg-theme-dark-green/90 text-white h-8 px-3 text-xs"
                  >
                    {isVerifying ? "Verifying..." : verifyButtonText}
                  </Button>
                )}
              </div>
            </FormControl>
            <div className="min-h-[20px]">
              <FormMessage className="text-sm text-red-600" />
            </div>
          </FormItem>
        )}
      />
    );
  }

  // Render TIN input (uses tinNo field)
  if (identificationType === "TIN") {
    return (
      <FormField
        control={control}
        name="tinNo"
        render={({ field, fieldState: { error } }) => (
          <FormItem className="w-full">
            <label htmlFor="tinNo" className="mb-1 block text-sm font-medium text-[#838383]">
              TIN Number <span className="text-red-500">*</span>
            </label>
            <FormControl>
              <div className="relative">
                <input
                  {...field}
                  id="tinNo"
                  type="text"
                  placeholder="Enter TIN number"
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase();
                    field.onChange(value);
                  }}
                  className={`w-full rounded-lg border px-4 py-3 pr-24 text-base text-gray-900 placeholder-gray-400 ${error
                    ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                />
                {/* Show verify button only when user has entered text */}
                {tinNo && tinNo.trim() !== '' && onVerifyTin && (
                  <Button
                    type="button"
                    onClick={() => onVerifyTin(tinNo)}
                    disabled={isVerifyingTin}
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-theme-dark-green hover:bg-theme-dark-green/90 text-white h-8 px-3 text-xs"
                  >
                    {isVerifyingTin ? "Verifying..." : "Verify TIN"}
                  </Button>
                )}
              </div>
            </FormControl>
            <div className="min-h-[20px]">
              <FormMessage className="text-sm text-red-600" />
            </div>
          </FormItem>
        )}
      />
    );
  }

  return null;
}


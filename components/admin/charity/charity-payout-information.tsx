"use client";

import { FormCombobox } from "@/components/ui/form-combobox";
import { FormInputTopLabel } from "@/components/ui/form-input";
import { LoadingModal } from "@/components/ui/loading-modal";
import { useVerifyPayOnUsBank } from "@/hooks/mutation/useVerifyPayOnUsBank";
import useGeneratePayOnUsBankList from "@/hooks/query/useGeneratePayOnUsBankList";
import { CharityFormData } from "@/lib/schemas/charity-schema";
import React, { useEffect, useRef, useState } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";

interface CharityPayoutInformationProps {
  control: Control<CharityFormData>;
  setValue: UseFormSetValue<CharityFormData>;
}

export default function CharityPayoutInformation({
  control,
  setValue
}: CharityPayoutInformationProps) {
  const { data: payOnUsBankList, isPending: isPayOnUsBankListPending } = useGeneratePayOnUsBankList();
  const { handleVerifyPayOnUsBank, isPending: isVerifyingPayOnUsBank, isSuccess: isVerifiedPayOnUsBank, accountName: accountNamePayOnUs } = useVerifyPayOnUsBank();

  // State for account verification
  const [isAccountValid, setIsAccountValid] = useState<boolean>(false);
  const hasVerified = useRef<string>(""); // Track what we've already verified
  const verificationTimeout = useRef<NodeJS.Timeout | null>(null);

  // Transform PayOnUs bank data to options format (using code as value, name as label)
  const bankOptions = React.useMemo(() => {
    const bankData = payOnUsBankList?.data?.data || payOnUsBankList?.data;
    if (bankData && typeof bankData === 'object') {
      return Object.entries(bankData).map(([code, name]) => ({
        value: code,
        label: String(name)
      }));
    }
    return [];
  }, [payOnUsBankList]);

  // Watch form values
  const selectedBank = useWatch({
    control,
    name: "bankCode"
  });

  const accountNumber = useWatch({
    control,
    name: "bankAccountNumber"
  });

  // Verify account when both bank and account number are provided
  useEffect(() => {
    // Clear any existing timeout
    if (verificationTimeout.current) {
      clearTimeout(verificationTimeout.current);
    }

    if (selectedBank && accountNumber && accountNumber.length >= 10) {
      const verificationKey = `${selectedBank}-${accountNumber}`;

      // Only verify if we haven't already verified this combination
      if (hasVerified.current !== verificationKey && !isVerifyingPayOnUsBank) {
        // Add a small delay to prevent rapid API calls while typing
        verificationTimeout.current = setTimeout(() => {
          const verifyPayload = {
            institutionCode: selectedBank,
            accountNumber: accountNumber,
            businessId: "8a86b73d-4cc9-42d6-ba8a-7c099335d62d"
          };

          hasVerified.current = verificationKey;
          handleVerifyPayOnUsBank(verifyPayload);
        }, 500); // 500ms delay
      }
    } else {
      // Reset verification state when requirements aren't met
      setIsAccountValid(false);
      hasVerified.current = "";
    }

    // Cleanup timeout on unmount
    return () => {
      if (verificationTimeout.current) {
        clearTimeout(verificationTimeout.current);
      }
    };
  }, [selectedBank, accountNumber, handleVerifyPayOnUsBank, isVerifyingPayOnUsBank]);

  // Handle verification success
  useEffect(() => {
    if (isVerifiedPayOnUsBank && accountNamePayOnUs) {
      setIsAccountValid(true);
      // Save the verified account name to the form
      setValue("accountName", accountNamePayOnUs);
      setValue("verifiedAccountName", accountNamePayOnUs);
    } else if (!isVerifyingPayOnUsBank && accountNumber && accountNumber.length >= 10) {
      setIsAccountValid(false);
      // Clear the account name if verification fails
      setValue("accountName", "");
      setValue("verifiedAccountName", "");
    }
  }, [isVerifiedPayOnUsBank, accountNamePayOnUs, isVerifyingPayOnUsBank, accountNumber, setValue]);
  return (
    <>
      <div className="m-6 border border-gray-100 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Payout Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormCombobox
            control={control}
            name="bankCode"
            disabled={isPayOnUsBankListPending}
            label="Bank"
            options={bankOptions}
            placeholder={isPayOnUsBankListPending ? "Loading banks..." : "Search and select a bank..."}
            searchPlaceholder="Search banks..."
            emptyMessage="No bank found."
            required
          />

          <FormInputTopLabel
            control={control}
            name="bankAccountNumber"
            label="Bank Account Number"
            placeholder="Enter Your 10 Digits Bank Account Number"
            required
          />

          <FormInputTopLabel
            control={control}
            name="accountName"
            label="Account Name"
            placeholder="Account name will appear after verification"
            disabled={true}
            required
          />
        </div>

        {/* Account Verification Status */}
        {accountNumber && accountNumber.length >= 10 && !isVerifyingPayOnUsBank && (
          <div className="mt-4">
            {isAccountValid && accountNamePayOnUs && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-800">Account Verified</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Account Name: <span className="font-semibold">{accountNamePayOnUs}</span>
                </p>
              </div>
            )}

            {!isAccountValid && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium text-red-800">Account Verification Failed</span>
                </div>
                <p className="text-sm text-red-700 mt-1">
                  Please check your account number and try again.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Loading Modal for Bank Verification */}
      <LoadingModal
        isOpen={isVerifyingPayOnUsBank}
        title="Verifying Account"
        message="We're verifying your bank account details. This may take a few seconds."
        description="Please do not close this window while verification is in progress."
      />
    </>
  );
}

"use client";

import { Badge } from "@/components/ui/badge";
import { PersonalInformationProps } from "@/lib/types";
import { useState } from "react";
import PersonalInformationEditDialog from "./personal-information-edit-dialog";

export default function PersonalInformation({
  merchantId,
  businessName,
  category,
  businessEmail,
  businessPhoneNo,
  locations,
  bankInformation,
  userId: _userId,
  onEdit: _onEdit,
  sellOnline,
  sellOffline,
  registrationEmail,

}: Readonly<PersonalInformationProps>) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const leftColumnItems = [
    { label: "Business Name", value: businessName || "N/A" },
    { label: "Business Email  Address", value: businessEmail || "N/A" },
    { label: "User Email Address", value: registrationEmail || "N/A" },
    { label: "Phone Number", value: businessPhoneNo || "N/A" },
    { label: "Online Sales", value: sellOnline ? "Yes" : "No" },
    { label: "Offline Sales", value: sellOffline ? "Yes" : "No" },

  ];
  // Get the primary bank or first bank if no primary is set
  const primaryBank = bankInformation?.find(bank => bank.primary === true) || bankInformation?.[0];

  // Get address from locations array
  const address = locations?.[0]?.contactAddress || locations?.[0]?.address || "No address provided";

  const rightColumnItems = [
    { label: "Address", value: address },


  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 ">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>

      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-5">
          {leftColumnItems.map((item) => (
            <div key={item.label} className="flex flex-col items-start">
              <span className="text-sm text-gray-500 font-medium">{item.label}:</span>
              <span className="text-sm text-gray-900 font-semibold max-w-[90%]">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="space-y-5">
          {rightColumnItems.map((item) => (
            <div key={item.label} className="flex flex-col items-start">
              <span className="text-sm text-gray-500 font-medium">{item.label}:</span>
              <span className="text-sm text-gray-900 font-semibold  max-w-[90%]">{item.value}</span>
            </div>
          ))}

          {/* Bank Information */}
          {primaryBank && (
            <>
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-500 font-medium">Bank Name:</span>
                <span className="text-sm text-gray-900 font-semibold max-w-[90%]">{primaryBank.bankname}</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-500 font-medium">Account Name:</span>
                <span className="text-sm text-gray-900 font-semibold max-w-[90%]">{primaryBank.accountHolderName}</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm text-gray-500 font-medium">Account Number:</span>
                <span className="text-sm text-gray-900 font-semibold max-w-[90%]">{primaryBank.accountNo}</span>
              </div>
              {primaryBank.bankTransferCode && (
                <div className="flex flex-col items-start">
                  <span className="text-sm text-gray-500 font-medium">Transfer Code:</span>
                  <span className="text-sm text-gray-900 font-semibold max-w-[90%]">{primaryBank.bankTransferCode}</span>
                </div>
              )}
            </>
          )}


        </div>
      </div>

      {/* Categories section with badges */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-500 font-medium mb-2">Categories:</span>
          <div className="flex flex-wrap gap-2">
            {category?.map((cat) => (
              <Badge key={cat} variant="secondary" className="text-xs">
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <PersonalInformationEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        businessName={businessName}
        category={category}
        businessEmail={businessEmail}
        address={address}
        businessPhoneNo={businessPhoneNo}
        userId={merchantId}
      />
    </div>
  );
}

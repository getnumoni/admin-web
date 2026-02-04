"use client";

import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import PersonalInformationEditDialog from "./personal-information-edit-dialog";

interface BankInformation {
  id: string;
  merchantId: string;
  bankname: string;
  bankcode: string | null;
  accountNo: string;
  accountHolderName: string;
  bankTransferCode: string | null;
  primary: boolean;
  minimumSpentAmount: number;
  active: boolean;
  createdDt: string | null;
  updatedDt: string | null;
}

interface Location {
  id: string;
  userId: string;
  storeNo: string | null;
  address: string | null;
  street: string | null;
  city: string;
  country: string;
  postalCode: string | null;
  latitude: string | null;
  longitude: string | null;
  contactPersonName: string;
  contactEmailAddress: string;
  contactPhoneNumber: string;
  contactAddress: string;
  createdDt: string | null;
  updatedDt: string | null;
  active: boolean;
}

interface PersonalInformationProps {
  merchantId?: string;
  businessName: string;
  category: string[];
  businessEmail: string;
  businessPhoneNo: string;
  locations: Location[];
  bankInformation: BankInformation[];
  userId?: string;
  onEdit?: () => void;
  sellOnline: boolean;
  sellOffline: boolean;
  registrationEmail: string;
  qrCode?: string;
}

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

  // const handleEditClick = () => {
  //   setIsEditDialogOpen(true);
  //   onEdit?.();
  // };

  // const handleEditConfirm = (data: { businessName: string; businessEmail: string; businessPhoneNo: string; address: string; businessCategory: string[] }) => {
  //   console.log('Updated personal information:', data);
  //   // Here you would typically call an API to update the information
  //   setIsEditDialogOpen(false);
  // };


  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 ">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
        {/* <Button
          variant="ghost"
          size="sm"
          onClick={handleEditClick}
          className="text-green-600 hover:text-green-700 hover:bg-green-50 text-sm font-medium"
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Edit details
        </Button>  */}
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-5">
          {leftColumnItems.map((item, index) => (
            <div key={index} className="flex flex-col items-start">
              <span className="text-sm text-gray-500 font-medium">{item.label}:</span>
              <span className="text-sm text-gray-900 font-semibold max-w-[90%]">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="space-y-5">
          {rightColumnItems.map((item, index) => (
            <div key={index} className="flex flex-col items-start">
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
            {category?.map((cat, index) => (
              <Badge key={`${cat}-${index}`} variant="secondary" className="text-xs">
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

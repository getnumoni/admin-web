"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

interface CharityPersonalInfoProps {
  charityName: string;
  contactEmail: string;
  contactPhoneNumber: string;
  charityAddress: string;
  contactPersonName: string;
  bankName: string;
  bankAccountNumber: string;
  accountName: string;
  description: string;
  charityRegNumber: string;
}

export default function CharityPersonalInfo({
  charityName,
  contactEmail,
  contactPhoneNumber,
  charityAddress,
  contactPersonName,
  bankName,
  bankAccountNumber,
  accountName,
  description,
  charityRegNumber
}: CharityPersonalInfoProps) {
  const leftColumnItems = [
    { label: "Charity Name", value: charityName },
    { label: "Email Address", value: contactEmail },
    { label: "Account Number", value: bankAccountNumber },
  ];

  const rightColumnItems = [
    { label: "Address", value: charityAddress },
    { label: "Phone Number", value: contactPhoneNumber },
    { label: "Bank Name", value: bankName },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-green-600 hover:text-green-700 hover:bg-green-50 text-sm font-medium"
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Edit details
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-5">
          {leftColumnItems.map((item, index) => (
            <div key={index} className="flex flex-col items-start">
              <span className="text-sm text-gray-500 font-medium">{item.label}:</span>
              <span className="text-sm text-gray-900 font-semibold text-right max-w-[60%]">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="space-y-5">
          {rightColumnItems.map((item, index) => (
            <div key={index} className="flex flex-col items-start">
              <span className="text-sm text-gray-500 font-medium">{item.label}:</span>
              <span className="text-sm text-gray-900 font-semibold max-w-[90%]">{item.value}</span>
            </div>
          ))}

          {/* Additional Bank Information */}
          <div className="flex flex-col items-start">
            <span className="text-sm text-gray-500 font-medium">Account Name:</span>
            <span className="text-sm text-gray-900 font-semibold max-w-[90%]">{accountName}</span>
          </div>
        </div>
      </div>

      {/* Registration Number */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-500 font-medium mb-2">Registration Number:</span>
          <Badge variant="secondary" className="text-xs">
            {charityRegNumber}
          </Badge>
        </div>
      </div>
    </div>
  );
}

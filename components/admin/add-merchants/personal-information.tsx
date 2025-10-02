"use client";

import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

interface PersonalInformationProps {
  businessName: string;
  category: string;
  email: string;
  address: string;
  phone: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  onEdit?: () => void;
}

export default function PersonalInformation({
  businessName,
  category,
  email,
  address,
  phone,
  bankName,
  accountName,
  accountNumber,
  onEdit,
}: PersonalInformationProps) {
  const leftColumnItems = [
    { label: "Business Name", value: businessName },
    { label: "Email Address", value: email },
    { label: "Phone Number", value: phone },
    { label: "Account Number", value: accountNumber },
  ];

  const rightColumnItems = [
    { label: "Category", value: category },
    { label: "Address", value: address },
    { label: "Bank Name", value: bankName },
    { label: "Account Name", value: accountName },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 ">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
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
              <span className="text-sm text-gray-900 font-semibold  max-w-[90%]">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

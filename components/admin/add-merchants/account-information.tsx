"use client";

import { Badge } from "@/components/ui/badge";
import { AccountInformationProps, InfoItem } from "@/lib/types";
import { CheckCircle, User } from "lucide-react";


export default function AccountInformation({
  registrationDate,
  lastLogin,
  accountType,
  accountStatus,
  identityType,
  identityNumber,
  businessNumber,
  maxPointsIssued,
}: AccountInformationProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const leftColumnItems: InfoItem[] = [
    { label: "Registration Date", value: registrationDate },
    { label: "Account type", value: accountType, icon: User },
    { label: "Identity type", value: identityType },
    { label: "Business Number", value: businessNumber },
  ];

  const rightColumnItems: InfoItem[] = [
    { label: "Last Login", value: lastLogin },
    { label: "Account Status", value: accountStatus, isBadge: true },
    { label: "Identity Number", value: identityNumber },
    { label: "Max Point Issued", value: maxPointsIssued },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Account Information</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-5">
          {leftColumnItems.map((item, index) => (
            <div key={index} className="flex flex-col items-start">
              <span className="text-sm text-gray-500 font-medium">{item.label}:</span>
              <div className="flex items-center gap-2 mt-1">
                {item.icon && <item.icon className="h-4 w-4 text-gray-500" />}
                {item.isBadge ? (
                  <Badge className={getStatusColor(item.value)}>
                    {item.value === "Verified" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {item.value}
                  </Badge>
                ) : (
                  <span className="text-sm text-gray-900 font-semibold max-w-[90%]">{item.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-5">
          {rightColumnItems.map((item, index) => (
            <div key={index} className="flex flex-col items-start">
              <span className="text-sm text-gray-500 font-medium">{item.label}:</span>
              <div className="flex items-center gap-2 mt-1">
                {item.icon && <item.icon className="h-4 w-4 text-gray-500" />}
                {item.isBadge ? (
                  <Badge className={getStatusColor(item.value)}>
                    {item.value === "Verified" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {item.value}
                  </Badge>
                ) : (
                  <span className="text-sm text-gray-900 font-semibold">{item.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

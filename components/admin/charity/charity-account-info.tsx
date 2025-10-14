"use client";

import { Badge } from "@/components/ui/badge";
import { formatDateReadable } from "@/lib/helper";

interface CharityAccountInfoProps {
  dateAdded: string;
  lastLogin?: string;
  status: string;
  totalPointDonated: number;
  numberOfDonations: number;
  country: string;
  state: string;
  city: string;
}

export default function CharityAccountInfo({
  dateAdded,
  lastLogin,
  status,
  totalPointDonated,
  numberOfDonations,
  country,
  state,
  city
}: CharityAccountInfoProps) {
  const leftColumnItems = [
    { label: "Date Created", value: formatDateReadable(dateAdded) },
    { label: "Account Type", value: "Charity", icon: "🏛️" },
    { label: "Registration Number", value: "123456789012" }, // This might need to be passed as prop
  ];

  const rightColumnItems = [
    { label: "Last Login", value: lastLogin ? formatDateReadable(lastLogin) : "Never" },
    { label: "Account Status", value: status, isBadge: true },
    { label: "Max Donation Received", value: `₦ ${(totalPointDonated / 1000).toFixed(1)}K` },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Account Information</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-5">
          {leftColumnItems.map((item, index) => (
            <div key={index} className="flex flex-col items-start">
              <span className="text-sm text-gray-500 font-medium">{item.label}:</span>
              <div className="flex items-center space-x-2">
                {item.icon && <span className="text-sm">{item.icon}</span>}
                <span className="text-sm text-gray-900 font-semibold">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-5">
          {rightColumnItems.map((item, index) => (
            <div key={index} className="flex flex-col items-start">
              <span className="text-sm text-gray-500 font-medium">{item.label}:</span>
              {item.isBadge ? (
                <Badge
                  variant={status === "ACTIVE" ? "default" : "secondary"}
                  className={status === "ACTIVE" ? "bg-green-100 text-green-800" : ""}
                >
                  {item.value}
                </Badge>
              ) : (
                <span className="text-sm text-gray-900 font-semibold">{item.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Location Information */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-500 font-medium mb-2">Location:</span>
          <span className="text-sm text-gray-900 font-semibold">
            {city}, {state}, {country}
          </span>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-start">
            <span className="text-sm text-gray-500 font-medium">Total Donations:</span>
            <span className="text-lg font-bold text-gray-900">{numberOfDonations}</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm text-gray-500 font-medium">Total Points Donated:</span>
            <span className="text-lg font-bold text-gray-900">{totalPointDonated.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

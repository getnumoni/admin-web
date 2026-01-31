"use client";

import { Button } from "@/components/ui/button";
import { formatDateReadable } from "@/lib/helper";
import { CustomerDetailsResponse } from "@/lib/types";
import { Edit2 } from "lucide-react";

interface CustomerPersonalInfoProps {
  customerData: CustomerDetailsResponse;
  onEdit?: () => void;
}

export default function CustomerPersonalInfo({
  customerData,
  onEdit
}: CustomerPersonalInfoProps) {
  const handleEdit = () => {
    console.log("Edit personal information");
    onEdit?.();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <h1 className="text-lg font-semibold text-gray-900">Personal Information</h1>
        <Button
          variant="outline"
          className="text-theme-dark-green border-none shadow-none hover:bg-transparent"
          onClick={handleEdit}
        >
          <Edit2 className="mr-2 h-4 w-4" />
          Edit details
        </Button>
      </div>

      <hr className="border-gray-200" />

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm text-muted-foreground">Full Name</label>
              <p id="name" className="text-base font-semibold text-foreground mt-1">
                {customerData?.name || "Shai Hulud"}
              </p>
            </div>

            <div>
              <label htmlFor="email" className="text-sm text-muted-foreground">Email Address</label>
              <p id="email" className="text-base font-semibold text-foreground mt-1">
                {customerData?.email || "shaihulud@gmail.com"}
              </p>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="text-sm text-muted-foreground">Phone Number</label>
              <p id="phoneNumber" className="text-base font-semibold text-foreground mt-1">
                {customerData?.phoneNumber || "+234 701 2345 678"}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label htmlFor="address" className="text-sm text-muted-foreground">Address</label>
              <p id="address" className="text-base font-semibold text-foreground mt-1">
                {customerData?.locations[0]?.address || ""}
              </p>
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="text-sm text-muted-foreground">Date of Birth</label>
              <p id="dateOfBirth" className="text-base font-semibold text-foreground mt-1">
                {formatDateReadable(customerData?.dateOfBirth)}
              </p>
            </div>

            <div>
              <label htmlFor="country" className="text-sm text-muted-foreground">Country of Residence</label>
              <p id="country" className="text-base font-semibold text-foreground mt-1">
                {customerData?.locations[0]?.country || "Nigeria"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
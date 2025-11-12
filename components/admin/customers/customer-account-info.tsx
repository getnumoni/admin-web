"use client";

import { Badge } from "@/components/ui/badge";
import { formatActivityTimestamp, formatDateReadable } from "@/lib/helper";
import { CustomerDetailsResponse } from "@/lib/types";
import { Users } from "lucide-react";

export default function CustomerAccountInfo({ customerData }: { customerData: CustomerDetailsResponse }) {

  return (
    <div className="bg-white rounded-xl border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <h1 className="text-lg font-semibold text-gray-900">Account Information</h1>
      </div>

      <hr className="border-gray-200" />

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Registration Date</label>
              <p className="text-base font-semibold text-foreground mt-1">
                {customerData?.createdDt ? formatDateReadable(customerData.createdDt) : "N/A"}
              </p>
            </div>

            <div>
              <label className="text-sm text-muted-foreground">Account type</label>
              <div className="flex items-center gap-2 mt-1">
                <Users className="h-4 w-4 text-theme-dark-green" />
                <p className="text-base font-semibold text-theme-dark-green">Customer</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Last Login</label>
              <p className="text-base font-semibold text-foreground mt-1">
                {customerData?.lastLogin ? formatActivityTimestamp(customerData.lastLogin) : "N/A"}
              </p>
            </div>

            <div>
              <label className="text-sm text-muted-foreground">Account Status</label>
              <div className="mt-1">
                <Badge className="bg-green-100 text-green-800">
                  Active
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
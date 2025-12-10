"use client";

import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface NinVerificationData {
  nin: string;
  firstname: string;
  phone: string;
  middlename: string;
  id: number;
  state: string;
  nin_check: string;
  status: string;
  lastname: string;
}

interface NinVerificationResponse {
  data: NinVerificationData;
  message: string;
  status: number;
}

interface NinVerificationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  verificationData: NinVerificationResponse | null;
}

/**
 * Sheet component to display NIN verification details
 * Shows personal information and verification status from NIN verification API
 */
export function NinVerificationSheet({
  isOpen,
  onClose,
  verificationData,
}: NinVerificationSheetProps) {
  if (!verificationData?.data) return null;

  const data = verificationData.data;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>NIN Verification Details</SheetTitle>
          <SheetDescription>
            {verificationData.message || "NIN verification successful"}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6 px-5">
          {/* Status Badges - Displayed Separately with Aligned Layout */}
          <div className="space-y-3">
            {/* Status Badge */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700 w-24">Status:</span>
              <Badge
                variant={data.status?.toLowerCase() === "verified" ? "default" : "secondary"}
                className={
                  data.status?.toLowerCase() === "verified"
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : ""
                }
              >
                {data.status.toUpperCase()}
              </Badge>
            </div>

            {/* NIN Check Badge */}
            {data.nin_check && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 w-24">NIN Check:</span>
                <Badge
                  variant={data.nin_check === "verified" ? "default" : "secondary"}
                  className={
                    data.nin_check === "verified"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : ""
                  }
                >
                  {data.nin_check.toUpperCase()}
                </Badge>
              </div>
            )}

            {/* State/Complete Badge */}
            {data.state && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 w-24">State:</span>
                <Badge
                  variant={data.state?.toLowerCase() === "complete" ? "default" : "secondary"}
                  className={
                    data.state?.toLowerCase() === "complete"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : ""
                  }
                >
                  {data.state.toUpperCase()}
                </Badge>
              </div>
            )}
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500 font-medium">NIN Number:</span>
                <p className="text-sm text-gray-900 font-semibold mt-1">{data.nin}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500 font-medium">Full Name:</span>
                <p className="text-sm text-gray-900 font-semibold mt-1">
                  {[data.firstname, data.middlename, data.lastname].filter(Boolean).join(" ")}
                </p>
              </div>
              {data.firstname && (
                <div>
                  <span className="text-sm text-gray-500 font-medium">First Name:</span>
                  <p className="text-sm text-gray-900 font-semibold mt-1">{data.firstname}</p>
                </div>
              )}
              {data.middlename && (
                <div>
                  <span className="text-sm text-gray-500 font-medium">Middle Name:</span>
                  <p className="text-sm text-gray-900 font-semibold mt-1">{data.middlename}</p>
                </div>
              )}
              {data.lastname && (
                <div>
                  <span className="text-sm text-gray-500 font-medium">Last Name:</span>
                  <p className="text-sm text-gray-900 font-semibold mt-1">{data.lastname}</p>
                </div>
              )}
              {data.phone && (
                <div>
                  <span className="text-sm text-gray-500 font-medium">Phone Number:</span>
                  <p className="text-sm text-gray-900 font-semibold mt-1">{data.phone}</p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
            <div className="space-y-3">
              {data.id && (
                <div>
                  <span className="text-sm text-gray-500 font-medium">ID:</span>
                  <p className="text-sm text-gray-900 font-semibold mt-1">{data.id}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}


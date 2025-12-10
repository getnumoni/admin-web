"use client";

import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface CacVerificationData {
  headOfficeAddress: string;
  companyEmail: string;
  city: string;
  rcNumber: string;
  companyName: string;
  cac_status: string;
  id: number;
  state: string;
  cac_check: string;
  status: string;
}

interface CacVerificationResponse {
  data: CacVerificationData;
  message: string;
  status: number;
}

interface CacVerificationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  verificationData: CacVerificationResponse | null;
}

export function CacVerificationSheet({
  isOpen,
  onClose,
  verificationData,
}: CacVerificationSheetProps) {
  // Check if verification data exists and is not an empty array
  if (!verificationData?.data || (Array.isArray(verificationData.data) && verificationData.data.length === 0)) {
    return null;
  }

  const data = verificationData.data;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>CAC Verification Details</SheetTitle>
          <SheetDescription>
            {verificationData.message || "CAC verification successful"}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6 px-5">
          {/* Status Badges - Displayed Separately with Aligned Layout */}
          <div className="space-y-3">
            {/* Status Badge */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700 w-24">Status:</span>
              <Badge
                variant={data.status?.toLowerCase() === "verified" || data.status?.toLowerCase() === "active" ? "default" : "secondary"}
                className={
                  data.status?.toLowerCase() === "verified" || data.status?.toLowerCase() === "active"
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : ""
                }
              >
                {data.status?.toUpperCase()}
              </Badge>
            </div>

            {/* CAC Check Badge */}
            {data.cac_check && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 w-24">CAC Check:</span>
                <Badge
                  variant={data.cac_check === "verified" ? "default" : "secondary"}
                  className={
                    data.cac_check === "verified"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : ""
                  }
                >
                  {data.cac_check.toUpperCase()}
                </Badge>
              </div>
            )}

            {/* CAC Status Badge */}
            {data.cac_status && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 w-24">CAC Status:</span>
                <Badge
                  variant={data.cac_status?.toUpperCase() === "ACTIVE" ? "default" : "secondary"}
                  className={
                    data.cac_status?.toUpperCase() === "ACTIVE"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : ""
                  }
                >
                  {data.cac_status.toUpperCase()}
                </Badge>
              </div>
            )}
          </div>

          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500 font-medium">Company Name:</span>
                <p className="text-sm text-gray-900 font-semibold mt-1">{data.companyName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500 font-medium">RC Number:</span>
                <p className="text-sm text-gray-900 font-semibold mt-1">{data.rcNumber}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500 font-medium">Company Email:</span>
                <p className="text-sm text-gray-900 font-semibold mt-1">{data.companyEmail}</p>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Location Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500 font-medium">Head Office Address:</span>
                <p className="text-sm text-gray-900 font-semibold mt-1">{data.headOfficeAddress}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500 font-medium">City:</span>
                  <p className="text-sm text-gray-900 font-semibold mt-1">{data.city}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 font-medium">State:</span>
                  <p className="text-sm text-gray-900 font-semibold mt-1">{data.state}</p>
                </div>
              </div>
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


"use client";

import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDateReadable } from "@/lib/helper";

interface Wallet {
  userId: string;
  amount: number;
  createdDt: string;
}

interface RewardsInformationProps {
  wallet?: Wallet | null;
  pointType?: string | null;
}

export default function RewardsInformation({
  wallet,
  pointType
}: RewardsInformationProps) {
  const getPointTypeColor = (type: string | null | undefined) => {
    switch (type) {
      case "LATER":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "INSTANT":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPointTypeLabel = (type: string | null | undefined) => {
    switch (type) {
      case "LATER":
        return "Later";
      case "INSTANT":
        return "Instant";
      default:
        return type || "N/A";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Rewards Information</h3>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-5">
          <div className="flex flex-col items-start">
            <span className="text-sm text-gray-500 font-medium">Wallet User ID:</span>
            <span className="text-sm text-gray-900 font-semibold mt-1">
              {wallet?.userId || "N/A"}
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm text-gray-500 font-medium">Wallet Amount:</span>
            <span className="text-sm text-gray-900 font-semibold mt-1">
              {wallet?.amount ? formatCurrency(wallet.amount) : "N/A"}
            </span>
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex flex-col items-start">
            <span className="text-sm text-gray-500 font-medium">Wallet Created Date:</span>
            <span className="text-sm text-gray-900 font-semibold mt-1">
              {wallet?.createdDt ? formatDateReadable(wallet.createdDt) : "N/A"}
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm text-gray-500 font-medium">Point Type:</span>
            <div className="mt-1">
              <Badge className={getPointTypeColor(pointType)}>
                {getPointTypeLabel(pointType)}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


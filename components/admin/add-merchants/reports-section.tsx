"use client";

import { Button } from "@/components/ui/button";
import { Bell, Info } from "lucide-react";

interface ReportsSectionProps {
  reportsCompleted: number;
  totalReports: number;
  onNotifyMerchant?: () => void;
}

export default function ReportsSection({
  reportsCompleted,
  totalReports,
  onNotifyMerchant
}: ReportsSectionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900">Reports</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{reportsCompleted}/{totalReports}</span>
            <Info className="h-4 w-4 text-green-600" />
          </div>
        </div>

        <Button
          onClick={onNotifyMerchant}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Bell className="h-4 w-4 mr-2" />
          Notify Merchant
        </Button>
      </div>
    </div>
  );
}

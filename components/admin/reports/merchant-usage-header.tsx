'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { DateRangePicker } from "./merchant-usage-date-picker";

interface MerchantUsageHeaderProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onSearch: () => void;
}

export function MerchantUsageHeader({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onSearch,
}: MerchantUsageHeaderProps) {
  return (
    <div className="flex flex-row items-center justify-between pb-0">
      <div className="text-base font-semibold flex items-center gap-2">
        <span>Merchant Budget Usage</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-4 h-4 text-theme-dark-green" />
          </TooltipTrigger>
          <TooltipContent className="max-w-sm bg-white shadow-xs border border-gray-50 text-black flex items-center gap-5">
            <Info className="w-8 h-8 text-theme-dark-green" />
            <p className="text-xs">Shows how much of a merchant&apos;s allocated budget has been spent compared to the total available. </p>
          </TooltipContent>
        </Tooltip>
      </div>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        onSearch={onSearch}
      />
    </div>
  );
}


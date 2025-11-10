'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { DateRangePicker } from "./merchant-usage-date-picker";

interface ReportHeaderProps {
  startDate: Date | null;
  endDate: Date | null;
  title: string;
  description?: string;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onSearch: () => void;
}

export function ReportHeader({
  startDate,
  endDate,
  title,
  onStartDateChange,
  onEndDateChange,
  onSearch,
  description,
}: ReportHeaderProps) {
  return (
    <div className="flex flex-row items-center justify-between pb-0">
      <div className="text-base font-semibold flex items-center gap-2">
        <span>{title}</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-4 h-4 text-theme-dark-green" />
          </TooltipTrigger>
          <TooltipContent className="max-w-sm bg-white shadow-xs border border-gray-50 text-black flex items-center gap-5">
            <Info className="w-8 h-8 text-theme-dark-green" />
            <p className="text-xs">{description}</p>
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


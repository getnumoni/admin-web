'use client';

import { CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { PointsFlowDatePicker } from "./points-flow-date-picker";

interface PointsFlowHeaderProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onSearch: () => void;
}

export function PointsFlowHeader({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onSearch,
}: PointsFlowHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center justify-between pb-0">
      <CardTitle className="text-base font-semibold flex items-center gap-2">
        <span>Points Flow Distribution</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-4 h-4 text-theme-dark-green" />
          </TooltipTrigger>
          <TooltipContent className="max-w-sm bg-white shadow-xs border border-gray-50 text-black flex items-center gap-5">
            <Info className="w-8 h-8 text-theme-dark-green" />
            <p className="text-xs">Shows how reward points are earned, redeemed, or expired across different activities and time period </p>
          </TooltipContent>
        </Tooltip>
      </CardTitle>
      <PointsFlowDatePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        onSearch={onSearch}
      />
    </CardHeader>
  );
}


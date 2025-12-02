import { RuleCardProps } from "@/lib/types";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

export default function RuleCard({ title, value, tooltip }: RuleCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">{title}</span>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-theme-dark-green cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs bg-theme-dark-green text-white">
                <p className="text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
  );
}
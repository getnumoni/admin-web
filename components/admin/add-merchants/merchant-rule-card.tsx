"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface RuleCardProps {
  title: string;
  value: string;
  tooltip?: string;
}

function RuleCard({ title, value, tooltip }: RuleCardProps) {
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

export default function MerchantRuleCard() {
  const ruleCards = [
    {
      title: "Percentage Deduction per transaction",
      value: "20% (System)",
      tooltip: "The percentage of each transaction that is deducted for the reward system"
    },
    {
      title: "How customer earn points",
      value: "Percentage Based",
      tooltip: "Customers earn points based on a percentage of their transaction amount"
    },
    {
      title: "How customer receive points",
      value: "Instantly",
      tooltip: "Points are credited to customer accounts immediately after transaction completion"
    },
    {
      title: "Reward Point Cap",
      value: "2000",
      tooltip: "Maximum number of points a customer can earn per transaction"
    },
    {
      title: "Point Target before Redemption",
      value: "20000",
      tooltip: "Maximum number of reward points this brand can give out within a period"
    }
  ];

  return (
    <div className="space-y-4">
      {ruleCards.map((card, index) => (
        <RuleCard
          key={index}
          title={card.title}
          value={card.value}
          tooltip={card.tooltip}
        />
      ))}
    </div>
  );
}
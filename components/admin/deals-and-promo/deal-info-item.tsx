"use client";

import { Badge } from "@/components/ui/badge";
import { getApproveStatusColor, getApproveStatusText, getDealStatusColor, getDealStatusText } from "@/lib/helper";

interface InfoItem {
  label: string;
  value: string | null | undefined;
  isBadge?: boolean;
  isApproval?: boolean;
}

interface DealInfoItemProps {
  item: InfoItem;
}

export default function DealInfoItem({ item }: DealInfoItemProps) {
  const renderValue = () => {
    if (item.isBadge) {
      const badgeClass = item.isApproval
        ? getApproveStatusColor(item.value as string | null | undefined)
        : getDealStatusColor(item.value as string || '');
      
      const badgeText = item.isApproval
        ? getApproveStatusText(item.value as string | null | undefined)
        : getDealStatusText(item.value as string || '');

      return (
        <Badge className={badgeClass}>
          {badgeText}
        </Badge>
      );
    }

    return (
      <span className="text-sm text-gray-900 font-semibold max-w-[90%]">
        {item.value || 'N/A'}
      </span>
    );
  };

  return (
    <div className="flex flex-col items-start">
      <span className="text-sm text-gray-500 font-medium">{item.label}:</span>
      {renderValue()}
    </div>
  );
}


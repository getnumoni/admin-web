"use client";

import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDealDate, generateRandomBadgeColor } from "@/lib/helper";
import { DealInformationProps } from "@/lib/types";
import DealInfoItem from "./deal-info-item";

type InfoItem = {
  label: string;
  value: string | null | undefined;
  isBadge?: boolean;
  isApproval?: boolean;
};

const buildLeftColumnItems = (props: DealInformationProps): InfoItem[] => [
  { label: "Deal Name", value: props.name || "N/A" },
  { label: "Deal Type", value: props.dealType || "N/A" },
  { label: "Initial Price", value: props.initialPrice ? formatCurrency(parseFloat(props.initialPrice)) : "N/A" },
  { label: "Discount", value: props.discount || "N/A" },
  { label: "New Price", value: props.newPrice ? formatCurrency(parseFloat(props.newPrice)) : "N/A" },
  { label: "Available Stock", value: props.availableStock || "0" },
  { label: "Usage Limit", value: props.usageLimit || "Unlimited" },
  { label: "Merchant Name", value: props.merchantName || "N/A" },
];

const buildRightColumnItems = (props: DealInformationProps): InfoItem[] => {
  const items: InfoItem[] = [
    { label: "Start Date", value: formatDealDate(props.startDate) },
    { label: "End Date", value: formatDealDate(props.endDate) },
    { label: "Deal Status", value: props.dealStatus, isBadge: true },
    { label: "Approval Status", value: props.approveStatus, isBadge: true, isApproval: true },
    { label: "Branch Deal", value: props.isBranchDeal ? "Yes" : "No" },
    { label: "Branch ID", value: props.branchId || "N/A" },
  ];

  if (props.dealType?.toLowerCase() === 'bundle') {
    if (props.qualifyingPurchase) {
      items.push({ label: "Qualifying Purchase", value: props.qualifyingPurchase });
    }
    if (props.rewardItemQuantity) {
      items.push({ label: "Reward Item Quantity", value: props.rewardItemQuantity });
    }
    if (props.pricePerItem) {
      items.push({ label: "Price Per Item", value: formatCurrency(parseFloat(props.pricePerItem)) });
    }
  }

  return items;
};

export default function DealInformation(props: DealInformationProps) {
  const leftColumnItems = buildLeftColumnItems(props);
  const rightColumnItems = buildRightColumnItems(props);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Deal Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          {leftColumnItems.map((item, index) => (
            <DealInfoItem key={index} item={item} />
          ))}
        </div>
        <div className="space-y-5">
          {rightColumnItems.map((item, index) => (
            <DealInfoItem key={index} item={item} />
          ))}
        </div>
      </div>

      <DescriptionSection description={props.description} />
      <CategoriesSection categories={props.category} />
    </div>
  );
}

function DescriptionSection({ description }: { description: string }) {
  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <div className="flex flex-col items-start">
        <span className="text-sm text-gray-500 font-medium mb-2">Description:</span>
        <p className="text-sm text-gray-700 leading-relaxed">{description || "No description provided."}</p>
      </div>
    </div>
  );
}

function CategoriesSection({ categories }: { categories: string[] }) {
  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <div className="flex flex-col items-start">
        <span className="text-sm text-gray-500 font-medium mb-2">Categories:</span>
        <div className="flex flex-wrap gap-2">
          {categories?.map((cat, index) => (
            <Badge key={index} variant="secondary" className={`${generateRandomBadgeColor(cat)} text-xs`}>
              {cat}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}


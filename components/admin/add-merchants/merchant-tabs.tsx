"use client";

import { cn } from "@/lib/utils";

interface MerchantTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "kyc", label: "KYC" },
  { id: "transactions", label: "Transactions" },
  { id: "rewards", label: "Reward & Points" },
];

export default function MerchantTabs({ activeTab, onTabChange }: MerchantTabsProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-1 mb-6">
      <nav className="flex space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex-1 py-3 px-4 rounded-md font-medium text-sm transition-all duration-200 cursor-pointer",
              activeTab === tab.id
                ? "bg-white text-gray-900  border border-gray-200"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

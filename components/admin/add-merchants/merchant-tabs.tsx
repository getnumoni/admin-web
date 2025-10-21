"use client";

import Tabs, { Tab } from "@/components/common/tabs";

interface MerchantTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs: Tab[] = [
  { id: "overview", label: "Overview" },
  { id: "kyc", label: "KYC" },
  { id: "transactions", label: "Transactions" },
  { id: "rewards", label: "Reward & Points" },
];

export default function MerchantTabs({ activeTab, onTabChange }: MerchantTabsProps) {
  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
      variant="merchant"
    />
  );
}

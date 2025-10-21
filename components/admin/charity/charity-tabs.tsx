"use client";

import Tabs, { Tab } from "@/components/common/tabs";

interface CharityTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs: Tab[] = [
  { id: "overview", label: "Overview" },
  { id: "transactions", label: "Transactions" },
  { id: "reward-points", label: "Reward Point" },
];

export default function CharityTabs({ activeTab, onTabChange }: CharityTabsProps) {
  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
      variant="charity"
    />
  );
}

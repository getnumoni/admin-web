"use client";

import Tabs, { Tab } from "@/components/common/tabs";

interface DealTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs: Tab[] = [
  { id: "overview", label: "Overview" },
  { id: "images", label: "Images" },
];

export default function DealTabs({ activeTab, onTabChange }: DealTabsProps) {
  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
      variant="merchant"
    />
  );
}


"use client";

import Tabs, { Tab } from "@/components/common/tabs";

interface SupportTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs: Tab[] = [
  { id: "support-ticket", label: "Support Ticket" },
  { id: "ticket-type", label: "Ticket Type" },
];

export default function SupportTabs({ activeTab, onTabChange }: SupportTabsProps) {
  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
      variant="default"
      className="mt-6"
    />
  );
}

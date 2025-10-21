"use client";

import Tabs, { Tab } from "@/components/common/tabs";

interface RolesTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs: Tab[] = [
  { id: "roles", label: "Roles" },
  { id: "modules", label: "Modules" },
  { id: "privileges", label: "Privileges" },
];

export default function RolesTabs({ activeTab, onTabChange }: RolesTabsProps) {
  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
      variant="default"
    />
  );
}

"use client";

import { cn } from "@/lib/utils";

export interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  variant?: "default" | "charity" | "merchant";
  className?: string;
}

export default function Tabs({
  tabs,
  activeTab,
  onTabChange,
  variant = "default",
  className
}: TabsProps) {
  const getTabStyles = (isActive: boolean) => {
    switch (variant) {
      case "charity":
        return cn(
          "flex-1 py-3 px-4 rounded-md font-medium text-sm transition-all duration-200 cursor-pointer",
          isActive
            ? "bg-white text-gray-900 border border-gray-200"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        );

      case "merchant":
        return cn(
          "flex-1 py-3 px-4 rounded-md font-medium text-sm transition-all duration-200 cursor-pointer",
          isActive
            ? "bg-white text-gray-900 border border-gray-200"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        );

      default:
        return cn(
          "flex-1 py-3 px-4 rounded-md font-medium text-sm transition-all duration-200 cursor-pointer",
          isActive
            ? "bg-white text-gray-900 border border-gray-200"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        );
    }
  };

  const getContainerStyles = () => {
    switch (variant) {
      case "charity":
        return "bg-gray-100 rounded-lg p-1 mb-6";

      case "merchant":
      default:
        return "bg-gray-100 rounded-lg p-1 mb-6";
    }
  };

  const getNavStyles = () => {
    switch (variant) {
      case "charity":
        return "flex border-b border-gray-200";

      case "merchant":
      default:
        return "flex space-x-1";
    }
  };

  return (
    <div className={cn(getContainerStyles(), className)}>
      <nav className={getNavStyles()}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={getTabStyles(activeTab === tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

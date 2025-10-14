"use client";

interface CharityTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function CharityTabs({ activeTab, onTabChange }: CharityTabsProps) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "transactions", label: "Transactions" },
    { id: "reward-points", label: "Reward Point" },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-6">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === tab.id
              ? "text-theme-dark-green border-b-2 border-theme-dark-green bg-white shadow-sm"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

'use client';

import { GiftIcon, PeopleIcon, StoreIcon, WarningIcon } from "@/components/common/icon-svg";
import { MetricCard } from "@/components/common/metric-card";
import useGetDealList from "@/hooks/query/useGetDealList";
import AllDealsData from "./all-deals-data";

export default function ViewDealsPromo() {
  const { data, isPending, error, isError, refetch } = useGetDealList();


  const dealsData = data?.data?.data?.pageData;
  // Mock data for deals and promo metrics
  const dealsMetrics = [
    {
      title: "Active Deals",
      value: "200",
      change: "+55% Up from yesterday",
      changeType: "positive" as const,
      icon: <PeopleIcon className="text-white" size={24} />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Pending Approval",
      value: "₦ 900.3K",
      change: undefined,
      changeType: undefined,
      icon: <GiftIcon className="text-white" size={24} />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Total Conversions",
      value: "234",
      change: "-14% Down from yesterday",
      changeType: "negative" as const,
      icon: <StoreIcon className="text-white" size={24} />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Reported Issues",
      value: "10",
      change: "0% Up from yesterday",
      changeType: "positive" as const,
      icon: <WarningIcon className="text-white" size={24} />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    }
  ];


  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-7xl mx-auto">

        {/* Metrics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dealsMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              bgColor={metric.bgColor}
              iconBgColor={metric.iconBgColor}
            />
          ))}
        </div>
        <AllDealsData
          dealsData={dealsData}
          isPending={isPending}
          isError={isError}
          error={error || undefined}
          refetch={refetch}
        />
      </div>
    </div>
  );
}
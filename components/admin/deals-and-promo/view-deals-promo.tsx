'use client';

import { GiftIcon, PeopleIcon, StoreIcon, WarningIcon } from "@/components/common/icon-svg";
import { MetricCard } from "@/components/common/metric-card";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import useGetDealList from "@/hooks/query/useGetDealList";
import useGetDealsStatistics from "@/hooks/query/useGetDealsStatistics";
import { PauseIcon } from "lucide-react";
import AllDealsData from "./all-deals-data";

export default function ViewDealsPromo() {
  const { data, isPending, error, isError, refetch } = useGetDealList();
  const { data: dealsStatisticsData, isPending: isDealsStatisticsPending, error: dealsStatisticsError, isError: isDealsStatisticsError, refetch: refetchDealsStatistics } = useGetDealsStatistics();
  // console.log(dealsStatisticsData?.data?.data);

  const deals = dealsStatisticsData?.data?.data;


  const dealsData = data?.data?.data?.pageData;
  // Mock data for deals and promo metrics
  const dealsMetrics = [
    {
      title: "Active Deals",
      value: deals?.activeDeals || 0,
      // change: "+55% Up from yesterday",
      // changeType: "positive" as const,
      icon: <PeopleIcon className="text-white" size={24} />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Pending Deals",
      value: deals?.draftStatus || 0,
      // change: undefined,
      // changeType: undefined,
      icon: <GiftIcon className="text-white" size={24} />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "InActive Deals",
      value: deals?.inactiveDeals || 0,
      // change: "-14% Down from yesterday",
      // changeType: "negative" as const,
      icon: <StoreIcon className="text-white" size={24} />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Expired Deals",
      value: deals?.expiredStatus || 0,
      // change: "0% Up from yesterday",
      // changeType: "positive" as const,
      icon: <WarningIcon className="text-white" size={24} />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Paused Deals",
      value: deals?.pausedStatus || 0,
      // change: "0% Up from yesterday",
      // changeType: "positive" as const,
      icon: <PauseIcon className="text-white" size={24} />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Total Deals",
      value: deals?.totalDeals || 0,
      // change: "0% Up from yesterday",
      // changeType: "positive" as const,
      icon: <PauseIcon className="text-white" size={24} />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    }
  ];


  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-7xl mx-auto">

        {/* Metrics Cards Grid */}
        {isDealsStatisticsPending ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-7 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : isDealsStatisticsError ? (
          <ErrorState
            title="Error Loading Deals Metrics"
            message={(dealsStatisticsError as unknown as Error)?.message || "Failed to load deals metrics. Please try again."}
            onRetry={refetchDealsStatistics}
            retryText="Retry"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {dealsMetrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                // change={metric.change}
                // changeType={metric.changeType}
                icon={metric.icon}
                bgColor={metric.bgColor}
                iconBgColor={metric.iconBgColor}
              />
            ))}
          </div>
        )}
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
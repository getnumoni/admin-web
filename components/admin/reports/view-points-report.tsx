'use client';

import { MetricCard } from "@/components/common/metric-card";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import useGetReportPointSummary from "@/hooks/query/useGetReportPointSummary";
import { Gift, ShoppingBag, Star, Users } from "lucide-react";
import type { ReactNode } from "react";
import PointsFlow from "./points-flow";

function PointsSkeletonItem() {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <div className="flex flex-col h-full">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <Skeleton className="h-4 w-40 mt-6 mb-3" />
        <div className="mt-auto">
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </div>
  );
}

function PointsSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <PointsSkeletonItem key={index} />
      ))}
    </div>
  );
}

function PointsMetricsGrid({ pointsMetrics }: { pointsMetrics: Array<{ title: string; value: number | string; icon: ReactNode; bgColor: string; iconBgColor: string; }> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {pointsMetrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={String(metric.value)}
          icon={metric.icon}
          bgColor={metric.bgColor}
          iconBgColor={metric.iconBgColor}
        />
      ))}
    </div>
  );
}

export default function ViewPointsReport() {
  const { data: pointSummary, isPending, isError, error, refetch } = useGetReportPointSummary("weekly");


  const pointSummaryData = pointSummary?.data?.data;
  // Mock data for points report metrics
  const pointsMetrics = [
    {
      title: "Total Points Earned",
      value: pointSummaryData?.totalPointsEarned || 0,
      // change: "+55% Up from yesterday",
      //  changeType: "positive" as const,
      icon: <Users className="h-6 w-6 text-white" />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Total Points Redeemed",
      value: pointSummaryData?.totalPointsRedeemed || 0,
      icon: <Gift className="h-6 w-6 text-white" />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Redemption Rate",
      value: pointSummaryData?.redemptionRate || 0,
      icon: <ShoppingBag className="h-6 w-6 text-white" />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Avg Point Value",
      value: pointSummaryData?.avgPointValue || 0,
      icon: <Star className="h-6 w-6 text-white" />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-7xl mx-auto">

        {/* Metrics Cards Grid */}
        {isPending ? (
          <PointsSkeletonGrid />
        ) : isError ? (
          <ErrorState
            title="Error Loading Points Summary"
            message={error?.message || "Failed to load points summary."}
            onRetry={refetch}
          />
        ) : (
          <PointsMetricsGrid pointsMetrics={pointsMetrics} />
        )}

        <PointsFlow />

      </div>
    </div>
  );
}
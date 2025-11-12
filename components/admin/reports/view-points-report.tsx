'use client';

import { CardSkeletonGrid } from "@/components/common/card-skeleton";
import { MetricCard } from "@/components/common/metric-card";
import { ErrorState } from "@/components/ui/error-state";
import useGetReportPointSummary from "@/hooks/query/useGetReportPointSummary";
import { Gift, ShoppingBag, Star, Users } from "lucide-react";
import type { ReactNode } from "react";
import PointsFlow from "./points-flow";
import ViewMerchantBudgetUsage from "./view-merchant-budget-usage";



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

  // Render content based on loading/error state
  const renderMetricsContent = () => {
    if (isPending) {
      return <CardSkeletonGrid />;
    }

    if (isError) {
      return (
        <ErrorState
          title="Error Loading Points Summary"
          message={error?.message || "Failed to load points summary."}
          onRetry={refetch}
        />
      );
    }

    return <PointsMetricsGrid pointsMetrics={pointsMetrics} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-7xl mx-auto">
        {/* Metrics Cards Grid */}
        {renderMetricsContent()}

        <ViewMerchantBudgetUsage />

        <PointsFlow />
      </div>
    </div>
  );
}
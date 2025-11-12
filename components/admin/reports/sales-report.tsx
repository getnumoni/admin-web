'use client';

import { CardSkeletonGrid } from "@/components/common/card-skeleton";
import { MetricCard } from "@/components/common/metric-card";
import { ErrorState } from "@/components/ui/error-state";
import useGetReportSalesDashboard from "@/hooks/query/useGetReportSalesDashboard";
import { BarChart3, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import { ReactNode } from "react";
import ChurnTrend from "./churn-trend";
import DealPerformance from "./deal-performance";


function SalesMetricsGrid({ salesMetrics }: { salesMetrics: Array<{ title: string; value: number | string; icon: ReactNode; bgColor: string; iconBgColor: string; }> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {salesMetrics.map((metric, index) => (
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

export default function SalesReport() {
  const { data: salesDashboard, isPending, isError, error, refetch } = useGetReportSalesDashboard();

  const salesDashboardData = salesDashboard?.data?.data;
  // Mock data for sales report metrics
  const salesMetrics = [
    {
      title: "Total Revenue",
      value: `₦ ${salesDashboardData?.totalRevenue || 0}`,
      // change: "+12.5% Up from last month",
      // changeType: "positive" as const,
      icon: <DollarSign className="h-6 w-6 text-white" />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Total Transactions",
      value: `${salesDashboardData?.totalTransactions || 0}`,
      // change: "+8.2% Up from last month",
      // changeType: "positive" as const,
      icon: <ShoppingCart className="h-6 w-6 text-white" />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Average Order Value",
      value: `₦ ${salesDashboardData?.averageOrderValue || 0}`,
      // change: "-3.1% Down from last month",
      // changeType: "negative" as const,
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      bgColor: "bg-white",
      iconBgColor: "bg-black"
    },
    {
      title: "Conversion Rate",
      value: `${salesDashboardData?.conversionRate || 0}%`,
      // change: "+0.5% Up from last month",
      // changeType: "positive" as const,
      icon: <BarChart3 className="h-6 w-6 text-white" />,
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
          title="Error Loading Sales Metrics"
          message={error?.message || "Failed to load sales metrics."}
          onRetry={refetch}
          retryText="Retry"
        />
      );
    }

    return <SalesMetricsGrid salesMetrics={salesMetrics} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-7xl mx-auto">
        {/* Metrics Cards Grid */}
        {renderMetricsContent()}

        <ChurnTrend />
        <DealPerformance />
      </div>
    </div>
  );
}
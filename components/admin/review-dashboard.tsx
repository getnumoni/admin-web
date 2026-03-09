'use client'
import useGetRevenueDashboard from "@/hooks/query/useGetRevenueDashboard";
import { extractErrorMessage, formatValue } from "@/lib/helper";
import { Store, Wallet } from "lucide-react";
import { MetricCard } from "../common/metric-card";
import { Skeleton } from "../ui/skeleton";

export function RevenueRecord() {
  const { data, isPending, error } = useGetRevenueDashboard();

  const revenueData = data?.data?.data

  const metrics = [
    {
      title: 'Total Revenue Earning',
      value: formatValue(revenueData?.totalTransactionEarnings, true),
      changeType: 'positive' as const,
      icon: <Wallet className="h-6 w-6 text-[#1A4B8F]" />, // Updated to standard wallet color
      bgColor: 'bg-[#F0F5FD]', // Softer lighter blue
      iconBgColor: 'bg-[#E3EAFD]' // Lighter blue for inner icon bg
    },
    {
      title: 'Total Service Fees',
      value: formatValue(revenueData?.totalServiceFees, true),
      changeType: 'positive' as const,
      icon: <Store className="h-6 w-6 text-[#2E7D32]" />, // Updated to standard green color
      bgColor: 'bg-[#F5FDF4]', // Softer lighter green
      iconBgColor: 'bg-[#DFFDDB]' // Lighter green for inner icon bg
    },
    {
      title: 'Total NuMoni Points Top Up',
      value: formatValue(revenueData?.totalCommission),
      changeType: 'positive' as const,
      icon: <Wallet className="h-6 w-6 text-[#F57C00]" />, // Updated to orange color for Top Up
      bgColor: 'bg-[#FFF8F0]', // Softer lighter orange
      iconBgColor: 'bg-[#FFECC9]' // Lighter orange for inner icon bg
    },
  ];


  return (
    <main className="bg-white rounded-xl p-6  border border-gray-100 my-5">
      <h1 className="font-black text-xl md:text-2xl">Revenue Record</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
        {metrics.map((metric) => {
          if (isPending) {
            return (
              <div key={metric.title} className="bg-white rounded-xl p-4 border border-gray-100">
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-8 w-32" />
              </div>
            );
          }

          return (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={error ? extractErrorMessage(error) : metric.value}
              // change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              bgColor={metric.bgColor}
              iconBgColor={metric.iconBgColor}

            />
          );
        })}
      </div>
    </main>
  )
}
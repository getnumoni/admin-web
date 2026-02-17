'use client'

import { MetricCard } from "@/components/common/metric-card";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import useGetWalletBalance from "@/hooks/query/useGetWalletBalance";
import { extractErrorMessage, formatCurrency, formatValue } from "@/lib/helper";
import { Banknote, TrendingUp } from "lucide-react";

export default function WalletDashboard() {
  const { data, isPending, error, isError, refetch } = useGetWalletBalance();

  const walletBalance = data?.data?.data?.operatorBalances[0]?.balance
  const totalOperationalBalance = data?.data?.data?.totalOperatorBalance

  const purchaseMetrics = [
    {
      title: 'Operator Balance',
      value: formatCurrency(totalOperationalBalance ?? 0),
      icon: <Banknote className="h-6 w-6 text-gray-200" />,
      bgColor: 'bg-[#E3EAFD]',
      iconBgColor: 'bg-black'
    },
    {
      title: 'Wallet Balance',
      value: formatValue(walletBalance, true) ?? 0,
      icon: <TrendingUp className="h-6 w-6 text-gray-200" />,
      bgColor: 'bg-[#DFFDDB]',
      iconBgColor: 'bg-black'
    },

  ]

  console.log(data?.data)
  return (
    <section>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Wallet Balance Overview</h1>
        {/* <p className="text-gray-600">Overview of your platform metrics and performance</p> */}
      </div>

      {/* Purchase Metrics */}
      {isError ? (
        <ErrorState
          title="Error Loading Wallet Balance"
          message={extractErrorMessage(error) || "Failed to load purchase overview. Please try again."}
          onRetry={refetch}
          retryText="Retry"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {purchaseMetrics.map((metric, index) => {
            if (isPending) {
              return (
                <div key={index} className="bg-white rounded-xl p-4 border border-gray-100">
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-8 w-32" />
                </div>
              );
            }

            return (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                // change={metric.change}
                icon={metric.icon}
                bgColor={metric.bgColor}
                iconBgColor={metric.iconBgColor ?? 'bg-black'}
              />
            );
          })}
        </div>
      )}


    </section>
  )
}
'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useGetReportMerchantUsage from "@/hooks/query/useGetReportMerchantUsage";
import { Info } from "lucide-react";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type MerchantUsageItem = {
  purchaseCount: number;
  merchantId: string;
  budgetCap: number;
  purchaseRate: number; // 0..1
};

export default function ViewMerchantBudgetUsage() {
  const [period, setPeriod] = useState<string>("weekly");
  const { data: merchantUsage, isPending, isError, error, refetch } = useGetReportMerchantUsage(period);

  const raw: MerchantUsageItem[] | undefined = merchantUsage?.data?.data as MerchantUsageItem[] | undefined;

  const chartData = useMemo(() => {
    return (raw ?? []).map((m) => ({
      label: m.merchantId,
      value: Number((m.purchaseRate * 100).toFixed(2)), // percentage
    }));
  }, [raw]);

  const chartConfig: ChartConfig = {
    users: { label: "Purchase Rate", color: "#10b981" },
  };

  let body: React.ReactNode;
  if (isPending) {
    body = <LoadingSpinner message="Loading merchant usage..." />;
  } else if (isError) {
    body = (
      <ErrorState
        title="Error Loading Merchant Budget Usage"
        message={(error as { message?: string })?.message || "Failed to load merchant usage."}
        onRetry={refetch}
      />
    );
  } else {
    body = (
      <div className="h-64">
        <ChartContainer config={chartConfig} className="h-full">
          <BarChart data={chartData} margin={{ top: 20 }} barCategoryGap={32} barGap={12}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              className="text-xs text-gray-500"
              tickFormatter={(value: string) => (value?.length > 6 ? `${value.slice(0, 6)}…` : value)}
            />
            <YAxis axisLine={false} tickLine={false} className="text-xs text-gray-500" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="var(--color-users)" radius={[4, 4, 0, 0]} barSize={22} />
          </BarChart>
        </ChartContainer>
      </div>
    );
  }

  return (
    <Card className="flex flex-col shadow-none border-none w-full my-8">
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <span>Merchant Budget Usage</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 text-theme-dark-green" />
            </TooltipTrigger>
            <TooltipContent className="max-w-sm bg-white shadow-xs border border-gray-50 text-black flex items-center gap-5">
              <Info className="w-8 h-8 text-theme-dark-green" />
              <p className="text-xs">Shows how much of a merchant’s allocated budget has been spent compared to the total available. </p>
            </TooltipContent>
          </Tooltip>
        </CardTitle>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="h-8 w-28">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1 pb-0">{body}</CardContent>
      <CardFooter className="flex flex-row items-center gap-8 pt-2 text-sm">
        <div className="flex items-center gap-3">
          <span className="h-6 w-[3px] rounded" style={{ backgroundColor: '#10b981' }} />
          <span className="text-gray-900">Purchase Rate</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="h-6 w-[3px] rounded" style={{ backgroundColor: '#94a3b8' }} />
          <span className="text-gray-900">Budget Cap</span>
        </div>
      </CardFooter>
    </Card>
  );
}
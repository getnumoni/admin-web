'use client';

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface ChartDataItem {
  label: string;
  value: number;
}

interface MerchantUsageChartProps {
  data: ChartDataItem[];
}

const chartConfig: ChartConfig = {
  users: { label: "Purchase Rate", color: "#10b981" },
};

export function MerchantUsageChart({ data }: MerchantUsageChartProps) {
  return (
    <div className="h-64">
      <ChartContainer config={chartConfig} className="h-full">
        <BarChart data={data} margin={{ top: 20 }} barCategoryGap={32} barGap={12}>
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


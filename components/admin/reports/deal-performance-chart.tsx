'use client';

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type DealPerformanceItem = {
  purchases: number;
  week: number;
  totalDeals: number;
};

interface DealPerformanceChartProps {
  data: DealPerformanceItem[];
}

const chartConfig = {
  purchases: {
    label: "Purchases",
    color: "var(--chart-1)",
  },
  totalDeals: {
    label: "Total Deals",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function DealPerformanceChart({ data }: DealPerformanceChartProps) {
  return (
    <div className="h-64">
      <ChartContainer config={chartConfig} className="h-full">
        <BarChart data={data} margin={{ top: 20 }} barCategoryGap={32} barGap={12}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" vertical={false} />
          <XAxis
            dataKey="week"
            axisLine={false}
            tickLine={false}
            className="text-xs text-gray-500"
            tickMargin={10}
            tickFormatter={(value) => `Week ${value}`}
          />
          <YAxis axisLine={false} tickLine={false} className="text-xs text-gray-500" />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar dataKey="purchases" fill="var(--color-purchases)" radius={4} />
          <Bar dataKey="totalDeals" fill="var(--color-totalDeals)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}


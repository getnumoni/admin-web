'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { ErrorState } from "@/components/ui/error-state";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useGetReportPointFlow from "@/hooks/query/useGetReportPointFlow";
import { useMemo, useState, type ReactElement } from "react";
import { Label, Pie, PieChart } from "recharts";

function PointsFlowHeader({ period, onChange }: { period: string; onChange: (v: string) => void }) {
  return (
    <CardHeader className="flex flex-row items-center justify-between pb-0">
      <CardTitle className="text-base font-semibold">Points Flow Distribution</CardTitle>
      <Select value={period} onValueChange={onChange}>
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
  );
}

function PointsFlowLoading() {
  return (
    <CardContent className="flex-1 pb-0">
      <LoadingSpinner message="Loading points flow..." />
    </CardContent>
  );
}

function PointsFlowError({ error, onRetry }: { error?: unknown; onRetry: () => void }) {
  return (
    <CardContent className="flex-1 pb-0">
      <ErrorState
        title="Error Loading Points Flow"
        message={(error as { message?: string })?.message || "Failed to load points flow."}
        onRetry={onRetry}
      />
    </CardContent>
  );
}

function PointsFlowChart({ chartData, chartConfig, total }: { chartData: Array<{ key: string; label: string; value: number; fill: string }>; chartConfig: ChartConfig; total: number; }) {
  return (
    <CardContent className="flex-1 pb-0">
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie data={chartData} dataKey="value" nameKey="label" innerRadius={60} strokeWidth={5}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                        {total.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                        Total Points
                      </tspan>
                    </text>
                  );
                }
                return null;
              }}
            />
            <Label position="center" value={total.toLocaleString()} className="fill-foreground text-2xl font-bold" />
          </Pie>
        </PieChart>
      </ChartContainer>
    </CardContent>
  );
}

function PointsFlowLegend({ chartData, colorByKey }: { chartData: Array<{ key: string; label: string }>; colorByKey: Record<string, string> }) {
  return (
    <CardFooter className="flex-col gap-2 text-sm">
      <div className="flex flex-wrap items-center gap-6">
        {chartData.map((item) => (
          <div key={item.key} className="flex items-center gap-3">
            <span
              className="h-6 w-[3px] rounded"
              style={{ backgroundColor: colorByKey[item.key] || "#e5e7eb" }}
            />
            <span className="text-gray-900">{item.label}</span>
          </div>
        ))}
      </div>
    </CardFooter>
  );
}

export default function PointsFlow() {
  const [period, setPeriod] = useState<string>("weekly");
  const { data: pointFlow, isPending, isError, error, refetch } = useGetReportPointFlow(period);
  const pointFlowData = pointFlow?.data?.data as
    | {
      percentage: { redeemed: number; earned: number };
      totalPoints: number;
      distribution: { redeemed: number; earned: number; expired: number; donated: number };
    }
    | undefined;

  const chartData = useMemo(
    () => [
      { key: "earned", label: "Earned Points", value: pointFlowData?.distribution?.earned ?? 0, fill: "var(--color-earned)" },
      { key: "redeemed", label: "Redeemed Points", value: pointFlowData?.distribution?.redeemed ?? 0, fill: "var(--color-redeemed)" },
      { key: "donated", label: "Donated Points", value: pointFlowData?.distribution?.donated ?? 0, fill: "var(--color-donated)" },
      { key: "expired", label: "Expired Points", value: pointFlowData?.distribution?.expired ?? 0, fill: "var(--color-expired)" },
    ],
    [pointFlowData]
  );

  const chartConfig: ChartConfig = {
    earned: { label: "Earned Points", color: "#10b981" },
    redeemed: { label: "Redeemed Points", color: "#3b82f6" },
    donated: { label: "Donated Points", color: "#f97316" },
    expired: { label: "Expired Points", color: "#f59e0b" },
  };

  const total = pointFlowData?.totalPoints ?? 0;
  const colorByKey: Record<string, string> = {
    earned: "#10b981",
    redeemed: "#3b82f6",
    donated: "#f97316",
    expired: "#f59e0b",
  };

  let content: ReactElement;
  if (isPending) {
    content = <PointsFlowLoading />;
  } else if (isError) {
    content = <PointsFlowError error={error} onRetry={refetch} />;
  } else {
    content = <PointsFlowChart chartData={chartData} chartConfig={chartConfig} total={total} />;
  }

  return (
    <Card className="flex flex-col shadow-none border-none lg:w-6/12 w-full">
      <PointsFlowHeader period={period} onChange={setPeriod} />
      {content}
      <PointsFlowLegend chartData={chartData} colorByKey={colorByKey} />
    </Card>
  );
}
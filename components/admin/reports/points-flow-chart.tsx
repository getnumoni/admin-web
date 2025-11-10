'use client';

import { CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";

interface PointsFlowChartProps {
  chartData: Array<{ key: string; label: string; value: number; fill: string }>;
  chartConfig: ChartConfig;
  total: number;
}

export function PointsFlowChart({ chartData, chartConfig, total }: PointsFlowChartProps) {
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


'use client';

import { CardFooter } from "@/components/ui/card";

interface PointsFlowLegendProps {
  chartData: Array<{ key: string; label: string }>;
  colorByKey: Record<string, string>;
}

export function PointsFlowLegend({ chartData, colorByKey }: PointsFlowLegendProps) {
  return (
    <CardFooter className="flex-col gap-2 text-sm">
      <div className="flex flex-wrap items-center gap-6">
        {chartData.map((item) => (
          <div key={item.key} className="flex items-center gap-3">
            <span
              className="h-6 w-[3px] rounded"
              style={{ backgroundColor: colorByKey[item.key] || "#e5e7eb" }}
            />
            <span className="text-gray-900 text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    </CardFooter>
  );
}


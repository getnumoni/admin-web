'use client';

import { Card } from "@/components/ui/card";
import useGetReportPointFlow from "@/hooks/query/useGetReportPointFlow";
import { useMemo, useState } from "react";
import { PointsFlowContent } from "./points-flow-content";
import { PointsFlowHeader } from "./points-flow-header";
import { PointsFlowLegend } from "./points-flow-legend";

type PointFlowData = {
  percentage: { redeemed: number; earned: number };
  totalPoints: number;
  distribution: { redeemed: number; earned: number; expired: number; donated: number };
};

export default function PointsFlow() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  const { data: pointFlow, isPending, isError, error, refetch } = useGetReportPointFlow(startDate, endDate);

  const pointFlowData = pointFlow?.data?.data as PointFlowData | undefined;

  const handleSearch = () => {
    if (startDate && endDate) {
      setHasAttemptedFetch(true);
      refetch();
    }
  };

  // Prepare chart data for legend (always show all categories)
  const chartDataForLegend = useMemo(
    () => [
      { key: "earned", label: "Earned Points" },
      { key: "redeemed", label: "Redeemed Points" },
      { key: "donated", label: "Donated Points" },
      { key: "expired", label: "Expired Points" },
    ],
    []
  );

  const colorByKey: Record<string, string> = {
    earned: "#10b981",
    redeemed: "#3b82f6",
    donated: "#f97316",
    expired: "#f59e0b",
  };

  return (
    <Card className="flex flex-col shadow-none border-none lg:w-6/12 w-full">
      <PointsFlowHeader
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onSearch={handleSearch}
      />
      <PointsFlowContent
        hasAttemptedFetch={hasAttemptedFetch}
        isPending={isPending}
        isError={isError}
        error={error}
        pointFlowData={pointFlowData}
        onRetry={refetch}
      />
      <PointsFlowLegend chartData={chartDataForLegend} colorByKey={colorByKey} />
    </Card>
  );
}
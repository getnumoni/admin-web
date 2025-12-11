'use client';

import { Card } from "@/components/ui/card";
import useGetReportPointFlow from "@/hooks/query/useGetReportPointFlow";
import { getDefaultReportDates } from "@/lib/helper";
import { PointFlowData } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";
import { PointsFlowContent } from "./points-flow-content";
import { PointsFlowHeader } from "./points-flow-header";
import { PointsFlowLegend } from "./points-flow-legend";


export default function PointsFlow() {
  const defaultDates = getDefaultReportDates();
  const [startDate, setStartDate] = useState<Date | null>(defaultDates.start);
  const [endDate, setEndDate] = useState<Date | null>(defaultDates.end);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(true);

  const { data: pointFlow, isPending, isError, error, refetch } = useGetReportPointFlow(startDate, endDate);

  const pointFlowData = pointFlow?.data?.data as PointFlowData | undefined;

  // Trigger fetch on mount with default dates
  useEffect(() => {
    if (startDate && endDate) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

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
      { key: 'redeemedPercentage', label: 'Redeemed Percentage' },
      { key: 'earnedPercentage', label: 'Earned Percentage' },
    ],
    []
  );

  const colorByKey: Record<string, string> = {
    earned: "#10b981",
    redeemed: "#3b82f6",
    donated: "#f97316",
    expired: "#f59e0b",
    redeemedPercentage: "#8b5cf6",
    earnedPercentage: "#ec4899",
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
'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useGetDealsPerformance from "@/hooks/query/useGetDealsPerformance";
import { getDefaultReportDates } from "@/lib/helper";
import { useEffect, useState } from "react";
import { DealPerformanceContent } from "./deal-performance-content";
import { ReportHeader } from "./report-header";

type DealPerformanceItem = {
  purchases: number;
  week: number;
  totalDeals: number;
};

export default function DealPerformance() {
  const defaultDates = getDefaultReportDates();

  const [startDate, setStartDate] = useState<Date | null>(defaultDates.start);
  const [endDate, setEndDate] = useState<Date | null>(defaultDates.end);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(true);

  const { data: dealsPerformance, refetch, isPending, isError, error } = useGetDealsPerformance(startDate, endDate);

  const rawData: DealPerformanceItem[] | undefined = dealsPerformance?.data?.data as DealPerformanceItem[] | undefined;

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

  return (
    <Card className="flex flex-col shadow-none border-none w-full my-8">
      <CardHeader className="pb-0">
        <ReportHeader
          title="Deal Performance"
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onSearch={handleSearch}
          description="Measures how well a deal attracts customers and the percentage of those who complete a purchase."
        />
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <DealPerformanceContent
          hasAttemptedFetch={hasAttemptedFetch}
          isPending={isPending}
          isError={isError}
          error={error}
          rawData={rawData}
          onRetry={refetch}
        />
      </CardContent>
    </Card>
  );
}
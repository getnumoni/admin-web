'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useGetChurnRateTrend from "@/hooks/query/useGetChurnRateTrend";
import { useState } from "react";
import { ReportHeader } from "./report-header";

export default function ChurnTrend() {

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  const { data: churnRateTrend, refetch, isPending, isError, error } = useGetChurnRateTrend(startDate, endDate);

  console.log(churnRateTrend);



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
          title="Churn Rate Trend"
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onSearch={handleSearch}
          description="Tracks how customer cancellation or drop-off rates change over time, showing if retention is improving or declining."
        />
      </CardHeader>
      <CardContent className="flex-1 pb-0"></CardContent>


    </Card>
  );
}
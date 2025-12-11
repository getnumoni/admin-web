'use client';

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import useGetReportMerchantUsage from "@/hooks/query/useGetReportMerchantUsage";
import { getDefaultReportDates } from "@/lib/helper";
import { useEffect, useState } from "react";
import { MerchantUsageContent } from "./merchant-usage-content";
import { MerchantUsageLegend } from "./merchant-usage-legend";
import { ReportHeader } from "./report-header";

type MerchantUsageItem = {
  purchaseCount: number;
  merchantId: string;
  budgetCap: number;
  purchaseRate: number; // 0..1
};

export default function ViewMerchantBudgetUsage() {
  const defaultDates = getDefaultReportDates();

  const [startDate, setStartDate] = useState<Date | null>(defaultDates.start);
  const [endDate, setEndDate] = useState<Date | null>(defaultDates.end);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(true);

  const { data: merchantUsage, isPending, isError, error, refetch } = useGetReportMerchantUsage(startDate, endDate);

  const rawData: MerchantUsageItem[] | undefined = merchantUsage?.data?.data as MerchantUsageItem[] | undefined;

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
          title="Merchant Budget Usage"
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onSearch={handleSearch}
          description="Shows how much of a merchant&apos;s allocated budget has been spent compared to the total available."
        />
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <MerchantUsageContent
          hasAttemptedFetch={hasAttemptedFetch}
          isPending={isPending}
          isError={isError}
          error={error}
          rawData={rawData}
          onRetry={refetch}
        />
      </CardContent>
      <CardFooter>
        <MerchantUsageLegend />
      </CardFooter>
    </Card>
  );
}
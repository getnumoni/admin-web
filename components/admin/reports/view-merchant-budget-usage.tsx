'use client';

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import useGetReportMerchantUsage from "@/hooks/query/useGetReportMerchantUsage";
import { useState } from "react";
import { MerchantUsageContent } from "./merchant-usage-content";
import { MerchantUsageHeader } from "./merchant-usage-header";
import { MerchantUsageLegend } from "./merchant-usage-legend";

type MerchantUsageItem = {
  purchaseCount: number;
  merchantId: string;
  budgetCap: number;
  purchaseRate: number; // 0..1
};

export default function ViewMerchantBudgetUsage() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  const { data: merchantUsage, isPending, isError, error, refetch } = useGetReportMerchantUsage(startDate, endDate);

  const rawData: MerchantUsageItem[] | undefined = merchantUsage?.data?.data as MerchantUsageItem[] | undefined;

  const handleSearch = () => {
    if (startDate && endDate) {
      setHasAttemptedFetch(true);
      refetch();
    }
  };

  return (
    <Card className="flex flex-col shadow-none border-none w-full my-8">
      <CardHeader className="pb-0">
        <MerchantUsageHeader
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onSearch={handleSearch}
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
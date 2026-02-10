'use client'

import { CardSkeletonGrid } from "@/components/common/card-skeleton";
import { MetricCard } from "@/components/common/metric-card";
import { DateRangeSelector } from "@/components/ui/date-range-selector";
import { ErrorState } from "@/components/ui/error-state";
import useGetCustomerCount from "@/hooks/query/useGetCustomerCount";
import { extractErrorMessage } from "@/lib/helper";
import { DateRangeOption } from "@/lib/types";
import { User } from "lucide-react";
import { useMemo, useState } from "react";

export default function CustomerCard() {
  const [dateRangeOption, setDateRangeOption] = useState<DateRangeOption>('Today');
  const [customStartDate, setCustomStartDate] = useState<Date | undefined>(undefined);
  const [customEndDate, setCustomEndDate] = useState<Date | undefined>(undefined);

  // Format dates for API (dd-mm-yyyy format)
  const { startDate, endDate } = useMemo(() => {
    const formatDate = (date: Date): string => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    if (dateRangeOption === 'Custom Range') {
      if (customStartDate && customEndDate) {
        return {
          startDate: formatDate(customStartDate),
          endDate: formatDate(customEndDate),
        };
      }
      return { startDate: undefined, endDate: undefined };
    }

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    switch (dateRangeOption) {
      case 'Today':
        return {
          startDate: formatDate(today),
          endDate: formatDate(today),
        };
      case 'Yesterday':
        return {
          startDate: formatDate(yesterday),
          endDate: formatDate(yesterday),
        };
      case 'This Week': {
        const startOfWeek = new Date(today);
        const day = startOfWeek.getDay();
        const diff = startOfWeek.getDate() - day;
        startOfWeek.setDate(diff);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        return {
          startDate: formatDate(startOfWeek),
          endDate: formatDate(endOfWeek),
        };
      }
      case 'This Month': {
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return {
          startDate: formatDate(startOfMonth),
          endDate: formatDate(endOfMonth),
        };
      }
      case 'Last Month': {
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const startOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
        const endOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);
        return {
          startDate: formatDate(startOfLastMonth),
          endDate: formatDate(endOfLastMonth),
        };
      }
      default:
        return { startDate: undefined, endDate: undefined };
    }
  }, [dateRangeOption, customStartDate, customEndDate]);

  const { data, isPending, error, isError, refetch } = useGetCustomerCount({
    startDate,
    endDate,
  });

  const handleDateRangeDatesChange = (start: Date | undefined, end: Date | undefined) => {
    setCustomStartDate(start);
    setCustomEndDate(end);
  };

  if (isPending) return <CardSkeletonGrid />

  if (isError) return <ErrorState title="Failed to load customer count" onRetry={refetch} message={extractErrorMessage(error)} />

  const customerCount = data?.data?.data;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Customer Statistics</h2>
        <DateRangeSelector
          value={dateRangeOption}
          onValueChange={setDateRangeOption}
          onDatesChange={handleDateRangeDatesChange}
          showCustomRange={true}
          className="w-64"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          title="Total Customers"
          value={(customerCount?.totalCustomers || 0).toString()}
          bgColor="bg-white"
          iconBgColor="bg-green-50"
          icon={<User className="h-5 w-5 text-theme-dark-green" />}
        />
        <MetricCard
          title="Period Number of Customers"
          value={(customerCount?.filteredCustomers || 0).toString()}
          bgColor="bg-white"
          iconBgColor="bg-green-50"
          icon={<User className="h-5 w-5 text-theme-dark-green" />}
        />
      </div>
    </div>
  );
} 
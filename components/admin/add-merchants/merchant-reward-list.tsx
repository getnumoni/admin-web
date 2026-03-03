'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DateRangeSelector } from "@/components/ui/date-range-selector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import useGetRewardListByMerchantId from "@/hooks/query/useGetMerchantRewardList";
import { getStatusColor, getStatusText } from "@/lib/helper";
import { DateRangeOption, Reward } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Eye, MoreHorizontal } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import MerchantRewardDetailsSheet from "./merchant-reward-details-sheet";


export default function MerchantRewardList({ merchantId }: Readonly<{ merchantId: string }>) {
  // State
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [dateRangeOption, setDateRangeOption] = useState<DateRangeOption>('All Time');
  const [dates, setDates] = useState<{ from?: string, to?: string }>({});

  // Sheet state
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  // Handlers
  const handleDateChange = useCallback((start?: Date, end?: Date) => {
    setDates({
      from: start ? format(start, "dd-MM-yyyy") : undefined,
      to: end ? format(end, "dd-MM-yyyy") : undefined
    });
    setPageIndex(0); // Reset page on filter change
  }, []);

  const handleViewRules = useCallback((reward: Reward) => {
    setSelectedReward(reward);
    setIsSheetOpen(true);
  }, []);

  // Hook
  const { data, isPending } = useGetRewardListByMerchantId({
    merchantId,
    fromDate: dates.from,
    toDate: dates.to,
    page: pageIndex,
    size: pageSize
  });

  // Extract Data
  const responseData = data?.data;
  const rewards = useMemo(() => {
    if (!responseData) return [];
    if (Array.isArray(responseData)) return responseData;
    // Handle potential paginated response structure
    return responseData.content || responseData.data || [];
  }, [responseData]);

  // Determine pagination values
  const totalElements = responseData?.totalElements || responseData?.total || rewards.length;
  // If API returns all items (no server pagination), calculate pages client-side
  const isClientSidePagination = Array.isArray(responseData) || (!responseData?.totalPages && responseData?.length > 0);
  const totalPages = responseData?.totalPages || Math.ceil(totalElements / pageSize) || 1;

  // Slice data for table if client-side pagination is needed
  const tableData = useMemo(() => {
    if (isClientSidePagination && rewards.length > pageSize) {
      const start = pageIndex * pageSize;
      const end = start + pageSize;
      return rewards.slice(start, end);
    }
    return rewards;
  }, [rewards, isClientSidePagination, pageIndex, pageSize]);

  const columns = useMemo<ColumnDef<Reward>[]>(() => [
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue<string>("status");

        return (
          <Badge className={getStatusColor(status)}>
            {getStatusText(status)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "rewardType",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue<string>("rewardType");
        return <div className="text-xs font-medium">{type.replace("_", " ")}</div>;
      }
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) => {
        const date = row.getValue<string>("startDate");
        return date ? <div className="whitespace-nowrap">{format(new Date(date), "MMM dd, yyyy")}</div> : "-";
      },
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => {
        const date = row.getValue<string>("endDate");
        return date ? <div className="whitespace-nowrap">{format(new Date(date), "MMM dd, yyyy")}</div> : "-";
      },
    },
    {
      accessorKey: "rewardCap",
      header: "Cap",
      cell: ({ row }) => {
        const amount = row.getValue<number>("rewardCap");
        return <div className="font-medium text-right">{new Intl.NumberFormat('en-US').format(amount)}</div>;
      },
    },
    {
      accessorKey: "rewardDistributed",
      header: "Distributed",
      cell: ({ row }) => {
        const amount = row.getValue<number>("rewardDistributed");
        return <div className="text-right">{new Intl.NumberFormat('en-US').format(amount)}</div>;
      },
    },
    {
      accessorKey: "availableRewards",
      header: "Available",
      cell: ({ row }) => {
        const amount = row.getValue<number>("availableRewards");
        return <div className="font-medium text-right">{new Intl.NumberFormat('en-US').format(amount)}</div>;
      },
    },
    {
      accessorKey: "pointExpirationDays",
      header: "Exp. Days",
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue<number>("pointExpirationDays")}</div>;
      },
    },
    {
      id: "actions",
      header: 'Actions',
      cell: ({ row }) => {
        const reward = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleViewRules(reward)}>
                <Eye className="mr-2 h-4 w-4" />
                View Rules
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ], [handleViewRules]);

  if (isPending && !data) {
    return <TableSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Merchant Reward List</h2>
        <div className="w-full sm:w-auto">
          <DateRangeSelector
            value={dateRangeOption}
            onValueChange={setDateRangeOption}
            onDatesChange={handleDateChange}
            showAllTime={true}
            showCustomRange={true}
            className="w-full sm:w-[240px]"
          />
        </div>
      </div>

      <div className="">
        <DataTable columns={columns} data={tableData} />
      </div>

      <DataTablePagination
        currentPage={pageIndex}
        totalPages={totalPages}
        totalRows={totalElements}
        pageSize={pageSize}
        onPageChange={setPageIndex}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPageIndex(0);
        }}
      />

      <MerchantRewardDetailsSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        reward={selectedReward}
      />
    </div>
  );
}
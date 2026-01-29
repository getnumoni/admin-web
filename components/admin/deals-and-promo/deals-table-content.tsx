"use client";

import { DataTable } from "@/components/ui/data-table";
import { DealData } from "@/lib/types";
import { dealsColumns } from "./deals-columns";

interface DealsTableContentProps {
  dealsData: DealData[] | undefined;
  searchTerm: string;
  statusFilter: string;
}

export default function DealsTableContent({
  dealsData,
  searchTerm,
  statusFilter,
}: Readonly<DealsTableContentProps>) {
  const hasDeals = dealsData && dealsData.length > 0;
  const hasFilters = searchTerm || statusFilter !== "all";

  if (!hasDeals) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg font-medium mb-2">
            {hasFilters
              ? "No deals found matching your criteria"
              : "No deals available"}
          </div>
          <div className="text-gray-400 text-sm">
            {hasFilters
              ? "Try adjusting your search or filter criteria"
              : "Deals will appear here once they are created"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <DataTable
        columns={dealsColumns}
        data={dealsData}
      />
    </div>
  );
}


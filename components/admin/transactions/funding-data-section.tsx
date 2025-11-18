"use client";

import { DataTable } from '@/components/ui/data-table';
import { EmptyState } from '@/components/ui/empty-state';
import { FundingData } from './funding-column';
import { ColumnDef } from '@tanstack/react-table';

interface FundingDataSectionProps {
  data: FundingData[];
  columns: ColumnDef<FundingData>[];
}

export default function FundingDataSection({ data, columns }: FundingDataSectionProps) {
  if (data.length === 0) {
    return (
      <div className="p-0">
        <EmptyState
          title="No Funding Records Found"
          description="No funding records match your current search or filter criteria. Try adjusting your search terms or filters."
        />
      </div>
    );
  }

  return (
    <div className="p-0">
      <DataTable columns={columns} data={data} />
    </div>
  );
}


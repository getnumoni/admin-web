"use client";

import { DataTable } from '@/components/ui/data-table';
import { EmptyState } from '@/components/ui/empty-state';
import { Payout } from '@/lib/types';

import { ColumnDef } from '@tanstack/react-table';

interface PayoutDataSectionProps {
  data: Payout[];
  columns: ColumnDef<Payout>[];
}

export default function PayoutDataSection({ data, columns }: PayoutDataSectionProps) {
  if (data.length === 0) {
    return (
      <div className="p-0">
        <EmptyState
          title="No Payout Records Found"
          description="No payout records match your current search or filter criteria. Try adjusting your search terms or filters."
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


"use client";

import { DataTable } from '@/components/ui/data-table';
import { EmptyState } from '@/components/ui/empty-state';
import { PurchaseData } from './purchases-columns';
import { ColumnDef } from '@tanstack/react-table';

interface PurchasesDataSectionProps {
  data: PurchaseData[];
  columns: ColumnDef<PurchaseData>[];
}

export default function PurchasesDataSection({ data, columns }: PurchasesDataSectionProps) {
  if (data.length === 0) {
    return (
      <div className="p-0">
        <EmptyState
          title="No Purchases Found"
          description="No purchases match your current search or filter criteria. Try adjusting your search terms or filters."
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


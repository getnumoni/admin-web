"use client";

import { DataTable } from '@/components/ui/data-table';
import { EmptyState } from '@/components/ui/empty-state';
import { ColumnDef } from '@tanstack/react-table';
import { SponsorDeal } from './sponsored-deal-columns';

interface SponsoredDealDataSectionProps {
  data: SponsorDeal[];
  columns: ColumnDef<SponsorDeal>[];
}

export default function SponsoredDealDataSection({ data, columns }: SponsoredDealDataSectionProps) {
  if (data.length === 0) {
    return (
      <div className="p-0">
        <EmptyState
          title="No Sponsored Deals"
          description="No sponsored deals found. Create a new sponsored deal to get started."
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


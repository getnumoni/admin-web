"use client";

import { DataTable } from '@/components/ui/data-table';
import { EmptyState } from '@/components/ui/empty-state';
import { CharityData } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';

interface CharityDataSectionProps {
  data: CharityData[];
  columns: ColumnDef<CharityData>[];
}

export default function CharityDataSection({ data, columns }: CharityDataSectionProps) {
  if (data.length === 0) {
    return (
      <div className="p-0">
        <EmptyState
          title="No Charity Organizations Found"
          description="No charity organizations match your current search or filter criteria. Try adjusting your search terms or filters."
          actionButton={
            <button className="flex items-center gap-2 bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer">
              <Plus className="h-5 w-5" />
              Add Charity Organization
            </button>
          }
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

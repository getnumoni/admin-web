"use client";

import SearchInput from '@/components/common/search-input';
import { Button } from '@/components/ui/button';
import { ChevronDown, Filter, RefreshCw } from 'lucide-react';

interface CharityHeaderSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onResetFilter: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  onExport: () => void;
}

export default function CharityHeaderSection({
  searchTerm,
  onSearchChange,
  onResetFilter,
  showFilters,
  onToggleFilters,
  onExport,
}: Readonly<CharityHeaderSectionProps>) {
  return (
    <div className="p-6 border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <SearchInput
          placeholder="Search Charity organization"
          value={searchTerm}
          onChange={onSearchChange}
        />

        <div className="flex items-center gap-3">
          <Button
            variant={"outline"}
            onClick={onToggleFilters}
            aria-pressed={showFilters}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${showFilters ? 'bg-gray-100 border-gray-400' : 'border-gray-300 hover:bg-gray-50'}`}
          >
            <Filter className="h-4 w-4" />
            Filter By
          </Button>

          <Button
            variant={"outline"} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Date
            <ChevronDown className="h-4 w-4" />
          </Button>

          <Button
            onClick={onResetFilter}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            Reset Filter
          </Button>

          <Button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 bg-theme-dark-green text-white rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}

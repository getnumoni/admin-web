"use client";

import SearchInput from '@/components/common/search-input';
import { ChevronDown, Filter, RefreshCw } from 'lucide-react';

interface CharityHeaderSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onResetFilter: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export default function CharityHeaderSection({
  searchTerm,
  onSearchChange,
  onResetFilter,
  showFilters,
  onToggleFilters
}: CharityHeaderSectionProps) {
  return (
    <div className="p-6 border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <SearchInput
          placeholder="Search Charity organization"
          value={searchTerm}
          onChange={onSearchChange}
        />

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleFilters}
            aria-pressed={showFilters}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${showFilters ? 'bg-gray-100 border-gray-400' : 'border-gray-300 hover:bg-gray-50'}`}
          >
            <Filter className="h-4 w-4" />
            Filter By
          </button>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Date
            <ChevronDown className="h-4 w-4" />
          </button>

          <button
            onClick={onResetFilter}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  );
}

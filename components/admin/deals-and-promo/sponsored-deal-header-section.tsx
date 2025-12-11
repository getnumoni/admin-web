"use client";

import SearchInput from '@/components/common/search-input';
import { RefreshCw } from 'lucide-react';

interface SponsoredDealHeaderSectionProps {
  dealId: string;
  onDealIdChange: (value: string) => void;
  onResetFilter: () => void;
}

export default function SponsoredDealHeaderSection({
  dealId,
  onDealIdChange,
  onResetFilter
}: SponsoredDealHeaderSectionProps) {
  return (
    <div className="p-6 border-gray-200">
      <div className="flex items-center justify-between">
        <div className="w-full lg:max-w-md">
          <SearchInput
            placeholder="Search by Deal ID"
            value={dealId}
            onChange={onDealIdChange}
          />
        </div>

        <div className="flex items-center gap-3">
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


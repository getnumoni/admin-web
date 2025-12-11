"use client";

import SearchInput from '@/components/common/search-input';
import { ChevronDown, Filter, RefreshCw } from 'lucide-react';

interface PayoutHeaderSectionProps {
  merchantId: string;
  onMerchantIdChange: (value: string) => void;
  settlementRefId: string;
  onSettlementRefIdChange: (value: string) => void;
  payonusRefId: string;
  onPayonusRefIdChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  onResetFilter: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export default function PayoutHeaderSection({
  merchantId,
  onMerchantIdChange,
  settlementRefId,
  onSettlementRefIdChange,
  payonusRefId,
  onPayonusRefIdChange,
  status,
  onStatusChange,
  onResetFilter,
  showFilters,
  onToggleFilters
}: PayoutHeaderSectionProps) {
  return (
    <div className="p-6 border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <SearchInput
          placeholder="Search by merchant ID"
          value={merchantId}
          onChange={onMerchantIdChange}
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

      {showFilters && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Settlement Reference ID
            </label>
            <input
              type="text"
              placeholder="Filter by settlement reference"
              value={settlementRefId}
              onChange={(e) => onSettlementRefIdChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payonus Reference ID
            </label>
            <input
              type="text"
              placeholder="Filter by payonus reference"
              value={payonusRefId}
              onChange={(e) => onPayonusRefIdChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="SUCCESSFUL">Successful</option>
              <option value="FAILURE">Failure</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}


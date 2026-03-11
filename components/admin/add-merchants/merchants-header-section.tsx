'use client';

import SearchInput from '@/components/common/search-input';
import { Button } from '@/components/ui/button';
import { DateRangeSelector } from '@/components/ui/date-range-selector';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRangeOption } from '@/lib/types';
import { RefreshCw } from 'lucide-react';

type FilterType = 'businessName' | 'merchantEmail' | 'merchantPhoneNo' | 'merchantId' | '';

interface MerchantsHeaderSectionProps {
  filterType: FilterType;
  onFilterTypeChange: (type: FilterType) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  dateRangeOption: DateRangeOption;
  onDateRangeChange: (option: DateRangeOption) => void;
  onDateRangeDatesChange: (start: Date | undefined, end: Date | undefined) => void;
  approvalStatus: string;
  onApprovalStatusChange: (status: string) => void;
  onResetFilter: () => void;
  onExportModalOpen: (open: boolean) => void;
  settlementType: string;
  onSettlementTypeChange: (type: string) => void;
}

export default function MerchantsHeaderSection({
  filterType,
  onFilterTypeChange,
  searchTerm,
  onSearchChange,
  searchPlaceholder,
  dateRangeOption,
  onDateRangeChange,
  onDateRangeDatesChange,
  approvalStatus,
  onApprovalStatusChange,
  onResetFilter,
  onExportModalOpen,
  settlementType,
  onSettlementTypeChange,
}: Readonly<MerchantsHeaderSectionProps>) {

  return (
    <div className="p-4 sm:p-6 border-b border-gray-200">
      <div className="flex flex-col gap-4">
        {/* First Row: Filter Type + Search Input */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Filter Type Dropdown */}
          <div className="w-full sm:w-48">
            <Select value={filterType} onValueChange={(value) => onFilterTypeChange(value as FilterType)}>
              <SelectTrigger className="w-full h-[42px] shadow-none">
                <SelectValue placeholder="Select filter type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="businessName">Business Name</SelectItem>
                <SelectItem value="merchantEmail">Merchant Email</SelectItem>
                <SelectItem value="merchantPhoneNo">Phone Number</SelectItem>
                <SelectItem value="merchantId">Merchant ID</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Input */}
          <div className="flex-1">
            <SearchInput
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={onSearchChange}
              disabled={!filterType}
            />
          </div>
        </div>

        {/* Second Row: Date Range + Approval Status + Settlement Type + Export + Reset */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 flex-wrap">
            {/* Date Range Selector */}
            <div className="w-full sm:w-64">
              <DateRangeSelector
                value={dateRangeOption}
                onValueChange={onDateRangeChange}
                onDatesChange={onDateRangeDatesChange}
                placeholder="Filter by created date range"
                showCustomRange={true}
              />
            </div>

            {/* Approval Status Dropdown */}
            <div className="w-full sm:w-48">
              <Select value={approvalStatus} onValueChange={onApprovalStatusChange}>
                <SelectTrigger className="w-full h-[42px] shadow-none">
                  <SelectValue placeholder="Approval Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VERIFIED">VERIFIED</SelectItem>
                  <SelectItem value="APPROVED">APPROVED</SelectItem>
                  <SelectItem value="REJECTED">REJECTED</SelectItem>
                  <SelectItem value="SUSPENDED">SUSPENDED</SelectItem>
                  <SelectItem value="UNVERIFIED">UNVERIFIED</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Settlement Type Dropdown */}
            <div className="w-full sm:w-48">
              <Select value={settlementType} onValueChange={onSettlementTypeChange}>
                <SelectTrigger className="w-full h-[42px] shadow-none">
                  <SelectValue placeholder="Settlement Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="instant">Instant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2 lg:mt-0">
            <Button
              className='bg-theme-dark-green py-2 h-[42px] flex-1 sm:flex-none'
              onClick={() => onExportModalOpen(true)}
            >
              Export
            </Button>

            <Button
              onClick={onResetFilter}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer h-[42px] flex-1 sm:flex-none"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Reset Filter</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

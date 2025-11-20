import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

interface PayoutFilters {
  merchantId: string;
  transactionId: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface UsePayoutFiltersReturn {
  filters: PayoutFilters;
  debouncedFilters: PayoutFilters;
  setFilter: (key: keyof PayoutFilters, value: string) => void;
  resetFilters: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  showFilters: boolean;
  toggleFilters: () => void;
}

const initialFilters: PayoutFilters = {
  merchantId: '',
  transactionId: '',
  startDate: '',
  endDate: '',
  status: '',
};

export function usePayoutFilters(): UsePayoutFiltersReturn {
  const [filters, setFilters] = useState<PayoutFilters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Debounce all filters
  const debouncedMerchantId = useDebounce(filters.merchantId);
  const debouncedTransactionId = useDebounce(filters.transactionId);
  const debouncedStartDate = useDebounce(filters.startDate);
  const debouncedEndDate = useDebounce(filters.endDate);
  const debouncedStatus = useDebounce(filters.status);

  const debouncedFilters: PayoutFilters = {
    merchantId: debouncedMerchantId,
    transactionId: debouncedTransactionId,
    startDate: debouncedStartDate,
    endDate: debouncedEndDate,
    status: debouncedStatus,
  };

  // Reset to first page when any debounced filter changes
  useEffect(() => {
    setCurrentPage(0);
  }, [
    debouncedMerchantId,
    debouncedTransactionId,
    debouncedStartDate,
    debouncedEndDate,
    debouncedStatus,
  ]);

  const setFilter = (key: keyof PayoutFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setCurrentPage(0);
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return {
    filters,
    debouncedFilters,
    setFilter,
    resetFilters,
    currentPage,
    setCurrentPage,
    showFilters,
    toggleFilters,
  };
}


import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

interface FundingFilters {
  sessionId: string;
  providerId: string;
  senderName: string;
  customerId: string;
  startDate: string;
  endDate: string;
}

interface UseFundingFiltersReturn {
  filters: FundingFilters;
  debouncedFilters: FundingFilters;
  setFilter: (key: keyof FundingFilters, value: string) => void;
  resetFilters: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  showFilters: boolean;
  toggleFilters: () => void;
}

const initialFilters: FundingFilters = {
  sessionId: '',
  providerId: '',
  senderName: '',
  customerId: '',
  startDate: '',
  endDate: '',
};

export function useFundingFilters(): UseFundingFiltersReturn {
  const [filters, setFilters] = useState<FundingFilters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Debounce all filters
  const debouncedSessionId = useDebounce(filters.sessionId);
  const debouncedProviderId = useDebounce(filters.providerId);
  const debouncedSenderName = useDebounce(filters.senderName);
  const debouncedCustomerId = useDebounce(filters.customerId);
  const debouncedStartDate = useDebounce(filters.startDate);
  const debouncedEndDate = useDebounce(filters.endDate);

  const debouncedFilters: FundingFilters = {
    sessionId: debouncedSessionId,
    providerId: debouncedProviderId,
    senderName: debouncedSenderName,
    customerId: debouncedCustomerId,
    startDate: debouncedStartDate,
    endDate: debouncedEndDate,
  };

  // Reset to first page when any debounced filter changes
  useEffect(() => {
    setCurrentPage(0);
  }, [
    debouncedSessionId,
    debouncedProviderId,
    debouncedSenderName,
    debouncedCustomerId,
    debouncedStartDate,
    debouncedEndDate,
  ]);

  const setFilter = (key: keyof FundingFilters, value: string) => {
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


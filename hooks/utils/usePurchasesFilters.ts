import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

interface PurchasesFilters {
  customerName: string;
  dealName: string;
  transactionId: string;
  dealId: string;
  purchaseId: string;
}

interface UsePurchasesFiltersReturn {
  filters: PurchasesFilters;
  debouncedFilters: PurchasesFilters;
  setFilter: (key: keyof PurchasesFilters, value: string) => void;
  resetFilters: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  showFilters: boolean;
  toggleFilters: () => void;
}

const initialFilters: PurchasesFilters = {
  customerName: '',
  dealName: '',
  transactionId: '',
  dealId: '',
  purchaseId: '',
};

export function usePurchasesFilters(): UsePurchasesFiltersReturn {
  const [filters, setFilters] = useState<PurchasesFilters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Debounce all filters
  const debouncedCustomerName = useDebounce(filters.customerName);
  const debouncedDealName = useDebounce(filters.dealName);
  const debouncedTransactionId = useDebounce(filters.transactionId);
  const debouncedDealId = useDebounce(filters.dealId);
  const debouncedPurchaseId = useDebounce(filters.purchaseId);

  const debouncedFilters: PurchasesFilters = {
    customerName: debouncedCustomerName,
    dealName: debouncedDealName,
    transactionId: debouncedTransactionId,
    dealId: debouncedDealId,
    purchaseId: debouncedPurchaseId,
  };

  // Reset to first page when any debounced filter changes
  useEffect(() => {
    setCurrentPage(0);
  }, [
    debouncedCustomerName,
    debouncedDealName,
    debouncedTransactionId,
    debouncedDealId,
    debouncedPurchaseId,
  ]);

  const setFilter = (key: keyof PurchasesFilters, value: string) => {
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


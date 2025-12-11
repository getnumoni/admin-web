'use client';

import LoadingSpinner from '@/components/ui/loading-spinner';
import useGetAllCharity from '@/hooks/query/useGetAllCharity';
import { CharityData } from '@/lib/types';
import { useEffect, useState } from 'react';
import { charityColumns } from './charity-columns';
import CharityDataSection from './charity-data-section';
import CharityErrorDisplay from './charity-error-display';
import CharityHeaderSection from './charity-header-section';
import CharityPagination from './charity-pagination';


export default function Charity() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // 0-based for server-side pagination
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPage = 20;

  // Debounce search term - wait 1 second after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // Use debouncedSearchTerm as charityName filter, pass page (0-based) and size
  const { data, isPending, error, isError, refetch } = useGetAllCharity({
    page: currentPage,
    size: itemsPerPage,
    charityName: debouncedSearchTerm.trim() || undefined, // Send debounced search term as charityName filter
  });



  // Extract charity data from API response
  const apiData = data?.data;
  const charities: CharityData[] = apiData?.charities || [];
  const totalRows = apiData?.totalRows || 0;
  const totalPages = apiData?.totalPages || 0;

  // Calculate pagination display values
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalRows);

  const handlePreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 0));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  const handleResetFilter = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
    setCurrentPage(0);
  };
  const handleToggleFilters = () => setShowFilters(!showFilters);

  // Reset to first page when debounced search term changes
  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearchTerm]);

  if (isPending) {
    return <LoadingSpinner message="Loading charity organizations..." />;
  }

  if (isError) {
    return <CharityErrorDisplay error={error?.message} onRetry={refetch} />;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <CharityHeaderSection
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onResetFilter={handleResetFilter}
        showFilters={showFilters}
        onToggleFilters={handleToggleFilters}
      />

      <CharityDataSection data={charities} columns={charityColumns} />

      {charities?.length > 0 && (
        <CharityPagination
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalRows}
          currentPage={currentPage + 1} // Display as 1-based for UI
          totalPages={totalPages}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      )}
    </div>
  );
}
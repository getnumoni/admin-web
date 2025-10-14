'use client';

import LoadingSpinner from '@/components/ui/loading-spinner';
import useGetAllCharity from '@/hooks/query/useGetAllCharity';
import { CharityData } from '@/lib/types';
import { useMemo, useState } from 'react';
import { charityColumns } from './charity-columns';
import CharityDataSection from './charity-data-section';
import CharityErrorDisplay from './charity-error-display';
import CharityHeaderSection from './charity-header-section';
import CharityPagination from './charity-pagination';


export default function Charity() {
  const { data, isPending, error, isError, refetch } = useGetAllCharity();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPage = 12;
  const charityData: CharityData[] = data?.data?.charities || [];

  const filteredCharity = useMemo(() => {
    if (!searchTerm.trim()) return charityData;

    const searchLower = searchTerm.toLowerCase().trim();
    return charityData.filter((charity: CharityData) =>
      charity.charityName.toLowerCase().includes(searchLower) ||
      charity.contactEmail.toLowerCase().includes(searchLower) ||
      charity.charityRegNumber.toLowerCase().includes(searchLower) ||
      charity.charityAddress.toLowerCase().includes(searchLower)
    );
  }, [searchTerm, charityData]);

  const totalPages = Math.ceil(filteredCharity.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCharity = filteredCharity.slice(startIndex, endIndex);

  const handlePreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handleResetFilter = () => setSearchTerm('');
  const handleToggleFilters = () => setShowFilters(!showFilters);

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

      <CharityDataSection data={currentCharity} columns={charityColumns} />

      {currentCharity.length > 0 && (
        <CharityPagination
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={filteredCharity.length}
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      )}
    </div>
  );
}
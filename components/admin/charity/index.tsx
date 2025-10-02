'use client';

import SearchInput from '@/components/common/search-input';
import { DataTable } from '@/components/ui/data-table';
import { charityData } from '@/data/charity-data';
import { ChevronDown, ChevronLeft, ChevronRight, Download, Filter, Info, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { charityColumns } from './charity-columns';

export default function Charity() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterBy, setFilterBy] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPage = 12;

  // Filter charity based on search term
  const filteredCharity = useMemo(() => {
    if (!searchTerm.trim()) return charityData;

    const searchLower = searchTerm.toLowerCase().trim();
    return charityData.filter(charity =>
      charity.name.toLowerCase().includes(searchLower) ||
      charity.email.toLowerCase().includes(searchLower) ||
      charity.charityId.toLowerCase().includes(searchLower) ||
      charity.address.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredCharity.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCharity = filteredCharity.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleResetFilter = () => {
    setFilterBy('');
    setDateFilter('');
    setSearchTerm('');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      {/* Header with Search and Filters */}
      <div className="p-6 border-gray-200">
        <div className="flex items-center justify-between mb-4">
          {/* Search Input */}
          <SearchInput
            placeholder="Search Charity organization"
            value={searchTerm}
            onChange={setSearchTerm}
          />

          {/* Filter Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filter By
            </button>

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Date
              <ChevronDown className="h-4 w-4" />
            </button>

            <button
              onClick={handleResetFilter}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Filter
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="p-0">
        {currentCharity.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 px-8">
            {/* Illustration */}
            <div className="w-32 h-32 mb-6 flex items-center justify-center">
              <div className="w-24 h-20 bg-gray-100 rounded-lg relative">
                {/* Box illustration */}
                <div className="absolute inset-2 border-2 border-gray-300 rounded"></div>
                <div className="absolute top-0 left-2 right-2 h-2 bg-gray-300 rounded-t"></div>
                {/* Dashed lines and stars */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 border-2 border-dashed border-green-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>

            {/* Text Content */}
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Charity Organizations Found</h3>
            <p className="text-gray-600 text-center max-w-md mb-8 leading-relaxed">
              No charity organizations match your current search or filter criteria. Try adjusting your search terms or filters.
            </p>

            {/* Add Charity Button */}
            <button className="flex items-center gap-2 bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer">
              <Plus className="h-5 w-5" />
              Add Charity Organization
            </button>
          </div>
        ) : (
          // Data Table
          <DataTable columns={charityColumns} data={currentCharity} />
        )}
      </div>

      {/* Pagination and Row Actions */}
      {currentCharity.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            {/* Row Count */}
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredCharity.length)} of {filteredCharity.length}
            </div>

            {/* Row Action Icons */}
            <div className="flex items-center gap-4">
              <button
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="Download"
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="Information"
              >
                <Info className="h-4 w-4" />
              </button>
              <button
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
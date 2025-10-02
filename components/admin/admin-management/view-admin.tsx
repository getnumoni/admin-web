'use client';

import SearchInput from '@/components/common/search-input';
import { DataTable } from '@/components/ui/data-table';
import { adminData } from '@/data/admin-data';
import { ChevronDown, ChevronLeft, ChevronRight, Download, Filter, Info, Plus, RefreshCw, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { adminColumns } from './admin-columns';

export default function ViewAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterBy, setFilterBy] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPage = 12;

  // Filter admins based on search term
  const filteredAdmins = useMemo(() => {
    if (!searchTerm.trim()) return adminData;

    const searchLower = searchTerm.toLowerCase().trim();
    return adminData.filter(admin =>
      admin.name.toLowerCase().includes(searchLower) ||
      admin.email.toLowerCase().includes(searchLower) ||
      admin.adminId.toLowerCase().includes(searchLower) ||
      admin.role.toLowerCase().includes(searchLower) ||
      admin.team.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAdmins = filteredAdmins.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleResetFilter = () => {
    setFilterBy('');
    setRoleFilter('');
    setTeamFilter('');
    setSearchTerm('');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      {/* Header with Search and Filters */}
      <div className="p-4 sm:p-6 border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          {/* Search Input */}
          <div className="w-full lg:max-w-md">
            <SearchInput
              placeholder="Search Admin Name"
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter By</span>
            </button>

            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="hidden sm:inline">Role</span>
              <span className="sm:hidden">Role</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="hidden sm:inline">Team</span>
              <span className="sm:hidden">Team</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            <button
              onClick={handleResetFilter}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset Filter</span>
              <span className="sm:hidden">Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="p-0">
        {currentAdmins.length === 0 ? (
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
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Admins Found</h3>
            <p className="text-gray-600 text-center max-w-md mb-8 leading-relaxed">
              No admins match your current search or filter criteria. Try adjusting your search terms or filters.
            </p>

            {/* Add Admin Button */}
            <Link href="/admin/admin-management/add-admin">
              <button className="flex items-center gap-2 bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer">
                <Plus className="h-5 w-5" />
                Add Admin
              </button>
            </Link>
          </div>
        ) : (
          // Data Table
          <DataTable columns={adminColumns} data={currentAdmins} />
        )}
      </div>

      {/* Pagination and Row Actions */}
      {currentAdmins.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Row Count */}
            <div className="text-sm text-gray-600 order-2 sm:order-1">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredAdmins.length)} of {filteredAdmins.length}
            </div>

            {/* Row Action Icons */}
            <div className="flex items-center gap-2 sm:gap-4 order-1 sm:order-2">
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
            <div className="flex items-center justify-center gap-2 order-3">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-3 py-1 text-sm text-gray-600 whitespace-nowrap">
                Page {currentPage} of {totalPages}
              </span>
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
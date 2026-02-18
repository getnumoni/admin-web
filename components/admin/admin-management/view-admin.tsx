'use client';

import SearchInput from '@/components/common/search-input';
import { DataTable } from '@/components/ui/data-table';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { ErrorState } from '@/components/ui/error-state';
import LoadingSpinner from '@/components/ui/loading-spinner';
import useGetAdminList from '@/hooks/query/useGetAdminList';
import { extractErrorMessage } from '@/lib/helper';
import { Admin } from '@/lib/types/admin';
import { ChevronDown, Filter, RefreshCw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { adminColumns } from './admin-columns';

export default function ViewAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const { data: adminList, isPending: isAdminListPending, error: isAdminError, isError: isAdminListError, refetch: refetchAdminList } = useGetAdminList();
  const admins = adminList?.data?.data?.pageData || [];
  // console.log(admins);
  // const [filterBy, setFilterBy] = useState('');
  // const [roleFilter, setRoleFilter] = useState('');
  // const [teamFilter, setTeamFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Filter admins based on search term
  const filteredAdmins = useMemo(() => {
    if (!searchTerm.trim()) return admins;

    const searchLower = searchTerm.toLowerCase().trim();
    return admins.filter((admin: Admin) =>
      admin.name?.toLowerCase().includes(searchLower) ||
      admin.email?.toLowerCase().includes(searchLower) ||
      admin.id?.toLowerCase().includes(searchLower) ||
      admin.roleName?.toLowerCase().includes(searchLower) ||
      admin.department?.toLowerCase().includes(searchLower) ||
      admin.position?.toLowerCase().includes(searchLower)
    );
  }, [searchTerm, admins]);

  const totalPages = Math.ceil(filteredAdmins.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentAdmins = filteredAdmins.slice(startIndex, endIndex);

  const handleResetFilter = () => {

    setSearchTerm('');
  };

  if (isAdminListPending) {
    return <LoadingSpinner message="Loading Admins..." />;
  }

  if (isAdminListError) {
    return <ErrorState title="Error Loading Admins" message={extractErrorMessage(isAdminError) || "Failed to load admins. Please try again."} onRetry={() => refetchAdminList()} retryText="Try Again" />;
  }

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
              className="flex items-center gap-2 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
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
        <DataTable columns={adminColumns} data={currentAdmins} />

      </div>

      {/* Pagination and Row Actions */}
      {!isAdminListPending && currentAdmins.length > 0 && (
        <DataTablePagination
          currentPage={currentPage - 1} // DataTablePagination uses 0-based index
          totalPages={totalPages}
          totalRows={filteredAdmins.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page + 1)} // Convert back to 1-based index
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      )}
    </div>
  );
}
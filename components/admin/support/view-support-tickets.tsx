"use client";

import SearchInput from '@/components/common/search-input';
import { Button } from '@/components/ui/button';
import { DataTable } from "@/components/ui/data-table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { EmptyState } from '@/components/ui/empty-state';
import { ErrorState } from '@/components/ui/error-state';
import LoadingSpinner from "@/components/ui/loading-spinner";
import useGetSupportTicketList from "@/hooks/query/useGetSupportTicketList";
import { RefreshCw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { SupportTicket, supportTicketColumns } from "./support-ticket-columns";

export default function ViewSupportTickets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const { data: supportTicketList, isPending: isPendingSupportTicketList, error: errorSupportTicketList, isError: isErrorSupportTicketList, refetch: refetchSupportTicketList } = useGetSupportTicketList();

  // Extract tickets data from API response
  const apiData = supportTicketList?.data?.data;
  const allTickets: SupportTicket[] = useMemo(() => {
    return (apiData?.pageData as SupportTicket[]) || [];
  }, [apiData]);

  // Filter tickets based on search term
  const filteredTickets = useMemo(() => {
    if (!searchTerm.trim()) return allTickets;

    const searchLower = searchTerm.toLowerCase().trim();
    return allTickets.filter(ticket =>
      ticket.name.toLowerCase().includes(searchLower) ||
      ticket.userType.toLowerCase().includes(searchLower) ||
      (ticket.ticketType?.toLowerCase().includes(searchLower)) ||
      (ticket.description?.toLowerCase().includes(searchLower)) ||
      (ticket.assignToName?.toLowerCase().includes(searchLower)) ||
      (ticket.status?.toLowerCase().includes(searchLower))
    );
  }, [searchTerm, allTickets]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTickets = filteredTickets.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredTickets.length / pageSize);

  const handleResetFilter = () => {
    setSearchTerm('');
  };

  // Render function for data table content
  const renderDataTableContent = () => {
    if (currentTickets.length === 0) {
      return (
        <EmptyState
          title="No Support Tickets Found"
          description="No support tickets match your current search criteria. Try adjusting your search terms."
          actionButton={
            <Button
              onClick={handleResetFilter}
              className="flex items-center gap-2 bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Clear Search
            </Button>
          }
        />
      );
    }

    return <DataTable columns={supportTicketColumns} data={currentTickets} />;
  };

  // Show loading state
  if (isPendingSupportTicketList) {
    return <LoadingSpinner message="Loading support tickets..." />;
  }

  // Show error state
  if (isErrorSupportTicketList) {
    return (
      <ErrorState
        title="Error Loading Support Tickets"
        message={errorSupportTicketList?.message || "Failed to load support tickets. Please try again."}
        onRetry={() => refetchSupportTicketList()}
        retryText="Try Again"
      />
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      {/* Header with Search and Filters */}
      <div className="p-6 border-gray-200">
        <div className="flex items-center justify-between mb-4">
          {/* Search Input */}
          <SearchInput
            placeholder="Search by name, user type, ticket type, description, assignee, or status..."
            value={searchTerm}
            onChange={setSearchTerm}
          />

          {/* Filter Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetFilter}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Filter
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="p-0">
        {renderDataTableContent()}
      </div>

      {/* Pagination and Row Actions */}
      {currentTickets.length > 0 && (
        <DataTablePagination
          currentPage={currentPage - 1} // DataTablePagination uses 0-based index
          totalPages={totalPages}
          totalRows={filteredTickets.length}
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
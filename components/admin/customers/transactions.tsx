'use client';

import { DataTable } from '@/components/ui/data-table';
import { transactionsData } from '@/data/transactions-data';
import { ChevronDown, ChevronLeft, ChevronRight, Download, Filter, Info, RefreshCw, Search, Trash2, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { transactionColumns } from '../add-merchants/transaction-columns';

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterBy, setFilterBy] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPage = 12; // Based on the design showing 12 items

  // Filter transactions based on search term and all filters
  const filteredTransactions = useMemo(() => {
    let filtered = transactionsData;

    // Search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(transaction =>
        transaction.customer.toLowerCase().includes(searchLower) ||
        transaction.merchant.name.toLowerCase().includes(searchLower) ||
        transaction.txnId.toLowerCase().includes(searchLower) ||
        transaction.type.toLowerCase().includes(searchLower)
      );
    }

    // Type filter
    if (filterBy) {
      filtered = filtered.filter(transaction => transaction.type === filterBy);
    }

    // Status filter
    if (orderStatus) {
      filtered = filtered.filter(transaction => transaction.status === orderStatus);
    }

    // Date filter
    if (dateFilter) {
      const now = new Date();
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date);

        switch (dateFilter) {
          case 'today':
            return transactionDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return transactionDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            return transactionDate >= monthAgo;
          case 'quarter':
            const quarterAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
            return transactionDate >= quarterAgo;
          case 'year':
            const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
            return transactionDate >= yearAgo;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [searchTerm, filterBy, dateFilter, orderStatus]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleResetFilter = () => {
    setFilterBy('');
    setDateFilter('');
    setOrderStatus('');
    setSearchTerm('');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      {/* Header with Search and Filters */}
      <div className="p-6 border-gray-200">
        <div className="flex items-center justify-between mb-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Customer Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

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

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Order Status
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
        {currentTransactions.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 px-8">
            <div className="w-32 h-32 mb-6 flex items-center justify-center">
              <div className="w-24 h-20 bg-gray-100 rounded-lg relative">
                <div className="absolute inset-2 border-2 border-gray-300 rounded"></div>
                <div className="absolute top-0 left-2 right-2 h-2 bg-gray-300 rounded-t"></div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 border-2 border-dashed border-green-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Transactions Found</h3>
            <p className="text-gray-600 text-center max-w-md mb-8 leading-relaxed">
              No transactions match your current search or filter criteria. Try adjusting your search terms or filters.
            </p>
          </div>
        ) : (
          // Data Table
          <DataTable columns={transactionColumns} data={currentTransactions} />
        )}
      </div>

      {/* Pagination and Row Actions */}
      {currentTransactions.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            {/* Row Count */}
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredTransactions.length)} of {filteredTransactions.length}
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
'use client';

import { useMarkNotificationAsRead } from '@/hooks/mutation/useMarkNotificationAsRead';
import useGetNotificationList from '@/hooks/query/useGetNotificationList';
import { extractErrorMessage } from '@/lib/helper';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DataTablePagination } from '../ui/data-table-pagination';
import { EmptyState } from '../ui/empty-state';
import { ErrorState } from '../ui/error-state';
import { LoadingModal } from '../ui/loading-modal';
import LoadingSpinner from '../ui/loading-spinner';

// Helper object for role-based styling to maintain visual hierarchy
const roleColors = {
  green: 'bg-green-100 text-green-800',
  orange: 'bg-orange-100 text-orange-800',
  purple: 'bg-purple-100 text-purple-800',
  blue: 'bg-blue-100 text-blue-800'
};

type NotificationItem = {
  id: number | string;
  actionHeading: string;
  role: string;
  content: string;
  timestamp: string;
  isRead?: boolean;
  roleColor: 'green' | 'orange' | 'purple' | 'blue' | string;
};

// Format time utility (e.g., 5:35 AM)
const formatTime = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

// API notification type mapper
type ApiNotification = {
  id: string;
  title: string;
  description: string;
  userId: string;
  usertype: 'CUSTOMER' | 'MERCHANT' | 'NUMONI' | string;
  read: boolean;
  createdDt: string;
};

// Transform API response to UI model
const mapApiNotificationToItem = (n: ApiNotification): NotificationItem => {
  const role = typeof n.usertype === 'string' ? n.usertype : 'USER';
  const roleColor = role === 'CUSTOMER' ? 'blue' : role === 'MERCHANT' ? 'orange' : role === 'NUMONI' ? 'green' : 'purple';
  return {
    id: n.id,
    actionHeading: n.title ?? 'Notification',
    role,
    content: n.description ?? '',
    timestamp: n.createdDt ? formatTime(n.createdDt) : '',
    isRead: !!n.read,
    roleColor,
  };
};

export default function Notification() {
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination State
  // Using 0-based index for API compatibility
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const { handleMarkNotificationAsRead, isPending: isMarkingAsReadPending } = useMarkNotificationAsRead();

  // Fetch notifications with dynamic pagination parameters
  const { data, isPending, error, isError, refetch } = useGetNotificationList({
    page: currentPage,
    size: pageSize,
    title: searchTerm.trim() || undefined,
  });

  type Paginated<T> = { pageData: T[]; totalRows: number; totalPages: number };

  // Data transformation and pagination logic
  const { serverNotifications, totalRows, totalPages, isPaginated } = useMemo(() => {
    const root = data?.data?.data as unknown;
    let list: NotificationItem[] = [];
    let tr = 0;
    let tp = 0;

    // Check if response conforms to paginated structure
    const paginated = !!(root && !Array.isArray(root) && (root as Paginated<ApiNotification>).pageData);

    if (paginated) {
      const pageData = ((root as Paginated<ApiNotification>).pageData) || [];
      list = pageData.map(mapApiNotificationToItem);
      tr = Number((root as Paginated<ApiNotification>).totalRows) || 0;
      tp = Number((root as Paginated<ApiNotification>).totalPages) || 0;
    } else if (Array.isArray(root)) {
      // Fallback for flat array responses (client-side pagination support)
      list = (root as ApiNotification[]).map(mapApiNotificationToItem);
      tr = list.length;
      tp = Math.ceil(tr / pageSize);
    }

    return { serverNotifications: list, totalRows: tr, totalPages: tp, isPaginated: paginated };
  }, [data, pageSize]);

  // Memoize filtered list - primarily for client-side search if needed later, currently passes through server results
  const filteredNotifications = useMemo<NotificationItem[]>(() => {
    return serverNotifications;
  }, [serverNotifications]);

  // Determine effective total pages based on data source type
  const displayTotalPages = serverNotifications.length > 0 ? totalPages : Math.ceil(filteredNotifications.length / pageSize);

  // Calculate slice indices for client-side pagination fallback
  const startIndex = currentPage * pageSize;
  const endIndex = serverNotifications.length > 0
    ? Math.min(startIndex + pageSize, totalRows)
    : Math.min(startIndex + pageSize, filteredNotifications.length);

  const currentNotifications = serverNotifications.length > 0 && isPaginated
    ? filteredNotifications // Server has already returned the correct page
    : filteredNotifications.slice(startIndex, endIndex); // Client must slice the full list

  // Handlers
  const handleMarkAsRead = (id: number | string) => {
    handleMarkNotificationAsRead(id.toString());
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(0); // Reset to first page to avoid out-of-bounds
  };

  if (isPending) {
    return <LoadingSpinner message="Loading notifications..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Error Loading Notifications"
        message={extractErrorMessage(error) || "Failed to load notifications. Please try again."}
        onRetry={refetch}
        retryText="Try Again"
      />
    );
  }

  if (serverNotifications.length === 0) {
    return <EmptyState
      title="No Notifications Found"
      description="No notifications found. Please try again later."
    />
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <LoadingModal isOpen={isMarkingAsReadPending} title="Marking as read" message="Please wait while we update your notification." />
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Notification"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Notification List */}
      <div className="max-h-[600px] overflow-y-auto">
        {currentNotifications.map((notification: NotificationItem) => (
          <div
            key={notification.id}
            className={`flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-blue-50' : ''
              }`}
          >
            {/* Action Heading */}
            <div className="ml-4 flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-900 truncate">
                  {notification.actionHeading}
                </span>

                {/* Role Tag */}
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${roleColors[notification.roleColor as keyof typeof roleColors]}`}>
                  {notification.role}
                </span>
              </div>

              {/* Content */}
              <p className="text-sm text-gray-600 mt-1 truncate">
                {notification.content}
              </p>
            </div>

            {/* Timestamp and Action */}
            <div className="ml-4 flex items-center gap-3">
              <div className="text-sm text-gray-500 whitespace-nowrap">
                {notification.timestamp}
              </div>
              {notification.isRead === false && (
                <button
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="px-3 py-1 text-xs rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Reusable Data Table Pagination */}
      <DataTablePagination
        currentPage={currentPage}
        totalPages={displayTotalPages}
        totalRows={totalRows}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
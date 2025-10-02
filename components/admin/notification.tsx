'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

// Mock notification data
const mockNotifications = Array.from({ length: 1253 }, (_, index) => ({
  id: index + 1,
  actionHeading: 'Action heading',
  role: ['Role', 'Admin', 'User', 'Manager', 'Support'][index % 5],
  content: 'Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor',
  timestamp: generateDeterministicTime(index),
  isRead: (index % 3) === 0, // Deterministic based on index
  roleColor: ['green', 'orange', 'purple', 'blue'][index % 4]
}));

function generateDeterministicTime(index: number) {
  // Use index to create deterministic but varied times
  const hours = ((index * 7) % 12) + 1;
  const minutes = (index * 13) % 60;
  const ampm = (index % 2) === 0 ? 'AM' : 'PM';
  return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

const roleColors = {
  green: 'bg-green-100 text-green-800',
  orange: 'bg-orange-100 text-orange-800',
  purple: 'bg-purple-100 text-purple-800',
  blue: 'bg-blue-100 text-blue-800'
};

export default function Notification() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);
  const [notifications, setNotifications] = useState(mockNotifications);
  const itemsPerPage = 20;

  // Filter notifications based on search term
  const filteredNotifications = useMemo(() => {
    if (!searchTerm) return notifications;
    return notifications.filter(notification =>
      notification.actionHeading.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [notifications, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotifications = filteredNotifications.slice(startIndex, endIndex);

  // Handle checkbox selection
  const handleSelectNotification = (id: number) => {
    setSelectedNotifications(prev =>
      prev.includes(id)
        ? prev.filter(notificationId => notificationId !== id)
        : [...prev, id]
    );
  };

  // Handle mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  // Handle pagination
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
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
        {currentNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-blue-50' : ''
              }`}
          >
            {/* Checkbox */}
            <Checkbox
              checked={selectedNotifications.includes(notification.id)}
              onCheckedChange={() => handleSelectNotification(notification.id)}
            />

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

            {/* Timestamp */}
            <div className="ml-4 text-sm text-gray-500">
              {notification.timestamp}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          {/* Pagination Info */}
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredNotifications.length)} of {filteredNotifications.length}
          </div>

          {/* Mark All As Read */}
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Mark all as read
          </button>

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
    </div>
  );
}
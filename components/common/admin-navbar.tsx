'use client';

import { getPageTitle } from '@/lib/helper';
import { Menu, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import AdminUserProfile from './admin-user-profile';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function AdminNavbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();




  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 lg:left-64">
      <div className="px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Mobile menu button and Page title */}
          <div className="flex items-center min-w-0 flex-1">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Page title */}
            <h1 className="ml-2 lg:ml-0 text-xl lg:text-2xl font-bold text-gray-900 truncate">
              {getPageTitle(pathname)}
            </h1>
          </div>

          {/* Center - Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Type here..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right side - Action button and User Profile */}
          <div className="flex items-center space-x-4">


            {/* User Profile */}
            <AdminUserProfile />
          </div>
        </div>

        {/* Mobile Search Bar */}
        {/* <div className="md:hidden pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Type here..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div> */}
      </div>
    </nav>
  );
}
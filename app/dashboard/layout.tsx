'use client';

import AdminNavbar from "@/components/common/admin-navbar";
import AdminSidebar from "@/components/common/admin-sidebar";
import { useState } from "react";


export default function Layout({ children }: { children: React.ReactNode }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Navbar */}
      <AdminNavbar onMenuClick={toggleSidebar} />

      {/* Main content area */}
      <main className="pt-16 lg:ml-64">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
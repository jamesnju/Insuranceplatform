'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import { useAuthStore } from '@/store/authStore';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  // Check if current route is a dashboard route
  const isDashboardRoute = pathname?.includes('/dashboard') || 
                          pathname?.includes('/customer/') ||
                          pathname?.includes('/insurance-officer/') ||
                          pathname?.includes('/insurance-admin/') ||
                          pathname?.includes('/claims-officer/') ||
                          pathname?.includes('/claims-assessor/') ||
                          pathname?.includes('/platform-admin/');

  // Show sidebar only for dashboard routes
  const showSidebar = isDashboardRoute && user;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex-1 flex">
        {showSidebar && <Sidebar />}
        <main 
          className={`flex-1 transition-all duration-300 ${
            showSidebar ? 'ml-64' : ''
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import Sidebar from './Sidebar';
import { useAuthStore } from '@/store/authStore';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();

  // Check if current route is auth or public
  const isAuthRoute = pathname?.startsWith('/login') || 
                      pathname?.startsWith('/register') || 
                      pathname?.startsWith('/verify-otp') ||
                      pathname?.startsWith('/forgot-password');

  const isPublicRoute = pathname === '/' || 
                        pathname?.startsWith('/how-it-works') ||
                        pathname?.startsWith('/products') ||
                        pathname?.startsWith('/partners') ||
                        pathname?.startsWith('/faq') ||
                        pathname?.startsWith('/claims-info') ||
                        pathname?.startsWith('/contact') ||
                        pathname?.startsWith('/privacy') ||
                        pathname?.startsWith('/terms');

  // Show sidebar only for authenticated users on dashboard routes
  const showSidebar = isAuthenticated && user && !isAuthRoute && !isPublicRoute;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        {showSidebar && <Sidebar />}
        <main className={`flex-1 ${showSidebar ? 'ml-64' : ''}`}>
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
      {!isAuthRoute && <Footer />}
    </div>
  );
}
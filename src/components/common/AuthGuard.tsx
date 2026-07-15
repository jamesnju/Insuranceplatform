'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import LoadingSpinner from './LoadingSpinner';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export default function AuthGuard({ children, requiredRoles = [] }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (requiredRoles.length > 0 && user && !requiredRoles.includes(user.role)) {
        router.push('/unauthorized');
      }
    }
  }, [isAuthenticated, isLoading, router, requiredRoles, user]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRoles.length > 0 && user && !requiredRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
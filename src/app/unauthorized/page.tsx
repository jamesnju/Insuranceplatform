'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { FiAlertCircle, FiHome, FiArrowLeft } from 'react-icons/fi';

export default function UnauthorizedPage() {
  const { user } = useAuthStore();

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'customer':
        return '/customer/dashboard';
      case 'insurance_officer':
        return '/insurance-officer/dashboard';
      case 'insurance_admin':
        return '/insurance-admin/dashboard';
      case 'claims_officer':
        return '/claims-officer/dashboard';
      case 'claims_assessor':
        return '/claims-assessor/dashboard';
      case 'platform_admin':
        return '/platform-admin/dashboard';
      default:
        return '/';
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiAlertCircle className="h-10 w-10 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Access Denied
        </h1>
        
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={getDashboardLink()}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            <FiHome className="h-5 w-5 mr-2" />
            Go to Dashboard
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FiArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>
        
        {user && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Your current role: <span className="font-medium text-gray-900">{user.role}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
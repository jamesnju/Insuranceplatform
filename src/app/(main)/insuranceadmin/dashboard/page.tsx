'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import AuthGuard from '@/components/common/AuthGuard';
import StatusBadge from '@/components/common/StatusBadge';
import {
  FiBox,
  FiShield,
  FiClipboard,
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
  FiArrowRight,
  FiSettings,
  FiEye,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiBarChart2,
  FiUserCheck,
  FiFileText,
} from 'react-icons/fi';

// Mock data
const mockDashboardData = {
  stats: {
    totalProducts: 12,
    totalCustomers: 456,
    activePolicies: 789,
    totalPremium: 3560000,
    pendingApplications: 23,
    openClaims: 15,
    activeOfficers: 8,
  },
  recentActivity: [
    {
      id: 1,
      type: 'product_added',
      title: 'New Product Added',
      description: 'Smartphone Plus policy was added to product catalog',
      date: '2024-01-15T08:30:00',
    },
    {
      id: 2,
      type: 'policy_issued',
      title: 'Policy Issued',
      description: 'Policy #POL-2024-045 was issued to John Kamau',
      date: '2024-01-15T09:15:00',
    },
    {
      id: 3,
      type: 'claim',
      title: 'Claim Submitted',
      description: 'Claim #CLM-2024-008 was submitted by Mary Wanjiru',
      date: '2024-01-15T10:00:00',
    },
    {
      id: 4,
      type: 'officer',
      title: 'Officer Assigned',
      description: 'Jane Doe assigned to review application #APP-2024-032',
      date: '2024-01-15T11:30:00',
    },
  ],
  products: [
    { name: 'Smartphone Plus', policies: 234, premium: 2340000 },
    { name: 'Laptop Pro', policies: 178, premium: 1890000 },
    { name: 'Tablet Standard', policies: 145, premium: 1250000 },
    { name: 'Camera Elite', policies: 98, premium: 980000 },
  ],
};

export default function InsuranceAdminDashboard() {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const data = mockDashboardData;

  return (
    <AuthGuard requiredRoles={['insurance_admin']}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, {user?.fullName?.split(' ')[0] || 'Admin'}! 👋
              </h1>
              <p className="mt-1 text-orange-100">
                Manage your insurance operations and products
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm">
                <FiClock className="h-4 w-4 mr-2" />
                {data.stats.pendingApplications} Pending
              </span>
              <Link
                href="/insurance-admin/settings"
                className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm hover:bg-white/30 transition-colors"
              >
                <FiSettings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <FiBox className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Policies</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.activePolicies}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <FiShield className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Premium</p>
                <p className="text-2xl font-bold text-gray-900">KES {(data.stats.totalPremium / 1000000).toFixed(1)}M</p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
                <FiDollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open Claims</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.openClaims}</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <FiClipboard className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <Link href="/insurance-admin/audit-logs" className="text-sm text-primary-600 hover:text-primary-700">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {data.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === 'product_added' ? 'bg-blue-50 text-blue-600' :
                    activity.type === 'policy_issued' ? 'bg-green-50 text-green-600' :
                    activity.type === 'claim' ? 'bg-red-50 text-red-600' :
                    'bg-purple-50 text-purple-600'
                  }`}>
                    {activity.type === 'product_added' && <FiBox className="h-5 w-5" />}
                    {activity.type === 'policy_issued' && <FiShield className="h-5 w-5" />}
                    {activity.type === 'claim' && <FiClipboard className="h-5 w-5" />}
                    {activity.type === 'officer' && <FiUserCheck className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <span className="text-xs text-gray-500">
                        {new Date(activity.date).toLocaleDateString('en-KE', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Products Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Product Performance</h2>
              <Link href="/insurance-admin/products" className="text-sm text-primary-600 hover:text-primary-700">
                Manage
              </Link>
            </div>
            <div className="space-y-3">
              {data.products.map((product, index) => (
                <div key={index} className="p-3 border border-gray-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.policies} policies</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      KES {(product.premium / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-600 rounded-full"
                      style={{ 
                        width: `${(product.policies / data.products[0].policies) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            href="/insurance-admin/products"
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FiBox className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Products</p>
                <p className="text-sm text-gray-500">Manage insurance products</p>
              </div>
            </div>
            <FiArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
          </Link>

          <Link
            href="/insurance-admin/pricing-rules"
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <FiDollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Pricing Rules</p>
                <p className="text-sm text-gray-500">Configure pricing</p>
              </div>
            </div>
            <FiArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
          </Link>

          <Link
            href="/insurance-admin/underwriting-rules"
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <FiShield className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Underwriting</p>
                <p className="text-sm text-gray-500">Set underwriting rules</p>
              </div>
            </div>
            <FiArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
          </Link>

          <Link
            href="/insurance-admin/officers"
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                <FiUsers className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Team</p>
                <p className="text-sm text-gray-500">Manage officers</p>
              </div>
            </div>
            <FiArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
          </Link>
        </div>
      </div>
    </AuthGuard>
  );
}
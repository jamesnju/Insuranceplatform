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
  FiBell,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
  FiSmartphone,
  FiMonitor,
  FiCamera,
  FiCast,
  FiGrid,
} from 'react-icons/fi';
import { BiLaptop } from 'react-icons/bi';

// Mock data - In real app, fetch from API
const mockDashboardData = {
  stats: {
    totalAssets: 3,
    activePolicies: 2,
    pendingClaims: 1,
    totalPaid: 7500,
  },
  recentActivities: [
    {
      id: 1,
      type: 'policy_issued',
      title: 'Policy Issued',
      description: 'Policy #POL-2024-001 for Samsung Galaxy S24 has been issued',
      date: '2024-01-15T10:30:00',
      status: 'active',
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Confirmed',
      description: 'Payment of KES 2,500 confirmed for policy #POL-2024-001',
      date: '2024-01-15T10:15:00',
      status: 'completed',
    },
    {
      id: 3,
      type: 'claim',
      title: 'Claim Submitted',
      description: 'Claim #CLM-2024-001 for MacBook Pro has been submitted',
      date: '2024-01-14T14:20:00',
      status: 'pending',
    },
  ],
  upcomingRenewals: [
    {
      id: 1,
      asset: 'Samsung Galaxy S24',
      policyNumber: 'POL-2024-001',
      renewalDate: '2025-01-15',
      premium: 2500,
    },
    {
      id: 2,
      asset: 'MacBook Pro 16"',
      policyNumber: 'POL-2024-002',
      renewalDate: '2025-02-20',
      premium: 3500,
    },
  ],
  assets: [
    {
      id: 1,
      name: 'Samsung Galaxy S24',
      category: 'phone',
      brand: 'Samsung',
      model: 'Galaxy S24',
      status: 'insured',
      icon: FiSmartphone,
    },
    {
      id: 2,
      name: 'MacBook Pro 16"',
      category: 'laptop',
      brand: 'Apple',
      model: 'MacBook Pro',
      status: 'insured',
      icon: BiLaptop,
    },
    {
      id: 3,
      name: 'Sony Alpha A7 IV',
      category: 'camera',
      brand: 'Sony',
      model: 'Alpha A7 IV',
      status: 'submitted',
      icon: FiCamera,
    },
  ],
};

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    active: 'text-green-600 bg-green-50',
    pending: 'text-yellow-600 bg-yellow-50',
    completed: 'text-blue-600 bg-blue-50',
    submitted: 'text-purple-600 bg-purple-50',
    insured: 'text-green-600 bg-green-50',
  };
  return colors[status] || 'text-gray-600 bg-gray-50';
};

const getCategoryIcon = (category: string) => {
  const icons: Record<string, any> = {
    phone: FiSmartphone,
    laptop: BiLaptop,
    tablet: FiMonitor,
    television: FiMonitor,
    camera: FiCamera,
    gaming_console: FiCast,
  };
  return icons[category] || FiBox;
};

export default function CustomerDashboard() {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(mockDashboardData);

  useEffect(() => {
    // Simulate API call
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

  return (
    <AuthGuard requiredRoles={['customer']}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, {user?.fullName?.split(' ')[0] || 'Customer'}! 👋
              </h1>
              <p className="mt-1 text-primary-100">
                Here's what's happening with your insurance portfolio
              </p>
            </div>
            <Link
              href="/customer/addasset"
              className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FiBox className="h-5 w-5 mr-2" />
              Add New Asset
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.totalAssets}</p>
              </div>
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                <FiBox className="h-6 w-6 text-primary-600" />
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
                <p className="text-sm text-gray-600">Pending Claims</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.pendingClaims}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
                <FiClipboard className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Paid</p>
                <p className="text-2xl font-bold text-gray-900">KES {data.stats.totalPaid.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <FiDollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <Link href="/customer/notifications" className="text-sm text-primary-600 hover:text-primary-700">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {data.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(activity.status)}`}>
                    {activity.type === 'policy_issued' && <FiShield className="h-5 w-5" />}
                    {activity.type === 'payment' && <FiDollarSign className="h-5 w-5" />}
                    {activity.type === 'claim' && <FiClipboard className="h-5 w-5" />}
                    {!['policy_issued', 'payment', 'claim'].includes(activity.type) && <FiBell className="h-5 w-5" />}
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

          {/* Upcoming Renewals */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Renewals</h2>
              <Link href="/customer/policies" className="text-sm text-primary-600 hover:text-primary-700">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {data.upcomingRenewals.map((renewal) => (
                <div key={renewal.id} className="p-3 border border-gray-100 rounded-lg hover:border-primary-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{renewal.asset}</p>
                      <p className="text-xs text-gray-500">{renewal.policyNumber}</p>
                    </div>
                    <StatusBadge status="pending" size="sm" />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-gray-600">Renewal Date:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(renewal.renewalDate).toLocaleDateString('en-KE', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-sm">
                    <span className="text-gray-600">Premium:</span>
                    <span className="font-medium text-gray-900">KES {renewal.premium.toLocaleString()}</span>
                  </div>
                  <Link
                    href={`/customer/policies/${renewal.id}/renew`}
                    className="mt-2 inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
                  >
                    Renew Now
                    <FiArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/customer/add-asset"
              className="flex flex-col items-center p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors"
            >
              <FiBox className="h-8 w-8 text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Add Asset</span>
            </Link>
            <Link
              href="/customer/claims/new"
              className="flex flex-col items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <FiClipboard className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Submit Claim</span>
            </Link>
            <Link
              href="/customer/quotations"
              className="flex flex-col items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
            >
              <FiTrendingUp className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Get Quote</span>
            </Link>
            <Link
              href="/customer/policies"
              className="flex flex-col items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
            >
              <FiShield className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">My Policies</span>
            </Link>
          </div>
        </div>

        {/* My Assets Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">My Assets</h2>
            <Link href="/customer/assets" className="text-sm text-primary-600 hover:text-primary-700">
              View all assets
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.assets.map((asset) => {
              const Icon = asset.icon || getCategoryIcon(asset.category);
              return (
                <div key={asset.id} className="p-4 border border-gray-100 rounded-lg hover:border-primary-200 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{asset.name}</p>
                        <p className="text-xs text-gray-500">{asset.brand} {asset.model}</p>
                      </div>
                    </div>
                    <StatusBadge status={asset.status} size="sm" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
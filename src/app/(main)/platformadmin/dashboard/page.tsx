'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import AuthGuard from '@/components/common/AuthGuard';
import StatusBadge from '@/components/common/StatusBadge';
import {
  FiUsers,
  FiServer,
  FiShield,
  FiClipboard,
  FiDollarSign,
  FiAlertCircle,
  FiActivity,
  FiTrendingUp,
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiEye,
  FiSettings,
  FiDatabase,
} from 'react-icons/fi';

// Mock data
const mockDashboardData = {
  stats: {
    totalInsurers: 5,
    totalCustomers: 1234,
    totalPolicies: 2156,
    totalPremium: 12450000,
    activeClaims: 45,
    pendingApplications: 67,
    fraudAlerts: 3,
    systemHealth: 98,
  },
  recentActivities: [
    {
      id: 1,
      type: 'insurer_added',
      title: 'New Insurer Added',
      description: 'CIC Insurance has been onboarded to the platform',
      date: '2024-01-15T08:30:00',
      status: 'completed',
    },
    {
      id: 2,
      type: 'fraud_alert',
      title: 'Fraud Alert',
      description: 'Suspicious activity detected on application #APP-2024-045',
      date: '2024-01-15T09:15:00',
      status: 'pending',
    },
    {
      id: 3,
      type: 'payment',
      title: 'Large Payment Processed',
      description: 'Payment of KES 2,500,000 processed for policy batch #BATCH-001',
      date: '2024-01-15T10:00:00',
      status: 'completed',
    },
    {
      id: 4,
      type: 'system',
      title: 'System Update',
      description: 'AI verification service updated to version 2.1.0',
      date: '2024-01-15T11:30:00',
      status: 'completed',
    },
  ],
  topInsurers: [
    { name: 'Jubilee Insurance', policies: 543, premium: 3450000 },
    { name: 'Britam', policies: 432, premium: 2890000 },
    { name: 'APA Insurance', policies: 389, premium: 2450000 },
    { name: 'UAP Insurance', policies: 312, premium: 1980000 },
    { name: 'CIC Insurance', policies: 245, premium: 1560000 },
  ],
};

export default function PlatformAdminDashboard() {
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
    <AuthGuard requiredRoles={['platform_admin']}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, {user?.fullName?.split(' ')[0] || 'Admin'}! 👋
              </h1>
              <p className="mt-1 text-purple-100">
                Platform overview and system management
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm">
                <FiActivity className="h-4 w-4 mr-2" />
                System Health: {data.stats.systemHealth}%
              </span>
              {data.stats.fraudAlerts > 0 && (
                <span className="inline-flex items-center px-3 py-1 bg-red-500/30 rounded-full text-sm animate-pulse">
                  <FiAlertCircle className="h-4 w-4 mr-2" />
                  {data.stats.fraudAlerts} Fraud Alerts
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Insurers</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.totalInsurers}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <FiServer className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.totalCustomers.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <FiUsers className="h-6 w-6 text-green-600" />
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
                <p className="text-sm text-gray-600">Active Claims</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.activeClaims}</p>
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
              <Link href="/platform-admin/audit-logs" className="text-sm text-primary-600 hover:text-primary-700">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {data.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === 'fraud_alert' ? 'bg-red-50 text-red-600' :
                    activity.type === 'payment' ? 'bg-green-50 text-green-600' :
                    'bg-blue-50 text-blue-600'
                  }`}>
                    {activity.type === 'insurer_added' && <FiServer className="h-5 w-5" />}
                    {activity.type === 'fraud_alert' && <FiAlertCircle className="h-5 w-5" />}
                    {activity.type === 'payment' && <FiDollarSign className="h-5 w-5" />}
                    {activity.type === 'system' && <FiSettings className="h-5 w-5" />}
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
                    <div className="mt-1">
                      <StatusBadge status={activity.status} size="sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Insurers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Top Insurers</h2>
              <Link href="/platform-admin/insurers" className="text-sm text-primary-600 hover:text-primary-700">
                Manage
              </Link>
            </div>
            <div className="space-y-3">
              {data.topInsurers.map((insurer, index) => (
                <div key={index} className="p-3 border border-gray-100 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{insurer.name}</p>
                      <p className="text-xs text-gray-500">{insurer.policies} policies</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      KES {(insurer.premium / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-600 rounded-full"
                      style={{ 
                        width: `${(insurer.premium / data.topInsurers[0].premium) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Link
              href="/platform-admin/insurers"
              className="flex flex-col items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <FiServer className="h-6 w-6 text-blue-600 mb-2" />
              <span className="text-xs font-medium text-gray-900 text-center">Manage Insurers</span>
            </Link>
            <Link
              href="/platform-admin/fraud-alerts"
              className="flex flex-col items-center p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
            >
              <FiAlertCircle className="h-6 w-6 text-red-600 mb-2" />
              <span className="text-xs font-medium text-gray-900 text-center">Fraud Alerts</span>
            </Link>
            <Link
              href="/platform-admin/payments"
              className="flex flex-col items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
            >
              <FiDollarSign className="h-6 w-6 text-green-600 mb-2" />
              <span className="text-xs font-medium text-gray-900 text-center">Reconcile Payments</span>
            </Link>
            <Link
              href="/platform-admin/system-health"
              className="flex flex-col items-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
            >
              <FiActivity className="h-6 w-6 text-purple-600 mb-2" />
              <span className="text-xs font-medium text-gray-900 text-center">System Health</span>
            </Link>
            <Link
              href="/platform-admin/ai-jobs"
              className="flex flex-col items-center p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
            >
              <FiDatabase className="h-6 w-6 text-indigo-600 mb-2" />
              <span className="text-xs font-medium text-gray-900 text-center">AI Jobs</span>
            </Link>
            <Link
              href="/platform-admin/audit-logs"
              className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <FiEye className="h-6 w-6 text-gray-600 mb-2" />
              <span className="text-xs font-medium text-gray-900 text-center">Audit Logs</span>
            </Link>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
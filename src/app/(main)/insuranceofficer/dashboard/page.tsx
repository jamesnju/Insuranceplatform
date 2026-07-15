'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import AuthGuard from '@/components/common/AuthGuard';
import StatusBadge from '@/components/common/StatusBadge';
import { 
  FiFileText, 
  FiUsers, 
  FiCheckCircle, 
  FiXCircle,
  FiClock,
  FiAlertCircle,
  FiTrendingUp,
  FiArrowRight,
  FiEye,
  FiUserCheck,
  FiShield,
  FiClipboard,
} from 'react-icons/fi';

// Mock data
const mockDashboardData = {
  stats: {
    pendingReviews: 12,
    assignedToMe: 5,
    highRisk: 3,
    approvedToday: 8,
  },
  applications: [
    {
      id: 'APP-2024-001',
      customer: 'John Kamau',
      asset: 'Samsung Galaxy S24',
      category: 'Phone',
      value: 110000,
      riskScore: 25,
      status: 'pending',
      priority: 'high',
      submittedAt: '2024-01-15T08:30:00',
    },
    {
      id: 'APP-2024-002',
      customer: 'Mary Wanjiru',
      asset: 'MacBook Pro 16"',
      category: 'Laptop',
      value: 250000,
      riskScore: 65,
      status: 'pending',
      priority: 'critical',
      submittedAt: '2024-01-15T09:15:00',
    },
    {
      id: 'APP-2024-003',
      customer: 'Peter Ochieng',
      asset: 'Sony Alpha A7 IV',
      category: 'Camera',
      value: 180000,
      riskScore: 45,
      status: 'in_review',
      priority: 'medium',
      submittedAt: '2024-01-15T10:00:00',
    },
    {
      id: 'APP-2024-004',
      customer: 'Grace Mwangi',
      asset: 'iPad Pro 12.9"',
      category: 'Tablet',
      value: 95000,
      riskScore: 15,
      status: 'pending',
      priority: 'low',
      submittedAt: '2024-01-15T11:30:00',
    },
    {
      id: 'APP-2024-005',
      customer: 'David Kiprop',
      asset: 'Dell XPS 15',
      category: 'Laptop',
      value: 195000,
      riskScore: 72,
      status: 'pending',
      priority: 'high',
      submittedAt: '2024-01-15T12:45:00',
    },
  ],
};

export default function InsuranceOfficerDashboard() {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(mockDashboardData);

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

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      critical: 'text-red-700 bg-red-50 border-red-200',
      high: 'text-orange-700 bg-orange-50 border-orange-200',
      medium: 'text-yellow-700 bg-yellow-50 border-yellow-200',
      low: 'text-blue-700 bg-blue-50 border-blue-200',
    };
    return colors[priority] || 'text-gray-700 bg-gray-50 border-gray-200';
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { label: 'Critical', color: 'text-red-600' };
    if (score >= 60) return { label: 'High', color: 'text-orange-600' };
    if (score >= 30) return { label: 'Medium', color: 'text-yellow-600' };
    return { label: 'Low', color: 'text-green-600' };
  };

  return (
    <AuthGuard requiredRoles={['insurance_officer']}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, {user?.fullName?.split(' ')[0] || 'Officer'}! 👋
              </h1>
              <p className="mt-1 text-blue-100">
                Review and manage insurance applications
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm">
                <FiClock className="h-4 w-4 mr-2" />
                {data.stats.pendingReviews} Pending
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-yellow-500/30 rounded-full text-sm">
                <FiAlertCircle className="h-4 w-4 mr-2" />
                {data.stats.highRisk} High Risk
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.pendingReviews}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <FiFileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Assigned to Me</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.assignedToMe}</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <FiUserCheck className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.highRisk}</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <FiAlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved Today</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.approvedToday}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <FiCheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
            <div className="flex items-center space-x-3">
              <Link href="/insurance-officer/applications" className="text-sm text-primary-600 hover:text-primary-700">
                View all
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/insurance-officer/high-risk" className="text-sm text-red-600 hover:text-red-700">
                High Risk
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Application
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Customer
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Asset
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Value
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Risk Score
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Priority
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.applications.map((app) => {
                  const risk = getRiskLevel(app.riskScore);
                  return (
                    <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{app.id}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(app.submittedAt).toLocaleDateString('en-KE', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-900">{app.customer}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm text-gray-900">{app.asset}</p>
                          <p className="text-xs text-gray-500">{app.category}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm font-medium text-gray-900">
                          KES {app.value.toLocaleString()}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${risk.color}`}>
                            {app.riskScore}
                          </span>
                          <span className={`text-xs ${risk.color}`}>
                            ({risk.label})
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(app.priority)}`}>
                          {app.priority.charAt(0).toUpperCase() + app.priority.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/insurance-officer/applications/${app.id}`}
                            className="inline-flex items-center px-3 py-1.5 bg-primary-50 text-primary-600 text-sm font-medium rounded-lg hover:bg-primary-100 transition-colors"
                          >
                            <FiEye className="h-4 w-4 mr-1" />
                            Review
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/insurance-officer/applications"
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FiFileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">All Applications</p>
                <p className="text-sm text-gray-500">View all pending applications</p>
              </div>
            </div>
            <FiArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
          </Link>

          <Link
            href="/insurance-officer/evidence-requests"
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <FiClipboard className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Evidence Requests</p>
                <p className="text-sm text-gray-500">Manage evidence requests</p>
              </div>
            </div>
            <FiArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
          </Link>

          <Link
            href="/insurance-officer/reports"
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Reports</p>
                <p className="text-sm text-gray-500">View performance reports</p>
              </div>
            </div>
            <FiArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
          </Link>
        </div>
      </div>
    </AuthGuard>
  );
}
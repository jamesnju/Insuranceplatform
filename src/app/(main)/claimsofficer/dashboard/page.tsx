'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import AuthGuard from '@/components/common/AuthGuard';
import StatusBadge from '@/components/common/StatusBadge';
import {
  FiClipboard,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiAlertCircle,
  FiUserCheck,
  FiArrowRight,
  FiEye,
  FiDollarSign,
  FiCalendar,
  FiUsers,
} from 'react-icons/fi';

// Mock data
const mockDashboardData = {
  stats: {
    newClaims: 8,
    assignedToMe: 4,
    highRiskClaims: 2,
    awaitingAssessment: 6,
    awaitingApproval: 3,
    settledToday: 5,
  },
  claims: [
    {
      id: 'CLM-2024-001',
      customer: 'John Kamau',
      policy: 'POL-2024-001',
      asset: 'Samsung Galaxy S24',
      incidentType: 'Accidental Damage',
      amount: 85000,
      riskScore: 25,
      status: 'pending_review',
      submittedAt: '2024-01-15T08:30:00',
    },
    {
      id: 'CLM-2024-002',
      customer: 'Mary Wanjiru',
      policy: 'POL-2024-002',
      asset: 'MacBook Pro 16"',
      incidentType: 'Theft',
      amount: 220000,
      riskScore: 72,
      status: 'pending_review',
      submittedAt: '2024-01-15T09:15:00',
    },
    {
      id: 'CLM-2024-003',
      customer: 'Peter Ochieng',
      policy: 'POL-2024-003',
      asset: 'Sony Alpha A7 IV',
      incidentType: 'Liquid Damage',
      amount: 150000,
      riskScore: 45,
      status: 'awaiting_assessment',
      submittedAt: '2024-01-14T14:20:00',
    },
    {
      id: 'CLM-2024-004',
      customer: 'Grace Mwangi',
      policy: 'POL-2024-004',
      asset: 'iPad Pro 12.9"',
      incidentType: 'Screen Damage',
      amount: 45000,
      riskScore: 15,
      status: 'awaiting_approval',
      submittedAt: '2024-01-14T10:00:00',
    },
  ],
};

export default function ClaimsOfficerDashboard() {
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

  const getRiskLevel = (score: number) => {
    if (score >= 60) return { label: 'High', color: 'text-red-600 bg-red-50' };
    if (score >= 30) return { label: 'Medium', color: 'text-yellow-600 bg-yellow-50' };
    return { label: 'Low', color: 'text-green-600 bg-green-50' };
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending_review: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      awaiting_assessment: 'bg-blue-50 text-blue-700 border-blue-200',
      awaiting_approval: 'bg-purple-50 text-purple-700 border-purple-200',
      settled: 'bg-green-50 text-green-700 border-green-200',
      rejected: 'bg-red-50 text-red-700 border-red-200',
    };
    return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <AuthGuard requiredRoles={['claims_officer']}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, {user?.fullName?.split(' ')[0] || 'Officer'}! 👋
              </h1>
              <p className="mt-1 text-green-100">
                Manage and process insurance claims
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm">
                <FiClock className="h-4 w-4 mr-2" />
                {data.stats.newClaims} New Claims
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-yellow-500/30 rounded-full text-sm">
                <FiAlertCircle className="h-4 w-4 mr-2" />
                {data.stats.highRiskClaims} High Risk
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Claims</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.newClaims}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <FiClipboard className="h-6 w-6 text-blue-600" />
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
                <p className="text-2xl font-bold text-gray-900">{data.stats.highRiskClaims}</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <FiAlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Awaiting Assessment</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.awaitingAssessment}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
                <FiClock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Settled Today</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.settledToday}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <FiCheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Claims List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Claims</h2>
            <Link href="/claims-officer/new-claims" className="text-sm text-primary-600 hover:text-primary-700">
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Claim
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Customer
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Asset
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Incident
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Amount
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Risk
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.claims.map((claim) => {
                  const risk = getRiskLevel(claim.riskScore);
                  return (
                    <tr key={claim.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{claim.id}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(claim.submittedAt).toLocaleDateString('en-KE', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-900">{claim.customer}</p>
                        <p className="text-xs text-gray-500">Policy: {claim.policy}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-900">{claim.asset}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm text-gray-900">{claim.incidentType}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-sm font-medium text-gray-900">
                          KES {claim.amount.toLocaleString()}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${risk.color}`}>
                          {claim.riskScore}% {risk.label}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(claim.status)}`}>
                          {claim.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/claims-officer/claims/${claim.id}`}
                          className="inline-flex items-center px-3 py-1.5 bg-primary-50 text-primary-600 text-sm font-medium rounded-lg hover:bg-primary-100 transition-colors"
                        >
                          <FiEye className="h-4 w-4 mr-1" />
                          Review
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            href="/claims-officer/new-claims"
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FiClipboard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">New Claims</p>
                <p className="text-sm text-gray-500">Review new submissions</p>
              </div>
            </div>
            <FiArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
          </Link>

          <Link
            href="/claims-officer/high-risk-claims"
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <FiAlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">High Risk</p>
                <p className="text-sm text-gray-500">Priority review needed</p>
              </div>
            </div>
            <FiArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
          </Link>

          <Link
            href="/claims-officer/awaiting-assessment"
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <FiUserCheck className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Awaiting Assessment</p>
                <p className="text-sm text-gray-500">Assign assessors</p>
              </div>
            </div>
            <FiArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
          </Link>

          <Link
            href="/claims-officer/reports"
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <FiDollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Reports</p>
                <p className="text-sm text-gray-500">View claim metrics</p>
              </div>
            </div>
            <FiArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
          </Link>
        </div>
      </div>
    </AuthGuard>
  );
}
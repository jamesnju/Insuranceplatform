'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import AuthGuard from '@/components/common/AuthGuard';
import StatusBadge from '@/components/common/StatusBadge';
import {
  FiClipboard,
  FiCheckCircle,
  FiClock,
  FiCalendar,
  FiMapPin,
  FiArrowRight,
  FiEye,
  FiUserCheck,
  FiDollarSign,
  FiTool,
} from 'react-icons/fi';

// Mock data
const mockDashboardData = {
  stats: {
    assigned: 5,
    accepted: 3,
    scheduled: 2,
    completed: 4,
    pendingReports: 2,
  },
  assessments: [
    {
      id: 'ASM-2024-001',
      claimId: 'CLM-2024-003',
      customer: 'Peter Ochieng',
      asset: 'Sony Alpha A7 IV',
      incidentType: 'Liquid Damage',
      location: 'Nairobi, Kenya',
      status: 'assigned',
      scheduledDate: '2024-01-16T10:00:00',
    },
    {
      id: 'ASM-2024-002',
      claimId: 'CLM-2024-005',
      customer: 'David Kiprop',
      asset: 'Dell XPS 15',
      incidentType: 'Screen Damage',
      location: 'Nairobi, Kenya',
      status: 'scheduled',
      scheduledDate: '2024-01-17T14:30:00',
    },
    {
      id: 'ASM-2024-003',
      claimId: 'CLM-2024-006',
      customer: 'Sarah Kamau',
      asset: 'iPad Pro 12.9"',
      incidentType: 'Accidental Damage',
      location: 'Nairobi, Kenya',
      status: 'accepted',
      scheduledDate: '2024-01-18T09:00:00',
    },
  ],
};

export default function ClaimsAssessorDashboard() {
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

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      assigned: 'bg-blue-50 text-blue-700 border-blue-200',
      accepted: 'bg-green-50 text-green-700 border-green-200',
      scheduled: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      inspection_completed: 'bg-purple-50 text-purple-700 border-purple-200',
      report_submitted: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      closed: 'bg-gray-50 text-gray-700 border-gray-200',
    };
    return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <AuthGuard requiredRoles={['claims_assessor']}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, {user?.fullName?.split(' ')[0] || 'Assessor'}! 👋
              </h1>
              <p className="mt-1 text-indigo-100">
                Manage your assessments and inspections
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm">
                <FiClipboard className="h-4 w-4 mr-2" />
                {data.stats.assigned} Assigned
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-yellow-500/30 rounded-full text-sm">
                <FiClock className="h-4 w-4 mr-2" />
                {data.stats.pendingReports} Pending Reports
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Assigned</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.assigned}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <FiClipboard className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Accepted</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.accepted}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <FiCheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.scheduled}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
                <FiCalendar className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <FiCheckCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Reports</p>
                <p className="text-2xl font-bold text-gray-900">{data.stats.pendingReports}</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <FiTool className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Assessments List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Assessments</h2>
            <Link href="/claims-assessor/assigned" className="text-sm text-primary-600 hover:text-primary-700">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.assessments.map((assessment) => (
              <div key={assessment.id} className="border border-gray-100 rounded-lg p-4 hover:border-primary-200 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{assessment.id}</p>
                    <p className="text-xs text-gray-500">Claim: {assessment.claimId}</p>
                  </div>
                  <StatusBadge status={assessment.status} size="sm" />
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{assessment.customer}</p>
                    <p className="text-xs text-gray-500">{assessment.asset}</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FiMapPin className="h-4 w-4 mr-1 text-gray-400" />
                    {assessment.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FiCalendar className="h-4 w-4 mr-1 text-gray-400" />
                    {new Date(assessment.scheduledDate).toLocaleDateString('en-KE', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                    {' at '}
                    {new Date(assessment.scheduledDate).toLocaleTimeString('en-KE', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <div className="text-sm text-gray-600">
                    Incident: {assessment.incidentType}
                  </div>
                </div>

                <Link
                  href={`/claims-assessor/assessments/${assessment.id}`}
                  className="mt-3 inline-flex items-center w-full justify-center px-3 py-2 bg-primary-50 text-primary-600 text-sm font-medium rounded-lg hover:bg-primary-100 transition-colors"
                >
                  <FiEye className="h-4 w-4 mr-2" />
                  View Assessment
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/claims-assessor/assigned"
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FiClipboard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Assigned</p>
                <p className="text-sm text-gray-500">View all assigned assessments</p>
              </div>
            </div>
            <FiArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
          </Link>

          <Link
            href="/claims-assessor/scheduled"
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <FiCalendar className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Scheduled Visits</p>
                <p className="text-sm text-gray-500">View upcoming inspections</p>
              </div>
            </div>
            <FiArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
          </Link>

          <Link
            href="/claims-assessor/completed"
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <FiCheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Completed</p>
                <p className="text-sm text-gray-500">View completed assessments</p>
              </div>
            </div>
            <FiArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
          </Link>
        </div>
      </div>
    </AuthGuard>
  );
}
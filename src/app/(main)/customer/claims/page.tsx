'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthGuard from '@/components/common/AuthGuard';
import StatusBadge from '@/components/common/StatusBadge';
import {
  FiClipboard,
  FiFileText,
  FiEye,
  FiPlus,
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiDollarSign,
  FiCalendar,
  FiArrowRight,
} from 'react-icons/fi';

// Mock claims data
const mockClaims = [
  {
    id: 'CLM-2024-001',
    policyId: 'POL-2024-001',
    assetName: 'Samsung Galaxy S24',
    incidentType: 'Screen Damage',
    incidentDate: '2024-01-20',
    description: 'Phone screen cracked after accidental drop',
    amount: 15000,
    status: 'pending_review',
    createdAt: '2024-01-20T14:30:00',
    updatedAt: '2024-01-20T14:30:00',
  },
  {
    id: 'CLM-2024-002',
    policyId: 'POL-2024-002',
    assetName: 'MacBook Pro 16"',
    incidentType: 'Liquid Damage',
    incidentDate: '2024-01-25',
    description: 'Coffee spilled on keyboard',
    amount: 75000,
    status: 'awaiting_evidence',
    createdAt: '2024-01-25T10:15:00',
    updatedAt: '2024-01-26T09:00:00',
  },
  {
    id: 'CLM-2024-003',
    policyId: 'POL-2024-003',
    assetName: 'Sony Alpha A7 IV',
    incidentType: 'Theft',
    incidentDate: '2024-02-01',
    description: 'Camera stolen from car',
    amount: 280000,
    status: 'awaiting_assessment',
    createdAt: '2024-02-01T16:45:00',
    updatedAt: '2024-02-02T11:30:00',
  },
  {
    id: 'CLM-2024-004',
    policyId: 'POL-2024-004',
    assetName: 'iPad Pro 12.9"',
    incidentType: 'Accidental Damage',
    incidentDate: '2023-12-15',
    description: 'Device dropped and screen shattered',
    amount: 35000,
    status: 'settled',
    createdAt: '2023-12-15T09:00:00',
    updatedAt: '2023-12-20T14:00:00',
  },
];

const statusFilters = [
  { value: 'all', label: 'All Claims' },
  { value: 'pending_review', label: 'Pending Review' },
  { value: 'awaiting_evidence', label: 'Awaiting Evidence' },
  { value: 'awaiting_assessment', label: 'Awaiting Assessment' },
  { value: 'awaiting_approval', label: 'Awaiting Approval' },
  { value: 'settled', label: 'Settled' },
  { value: 'rejected', label: 'Rejected' },
];

const incidentTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'Accidental Damage', label: 'Accidental Damage' },
  { value: 'Screen Damage', label: 'Screen Damage' },
  { value: 'Liquid Damage', label: 'Liquid Damage' },
  { value: 'Theft', label: 'Theft' },
  { value: 'Robbery', label: 'Robbery' },
  { value: 'Fire', label: 'Fire' },
  { value: 'Electrical Damage', label: 'Electrical Damage' },
  { value: 'Total Loss', label: 'Total Loss' },
];

export default function CustomerClaimsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [claims, setClaims] = useState(mockClaims);
  const [statusFilter, setStatusFilter] = useState('all');
  const [incidentFilter, setIncidentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          claim.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    const matchesIncident = incidentFilter === 'all' || claim.incidentType === incidentFilter;
    return matchesSearch && matchesStatus && matchesIncident;
  });

  const getStatusCount = (status: string) => {
    if (status === 'all') return claims.length;
    return claims.filter(c => c.status === status).length;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending_review: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      awaiting_evidence: 'bg-blue-50 text-blue-700 border-blue-200',
      awaiting_assessment: 'bg-purple-50 text-purple-700 border-purple-200',
      awaiting_approval: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      settled: 'bg-green-50 text-green-700 border-green-200',
      rejected: 'bg-red-50 text-red-700 border-red-200',
    };
    return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-KE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
      pending_review: FiClock,
      awaiting_evidence: FiClock,
      awaiting_assessment: FiClock,
      awaiting_approval: FiClock,
      settled: FiCheckCircle,
      rejected: FiXCircle,
    };
    return icons[status] || FiAlertCircle;
  };

  if (isLoading) {
    return (
      <AuthGuard requiredRoles={['customer']}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard requiredRoles={['customer']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Claims</h1>
            <p className="text-gray-600 mt-1">Track and manage your insurance claims</p>
          </div>
          <Link
            href="/customer/claims/new"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <FiPlus className="h-5 w-5 mr-2" />
            Submit New Claim
          </Link>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Total Claims</p>
            <p className="text-2xl font-bold text-gray-900">{claims.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Open</p>
            <p className="text-2xl font-bold text-yellow-600">
              {claims.filter(c => !['settled', 'rejected'].includes(c.status)).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Settled</p>
            <p className="text-2xl font-bold text-green-600">
              {claims.filter(c => c.status === 'settled').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-2xl font-bold text-gray-900">
              KES {claims.reduce((sum, c) => sum + c.amount, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by claim ID or asset name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiFilter className="h-4 w-4 mr-2" />
              Filter
              <FiChevronDown className="h-4 w-4 ml-2" />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                <div className="flex flex-wrap gap-2">
                  {statusFilters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setStatusFilter(filter.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        statusFilter === filter.value
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {filter.label} ({getStatusCount(filter.value)})
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Incident Type</label>
                <div className="flex flex-wrap gap-2">
                  {incidentTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setIncidentFilter(type.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        incidentFilter === type.value
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Claims List */}
        {filteredClaims.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiClipboard className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No claims found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || statusFilter !== 'all' || incidentFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Submit your first claim'}
            </p>
            <Link
              href="/customer/claims/new"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FiPlus className="h-5 w-5 mr-2" />
              Submit a Claim
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredClaims.map((claim) => {
              const StatusIcon = getStatusIcon(claim.status);
              return (
                <div
                  key={claim.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold text-gray-900">{claim.id}</h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(claim.status)}`}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {claim.status.replace('_', ' ').toUpperCase()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{claim.assetName}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Claim Amount</p>
                            <p className="text-lg font-bold text-primary-600">
                              KES {claim.amount.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Incident Type</p>
                            <p className="font-medium text-gray-900">{claim.incidentType}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Incident Date</p>
                            <p className="font-medium text-gray-900">{formatDate(claim.incidentDate)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Submitted</p>
                            <p className="font-medium text-gray-900">{formatDate(claim.createdAt)}</p>
                          </div>
                        </div>

                        <div className="mt-2">
                          <p className="text-sm text-gray-600">{claim.description}</p>
                        </div>
                      </div>

                      <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-row lg:flex-col gap-2">
                        <Link
                          href={`/customer/claims/${claim.id}`}
                          className="px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors text-sm flex items-center justify-center"
                        >
                          <FiEye className="h-4 w-4 mr-1" />
                          View Details
                        </Link>
                        {claim.status === 'awaiting_evidence' && (
                          <button className="px-4 py-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors text-sm flex items-center justify-center">
                            <FiPlus className="h-4 w-4 mr-1" />
                            Upload Evidence
                          </button>
                        )}
                        {claim.status === 'settled' && (
                          <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm flex items-center justify-center">
                            <FiCheckCircle className="h-4 w-4 mr-1" />
                            View Settlement
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar for Open Claims */}
                    {!['settled', 'rejected'].includes(claim.status) && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>Claim Progress</span>
                          <span>
                            {claim.status === 'pending_review' && 'Step 1 of 4'}
                            {claim.status === 'awaiting_evidence' && 'Step 2 of 4'}
                            {claim.status === 'awaiting_assessment' && 'Step 3 of 4'}
                            {claim.status === 'awaiting_approval' && 'Step 4 of 4'}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-600 rounded-full transition-all duration-500"
                            style={{
                              width: claim.status === 'pending_review' ? '25%' :
                                     claim.status === 'awaiting_evidence' ? '50%' :
                                     claim.status === 'awaiting_assessment' ? '75%' :
                                     '100%'
                            }}
                          />
                        </div>
                        <div className="mt-2 flex justify-between text-xs text-gray-500">
                          <span>Submitted</span>
                          <span>Review</span>
                          <span>Assessment</span>
                          <span>Approval</span>
                          <span>Settled</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
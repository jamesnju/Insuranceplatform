'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthGuard from '@/components/common/AuthGuard';
import StatusBadge from '@/components/common/StatusBadge';
import {
  FiShield,
  FiFileText,
  FiDownload,
  FiEye,
  FiCalendar,
  FiDollarSign,
  FiClock,
  FiArrowRight,
  FiFilter,
  FiChevronDown,
  FiSearch,
  FiPlus,
} from 'react-icons/fi';

// Mock policies data
const mockPolicies = [
  {
    id: 'POL-2024-001',
    assetName: 'Samsung Galaxy S24',
    assetId: '1',
    insurerName: 'Jubilee Insurance',
    productName: 'Phone Plus',
    insuredValue: 110000,
    premium: 2500,
    startDate: '2024-01-20',
    endDate: '2025-01-19',
    excess: 5000,
    status: 'active',
    policyNumber: 'POL-2024-001',
    createdAt: '2024-01-20T10:30:00',
  },
  {
    id: 'POL-2024-002',
    assetName: 'MacBook Pro 16"',
    assetId: '2',
    insurerName: 'APA Insurance',
    productName: 'Laptop Premium',
    insuredValue: 350000,
    premium: 5500,
    startDate: '2024-01-25',
    endDate: '2025-01-24',
    excess: 10000,
    status: 'active',
    policyNumber: 'POL-2024-002',
    createdAt: '2024-01-25T14:20:00',
  },
  {
    id: 'POL-2024-003',
    assetName: 'Sony Alpha A7 IV',
    assetId: '3',
    insurerName: 'CIC Insurance',
    productName: 'Camera Pro',
    insuredValue: 280000,
    premium: 4800,
    startDate: '2024-02-05',
    endDate: '2025-02-04',
    excess: 8000,
    status: 'active',
    policyNumber: 'POL-2024-003',
    createdAt: '2024-02-05T16:45:00',
  },
  {
    id: 'POL-2024-004',
    assetName: 'iPad Pro 12.9"',
    assetId: '4',
    insurerName: 'Britam',
    productName: 'Device Shield',
    insuredValue: 150000,
    premium: 2800,
    startDate: '2023-12-01',
    endDate: '2024-11-30',
    excess: 5000,
    status: 'expired',
    policyNumber: 'POL-2024-004',
    createdAt: '2023-12-01T09:00:00',
  },
];

const statusFilters = [
  { value: 'all', label: 'All Policies' },
  { value: 'active', label: 'Active' },
  { value: 'expired', label: 'Expired' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function CustomerPoliciesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [policies, setPolicies] = useState(mockPolicies);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          policy.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          policy.insurerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || policy.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusCount = (status: string) => {
    if (status === 'all') return policies.length;
    return policies.filter(p => p.status === status).length;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-KE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
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
            <h1 className="text-2xl font-bold text-gray-900">My Policies</h1>
            <p className="text-gray-600 mt-1">View and manage your insurance policies</p>
          </div>
          <Link
            href="/customer/addasset"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <FiPlus className="h-5 w-5 mr-2" />
            Get New Policy
          </Link>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Total Policies</p>
            <p className="text-2xl font-bold text-gray-900">{policies.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-2xl font-bold text-green-600">
              {policies.filter(p => p.status === 'active').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Total Covered</p>
            <p className="text-2xl font-bold text-gray-900">
              KES {policies.reduce((sum, p) => sum + p.insuredValue, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Annual Premium</p>
            <p className="text-2xl font-bold text-gray-900">
              KES {policies.reduce((sum, p) => sum + p.premium, 0).toLocaleString()}
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
                placeholder="Search by asset, policy number, or insurer..."
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
            <div className="mt-4 pt-4 border-t border-gray-200">
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
          )}
        </div>

        {/* Policies List */}
        {filteredPolicies.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiShield className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No policies found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || statusFilter !== 'all' 
                ? 'Try adjusting your filters'
                : 'Get your first policy by insuring an asset'}
            </p>
            <Link
              href="/customer/add-asset"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FiPlus className="h-5 w-5 mr-2" />
              Get Insured
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPolicies.map((policy) => {
              const daysRemaining = getDaysRemaining(policy.endDate);
              const isExpiringSoon = daysRemaining > 0 && daysRemaining <= 30;
              
              return (
                <div key={policy.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-gray-900">{policy.assetName}</h3>
                          <StatusBadge status={policy.status} size="sm" />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{policy.insurerName}</p>
                        <p className="text-xs text-gray-400 mt-1">Policy #{policy.policyNumber}</p>
                      </div>
                      <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                        <FiShield className="h-6 w-6 text-primary-600" />
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Coverage</p>
                        <p className="font-medium text-gray-900">
                          KES {policy.insuredValue.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Premium</p>
                        <p className="font-medium text-gray-900">
                          KES {policy.premium.toLocaleString()}/yr
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Start Date</p>
                        <p className="font-medium text-gray-900">{formatDate(policy.startDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">End Date</p>
                        <p className={`font-medium ${
                          policy.status === 'active' && isExpiringSoon
                            ? 'text-yellow-600'
                            : policy.status === 'expired'
                            ? 'text-red-600'
                            : 'text-gray-900'
                        }`}>
                          {formatDate(policy.endDate)}
                          {policy.status === 'active' && daysRemaining > 0 && (
                            <span className={`ml-1 text-xs ${
                              isExpiringSoon ? 'text-yellow-600' : 'text-gray-500'
                            }`}>
                              ({daysRemaining} days)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-2">
                      <Link
                        href={`/customer/policies/${policy.id}`}
                        className="flex-1 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors text-sm flex items-center justify-center"
                      >
                        <FiEye className="h-4 w-4 mr-1" />
                        View Details
                      </Link>
                      <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center">
                        <FiDownload className="h-4 w-4 mr-1" />
                        Download
                      </button>
                      {policy.status === 'active' && (
                        <Link
                          href={`/customer/claims/new?policy=${policy.id}`}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center justify-center"
                        >
                          <FiFileText className="h-4 w-4 mr-1" />
                          Submit Claim
                        </Link>
                      )}
                    </div>
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
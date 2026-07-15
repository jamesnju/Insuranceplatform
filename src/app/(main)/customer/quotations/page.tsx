'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthGuard from '@/components/common/AuthGuard';
import StatusBadge from '@/components/common/StatusBadge';
import {
  FiTrendingUp,
  FiDollarSign,
  FiShield,
  FiClock,
  FiArrowRight,
  FiCheckCircle,
  FiXCircle,
  FiInfo,
  FiDownload,
  FiEye,
  FiPlus,
  FiFilter,
  FiChevronDown,
} from 'react-icons/fi';

// Mock quotations data
const mockQuotations = [
  {
    id: 'Q-2024-001',
    assetName: 'Samsung Galaxy S24',
    assetId: '1',
    insurerName: 'Jubilee Insurance',
    productName: 'Phone Plus',
    insuredValue: 110000,
    premium: 2500,
    taxes: 375,
    totalPayable: 2875,
    coverStart: '2024-01-20',
    coverEnd: '2025-01-19',
    excess: 5000,
    benefits: ['Accidental Damage', 'Theft', 'Liquid Damage'],
    exclusions: ['Intentional Damage', 'Wear and Tear'],
    status: 'generated',
    expiryDate: '2024-02-15',
    createdAt: '2024-01-15T10:30:00',
  },
  {
    id: 'Q-2024-002',
    assetName: 'Samsung Galaxy S24',
    assetId: '1',
    insurerName: 'Britam',
    productName: 'Device Shield',
    insuredValue: 110000,
    premium: 2200,
    taxes: 330,
    totalPayable: 2530,
    coverStart: '2024-01-20',
    coverEnd: '2025-01-19',
    excess: 7500,
    benefits: ['Accidental Damage', 'Theft'],
    exclusions: ['Liquid Damage', 'Intentional Damage'],
    status: 'selected',
    expiryDate: '2024-02-15',
    createdAt: '2024-01-15T10:30:00',
  },
  {
    id: 'Q-2024-003',
    assetName: 'MacBook Pro 16"',
    assetId: '2',
    insurerName: 'APA Insurance',
    productName: 'Laptop Premium',
    insuredValue: 350000,
    premium: 5500,
    taxes: 825,
    totalPayable: 6325,
    coverStart: '2024-01-25',
    coverEnd: '2025-01-24',
    excess: 10000,
    benefits: ['Accidental Damage', 'Theft', 'Screen Damage'],
    exclusions: ['Intentional Damage', 'Wear and Tear'],
    status: 'paid',
    expiryDate: '2024-02-20',
    createdAt: '2024-01-20T14:20:00',
  },
  {
    id: 'Q-2024-004',
    assetName: 'Sony Alpha A7 IV',
    assetId: '3',
    insurerName: 'CIC Insurance',
    productName: 'Camera Pro',
    insuredValue: 280000,
    premium: 4800,
    taxes: 720,
    totalPayable: 5520,
    coverStart: '2024-02-05',
    coverEnd: '2025-02-04',
    excess: 8000,
    benefits: ['Accidental Damage', 'Theft', 'Lens Damage'],
    exclusions: ['Intentional Damage', 'Wear and Tear'],
    status: 'expired',
    expiryDate: '2024-01-30',
    createdAt: '2024-01-20T16:45:00',
  },
];

const statusFilters = [
  { value: 'all', label: 'All Quotations' },
  { value: 'generated', label: 'Generated' },
  { value: 'selected', label: 'Selected' },
  { value: 'paid', label: 'Paid' },
  { value: 'expired', label: 'Expired' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function CustomerQuotationsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [quotations, setQuotations] = useState(mockQuotations);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuotation, setSelectedQuotation] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredQuotations = quotations.filter(q => 
    statusFilter === 'all' || q.status === statusFilter
  );

  const getStatusCount = (status: string) => {
    if (status === 'all') return quotations.length;
    return quotations.filter(q => q.status === status).length;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      generated: 'bg-blue-50 text-blue-700 border-blue-200',
      selected: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      paid: 'bg-green-50 text-green-700 border-green-200',
      expired: 'bg-gray-50 text-gray-700 border-gray-200',
      cancelled: 'bg-red-50 text-red-700 border-red-200',
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
            <h1 className="text-2xl font-bold text-gray-900">Quotations</h1>
            <p className="text-gray-600 mt-1">Review and manage your insurance quotations</p>
          </div>
          <Link
            href="/customer/add-asset"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <FiPlus className="h-5 w-5 mr-2" />
            Get New Quote
          </Link>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Total Quotations</p>
            <p className="text-2xl font-bold text-gray-900">{quotations.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-2xl font-bold text-blue-600">
              {quotations.filter(q => q.status === 'generated' || q.status === 'selected').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Converted to Policy</p>
            <p className="text-2xl font-bold text-green-600">
              {quotations.filter(q => q.status === 'paid').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Expired</p>
            <p className="text-2xl font-bold text-gray-600">
              {quotations.filter(q => q.status === 'expired').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiFilter className="h-4 w-4 mr-2" />
              Filter
              <FiChevronDown className="h-4 w-4 ml-2" />
            </button>
            <div className="flex-1"></div>
            <span className="text-sm text-gray-500">
              {filteredQuotations.length} quotations
            </span>
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

        {/* Quotations List */}
        {filteredQuotations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTrendingUp className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No quotations found</h3>
            <p className="text-gray-600 mb-4">
              {statusFilter !== 'all' 
                ? 'Try adjusting your filters'
                : 'Add an asset to get insurance quotations'}
            </p>
            <Link
              href="/customer/add-asset"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FiPlus className="h-5 w-5 mr-2" />
              Add Asset for Quote
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuotations.map((quotation) => (
              <div
                key={quotation.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {quotation.assetName}
                            </h3>
                            <StatusBadge status={quotation.status} size="sm" />
                          </div>
                          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                            <span className="text-gray-600">{quotation.insurerName}</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-gray-600">{quotation.productName}</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-gray-600">Ref: {quotation.id}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Insured Value</p>
                          <p className="font-medium text-gray-900">
                            KES {quotation.insuredValue.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Premium</p>
                          <p className="font-medium text-gray-900">
                            KES {quotation.premium.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Payable</p>
                          <p className="font-medium text-primary-600">
                            KES {quotation.totalPayable.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Excess</p>
                          <p className="font-medium text-gray-900">
                            KES {quotation.excess.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Cover:</span>
                          <span className="ml-1 text-gray-900">
                            {formatDate(quotation.coverStart)} - {formatDate(quotation.coverEnd)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Expires:</span>
                          <span className={`ml-1 font-medium ${
                            new Date(quotation.expiryDate) < new Date() 
                              ? 'text-red-600' 
                              : 'text-gray-900'
                          }`}>
                            {formatDate(quotation.expiryDate)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2">
                        <button
                          onClick={() => setSelectedQuotation(
                            selectedQuotation === quotation.id ? null : quotation.id
                          )}
                          className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                        >
                          <FiInfo className="h-4 w-4 mr-1" />
                          {selectedQuotation === quotation.id ? 'Hide Details' : 'Show Details'}
                        </button>
                        
                        {selectedQuotation === quotation.id && (
                          <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Benefits</h4>
                                <ul className="space-y-1">
                                  {quotation.benefits.map((benefit, idx) => (
                                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                                      <FiCheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                      {benefit}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Exclusions</h4>
                                <ul className="space-y-1">
                                  {quotation.exclusions.map((exclusion, idx) => (
                                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                                      <FiXCircle className="h-4 w-4 text-red-500 mr-2" />
                                      {exclusion}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col items-start lg:items-end justify-center space-y-2">
                      {quotation.status === 'generated' && (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Link
                            href={`/customer/payments?quotation=${quotation.id}`}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm flex items-center"
                          >
                            <FiDollarSign className="h-4 w-4 mr-1" />
                            Pay Now
                          </Link>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center">
                            <FiDownload className="h-4 w-4 mr-1" />
                            Download
                          </button>
                        </div>
                      )}
                      {quotation.status === 'selected' && (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Link
                            href={`/customer/payments?quotation=${quotation.id}`}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm flex items-center"
                          >
                            <FiDollarSign className="h-4 w-4 mr-1" />
                            Complete Payment
                          </Link>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center">
                            <FiDownload className="h-4 w-4 mr-1" />
                            Download
                          </button>
                        </div>
                      )}
                      {quotation.status === 'paid' && (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Link
                            href={`/customer/policies/${quotation.id}`}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center"
                          >
                            <FiShield className="h-4 w-4 mr-1" />
                            View Policy
                          </Link>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center">
                            <FiDownload className="h-4 w-4 mr-1" />
                            Download
                          </button>
                        </div>
                      )}
                      {quotation.status === 'expired' && (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Link
                            href={`/customer/add-asset`}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm flex items-center"
                          >
                            <FiPlus className="h-4 w-4 mr-1" />
                            Get New Quote
                          </Link>
                        </div>
                      )}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(quotation.status)}`}>
                        {quotation.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
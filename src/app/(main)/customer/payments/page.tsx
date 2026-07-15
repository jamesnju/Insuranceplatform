'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AuthGuard from '@/components/common/AuthGuard';
import StatusBadge from '@/components/common/StatusBadge';
import {
  FiDollarSign,
  FiCreditCard,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiDownload,
  FiEye,
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiArrowRight,
  FiAlertCircle,
  FiInfo,
} from 'react-icons/fi';

// Mock payments data
const mockPayments = [
  {
    id: 'PAY-2024-001',
    quotationId: 'Q-2024-003',
    policyId: 'POL-2024-003',
    assetName: 'Sony Alpha A7 IV',
    amount: 5520,
    mpesaReceipt: 'MPESA-2024-001',
    status: 'successful',
    createdAt: '2024-02-05T16:45:00',
    completedAt: '2024-02-05T16:50:00',
  },
  {
    id: 'PAY-2024-002',
    quotationId: 'Q-2024-002',
    policyId: 'POL-2024-002',
    assetName: 'MacBook Pro 16"',
    amount: 6325,
    mpesaReceipt: 'MPESA-2024-002',
    status: 'successful',
    createdAt: '2024-01-25T14:20:00',
    completedAt: '2024-01-25T14:25:00',
  },
  {
    id: 'PAY-2024-003',
    quotationId: 'Q-2024-001',
    policyId: 'POL-2024-001',
    assetName: 'Samsung Galaxy S24',
    amount: 2875,
    mpesaReceipt: 'MPESA-2024-003',
    status: 'successful',
    createdAt: '2024-01-20T10:30:00',
    completedAt: '2024-01-20T10:35:00',
  },
  {
    id: 'PAY-2024-004',
    quotationId: 'Q-2024-004',
    policyId: null,
    assetName: 'iPad Pro 12.9"',
    amount: 3450,
    mpesaReceipt: null,
    status: 'failed',
    createdAt: '2024-02-10T09:00:00',
    completedAt: null,
  },
  {
    id: 'PAY-2024-005',
    quotationId: 'Q-2024-005',
    policyId: null,
    assetName: 'Dell XPS 15',
    amount: 4800,
    mpesaReceipt: null,
    status: 'pending',
    createdAt: '2024-02-12T11:30:00',
    completedAt: null,
  },
];

const statusFilters = [
  { value: 'all', label: 'All Payments' },
  { value: 'successful', label: 'Successful' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
  { value: 'refunded', label: 'Refunded' },
];

export default function CustomerPaymentsPage() {
  const searchParams = useSearchParams();
  const quotationId = searchParams.get('quotation');
  
  const [isLoading, setIsLoading] = useState(true);
  const [payments, setPayments] = useState(mockPayments);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // If quotationId is provided, highlight that payment
      if (quotationId) {
        const found = payments.find(p => p.quotationId === quotationId);
        if (found) {
          setSelectedPayment(found.id);
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [quotationId]);

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (payment.mpesaReceipt && payment.mpesaReceipt.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusCount = (status: string) => {
    if (status === 'all') return payments.length;
    return payments.filter(p => p.status === status).length;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      successful: 'bg-green-50 text-green-700 border-green-200',
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      failed: 'bg-red-50 text-red-700 border-red-200',
      refunded: 'bg-blue-50 text-blue-700 border-blue-200',
    };
    return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
      successful: FiCheckCircle,
      pending: FiClock,
      failed: FiXCircle,
      refunded: FiAlertCircle,
    };
    return icons[status] || FiInfo;
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-KE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTotalPaid = () => {
    return payments
      .filter(p => p.status === 'successful')
      .reduce((sum, p) => sum + p.amount, 0);
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
            <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
            <p className="text-gray-600 mt-1">View and manage your payment history</p>
          </div>
          <Link
            href="/customer/add-asset"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <FiCreditCard className="h-5 w-5 mr-2" />
            Make Payment
          </Link>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Total Payments</p>
            <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Successful</p>
            <p className="text-2xl font-bold text-green-600">
              {payments.filter(p => p.status === 'successful').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Total Paid</p>
            <p className="text-2xl font-bold text-gray-900">
              KES {getTotalPaid().toLocaleString()}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {payments.filter(p => p.status === 'pending').length}
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
                placeholder="Search by asset, payment ID, or M-Pesa receipt..."
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

        {/* Payments List */}
        {filteredPayments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiDollarSign className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'You haven\'t made any payments yet'}
            </p>
            <Link
              href="/customer/add-asset"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FiCreditCard className="h-5 w-5 mr-2" />
              Make Your First Payment
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPayments.map((payment) => {
              const StatusIcon = getStatusIcon(payment.status);
              const isHighlighted = selectedPayment === payment.id;
              
              return (
                <div
                  key={payment.id}
                  className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow ${
                    isHighlighted ? 'border-primary-400 ring-2 ring-primary-200' : 'border-gray-100'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold text-gray-900">{payment.id}</h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {payment.status.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{payment.assetName}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Amount</p>
                            <p className="text-lg font-bold text-primary-600">
                              KES {payment.amount.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">M-Pesa Receipt</p>
                            <p className="font-medium text-gray-900">
                              {payment.mpesaReceipt || 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Payment Date</p>
                            <p className="font-medium text-gray-900">{formatDate(payment.createdAt)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Completed</p>
                            <p className="font-medium text-gray-900">{formatDate(payment.completedAt)}</p>
                          </div>
                        </div>

                        {payment.policyId && (
                          <div className="mt-2">
                            <Link
                              href={`/customer/policies/${payment.policyId}`}
                              className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                            >
                              <FiEye className="h-4 w-4 mr-1" />
                              View Associated Policy
                            </Link>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-row lg:flex-col gap-2">
                        {payment.status === 'successful' && (
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center">
                            <FiDownload className="h-4 w-4 mr-1" />
                            Download Receipt
                          </button>
                        )}
                        {payment.status === 'pending' && (
                          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm flex items-center justify-center">
                            <FiCreditCard className="h-4 w-4 mr-1" />
                            Complete Payment
                          </button>
                        )}
                        {payment.status === 'failed' && (
                          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center justify-center">
                            <FiArrowRight className="h-4 w-4 mr-1" />
                            Retry Payment
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Payment Status Details */}
                    {payment.status === 'failed' && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-start">
                          <FiAlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-red-900">Payment Failed</h4>
                            <p className="text-sm text-red-700">
                              Your payment could not be processed. Please check your M-Pesa balance and try again.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {payment.status === 'pending' && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start">
                          <FiClock className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-yellow-900">Payment Pending</h4>
                            <p className="text-sm text-yellow-700">
                              Your payment is being processed. You will receive a confirmation once completed.
                            </p>
                          </div>
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
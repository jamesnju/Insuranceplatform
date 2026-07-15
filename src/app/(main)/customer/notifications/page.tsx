'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthGuard from '@/components/common/AuthGuard';
import {
  FiBell,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiInfo,
  FiShield,
  FiFileText,
  FiDollarSign,
  FiClipboard,
  FiCheck,
  FiX,
  FiFilter,
  FiChevronDown,
  FiEye,
  FiTrash2,
  FiRefreshCw,
} from 'react-icons/fi';

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    type: 'policy_issued',
    title: 'Policy Issued',
    message: 'Your insurance policy for Samsung Galaxy S24 has been issued successfully.',
    read: false,
    createdAt: '2024-01-20T10:35:00',
    link: '/customer/policies/POL-2024-001',
    icon: FiShield,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment Confirmed',
    message: 'Your payment of KES 2,875 for policy #POL-2024-001 has been confirmed.',
    read: false,
    createdAt: '2024-01-20T10:30:00',
    link: '/customer/payments/PAY-2024-001',
    icon: FiDollarSign,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: '3',
    type: 'claim_updated',
    title: 'Claim Status Updated',
    message: 'Your claim #CLM-2024-001 is now under review by our claims team.',
    read: true,
    createdAt: '2024-01-19T14:20:00',
    link: '/customer/claims/CLM-2024-001',
    icon: FiClipboard,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  {
    id: '4',
    type: 'evidence_request',
    title: 'Evidence Required',
    message: 'Please upload additional evidence for your claim #CLM-2024-002.',
    read: true,
    createdAt: '2024-01-18T09:15:00',
    link: '/customer/claims/CLM-2024-002',
    icon: FiFileText,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    id: '5',
    type: 'policy_renewal',
    title: 'Policy Renewal Reminder',
    message: 'Your policy #POL-2024-004 is due for renewal in 30 days.',
    read: true,
    createdAt: '2024-01-15T08:00:00',
    link: '/customer/policies/POL-2024-004',
    icon: FiClock,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    id: '6',
    type: 'application_approved',
    title: 'Application Approved',
    message: 'Your asset application for MacBook Pro has been approved. You can now get a quote.',
    read: true,
    createdAt: '2024-01-14T16:45:00',
    link: '/customer/quotations',
    icon: FiCheckCircle,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    id: '7',
    type: 'system',
    title: 'System Update',
    message: 'The AI verification system has been updated with new features.',
    read: true,
    createdAt: '2024-01-12T11:00:00',
    link: null,
    icon: FiInfo,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
  },
];

const notificationFilters = [
  { value: 'all', label: 'All' },
  { value: 'unread', label: 'Unread' },
  { value: 'read', label: 'Read' },
];

const typeFilters = [
  { value: 'all', label: 'All Types' },
  { value: 'policy_issued', label: 'Policies' },
  { value: 'payment', label: 'Payments' },
  { value: 'claim_updated', label: 'Claims' },
  { value: 'evidence_request', label: 'Evidence' },
  { value: 'policy_renewal', label: 'Renewals' },
  { value: 'application_approved', label: 'Applications' },
  { value: 'system', label: 'System' },
];

export default function CustomerNotificationsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredNotifications = notifications.filter(notification => {
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'unread' && !notification.read) ||
      (statusFilter === 'read' && notification.read);
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    return matchesStatus && matchesType;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const formatDate = (date: string) => {
    const now = new Date();
    const notifDate = new Date(date);
    const diff = now.getTime() - notifDate.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) {
      return 'Just now';
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return notifDate.toLocaleDateString('en-KE', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const notifDate = new Date(date);
    const diff = now.getTime() - notifDate.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      return 'Just now';
    } else if (hours === 1) {
      return '1 hour ago';
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return formatDate(date);
    }
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
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">Stay updated with your insurance activities</p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium"
              >
                <FiCheck className="h-4 w-4 mr-2" />
                Mark All as Read
              </button>
            )}
            <button
              onClick={() => setNotifications(mockNotifications)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <FiRefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Unread</p>
            <p className="text-2xl font-bold text-primary-600">{unreadCount}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Read</p>
            <p className="text-2xl font-bold text-gray-600">{notifications.length - unreadCount}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">This Week</p>
            <p className="text-2xl font-bold text-gray-900">
              {notifications.filter(n => {
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return new Date(n.createdAt) > weekAgo;
              }).length}
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
              {filteredNotifications.length} notifications
            </span>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                <div className="flex flex-wrap gap-2">
                  {notificationFilters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setStatusFilter(filter.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        statusFilter === filter.value
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {filter.label}
                      {filter.value !== 'all' && (
                        <span className="ml-1 text-xs">
                          ({notifications.filter(n => 
                            filter.value === 'unread' ? !n.read : n.read
                          ).length})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Type</label>
                <div className="flex flex-wrap gap-2">
                  {typeFilters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setTypeFilter(filter.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        typeFilter === filter.value
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiBell className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">
              {statusFilter !== 'all' || typeFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'You\'re all caught up! Check back later for updates.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              const isUnread = !notification.read;
              
              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-xl shadow-sm border transition-all hover:shadow-md ${
                    isUnread ? 'border-l-4 border-l-primary-500 border-gray-200' : 'border-gray-200'
                  }`}
                >
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 ${notification.bgColor} rounded-xl flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 ${notification.color}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-900">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                                  New
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs text-gray-400 whitespace-nowrap">
                              {getTimeAgo(notification.createdAt)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center gap-3">
                          {notification.link && (
                            <Link
                              href={notification.link}
                              className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <FiEye className="h-4 w-4 mr-1" />
                              View Details
                            </Link>
                          )}
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
                            >
                              <FiCheck className="h-4 w-4 mr-1" />
                              Mark as Read
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-sm text-red-500 hover:text-red-700 flex items-center"
                          >
                            <FiTrash2 className="h-4 w-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
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
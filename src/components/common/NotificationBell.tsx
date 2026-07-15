'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiBell } from 'react-icons/fi';
import { useAuthStore } from '@/store/authStore';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
  link?: string;
}

export default function NotificationBell() {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications - in real app, fetch from API
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Policy Approved',
        message: 'Your insurance policy for Samsung Galaxy S24 has been approved.',
        type: 'success',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        link: '/customer/policies/1',
      },
      {
        id: '2',
        title: 'Payment Confirmed',
        message: 'Your M-Pesa payment of KES 2,500 has been confirmed.',
        type: 'success',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        link: '/customer/payments',
      },
      {
        id: '3',
        title: 'Evidence Required',
        message: 'Please upload additional evidence for your claim #CLM-2024-001.',
        type: 'warning',
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        link: '/customer/claims/1',
      },
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
    setUnreadCount(0);
  };

  const getTypeStyles = (type: Notification['type']) => {
    const styles = {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      error: 'bg-red-50 border-red-200 text-red-800',
    };
    return styles[type];
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
      >
        <FiBell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-primary-600 hover:text-primary-700"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-primary-600 flex-shrink-0"></span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {notification.message}
                      </p>
                      <div className="mt-2 flex items-center space-x-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getTypeStyles(notification.type)}`}>
                          {notification.type}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(notification.createdAt).toLocaleTimeString()}
                        </span>
                        {notification.link && (
                          <Link
                            href={notification.link}
                            onClick={() => {
                              markAsRead(notification.id);
                              setIsOpen(false);
                            }}
                            className="text-xs text-primary-600 hover:text-primary-700"
                          >
                            View
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-3 border-t border-gray-200">
            <Link
              href={`/${user?.role}/notifications`}
              className="block text-center text-sm text-primary-600 hover:text-primary-700"
              onClick={() => setIsOpen(false)}
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
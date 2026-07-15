'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { 
  FiHome, 
  FiBox, 
  FiFileText, 
  FiShield, 
  FiClipboard,
  FiUsers,
  FiSettings,
  FiBell,
  FiHelpCircle,
  FiDollarSign,
  FiTrendingUp,
  FiFlag,
  FiCheckCircle,
  FiXCircle,
  FiUserCheck,
  FiCreditCard,
  FiCalendar,
  FiAlertCircle,
  FiBarChart2,
  FiActivity,
  FiServer,
  FiLock,
  FiBookOpen,
} from 'react-icons/fi';

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const getNavigationItems = () => {
    if (!user) return [];

    const baseItems = [
      {
        name: 'Dashboard',
        href: `/${user.role}/dashboard`,
        icon: FiHome,
        roles: ['customer', 'insurance_officer', 'insurance_admin', 'claims_officer', 'claims_assessor', 'platform_admin'],
      },
    ];

    const roleSpecificItems: Record<string, any[]> = {
      customer: [
        { name: 'My Assets', href: '/customer/assets', icon: FiBox },
        { name: 'Add Asset', href: '/customer/add-asset', icon: FiFileText },
        { name: 'Quotations', href: '/customer/quotations', icon: FiTrendingUp },
        { name: 'My Policies', href: '/customer/policies', icon: FiShield },
        { name: 'Claims', href: '/customer/claims', icon: FiClipboard },
        { name: 'Payments', href: '/customer/payments', icon: FiCreditCard },
        { name: 'Notifications', href: '/customer/notifications', icon: FiBell },
        { name: 'Profile', href: '/customer/profile', icon: FiUserCheck },
        { name: 'Help & Support', href: '/customer/help', icon: FiHelpCircle },
      ],
      insurance_officer: [
        { name: 'Application Queue', href: '/insurance-officer/applications', icon: FiFileText },
        { name: 'Assigned Applications', href: '/insurance-officer/assigned', icon: FiCheckCircle },
        { name: 'High-Risk Applications', href: '/insurance-officer/high-risk', icon: FiAlertCircle },
        { name: 'Evidence Requests', href: '/insurance-officer/evidence-requests', icon: FiFileText },
        { name: 'Approved Applications', href: '/insurance-officer/approved', icon: FiCheckCircle },
        { name: 'Rejected Applications', href: '/insurance-officer/rejected', icon: FiXCircle },
        { name: 'Customers', href: '/insurance-officer/customers', icon: FiUsers },
        { name: 'Policies', href: '/insurance-officer/policies', icon: FiShield },
        { name: 'Claims', href: '/insurance-officer/claims', icon: FiClipboard },
        { name: 'Reports', href: '/insurance-officer/reports', icon: FiBarChart2 },
      ],
      claims_officer: [
        { name: 'New Claims', href: '/claims-officer/new-claims', icon: FiFileText },
        { name: 'Assigned Claims', href: '/claims-officer/assigned', icon: FiCheckCircle },
        { name: 'High-Risk Claims', href: '/claims-officer/high-risk-claims', icon: FiAlertCircle },
        { name: 'Awaiting Evidence', href: '/claims-officer/awaiting-evidence', icon: FiFileText },
        { name: 'Awaiting Assessment', href: '/claims-officer/awaiting-assessment', icon: FiUserCheck },
        { name: 'Awaiting Approval', href: '/claims-officer/awaiting-approval', icon: FiLock },
        { name: 'Approved Claims', href: '/claims-officer/approved-claims', icon: FiCheckCircle },
        { name: 'Rejected Claims', href: '/claims-officer/rejected-claims', icon: FiXCircle },
        { name: 'Settled Claims', href: '/claims-officer/settled', icon: FiDollarSign },
      ],
      claims_assessor: [
        { name: 'Assigned Assessments', href: '/claims-assessor/assigned', icon: FiFileText },
        { name: 'Scheduled Visits', href: '/claims-assessor/scheduled', icon: FiCalendar },
        { name: 'Completed Assessments', href: '/claims-assessor/completed', icon: FiCheckCircle },
      ],
      insurance_admin: [
        { name: 'Insurance Products', href: '/insurance-admin/products', icon: FiBox },
        { name: 'Pricing Rules', href: '/insurance-admin/pricing-rules', icon: FiDollarSign },
        { name: 'Underwriting Rules', href: '/insurance-admin/underwriting-rules', icon: FiShield },
        { name: 'Approval Limits', href: '/insurance-admin/approval-limits', icon: FiTrendingUp },
        { name: 'Claims Rules', href: '/insurance-admin/claims-rules', icon: FiClipboard },
        { name: 'Policy Templates', href: '/insurance-admin/policy-templates', icon: FiFileText },
        { name: 'Officers', href: '/insurance-admin/officers', icon: FiUsers },
        { name: 'Claims Officers', href: '/insurance-admin/claims-officers', icon: FiUserCheck },
        { name: 'Assessors', href: '/insurance-admin/assessors', icon: FiUsers },
        { name: 'Applications', href: '/insurance-admin/applications', icon: FiFileText },
        { name: 'Policies', href: '/insurance-admin/policies', icon: FiShield },
        { name: 'Claims', href: '/insurance-admin/claims', icon: FiClipboard },
        { name: 'Reports', href: '/insurance-admin/reports', icon: FiBarChart2 },
        { name: 'Settings', href: '/insurance-admin/settings', icon: FiSettings },
        { name: 'Audit Logs', href: '/insurance-admin/audit-logs', icon: FiBookOpen },
      ],
      platform_admin: [
        { name: 'Insurers', href: '/platform-admin/insurers', icon: FiServer },
        { name: 'Insurer Users', href: '/platform-admin/insurer-users', icon: FiUsers },
        { name: 'Customers', href: '/platform-admin/customers', icon: FiUsers },
        { name: 'Assets', href: '/platform-admin/assets', icon: FiBox },
        { name: 'Applications', href: '/platform-admin/applications', icon: FiFileText },
        { name: 'Policies', href: '/platform-admin/policies', icon: FiShield },
        { name: 'Claims', href: '/platform-admin/claims', icon: FiClipboard },
        { name: 'Payments', href: '/platform-admin/payments', icon: FiCreditCard },
        { name: 'AI Jobs', href: '/platform-admin/ai-jobs', icon: FiActivity },
        { name: 'Fraud Alerts', href: '/platform-admin/fraud-alerts', icon: FiFlag },
        { name: 'Integrations', href: '/platform-admin/integrations', icon: FiServer },
        { name: 'Notifications', href: '/platform-admin/notifications', icon: FiBell },
        { name: 'Support Tickets', href: '/platform-admin/support-tickets', icon: FiHelpCircle },
        { name: 'Reports', href: '/platform-admin/reports', icon: FiBarChart2 },
        { name: 'System Settings', href: '/platform-admin/system-settings', icon: FiSettings },
        { name: 'User Roles', href: '/platform-admin/user-roles', icon: FiLock },
        { name: 'Audit Logs', href: '/platform-admin/audit-logs', icon: FiBookOpen },
        { name: 'Security Logs', href: '/platform-admin/security-logs', icon: FiShield },
        { name: 'System Health', href: '/platform-admin/system-health', icon: FiActivity },
      ],
    };

    const items = [...baseItems];
    const roleItems = roleSpecificItems[user.role] || [];
    
    // Filter items based on role
    const filteredItems = items.filter(item => 
      !item.roles || item.roles.includes(user.role)
    );

    return [...filteredItems, ...roleItems];
  };

  const navigationItems = getNavigationItems();

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <aside className="fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 overflow-y-auto z-40">
      <nav className="px-3 py-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  isActive(item.href) ? 'text-primary-600' : 'text-gray-400'
                }`} />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Bottom section with logout */}
        <div className="border-t border-gray-200 mt-6 pt-6">
          <button
            onClick={() => {
              // Handle logout
            }}
            className="flex w-full items-center px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <FiXCircle className="mr-3 h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
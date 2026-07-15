import React from 'react';
import { 
  FiCheckCircle, 
  FiClock, 
  FiXCircle, 
  FiAlertTriangle,
  FiInfo,
  FiRefreshCw,
  FiShield,
  FiBook,
  FiFileText,
  FiDollarSign,
  FiUserCheck,
  FiUserX,
  FiAlertCircle,
} from 'react-icons/fi';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
}

export default function StatusBadge({ 
  status, 
  size = 'md', 
  className = '',
  showIcon = true,
}: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; color: string; icon: any }> = {
      // Common statuses
      'active': {
        label: 'Active',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: FiCheckCircle,
      },
      'inactive': {
        label: 'Inactive',
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: FiClock,
      },
      'pending': {
        label: 'Pending',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: FiClock,
      },
      'approved': {
        label: 'Approved',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: FiCheckCircle,
      },
      'rejected': {
        label: 'Rejected',
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: FiXCircle,
      },
      'submitted': {
        label: 'Submitted',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: FiFileText,
      },
      'review': {
        label: 'Under Review',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: FiRefreshCw,
      },
      'verified': {
        label: 'Verified',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: FiCheckCircle,
      },
      'expired': {
        label: 'Expired',
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: FiClock,
      },
      'suspended': {
        label: 'Suspended',
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: FiAlertTriangle,
      },
      
      // Asset statuses
      'draft': {
        label: 'Draft',
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: FiBook,
      },
      'ai_verification_in_progress': {
        label: 'AI Verifying',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: FiRefreshCw,
      },
      'more_evidence_required': {
        label: 'Evidence Required',
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: FiAlertCircle,
      },
      'under_officer_review': {
        label: 'Officer Review',
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: FiUserCheck,
      },
      'insured': {
        label: 'Insured',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: FiShield,
      },
      'policy_expired': {
        label: 'Policy Expired',
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: FiClock,
      },
      'claim_in_progress': {
        label: 'Claim in Progress',
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: FiAlertTriangle,
      },

      // Application statuses
      'generated': {
        label: 'Generated',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: FiFileText,
      },
      'awaiting_customer_selection': {
        label: 'Awaiting Selection',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: FiClock,
      },
      'selected': {
        label: 'Selected',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: FiCheckCircle,
      },
      'cancelled': {
        label: 'Cancelled',
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: FiXCircle,
      },
      'payment_pending': {
        label: 'Payment Pending',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: FiDollarSign,
      },
      'paid': {
        label: 'Paid',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: FiDollarSign,
      },
      'converted_to_policy': {
        label: 'Converted to Policy',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: FiShield,
      },

      // Claim statuses
      'assessment_assigned': {
        label: 'Assessment Assigned',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: FiUserCheck,
      },
      'awaiting_evidence': {
        label: 'Awaiting Evidence',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: FiFileText,
      },
      'awaiting_assessment': {
        label: 'Awaiting Assessment',
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: FiUserCheck,
      },
      'awaiting_approval': {
        label: 'Awaiting Approval',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: FiUserCheck,
      },
      'settled': {
        label: 'Settled',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: FiDollarSign,
      },

      // Assessment statuses
      'accepted': {
        label: 'Accepted',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: FiCheckCircle,
      },
      'scheduled': {
        label: 'Scheduled',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: FiClock,
      },
      'inspection_completed': {
        label: 'Inspection Completed',
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: FiCheckCircle,
      },
      'report_in_progress': {
        label: 'Report in Progress',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: FiFileText,
      },
      'report_submitted': {
        label: 'Report Submitted',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: FiFileText,
      },
      'returned_for_clarification': {
        label: 'Clarification Needed',
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: FiAlertCircle,
      },
      'closed': {
        label: 'Closed',
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: FiCheckCircle,
      },

      // Evidence request statuses
      'sent': {
        label: 'Sent',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: FiFileText,
      },
      'viewed_by_customer': {
        label: 'Viewed by Customer',
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: FiUserCheck,
      },
      'customer_responded': {
        label: 'Customer Responded',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: FiCheckCircle,
      },
      'satisfied': {
        label: 'Satisfied',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: FiCheckCircle,
      },

      // Payment statuses
      'initiated': {
        label: 'Initiated',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: FiClock,
      },
      'successful': {
        label: 'Successful',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: FiCheckCircle,
      },
      'failed': {
        label: 'Failed',
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: FiXCircle,
      },
      'timed_out': {
        label: 'Timed Out',
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: FiClock,
      },
      'reversed': {
        label: 'Reversed',
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: FiRefreshCw,
      },
      'refunded': {
        label: 'Refunded',
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: FiDollarSign,
      },
      'under_reconciliation': {
        label: 'Under Reconciliation',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: FiRefreshCw,
      },

      // Identity verification statuses
      'not_started': {
        label: 'Not Started',
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: FiClock,
      },
      'in_progress': {
        label: 'In Progress',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: FiRefreshCw,
      },
      'automatically_verified': {
        label: 'Auto Verified',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: FiCheckCircle,
      },
      'pending_manual_review': {
        label: 'Pending Review',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: FiUserCheck,
      },
      'more_information_required': {
        label: 'More Info Required',
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: FiAlertCircle,
      },
    };

    return configs[status] || {
      label: status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      icon: FiInfo,
    };
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.color} ${sizeClasses[size]} ${className}`}
    >
      {showIcon && <Icon className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'}`} />}
      {config.label}
    </span>
  );
}
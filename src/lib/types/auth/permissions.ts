import { UserRole } from '@/lib/types/common';

export interface Permission {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage' | 'assign';
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  customer: [
    { resource: 'profile', action: 'read' },
    { resource: 'profile', action: 'update' },
    { resource: 'assets', action: 'create' },
    { resource: 'assets', action: 'read' },
    { resource: 'assets', action: 'update' },
    { resource: 'quotations', action: 'read' },
    { resource: 'policies', action: 'read' },
    { resource: 'claims', action: 'create' },
    { resource: 'claims', action: 'read' },
    { resource: 'payments', action: 'create' },
    { resource: 'payments', action: 'read' },
    { resource: 'notifications', action: 'read' },
  ],
  insurance_officer: [
    { resource: 'applications', action: 'read' },
    { resource: 'applications', action: 'update' },
    { resource: 'applications', action: 'manage' },
    { resource: 'customers', action: 'read' },
    { resource: 'assets', action: 'read' },
    { resource: 'assets', action: 'update' },
    { resource: 'evidence', action: 'manage' },
    { resource: 'policies', action: 'read' },
    { resource: 'claims', action: 'read' },
    { resource: 'claims', action: 'update' },
    { resource: 'reports', action: 'read' },
  ],
  insurance_admin: [
    { resource: 'products', action: 'manage' },
    { resource: 'pricing', action: 'manage' },
    { resource: 'underwriting', action: 'manage' },
    { resource: 'approval_limits', action: 'manage' },
    { resource: 'claims_rules', action: 'manage' },
    { resource: 'policy_templates', action: 'manage' },
    { resource: 'officers', action: 'manage' },
    { resource: 'claims_officers', action: 'manage' },
    { resource: 'assessors', action: 'manage' },
    { resource: 'applications', action: 'read' },
    { resource: 'policies', action: 'read' },
    { resource: 'claims', action: 'read' },
    { resource: 'reports', action: 'read' },
    { resource: 'settings', action: 'manage' },
    { resource: 'audit_logs', action: 'read' },
  ],
  claims_officer: [
    { resource: 'claims', action: 'read' },
    { resource: 'claims', action: 'update' },
    { resource: 'claims', action: 'manage' },
    { resource: 'customers', action: 'read' },
    { resource: 'policies', action: 'read' },
    { resource: 'assets', action: 'read' },
    { resource: 'assessors', action: 'assign' },
    { resource: 'assessments', action: 'read' },
    { resource: 'reports', action: 'read' },
  ],
  claims_assessor: [
    { resource: 'assessments', action: 'read' },
    { resource: 'assessments', action: 'update' },
    { resource: 'assessments', action: 'manage' },
    { resource: 'customers', action: 'read' },
    { resource: 'assets', action: 'read' },
    { resource: 'claims', action: 'read' },
    { resource: 'reports', action: 'create' },
  ],
  platform_admin: [
    { resource: '*', action: 'manage' },
  ],
  support_agent: [
    { resource: 'customers', action: 'read' },
    { resource: 'customers', action: 'update' },
    { resource: 'applications', action: 'read' },
    { resource: 'claims', action: 'read' },
    { resource: 'policies', action: 'read' },
    { resource: 'support_tickets', action: 'manage' },
    { resource: 'notifications', action: 'create' },
  ],
};

export function hasPermission(
  userRole: UserRole,
  resource: string,
  action: Permission['action']
): boolean {
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.some(
    (p) => (p.resource === resource || p.resource === '*') && 
           (p.action === action || p.action === 'manage')
  );
}

export function isAuthorized(
  userRole: UserRole,
  requiredRoles: UserRole[]
): boolean {
  return requiredRoles.includes(userRole);
}
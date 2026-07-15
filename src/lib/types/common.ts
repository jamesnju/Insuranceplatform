export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}

export interface StatusEntity {
  status: string;
  previousStatus?: string;
  statusChangedBy?: string;
  statusChangeReason?: string;
  statusChangedAt?: Date;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type UserRole = 
  | 'customer'
  | 'insurance_officer'
  | 'insurance_admin'
  | 'claims_officer'
  | 'claims_assessor'
  | 'platform_admin'
  | 'support_agent';

export interface User extends BaseEntity {
  email: string;
  phoneNumber: string;
  fullName: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  lastLogin?: Date;
  profileImage?: string;
}
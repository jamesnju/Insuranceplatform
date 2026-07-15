import { User, UserRole } from './common';

export interface LoginCredentials {
  phoneNumber?: string;
  email?: string;
  password: string;
}

export interface RegisterCredentials {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  consentDataProcessing: boolean;
}

export interface OTPVerification {
  phoneNumber: string;
  otp: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface PasswordReset {
  email: string;
  otp?: string;
  newPassword?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
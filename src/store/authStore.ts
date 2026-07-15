import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, RegisterCredentials } from '@/lib/types/auth';
import { User } from '@/lib/types/common';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<{ user: User }>;
  register: (data: RegisterCredentials) => Promise<void>;
  logout: () => void;
  verifyOTP: (phoneNumber: string, otp: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (user: Partial<User>) => void;
  clearError: () => void;
}

// Mock user data for demo
const mockUsers: Record<string, { user: User; password: string }> = {
  'customer@demo.com': {
    user: {
      id: '1',
      email: 'customer@demo.com',
      phoneNumber: '0712345678',
      fullName: 'John Customer',
      role: 'customer',
      isVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    password: 'password123',
  },
  'officer@demo.com': {
    user: {
      id: '2',
      email: 'officer@demo.com',
      phoneNumber: '0723456789',
      fullName: 'Jane Officer',
      role: 'insurance_officer',
      isVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    password: 'password123',
  },
  'admin@demo.com': {
    user: {
      id: '3',
      email: 'admin@demo.com',
      phoneNumber: '0734567890',
      fullName: 'Admin User',
      role: 'platform_admin',
      isVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    password: 'password123',
  },
  'claimsofficer@demo.com': {
    user: {
      id: '1',
      email: 'claimsofficer@demo.com',
      phoneNumber: '0712345678',
      fullName: 'claims officer',
      role: 'claims_officer',
      isVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    password: 'password123',
  },
  'support@demo.com': {
    user: {
      id: '2',
      email: 'support@demo.com',
      phoneNumber: '0723456789',
      fullName: 'support Officer',
      role: 'support_agent',
      isVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    password: 'password123',
  },
  'claimsassessor@demo.com': {
    user: {
      id: '3',
      email: 'claimsassessor@demo.com',
      phoneNumber: '0734567890',
      fullName: 'Claims Assessor',
      role: 'claims_assessor',
      isVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    password: 'password123',
  },
  'insuranceadmin@demo.com': {
    user: {
      id: '3',
      email: 'insuranceadmin@demo.com',
      phoneNumber: '0734567890',
      fullName: 'Insurance Admin',
      role: 'insurance_admin',
      isVerified: true,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    password: 'password123',
  },
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          const mockUser = mockUsers[email];
          if (!mockUser || mockUser.password !== password) {
            throw new Error('Invalid credentials');
          }

          set({
            user: mockUser.user,
            token: 'mock-jwt-token',
            isAuthenticated: true,
            isLoading: false,
          });

          return { user: mockUser.user };
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (data: RegisterCredentials) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          // Check if user already exists
          if (mockUsers[data.email]) {
            throw new Error('User already exists');
          }

          const newUser: User = {
            id: Date.now().toString(),
            email: data.email,
            phoneNumber: data.phoneNumber,
            fullName: data.fullName,
            role: 'customer',
            isVerified: false,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          // In real app, this would be saved to the backend
          mockUsers[data.email] = {
            user: newUser,
            password: data.password,
          };

          set({
            user: newUser,
            token: 'mock-jwt-token',
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
        // Clear any stored data
        localStorage.removeItem('auth-storage');
      },

      verifyOTP: async (phoneNumber: string, otp: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          // Mock OTP verification - accept any 6-digit code
          if (!/^\d{6}$/.test(otp)) {
            throw new Error('Invalid OTP format');
          }

          const currentUser = get().user;
          if (currentUser) {
            set({
              user: { ...currentUser, isVerified: true },
              isLoading: false,
            });
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'OTP verification failed',
            isLoading: false,
          });
          throw error;
        }
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          if (!mockUsers[email]) {
            throw new Error('User not found');
          }
          
          set({ isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Password reset failed',
            isLoading: false,
          });
          throw error;
        }
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
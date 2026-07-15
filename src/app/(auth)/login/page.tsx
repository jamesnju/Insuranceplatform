'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import { FiEye, FiEyeOff, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Map roles to dashboard routes
const getDashboardRoute = (role: string): string => {
  const routes: Record<string, string> = {
    customer: '/customer/dashboard',
    insurance_officer: '/insuranceofficer/dashboard',
    insurance_admin: '/insuranceadmin/dashboard',
    claims_officer: '/claimsofficer/dashboard',
    claims_assessor: '/claimsassessor/dashboard',
    platform_admin: '/platformadmin/dashboard',
    support_agent: '/support/dashboard',
  };
  return routes[role] || '/';
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading, error, clearError, user } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState<string | null>(null);

  const returnUrl = searchParams.get('returnUrl');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const dashboardRoute = getDashboardRoute(user.role);
      router.push(dashboardRoute);
    }
  }, [user, router]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data.email, data.password);
      toast.success('Login successful!');
      // Redirect to role-based dashboard or return URL
      const redirectPath = returnUrl || getDashboardRoute(result.user.role);
      router.push(redirectPath);
    } catch (err) {
      // Error is handled in the store
    }
  };

  const handleDemoLogin = async (email: string, password: string) => {
    setIsDemoLoading(email);
    try {
      const result = await login(email, password);
      toast.success('Demo login successful!');
      const redirectPath = returnUrl || getDashboardRoute(result.user.role);
      router.push(redirectPath);
    } catch (err) {
      // Error is handled in the store
    } finally {
      setIsDemoLoading(null);
    }
  };

  const demoUsers = [
    { 
      role: 'Customer', 
      email: 'customer@demo.com', 
      password: 'password123',
      icon: '👤'
    },
    { 
      role: 'Insurance Officer', 
      email: 'officer@demo.com', 
      password: 'password123',
      icon: '👔'
    },
    { 
      role: 'Platform Admin', 
      email: 'admin@demo.com', 
      password: 'password123',
      icon: '⚙️'
    },



     { 
      role: 'Insurance Admin', 
      email: 'insuranceadmin@demo.com', 
      password: 'password123',
      icon: '👤'
    },
    { 
      role: 'Claim Officer', 
      email: 'claimsofficer@demo.com', 
      password: 'password123',
      icon: '👔'
    },
    { 
      role: 'Support Agent', 
      email: 'support@demo.com', 
      password: 'password123',
      icon: '⚙️'
    },
    { 
      role: 'Claims Assessor', 
      email: 'claimsassessor@demo.com', 
      password: 'password123',
      icon: '⚙️'
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 via-white to-blue-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">🛡️</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account to manage your insurance
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('password')}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                <>
                  Sign in
                  <FiArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Demo Users Section */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-2">
            {demoUsers.map((demo) => (
              <button
                key={demo.email}
                onClick={() => handleDemoLogin(demo.email, demo.password)}
                disabled={!!isDemoLoading}
                className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-primary-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="flex items-center">
                  <span className="mr-2">{demo.icon}</span>
                  <span>{demo.role}</span>
                </span>
                {isDemoLoading === demo.email ? (
                  <svg className="animate-spin h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <span className="text-xs text-gray-400 group-hover:text-primary-600 transition-colors">
                    Demo Login →
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-center text-gray-500">
            Use these demo accounts to explore the platform. No credit card required.
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-primary-600 hover:text-primary-500">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
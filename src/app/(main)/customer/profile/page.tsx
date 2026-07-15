'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthGuard from '@/components/common/AuthGuard';
import StatusBadge from '@/components/common/StatusBadge';
import { useAuthStore } from '@/store/authStore';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiEdit2,
  FiSave,
  FiX,
  FiCamera,
  FiShield,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiFileText,
  FiDollarSign,
  FiKey,
  FiLock,
  FiSmartphone,
  FiHome,
  FiBriefcase,
  FiGlobe,
} from 'react-icons/fi';
import { BiBell, BiClipboard } from 'react-icons/bi';

// Mock user profile data
const mockProfileData = {
  personalInfo: {
    fullName: 'John Customer',
    email: 'customer@demo.com',
    phoneNumber: '0712345678',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    nationality: 'Kenyan',
    idNumber: '12345678',
    occupation: 'Software Developer',
  },
  address: {
    physicalAddress: '123 Ngong Road',
    county: 'Nairobi',
    town: 'Nairobi',
    postalAddress: 'P.O. Box 12345-00100',
    country: 'Kenya',
  },
  verification: {
    status: 'verified',
    idVerified: true,
    phoneVerified: true,
    emailVerified: true,
    verificationDate: '2024-01-15',
    verificationMethod: 'ID & Selfie',
  },
  stats: {
    totalAssets: 3,
    activePolicies: 2,
    totalClaims: 4,
    totalSpent: 8750,
  },
};

export default function CustomerProfilePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(mockProfileData);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    idNumber: '',
    occupation: '',
    physicalAddress: '',
    county: '',
    town: '',
    postalAddress: '',
    country: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Populate form data from profile data
    setFormData({
      fullName: profileData.personalInfo.fullName,
      email: profileData.personalInfo.email,
      phoneNumber: profileData.personalInfo.phoneNumber,
      dateOfBirth: profileData.personalInfo.dateOfBirth,
      gender: profileData.personalInfo.gender || '',
      nationality: profileData.personalInfo.nationality || '',
      idNumber: profileData.personalInfo.idNumber || '',
      occupation: profileData.personalInfo.occupation || '',
      physicalAddress: profileData.address.physicalAddress,
      county: profileData.address.county,
      town: profileData.address.town,
      postalAddress: profileData.address.postalAddress,
      country: profileData.address.country,
    });
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update profile data
    setProfileData({
      ...profileData,
      personalInfo: {
        ...profileData.personalInfo,
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        nationality: formData.nationality,
        idNumber: formData.idNumber,
        occupation: formData.occupation,
      },
      address: {
        physicalAddress: formData.physicalAddress,
        county: formData.county,
        town: formData.town,
        postalAddress: formData.postalAddress,
        country: formData.country,
      },
    });
    
    setSuccessMessage('Profile updated successfully!');
    setIsSaving(false);
    setIsEditing(false);
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      fullName: profileData.personalInfo.fullName,
      email: profileData.personalInfo.email,
      phoneNumber: profileData.personalInfo.phoneNumber,
      dateOfBirth: profileData.personalInfo.dateOfBirth,
      gender: profileData.personalInfo.gender || '',
      nationality: profileData.personalInfo.nationality || '',
      idNumber: profileData.personalInfo.idNumber || '',
      occupation: profileData.personalInfo.occupation || '',
      physicalAddress: profileData.address.physicalAddress,
      county: profileData.address.county,
      town: profileData.address.town,
      postalAddress: profileData.address.postalAddress,
      country: profileData.address.country,
    });
    setIsEditing(false);
  };

  const getVerificationStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      verified: 'text-green-600 bg-green-50 border-green-200',
      pending: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      rejected: 'text-red-600 bg-red-50 border-red-200',
      not_started: 'text-gray-600 bg-gray-50 border-gray-200',
    };
    return colors[status] || colors.not_started;
  };

  const getVerificationIcon = (status: string) => {
    const icons: Record<string, any> = {
      verified: FiCheckCircle,
      pending: FiClock,
      rejected: FiAlertCircle,
      not_started: FiAlertCircle,
    };
    return icons[status] || FiAlertCircle;
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

  const VerificationIcon = getVerificationIcon(profileData.verification.status);

  return (
    <AuthGuard requiredRoles={['customer']}>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center text-green-800">
            <FiCheckCircle className="h-5 w-5 mr-2 text-green-600 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full text-primary-600 hover:bg-gray-100 transition-colors">
                  <FiCamera className="h-4 w-4" />
                </button>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{profileData.personalInfo.fullName}</h1>
                <p className="text-primary-100">{profileData.personalInfo.occupation || 'Customer'}</p>
                <div className="mt-1 flex items-center gap-2">
                  <StatusBadge status={profileData.verification.status} size="sm" />
                  <span className="text-xs text-primary-200">
                    Verified on {new Date(profileData.verification.verificationDate).toLocaleDateString('en-KE', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-primary-100">Member since</p>
                <p className="font-medium">
                  {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-KE', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2 text-sm"
              >
                <FiEdit2 className="h-4 w-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Total Assets</p>
            <p className="text-2xl font-bold text-gray-900">{profileData.stats.totalAssets}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Active Policies</p>
            <p className="text-2xl font-bold text-green-600">{profileData.stats.activePolicies}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Total Claims</p>
            <p className="text-2xl font-bold text-yellow-600">{profileData.stats.totalClaims}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Total Spent</p>
            <p className="text-2xl font-bold text-gray-900">KES {profileData.stats.totalSpent.toLocaleString()}</p>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FiUser className="h-5 w-5 text-primary-600" />
              Personal Information
            </h2>
            
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nationality
                    </label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      placeholder="e.g., Kenyan"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      National ID Number
                    </label>
                    <input
                      type="text"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      placeholder="Enter ID number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Occupation
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      placeholder="e.g., Software Developer"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <FiMapPin className="h-4 w-4 text-primary-600" />
                    Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Physical Address
                      </label>
                      <input
                        type="text"
                        name="physicalAddress"
                        value={formData.physicalAddress}
                        onChange={handleInputChange}
                        placeholder="e.g., 123 Ngong Road"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        County
                      </label>
                      <input
                        type="text"
                        name="county"
                        value={formData.county}
                        onChange={handleInputChange}
                        placeholder="e.g., Nairobi"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Town
                      </label>
                      <input
                        type="text"
                        name="town"
                        value={formData.town}
                        onChange={handleInputChange}
                        placeholder="e.g., Nairobi"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Address
                      </label>
                      <input
                        type="text"
                        name="postalAddress"
                        value={formData.postalAddress}
                        onChange={handleInputChange}
                        placeholder="e.g., P.O. Box 12345-00100"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiSave className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900">{profileData.personalInfo.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{profileData.personalInfo.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium text-gray-900">{profileData.personalInfo.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium text-gray-900">
                      {new Date(profileData.personalInfo.dateOfBirth).toLocaleDateString('en-KE', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  {profileData.personalInfo.gender && (
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium text-gray-900">{profileData.personalInfo.gender}</p>
                    </div>
                  )}
                  {profileData.personalInfo.nationality && (
                    <div>
                      <p className="text-sm text-gray-500">Nationality</p>
                      <p className="font-medium text-gray-900">{profileData.personalInfo.nationality}</p>
                    </div>
                  )}
                  {profileData.personalInfo.idNumber && (
                    <div>
                      <p className="text-sm text-gray-500">National ID</p>
                      <p className="font-medium text-gray-900">{profileData.personalInfo.idNumber}</p>
                    </div>
                  )}
                  {profileData.personalInfo.occupation && (
                    <div>
                      <p className="text-sm text-gray-500">Occupation</p>
                      <p className="font-medium text-gray-900">{profileData.personalInfo.occupation}</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <FiMapPin className="h-4 w-4 text-primary-600" />
                    Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Physical Address</p>
                      <p className="font-medium text-gray-900">{profileData.address.physicalAddress}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">County</p>
                      <p className="font-medium text-gray-900">{profileData.address.county}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Town</p>
                      <p className="font-medium text-gray-900">{profileData.address.town}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Postal Address</p>
                      <p className="font-medium text-gray-900">{profileData.address.postalAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Verification Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiShield className="h-5 w-5 text-primary-600" />
                Verification Status
              </h2>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getVerificationStatusColor(profileData.verification.status)}`}>
                <VerificationIcon className="h-4 w-4 mr-2" />
                {profileData.verification.status.charAt(0).toUpperCase() + profileData.verification.status.slice(1)}
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">ID Verification</span>
                  {profileData.verification.idVerified ? (
                    <FiCheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <FiClock className="h-5 w-5 text-yellow-600" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Phone Verification</span>
                  {profileData.verification.phoneVerified ? (
                    <FiCheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <FiClock className="h-5 w-5 text-yellow-600" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email Verification</span>
                  {profileData.verification.emailVerified ? (
                    <FiCheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <FiClock className="h-5 w-5 text-yellow-600" />
                  )}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Verified on {new Date(profileData.verification.verificationDate).toLocaleDateString('en-KE', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-xs text-gray-500">Method: {profileData.verification.verificationMethod}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link
                  href="/customer/add-asset"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <FiFileText className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Add New Asset</p>
                    <p className="text-xs text-gray-500">Register a new device</p>
                  </div>
                </Link>
                <Link
                  href="/customer/claims/new"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                    <BiClipboard className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Submit Claim</p>
                    <p className="text-xs text-gray-500">File a new insurance claim</p>
                  </div>
                </Link>
                <Link
                  href="/customer/policies"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <FiShield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">View Policies</p>
                    <p className="text-xs text-gray-500">Manage your insurance</p>
                  </div>
                </Link>
                <Link
                  href="/customer/notifications"
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <BiBell className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Notifications</p>
                    <p className="text-xs text-gray-500">View your alerts</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiLock className="h-5 w-5 text-primary-600" />
                Security
              </h2>
              <div className="space-y-3">
                <Link
                  href="/profile/change-password"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FiKey className="h-5 w-5 text-gray-600" />
                    <span className="text-sm text-gray-700">Change Password</span>
                  </div>
                  <FiEdit2 className="h-4 w-4 text-gray-400" />
                </Link>
                <Link
                  href="/profile/two-factor"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FiSmartphone className="h-5 w-5 text-gray-600" />
                    <span className="text-sm text-gray-700">Two-Factor Authentication</span>
                  </div>
                  <span className="text-xs font-medium text-gray-500">Disabled</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
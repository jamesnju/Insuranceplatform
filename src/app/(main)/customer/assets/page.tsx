'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthGuard from '@/components/common/AuthGuard';
import StatusBadge from '@/components/common/StatusBadge';
import {
  FiBox,
  FiPlus,
  FiSearch,
  FiFilter,
  FiEye,
  FiEdit,
  FiTrash2,
  FiSmartphone,
  FiMonitor,
  FiCamera,
  FiCast,
  FiArrowRight,
  FiGrid,
  FiList,
  FiChevronDown,
} from 'react-icons/fi';
import { BiLaptop } from 'react-icons/bi';

// Mock assets data
const mockAssets = [
  {
    id: '1',
    name: 'Samsung Galaxy S24',
    category: 'phone',
    brand: 'Samsung',
    model: 'Galaxy S24',
    serialNumber: 'SN123456789',
    purchasePrice: 130000,
    purchaseDate: '2024-01-15',
    condition: 'excellent',
    status: 'insured',
    createdAt: '2024-01-15T10:30:00',
  },
  {
    id: '2',
    name: 'MacBook Pro 16"',
    category: 'laptop',
    brand: 'Apple',
    model: 'MacBook Pro',
    serialNumber: 'SN987654321',
    purchasePrice: 350000,
    purchaseDate: '2024-01-20',
    condition: 'good',
    status: 'insured',
    createdAt: '2024-01-20T14:20:00',
  },
  {
    id: '3',
    name: 'Sony Alpha A7 IV',
    category: 'camera',
    brand: 'Sony',
    model: 'Alpha A7 IV',
    serialNumber: 'SN456789123',
    purchasePrice: 280000,
    purchaseDate: '2024-02-01',
    condition: 'new',
    status: 'submitted',
    createdAt: '2024-02-01T09:15:00',
  },
  {
    id: '4',
    name: 'iPad Pro 12.9"',
    category: 'tablet',
    brand: 'Apple',
    model: 'iPad Pro',
    serialNumber: 'SN789123456',
    purchasePrice: 150000,
    purchaseDate: '2024-02-10',
    condition: 'excellent',
    status: 'under_officer_review',
    createdAt: '2024-02-10T11:45:00',
  },
];

const categoryIcons: Record<string, any> = {
  phone: FiSmartphone,
  laptop: BiLaptop,
  tablet: FiMonitor,
  television: FiMonitor,
  camera: FiCamera,
  gaming_console: FiCast,
};

const statusFilters = [
  { value: 'all', label: 'All Assets' },
  { value: 'insured', label: 'Insured' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'under_officer_review', label: 'Under Review' },
  { value: 'verified', label: 'Verified' },
  { value: 'rejected', label: 'Rejected' },
];

export default function CustomerAssetsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState(mockAssets);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asset.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getCategoryIcon = (category: string) => {
    return categoryIcons[category] || FiBox;
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      phone: 'Phone',
      laptop: 'Laptop',
      tablet: 'Tablet',
      television: 'Television',
      camera: 'Camera',
      gaming_console: 'Gaming Console',
    };
    return labels[category] || category;
  };

  const getStatusCount = (status: string) => {
    if (status === 'all') return assets.length;
    return assets.filter(a => a.status === status).length;
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
            <h1 className="text-2xl font-bold text-gray-900">My Assets</h1>
            <p className="text-gray-600 mt-1">Manage and track your insured devices</p>
          </div>
          <Link
            href="/customer/addasset"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <FiPlus className="h-5 w-5 mr-2" />
            Add New Asset
          </Link>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Total Assets</p>
            <p className="text-2xl font-bold text-gray-900">{assets.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Insured</p>
            <p className="text-2xl font-bold text-green-600">
              {assets.filter(a => a.status === 'insured').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Under Review</p>
            <p className="text-2xl font-bold text-yellow-600">
              {assets.filter(a => a.status === 'under_officer_review').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600">Total Value</p>
            <p className="text-2xl font-bold text-gray-900">
              KES {assets.reduce((sum, a) => sum + a.purchasePrice, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, brand, model, or serial number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div className="flex gap-2">
              {/* Status Filter */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FiFilter className="h-4 w-4 mr-2" />
                Filter
                <FiChevronDown className="h-4 w-4 ml-2" />
              </button>
              
              {/* View Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${
                    viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 border-l border-gray-300 ${
                    viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiList className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {statusFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setStatusFilter(filter.value)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      statusFilter === filter.value
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label} ({getStatusCount(filter.value)})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Assets Grid */}
        {filteredAssets.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiBox className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No assets found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || statusFilter !== 'all' 
                ? 'Try adjusting your filters'
                : 'Start by adding your first asset'}
            </p>
            <Link
              href="/customer/add-asset"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FiPlus className="h-5 w-5 mr-2" />
              Add Your First Asset
            </Link>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => {
              const Icon = getCategoryIcon(asset.category);
              return (
                <div key={asset.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{asset.name}</h3>
                          <p className="text-sm text-gray-500">{asset.brand} {asset.model}</p>
                        </div>
                      </div>
                      <StatusBadge status={asset.status} size="sm" />
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Serial Number</p>
                        <p className="font-medium text-gray-900">{asset.serialNumber}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Value</p>
                        <p className="font-medium text-gray-900">KES {asset.purchasePrice.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Category</p>
                        <p className="font-medium text-gray-900">{getCategoryLabel(asset.category)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Condition</p>
                        <p className="font-medium text-gray-900 capitalize">{asset.condition}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between">
                    <Link
                      href={`/customer/assets/${asset.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center"
                    >
                      <FiEye className="h-4 w-4 mr-1" />
                      View Details
                    </Link>
                    <Link
                      href={`/customer/assets/${asset.id}/edit`}
                      className="text-gray-600 hover:text-gray-900 text-sm flex items-center"
                    >
                      <FiEdit className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                      Asset
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                      Category
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                      Serial Number
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                      Value
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                      Status
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAssets.map((asset) => {
                    const Icon = getCategoryIcon(asset.category);
                    return (
                      <tr key={asset.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                              <Icon className="h-5 w-5 text-primary-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{asset.name}</p>
                              <p className="text-sm text-gray-500">{asset.brand} {asset.model}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {getCategoryLabel(asset.category)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {asset.serialNumber}
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                          KES {asset.purchasePrice.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <StatusBadge status={asset.status} size="sm" />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Link
                              href={`/customer/assets/${asset.id}`}
                              className="p-1 text-primary-600 hover:text-primary-700"
                            >
                              <FiEye className="h-4 w-4" />
                            </Link>
                            <Link
                              href={`/customer/assets/${asset.id}/edit`}
                              className="p-1 text-gray-600 hover:text-gray-900"
                            >
                              <FiEdit className="h-4 w-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/common/AuthGuard';
import { 
  FiSmartphone, 
  FiMonitor, 
  FiCamera, 
  FiCast,
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiUpload,
  FiX,
  FiPlus,
  FiTrash2,
  FiInfo,
  FiAlertCircle,
  FiCamera as FiCameraIcon,
  FiRefreshCw,
  FiCheck,
} from 'react-icons/fi';
import { BiLaptop } from 'react-icons/bi';
import Link from 'next/link';

// Asset categories
const assetCategories = [
  { id: 'phone', name: 'Smartphone', icon: FiSmartphone },
  { id: 'laptop', name: 'Laptop', icon: BiLaptop },
  { id: 'tablet', name: 'Tablet', icon: FiMonitor },
  { id: 'television', name: 'Television', icon: FiMonitor },
  { id: 'camera', name: 'Camera', icon: FiCamera },
  { id: 'gaming_console', name: 'Gaming Console', icon: FiCast },
];

// Brands by category
const brands: Record<string, string[]> = {
  phone: ['Samsung', 'Apple', 'Huawei', 'Xiaomi', 'Oppo', 'Tecno', 'Infinix', 'Other'],
  laptop: ['Apple', 'Dell', 'HP', 'Lenovo', 'Acer', 'Asus', 'Microsoft', 'Other'],
  tablet: ['Apple', 'Samsung', 'Huawei', 'Lenovo', 'Microsoft', 'Other'],
  television: ['Samsung', 'LG', 'Sony', 'TCL', 'Hisense', 'Panasonic', 'Other'],
  camera: ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Olympus', 'Panasonic', 'Other'],
  gaming_console: ['PlayStation', 'Xbox', 'Nintendo', 'Other'],
};

// Condition options
const conditions = [
  { value: 'new', label: 'New' },
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'damaged', label: 'Damaged' },
  { value: 'not_working', label: 'Not Working' },
];

// Photo requirements by category
const photoRequirements: Record<string, { label: string; description: string }[]> = {
  phone: [
    { label: 'Front Screen', description: 'Clear photo of the front screen' },
    { label: 'Back Cover', description: 'Clear photo of the back cover' },
    { label: 'Left Side', description: 'Photo showing the left side' },
    { label: 'Right Side', description: 'Photo showing the right side' },
    { label: 'Device Powered On', description: 'Photo showing the screen on' },
    { label: 'IMEI/Serial Number', description: 'Photo showing the IMEI or serial number' },
    { label: 'Existing Damage', description: 'Close-up of any existing damage' },
  ],
  laptop: [
    { label: 'Front View', description: 'Clear photo of the front' },
    { label: 'Back View', description: 'Clear photo of the back' },
    { label: 'Keyboard', description: 'Photo of the keyboard' },
    { label: 'Screen Powered On', description: 'Photo showing the screen on' },
    { label: 'Serial Number Label', description: 'Photo of the serial number label on the bottom' },
    { label: 'Charger', description: 'Photo of the charger' },
    { label: 'Existing Damage', description: 'Close-up of any existing damage' },
  ],
  tablet: [
    { label: 'Front Screen', description: 'Clear photo of the front screen' },
    { label: 'Back Cover', description: 'Clear photo of the back cover' },
    { label: 'Left Side', description: 'Photo showing the left side' },
    { label: 'Right Side', description: 'Photo showing the right side' },
    { label: 'Device Powered On', description: 'Photo showing the screen on' },
    { label: 'Serial Number', description: 'Photo of the serial number' },
    { label: 'Existing Damage', description: 'Close-up of any existing damage' },
  ],
  television: [
    { label: 'Front View', description: 'Clear photo of the front' },
    { label: 'Back View', description: 'Clear photo of the back' },
    { label: 'Screen Powered On', description: 'Photo showing the screen on' },
    { label: 'Serial Number Label', description: 'Photo of the serial number label' },
    { label: 'Remote Control', description: 'Photo of the remote control' },
    { label: 'Existing Damage', description: 'Close-up of any existing damage' },
  ],
  camera: [
    { label: 'Front View', description: 'Clear photo of the front' },
    { label: 'Back View', description: 'Clear photo of the back' },
    { label: 'Lens', description: 'Photo showing the lens' },
    { label: 'Screen/Viewfinder', description: 'Photo showing the screen or viewfinder' },
    { label: 'Serial Number', description: 'Photo of the serial number' },
    { label: 'Lens Cap', description: 'Photo with lens cap' },
    { label: 'Existing Damage', description: 'Close-up of any existing damage' },
  ],
  gaming_console: [
    { label: 'Front View', description: 'Clear photo of the front' },
    { label: 'Back View', description: 'Clear photo of the back' },
    { label: 'Top View', description: 'Photo showing the top' },
    { label: 'Bottom View', description: 'Photo showing the bottom' },
    { label: 'Power On', description: 'Photo showing the console powered on' },
    { label: 'Serial Number', description: 'Photo of the serial number' },
    { label: 'Controller', description: 'Photo of the controller' },
    { label: 'Existing Damage', description: 'Close-up of any existing damage' },
  ],
};

// Evidence types
const evidenceTypes = [
  { id: 'receipt', label: 'Original Receipt' },
  { id: 'invoice', label: 'Invoice' },
  { id: 'warranty', label: 'Warranty Card' },
  { id: 'payment', label: 'M-Pesa Payment Confirmation' },
  { id: 'bank_statement', label: 'Bank Transaction Statement' },
  { id: 'seller_confirmation', label: 'Seller Confirmation' },
  { id: 'delivery_note', label: 'Delivery Note' },
  { id: 'other', label: 'Other Supporting Evidence' },
];

// No Receipt Reasons
const noReceiptReasons = [
  { id: 'lost', label: 'Receipt Lost' },
  { id: 'gift', label: 'Item Received as a Gift' },
  { id: 'informal_seller', label: 'Purchased from an Informal Seller' },
  { id: 'second_hand', label: 'Purchased Second-Hand' },
  { id: 'online', label: 'Purchased Online' },
  { id: 'damaged', label: 'Receipt Damaged' },
  { id: 'other', label: 'Other Reason' },
];

export default function CustomerAddAssetPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [formData, setFormData] = useState({
    // General Asset Info
    brand: '',
    model: '',
    productName: '',
    serialNumber: '',
    imeiNumber: '',
    purchaseDate: '',
    purchasePrice: '',
    currency: 'KES',
    sellerName: '',
    sellerPhone: '',
    sellerLocation: '',
    condition: '',
    wasNew: true,
    currentUsage: '',
    existingDamage: '',
    description: '',
    // No receipt
    hasReceipt: true,
    noReceiptReason: '',
    // Photos
    photos: {} as Record<string, File | null>,
    // Evidence
    evidence: [] as { type: string; file: File | null; description: string }[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Camera states
  const [activeCamera, setActiveCamera] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Reset form when category changes
    setFormData(prev => ({
      ...prev,
      photos: {},
      evidence: [],
    }));
    // Go to next step
    setCurrentStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handlePhotoUpload = (key: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      photos: {
        ...prev.photos,
        [key]: file,
      },
    }));
  };

  const handleEvidenceUpload = (type: string, file: File | null) => {
    const existing = formData.evidence.find(e => e.type === type);
    if (existing) {
      setFormData(prev => ({
        ...prev,
        evidence: prev.evidence.map(e =>
          e.type === type ? { ...e, file } : e
        ),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        evidence: [...prev.evidence, { type, file, description: '' }],
      }));
    }
  };

  const handleEvidenceDescriptionChange = (type: string, description: string) => {
    setFormData(prev => ({
      ...prev,
      evidence: prev.evidence.map(e =>
        e.type === type ? { ...e, description } : e
      ),
    }));
  };

  const removeEvidence = (type: string) => {
    setFormData(prev => ({
      ...prev,
      evidence: prev.evidence.filter(e => e.type !== type),
    }));
  };

  // Camera functions
  const startCamera = async (photoKey: string) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      
      setStream(mediaStream);
      setActiveCamera(photoKey);
      setIsCameraOpen(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check your camera permissions and try again, or use the upload option.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
    setActiveCamera(null);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current && activeCamera) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `${activeCamera}-${Date.now()}.jpg`, { type: 'image/jpeg' });
            handlePhotoUpload(activeCamera, file);
            stopCamera();
          }
        }, 'image/jpeg', 0.9);
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    // Redirect after success
    setTimeout(() => {
      router.push('/customer/assets');
    }, 2000);
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, label: 'Category' },
      { number: 2, label: 'Details' },
      { number: 3, label: 'Photos' },
      { number: 4, label: 'Evidence' },
      { number: 5, label: 'Review' },
    ];

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                    currentStep >= step.number
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {currentStep > step.number ? <FiCheckCircle className="h-6 w-6" /> : step.number}
                </div>
                <span className="mt-2 text-xs text-gray-600 hidden sm:block">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  currentStep > step.number ? 'bg-primary-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStep1 = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Asset Category</h2>
      <p className="text-gray-600 mb-6">Choose the type of device you want to insure</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {assetCategories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`p-6 border-2 rounded-xl text-center transition-all ${
                isSelected
                  ? 'border-primary-600 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                isSelected ? 'bg-primary-100' : 'bg-gray-100'
              }`}>
                <Icon className={`h-7 w-7 ${
                  isSelected ? 'text-primary-600' : 'text-gray-600'
                }`} />
              </div>
              <p className={`font-medium ${
                isSelected ? 'text-primary-700' : 'text-gray-900'
              }`}>
                {category.name}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderStep2 = () => {
    return (
      <div>
        <button
          onClick={() => setCurrentStep(1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <FiArrowLeft className="h-4 w-4 mr-2" />
          Back to Category
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Asset Details</h2>
        <p className="text-gray-600 mb-6">Provide detailed information about your device</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand <span className="text-red-500">*</span>
            </label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            >
              <option value="">Select Brand</option>
              {(brands[selectedCategory] || []).map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Model <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              placeholder="e.g., Galaxy S24"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="e.g., Samsung Galaxy S24 256GB"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Serial Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleInputChange}
              placeholder="Enter serial number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          {['phone', 'tablet'].includes(selectedCategory) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                IMEI Number
              </label>
              <input
                type="text"
                name="imeiNumber"
                value={formData.imeiNumber}
                onChange={handleInputChange}
                placeholder="Enter IMEI number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purchase Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purchase Price (KES) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleInputChange}
              placeholder="e.g., 130000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seller Name
            </label>
            <input
              type="text"
              name="sellerName"
              value={formData.sellerName}
              onChange={handleInputChange}
              placeholder="Enter seller name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seller Phone
            </label>
            <input
              type="tel"
              name="sellerPhone"
              value={formData.sellerPhone}
              onChange={handleInputChange}
              placeholder="e.g., 0712345678"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seller Location
            </label>
            <input
              type="text"
              name="sellerLocation"
              value={formData.sellerLocation}
              onChange={handleInputChange}
              placeholder="e.g., Nairobi CBD"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condition <span className="text-red-500">*</span>
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            >
              <option value="">Select Condition</option>
              {conditions.map((condition) => (
                <option key={condition.value} value={condition.value}>
                  {condition.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Was this new at purchase?
            </label>
            <div className="flex items-center space-x-4 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="wasNew"
                  value="true"
                  checked={formData.wasNew === true}
                  onChange={() => setFormData(prev => ({ ...prev, wasNew: true }))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="wasNew"
                  value="false"
                  checked={formData.wasNew === false}
                  onChange={() => setFormData(prev => ({ ...prev, wasNew: false }))}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Usage Status
            </label>
            <input
              type="text"
              name="currentUsage"
              value={formData.currentUsage}
              onChange={handleInputChange}
              placeholder="e.g., Daily use, Occasionally used"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Existing Damage Declaration
          </label>
          <textarea
            name="existingDamage"
            value={formData.existingDamage}
            onChange={handleInputChange}
            rows={3}
            placeholder="Describe any existing damage to the device"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Asset Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            placeholder="Provide any additional details about your device"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => setCurrentStep(1)}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => setCurrentStep(3)}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Continue to Photos
            <FiArrowRight className="inline ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    const photoReqs = photoRequirements[selectedCategory] || [];
    
    return (
      <div>
        <button
          onClick={() => setCurrentStep(2)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <FiArrowLeft className="h-4 w-4 mr-2" />
          Back to Details
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Photos</h2>
        <p className="text-gray-600 mb-6">Take clear photos of your device following these requirements</p>

        {/* Camera Preview Modal */}
        {isCameraOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-black rounded-xl overflow-hidden">
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <canvas ref={canvasRef} className="hidden" />
                
                {/* Camera Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={stopCamera}
                      className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <FiX className="h-6 w-6 text-white" />
                    </button>
                    <button
                      onClick={capturePhoto}
                      className="p-4 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                    >
                      <div className="w-8 h-8 rounded-full border-4 border-primary-600"></div>
                    </button>
                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          // Refresh camera stream if needed
                        }
                      }}
                      className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <FiRefreshCw className="h-6 w-6 text-white" />
                    </button>
                  </div>
                  <p className="text-center text-white text-sm mt-3">
                    Position the device in the frame and tap the capture button
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {photoReqs.map((req, index) => {
            const file = formData.photos[req.label] || null;
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{req.label}</h4>
                    <p className="text-sm text-gray-500">{req.description}</p>
                  </div>
                  {file && (
                    <button
                      onClick={() => handlePhotoUpload(req.label, null)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiX className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <div className="mt-3">
                  {file ? (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={req.label}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <p className="mt-2 text-sm text-green-600 flex items-center">
                        <FiCheckCircle className="h-4 w-4 mr-1" />
                        Uploaded
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {/* Camera Button */}
                      <button
                        onClick={() => startCamera(req.label)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors border border-primary-200"
                      >
                        <FiCameraIcon className="h-5 w-5" />
                        <span className="text-sm font-medium">Take Photo</span>
                      </button>
                      
                      {/* Upload Button */}
                      <label className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-400 transition-colors">
                        <div className="flex items-center gap-2">
                          <FiUpload className="h-5 w-5 text-gray-400" />
                          <span className="text-sm text-gray-500">Upload from device</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            handlePhotoUpload(req.label, file);
                          }}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => setCurrentStep(2)}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => setCurrentStep(4)}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Continue to Evidence
            <FiArrowRight className="inline ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  const renderStep4 = () => {
    const hasReceipt = formData.hasReceipt;
    
    return (
      <div>
        <button
          onClick={() => setCurrentStep(3)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <FiArrowLeft className="h-4 w-4 mr-2" />
          Back to Photos
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ownership Evidence</h2>
        <p className="text-gray-600 mb-6">Provide proof of ownership for your device</p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <FiInfo className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900">Do you have a receipt?</h4>
              <p className="text-sm text-blue-700 mt-1">
                A receipt is the preferred proof of ownership. If you don't have one, you'll need to provide alternative evidence.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="hasReceipt"
                value="true"
                checked={hasReceipt === true}
                onChange={() => setFormData(prev => ({ ...prev, hasReceipt: true }))}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Yes, I have a receipt</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="hasReceipt"
                value="false"
                checked={hasReceipt === false}
                onChange={() => setFormData(prev => ({ ...prev, hasReceipt: false }))}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">No, I don't have a receipt</span>
            </label>
          </div>
        </div>

        {!hasReceipt && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <FiAlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-yellow-900">No Receipt Selected</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Please select a reason and provide alternative evidence. Your application will be sent for manual review.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for no receipt <span className="text-red-500">*</span>
              </label>
              <select
                name="noReceiptReason"
                value={formData.noReceiptReason}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              >
                <option value="">Select Reason</option>
                {noReceiptReasons.map((reason) => (
                  <option key={reason.id} value={reason.id}>{reason.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Upload Evidence</h3>
          <p className="text-sm text-gray-600">Upload your ownership evidence documents</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evidenceTypes.map((type) => {
              const evidence = formData.evidence.find(e => e.type === type.id);
              const file = evidence?.file || null;
              
              return (
                <div key={type.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{type.label}</span>
                    {file && (
                      <button
                        onClick={() => removeEvidence(type.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="mt-2">
                    {file ? (
                      <div>
                        <p className="text-sm text-green-600 flex items-center">
                          <FiCheckCircle className="h-4 w-4 mr-1" />
                          Uploaded
                        </p>
                        <input
                          type="text"
                          placeholder="Description (optional)"
                          className="mt-2 w-full px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          value={evidence?.description || ''}
                          onChange={(e) => handleEvidenceDescriptionChange(type.id, e.target.value)}
                        />
                      </div>
                    ) : (
                      <label className="flex items-center justify-center w-full py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-400 transition-colors">
                        <div className="flex flex-col items-center">
                          <FiUpload className="h-6 w-6 text-gray-400" />
                          <span className="mt-1 text-xs text-gray-500">Upload</span>
                        </div>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            handleEvidenceUpload(type.id, file);
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => setCurrentStep(3)}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => setCurrentStep(5)}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Review & Submit
            <FiArrowRight className="inline ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  const renderStep5 = () => (
    <div>
      <button
        onClick={() => setCurrentStep(4)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <FiArrowLeft className="h-4 w-4 mr-2" />
        Back to Evidence
      </button>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Application</h2>
      <p className="text-gray-600 mb-6">Please review all information before submitting</p>

      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
          <p className="text-gray-600">
            Your asset has been successfully submitted for verification. You'll receive a notification once it's reviewed.
          </p>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-sm text-gray-500 mt-2">Redirecting to your assets...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium text-gray-900">
                  {assetCategories.find(c => c.id === selectedCategory)?.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Brand</p>
                <p className="font-medium text-gray-900">{formData.brand}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Model</p>
                <p className="font-medium text-gray-900">{formData.model}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Serial Number</p>
                <p className="font-medium text-gray-900">{formData.serialNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Purchase Price</p>
                <p className="font-medium text-gray-900">KES {parseInt(formData.purchasePrice || '0').toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Purchase Date</p>
                <p className="font-medium text-gray-900">{formData.purchaseDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Condition</p>
                <p className="font-medium text-gray-900">
                  {conditions.find(c => c.value === formData.condition)?.label}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Has Receipt</p>
                <p className="font-medium text-gray-900">{formData.hasReceipt ? 'Yes' : 'No'}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Photos Uploaded</p>
              <p className="font-medium text-gray-900">
                {Object.keys(formData.photos).filter(key => formData.photos[key] !== null).length} of {Object.keys(formData.photos).length}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Evidence Uploaded</p>
              <p className="font-medium text-gray-900">{formData.evidence.filter(e => e.file !== null).length} documents</p>
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2"></div>
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <AuthGuard requiredRoles={['customer']}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/customer/dashboard" className="text-gray-600 hover:text-gray-900">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          {renderStepIndicator()}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
        </div>
      </div>
    </AuthGuard>
  );
}


// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import AuthGuard from '@/components/common/AuthGuard';
// import { 
//   FiSmartphone, 
//   FiMonitor, 
//   FiCamera, 
//   FiCast,
//   FiArrowLeft,
//   FiArrowRight,
//   FiCheckCircle,
//   FiUpload,
//   FiX,
//   FiPlus,
//   FiTrash2,
//   FiInfo,
//   FiAlertCircle,
// } from 'react-icons/fi';
// import { BiLaptop } from 'react-icons/bi';
// import Link from 'next/link';
// import Image from 'next/image';

// // Asset categories
// const assetCategories = [
//   { id: 'phone', name: 'Smartphone', icon: FiSmartphone },
//   { id: 'laptop', name: 'Laptop', icon: BiLaptop },
//   { id: 'tablet', name: 'Tablet', icon: FiMonitor },
//   { id: 'television', name: 'Television', icon: FiMonitor },
//   { id: 'camera', name: 'Camera', icon: FiCamera },
//   { id: 'gaming_console', name: 'Gaming Console', icon: FiCast },
// ];

// // Brands by category
// const brands: Record<string, string[]> = {
//   phone: ['Samsung', 'Apple', 'Huawei', 'Xiaomi', 'Oppo', 'Tecno', 'Infinix', 'Other'],
//   laptop: ['Apple', 'Dell', 'HP', 'Lenovo', 'Acer', 'Asus', 'Microsoft', 'Other'],
//   tablet: ['Apple', 'Samsung', 'Huawei', 'Lenovo', 'Microsoft', 'Other'],
//   television: ['Samsung', 'LG', 'Sony', 'TCL', 'Hisense', 'Panasonic', 'Other'],
//   camera: ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Olympus', 'Panasonic', 'Other'],
//   gaming_console: ['PlayStation', 'Xbox', 'Nintendo', 'Other'],
// };

// // Condition options
// const conditions = [
//   { value: 'new', label: 'New' },
//   { value: 'excellent', label: 'Excellent' },
//   { value: 'good', label: 'Good' },
//   { value: 'fair', label: 'Fair' },
//   { value: 'damaged', label: 'Damaged' },
//   { value: 'not_working', label: 'Not Working' },
// ];

// // Photo requirements by category
// const photoRequirements: Record<string, { label: string; description: string }[]> = {
//   phone: [
//     { label: 'Front Screen', description: 'Clear photo of the front screen' },
//     { label: 'Back Cover', description: 'Clear photo of the back cover' },
//     { label: 'Left Side', description: 'Photo showing the left side' },
//     { label: 'Right Side', description: 'Photo showing the right side' },
//     { label: 'Device Powered On', description: 'Photo showing the screen on' },
//     { label: 'IMEI/Serial Number', description: 'Photo showing the IMEI or serial number' },
//     { label: 'Existing Damage', description: 'Close-up of any existing damage' },
//   ],
//   laptop: [
//     { label: 'Front View', description: 'Clear photo of the front' },
//     { label: 'Back View', description: 'Clear photo of the back' },
//     { label: 'Keyboard', description: 'Photo of the keyboard' },
//     { label: 'Screen Powered On', description: 'Photo showing the screen on' },
//     { label: 'Serial Number Label', description: 'Photo of the serial number label on the bottom' },
//     { label: 'Charger', description: 'Photo of the charger' },
//     { label: 'Existing Damage', description: 'Close-up of any existing damage' },
//   ],
//   tablet: [
//     { label: 'Front Screen', description: 'Clear photo of the front screen' },
//     { label: 'Back Cover', description: 'Clear photo of the back cover' },
//     { label: 'Left Side', description: 'Photo showing the left side' },
//     { label: 'Right Side', description: 'Photo showing the right side' },
//     { label: 'Device Powered On', description: 'Photo showing the screen on' },
//     { label: 'Serial Number', description: 'Photo of the serial number' },
//     { label: 'Existing Damage', description: 'Close-up of any existing damage' },
//   ],
//   television: [
//     { label: 'Front View', description: 'Clear photo of the front' },
//     { label: 'Back View', description: 'Clear photo of the back' },
//     { label: 'Screen Powered On', description: 'Photo showing the screen on' },
//     { label: 'Serial Number Label', description: 'Photo of the serial number label' },
//     { label: 'Remote Control', description: 'Photo of the remote control' },
//     { label: 'Existing Damage', description: 'Close-up of any existing damage' },
//   ],
//   camera: [
//     { label: 'Front View', description: 'Clear photo of the front' },
//     { label: 'Back View', description: 'Clear photo of the back' },
//     { label: 'Lens', description: 'Photo showing the lens' },
//     { label: 'Screen/Viewfinder', description: 'Photo showing the screen or viewfinder' },
//     { label: 'Serial Number', description: 'Photo of the serial number' },
//     { label: 'Lens Cap', description: 'Photo with lens cap' },
//     { label: 'Existing Damage', description: 'Close-up of any existing damage' },
//   ],
//   gaming_console: [
//     { label: 'Front View', description: 'Clear photo of the front' },
//     { label: 'Back View', description: 'Clear photo of the back' },
//     { label: 'Top View', description: 'Photo showing the top' },
//     { label: 'Bottom View', description: 'Photo showing the bottom' },
//     { label: 'Power On', description: 'Photo showing the console powered on' },
//     { label: 'Serial Number', description: 'Photo of the serial number' },
//     { label: 'Controller', description: 'Photo of the controller' },
//     { label: 'Existing Damage', description: 'Close-up of any existing damage' },
//   ],
// };

// // Evidence types
// const evidenceTypes = [
//   { id: 'receipt', label: 'Original Receipt' },
//   { id: 'invoice', label: 'Invoice' },
//   { id: 'warranty', label: 'Warranty Card' },
//   { id: 'payment', label: 'M-Pesa Payment Confirmation' },
//   { id: 'bank_statement', label: 'Bank Transaction Statement' },
//   { id: 'seller_confirmation', label: 'Seller Confirmation' },
//   { id: 'delivery_note', label: 'Delivery Note' },
//   { id: 'other', label: 'Other Supporting Evidence' },
// ];

// // No Receipt Reasons
// const noReceiptReasons = [
//   { id: 'lost', label: 'Receipt Lost' },
//   { id: 'gift', label: 'Item Received as a Gift' },
//   { id: 'informal_seller', label: 'Purchased from an Informal Seller' },
//   { id: 'second_hand', label: 'Purchased Second-Hand' },
//   { id: 'online', label: 'Purchased Online' },
//   { id: 'damaged', label: 'Receipt Damaged' },
//   { id: 'other', label: 'Other Reason' },
// ];

// export default function CustomerAddAssetPage() {
//   const router = useRouter();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedCategory, setSelectedCategory] = useState<string>('');
//   const [formData, setFormData] = useState({
//     // General Asset Info
//     brand: '',
//     model: '',
//     productName: '',
//     serialNumber: '',
//     imeiNumber: '',
//     purchaseDate: '',
//     purchasePrice: '',
//     currency: 'KES',
//     sellerName: '',
//     sellerPhone: '',
//     sellerLocation: '',
//     condition: '',
//     wasNew: true,
//     currentUsage: '',
//     existingDamage: '',
//     description: '',
//     // No receipt
//     hasReceipt: true,
//     noReceiptReason: '',
//     // Photos
//     photos: {} as Record<string, File | null>,
//     // Evidence
//     evidence: [] as { type: string; file: File | null; description: string }[],
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);

//   const handleCategorySelect = (categoryId: string) => {
//     setSelectedCategory(categoryId);
//     // Reset form when category changes
//     setFormData(prev => ({
//       ...prev,
//       photos: {},
//       evidence: [],
//     }));
//     // Go to next step
//     setCurrentStep(2);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
//     }));
//   };

//   const handlePhotoUpload = (key: string, file: File | null) => {
//     setFormData(prev => ({
//       ...prev,
//       photos: {
//         ...prev.photos,
//         [key]: file,
//       },
//     }));
//   };

//   const handleEvidenceUpload = (type: string, file: File | null) => {
//     const existing = formData.evidence.find(e => e.type === type);
//     if (existing) {
//       setFormData(prev => ({
//         ...prev,
//         evidence: prev.evidence.map(e =>
//           e.type === type ? { ...e, file } : e
//         ),
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         evidence: [...prev.evidence, { type, file, description: '' }],
//       }));
//     }
//   };

//   const handleEvidenceDescriptionChange = (type: string, description: string) => {
//     setFormData(prev => ({
//       ...prev,
//       evidence: prev.evidence.map(e =>
//         e.type === type ? { ...e, description } : e
//       ),
//     }));
//   };

//   const removeEvidence = (type: string) => {
//     setFormData(prev => ({
//       ...prev,
//       evidence: prev.evidence.filter(e => e.type !== type),
//     }));
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 2000));
//     setIsSubmitting(false);
//     setIsSuccess(true);
//     // Redirect after success
//     setTimeout(() => {
//       router.push('/customer/assets');
//     }, 2000);
//   };

//   const renderStepIndicator = () => {
//     const steps = [
//       { number: 1, label: 'Category' },
//       { number: 2, label: 'Details' },
//       { number: 3, label: 'Photos' },
//       { number: 4, label: 'Evidence' },
//       { number: 5, label: 'Review' },
//     ];

//     return (
//       <div className="mb-8">
//         <div className="flex items-center justify-between">
//           {steps.map((step, index) => (
//             <div key={step.number} className="flex items-center">
//               <div className="flex flex-col items-center">
//                 <div
//                   className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
//                     currentStep >= step.number
//                       ? 'bg-primary-600 text-white'
//                       : 'bg-gray-200 text-gray-600'
//                   }`}
//                 >
//                   {currentStep > step.number ? <FiCheckCircle className="h-6 w-6" /> : step.number}
//                 </div>
//                 <span className="mt-2 text-xs text-gray-600 hidden sm:block">{step.label}</span>
//               </div>
//               {index < steps.length - 1 && (
//                 <div className={`flex-1 h-0.5 mx-4 ${
//                   currentStep > step.number ? 'bg-primary-600' : 'bg-gray-200'
//                 }`} />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderStep1 = () => (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Asset Category</h2>
//       <p className="text-gray-600 mb-6">Choose the type of device you want to insure</p>
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         {assetCategories.map((category) => {
//           const Icon = category.icon;
//           const isSelected = selectedCategory === category.id;
//           return (
//             <button
//               key={category.id}
//               onClick={() => handleCategorySelect(category.id)}
//               className={`p-6 border-2 rounded-xl text-center transition-all ${
//                 isSelected
//                   ? 'border-primary-600 bg-primary-50 shadow-md'
//                   : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
//               }`}
//             >
//               <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 ${
//                 isSelected ? 'bg-primary-100' : 'bg-gray-100'
//               }`}>
//                 <Icon className={`h-7 w-7 ${
//                   isSelected ? 'text-primary-600' : 'text-gray-600'
//                 }`} />
//               </div>
//               <p className={`font-medium ${
//                 isSelected ? 'text-primary-700' : 'text-gray-900'
//               }`}>
//                 {category.name}
//               </p>
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );

//   const renderStep2 = () => {
//     const photoReqs = photoRequirements[selectedCategory] || [];
    
//     return (
//       <div>
//         <button
//           onClick={() => setCurrentStep(1)}
//           className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
//         >
//           <FiArrowLeft className="h-4 w-4 mr-2" />
//           Back to Category
//         </button>
        
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Asset Details</h2>
//         <p className="text-gray-600 mb-6">Provide detailed information about your device</p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Brand <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="brand"
//               value={formData.brand}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//               required
//             >
//               <option value="">Select Brand</option>
//               {(brands[selectedCategory] || []).map((brand) => (
//                 <option key={brand} value={brand}>{brand}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Model <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="model"
//               value={formData.model}
//               onChange={handleInputChange}
//               placeholder="e.g., Galaxy S24"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Product Name
//             </label>
//             <input
//               type="text"
//               name="productName"
//               value={formData.productName}
//               onChange={handleInputChange}
//               placeholder="e.g., Samsung Galaxy S24 256GB"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Serial Number <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="serialNumber"
//               value={formData.serialNumber}
//               onChange={handleInputChange}
//               placeholder="Enter serial number"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//               required
//             />
//           </div>

//           {['phone', 'tablet'].includes(selectedCategory) && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 IMEI Number
//               </label>
//               <input
//                 type="text"
//                 name="imeiNumber"
//                 value={formData.imeiNumber}
//                 onChange={handleInputChange}
//                 placeholder="Enter IMEI number"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//               />
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Purchase Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               name="purchaseDate"
//               value={formData.purchaseDate}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Purchase Price (KES) <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               name="purchasePrice"
//               value={formData.purchasePrice}
//               onChange={handleInputChange}
//               placeholder="e.g., 130000"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Seller Name
//             </label>
//             <input
//               type="text"
//               name="sellerName"
//               value={formData.sellerName}
//               onChange={handleInputChange}
//               placeholder="Enter seller name"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Seller Phone
//             </label>
//             <input
//               type="tel"
//               name="sellerPhone"
//               value={formData.sellerPhone}
//               onChange={handleInputChange}
//               placeholder="e.g., 0712345678"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Seller Location
//             </label>
//             <input
//               type="text"
//               name="sellerLocation"
//               value={formData.sellerLocation}
//               onChange={handleInputChange}
//               placeholder="e.g., Nairobi CBD"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Condition <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="condition"
//               value={formData.condition}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//               required
//             >
//               <option value="">Select Condition</option>
//               {conditions.map((condition) => (
//                 <option key={condition.value} value={condition.value}>
//                   {condition.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Was this new at purchase?
//             </label>
//             <div className="flex items-center space-x-4 mt-2">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="wasNew"
//                   value="true"
//                   checked={formData.wasNew === true}
//                   onChange={() => setFormData(prev => ({ ...prev, wasNew: true }))}
//                   className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
//                 />
//                 <span className="ml-2 text-sm text-gray-700">Yes</span>
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="wasNew"
//                   value="false"
//                   checked={formData.wasNew === false}
//                   onChange={() => setFormData(prev => ({ ...prev, wasNew: false }))}
//                   className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
//                 />
//                 <span className="ml-2 text-sm text-gray-700">No</span>
//               </label>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Current Usage Status
//             </label>
//             <input
//               type="text"
//               name="currentUsage"
//               value={formData.currentUsage}
//               onChange={handleInputChange}
//               placeholder="e.g., Daily use, Occasionally used"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//             />
//           </div>
//         </div>

//         <div className="mt-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Existing Damage Declaration
//           </label>
//           <textarea
//             name="existingDamage"
//             value={formData.existingDamage}
//             onChange={handleInputChange}
//             rows={3}
//             placeholder="Describe any existing damage to the device"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//           />
//         </div>

//         <div className="mt-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Asset Description
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             rows={3}
//             placeholder="Provide any additional details about your device"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//           />
//         </div>

//         <div className="mt-8 flex justify-between items-center">
//           <button
//             onClick={() => setCurrentStep(1)}
//             className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Back
//           </button>
//           <button
//             onClick={() => setCurrentStep(3)}
//             className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
//           >
//             Continue to Photos
//             <FiArrowRight className="inline ml-2 h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const renderStep3 = () => {
//     const photoReqs = photoRequirements[selectedCategory] || [];
    
//     return (
//       <div>
//         <button
//           onClick={() => setCurrentStep(2)}
//           className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
//         >
//           <FiArrowLeft className="h-4 w-4 mr-2" />
//           Back to Details
//         </button>
        
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Photos</h2>
//         <p className="text-gray-600 mb-6">Take clear photos of your device following these requirements</p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {photoReqs.map((req, index) => {
//             const file = formData.photos[req.label] || null;
//             return (
//               <div key={index} className="border border-gray-200 rounded-lg p-4">
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <h4 className="font-medium text-gray-900">{req.label}</h4>
//                     <p className="text-sm text-gray-500">{req.description}</p>
//                   </div>
//                   {file && (
//                     <button
//                       onClick={() => handlePhotoUpload(req.label, null)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <FiX className="h-5 w-5" />
//                     </button>
//                   )}
//                 </div>
//                 <div className="mt-3">
//                   {file ? (
//                     <div className="relative">
//                       <img
//                         src={URL.createObjectURL(file)}
//                         alt={req.label}
//                         className="w-full h-40 object-cover rounded-lg"
//                       />
//                       <p className="mt-2 text-sm text-green-600 flex items-center">
//                         <FiCheckCircle className="h-4 w-4 mr-1" />
//                         Uploaded
//                       </p>
//                     </div>
//                   ) : (
//                     <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-400 transition-colors">
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <FiUpload className="h-8 w-8 text-gray-400" />
//                         <p className="mt-2 text-sm text-gray-500">Click to upload</p>
//                       </div>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         className="hidden"
//                         onChange={(e) => {
//                           const file = e.target.files?.[0] || null;
//                           handlePhotoUpload(req.label, file);
//                         }}
//                       />
//                     </label>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="mt-8 flex justify-between items-center">
//           <button
//             onClick={() => setCurrentStep(2)}
//             className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Back
//           </button>
//           <button
//             onClick={() => setCurrentStep(4)}
//             className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
//           >
//             Continue to Evidence
//             <FiArrowRight className="inline ml-2 h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const renderStep4 = () => {
//     const hasReceipt = formData.hasReceipt;
    
//     return (
//       <div>
//         <button
//           onClick={() => setCurrentStep(3)}
//           className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
//         >
//           <FiArrowLeft className="h-4 w-4 mr-2" />
//           Back to Photos
//         </button>
        
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Ownership Evidence</h2>
//         <p className="text-gray-600 mb-6">Provide proof of ownership for your device</p>

//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//           <div className="flex items-start">
//             <FiInfo className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
//             <div>
//               <h4 className="font-medium text-blue-900">Do you have a receipt?</h4>
//               <p className="text-sm text-blue-700 mt-1">
//                 A receipt is the preferred proof of ownership. If you don't have one, you'll need to provide alternative evidence.
//               </p>
//             </div>
//           </div>
//           <div className="mt-4 flex items-center space-x-4">
//             <label className="flex items-center">
//               <input
//                 type="radio"
//                 name="hasReceipt"
//                 value="true"
//                 checked={hasReceipt === true}
//                 onChange={() => setFormData(prev => ({ ...prev, hasReceipt: true }))}
//                 className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
//               />
//               <span className="ml-2 text-sm text-gray-700">Yes, I have a receipt</span>
//             </label>
//             <label className="flex items-center">
//               <input
//                 type="radio"
//                 name="hasReceipt"
//                 value="false"
//                 checked={hasReceipt === false}
//                 onChange={() => setFormData(prev => ({ ...prev, hasReceipt: false }))}
//                 className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
//               />
//               <span className="ml-2 text-sm text-gray-700">No, I don't have a receipt</span>
//             </label>
//           </div>
//         </div>

//         {!hasReceipt && (
//           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
//             <div className="flex items-start">
//               <FiAlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
//               <div>
//                 <h4 className="font-medium text-yellow-900">No Receipt Selected</h4>
//                 <p className="text-sm text-yellow-700 mt-1">
//                   Please select a reason and provide alternative evidence. Your application will be sent for manual review.
//                 </p>
//               </div>
//             </div>
//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Reason for no receipt <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="noReceiptReason"
//                 value={formData.noReceiptReason}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                 required
//               >
//                 <option value="">Select Reason</option>
//                 {noReceiptReasons.map((reason) => (
//                   <option key={reason.id} value={reason.id}>{reason.label}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         )}

//         <div className="space-y-4">
//           <h3 className="font-semibold text-gray-900">Upload Evidence</h3>
//           <p className="text-sm text-gray-600">Upload your ownership evidence documents</p>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {evidenceTypes.map((type) => {
//               const evidence = formData.evidence.find(e => e.type === type.id);
//               const file = evidence?.file || null;
              
//               return (
//                 <div key={type.id} className="border border-gray-200 rounded-lg p-4">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm font-medium text-gray-700">{type.label}</span>
//                     {file && (
//                       <button
//                         onClick={() => removeEvidence(type.id)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <FiTrash2 className="h-4 w-4" />
//                       </button>
//                     )}
//                   </div>
//                   <div className="mt-2">
//                     {file ? (
//                       <div>
//                         <p className="text-sm text-green-600 flex items-center">
//                           <FiCheckCircle className="h-4 w-4 mr-1" />
//                           Uploaded
//                         </p>
//                         <input
//                           type="text"
//                           placeholder="Description (optional)"
//                           className="mt-2 w-full px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
//                           value={evidence?.description || ''}
//                           onChange={(e) => handleEvidenceDescriptionChange(type.id, e.target.value)}
//                         />
//                       </div>
//                     ) : (
//                       <label className="flex items-center justify-center w-full py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-400 transition-colors">
//                         <div className="flex flex-col items-center">
//                           <FiUpload className="h-6 w-6 text-gray-400" />
//                           <span className="mt-1 text-xs text-gray-500">Upload</span>
//                         </div>
//                         <input
//                           type="file"
//                           accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
//                           className="hidden"
//                           onChange={(e) => {
//                             const file = e.target.files?.[0] || null;
//                             handleEvidenceUpload(type.id, file);
//                           }}
//                         />
//                       </label>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="mt-8 flex justify-between items-center">
//           <button
//             onClick={() => setCurrentStep(3)}
//             className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             Back
//           </button>
//           <button
//             onClick={() => setCurrentStep(5)}
//             className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
//           >
//             Review & Submit
//             <FiArrowRight className="inline ml-2 h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const renderStep5 = () => (
//     <div>
//       <button
//         onClick={() => setCurrentStep(4)}
//         className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
//       >
//         <FiArrowLeft className="h-4 w-4 mr-2" />
//         Back to Evidence
//       </button>
      
//       <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Application</h2>
//       <p className="text-gray-600 mb-6">Please review all information before submitting</p>

//       {isSuccess ? (
//         <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FiCheckCircle className="h-8 w-8 text-green-600" />
//           </div>
//           <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
//           <p className="text-gray-600">
//             Your asset has been successfully submitted for verification. You'll receive a notification once it's reviewed.
//           </p>
//           <div className="mt-4">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
//             <p className="text-sm text-gray-500 mt-2">Redirecting to your assets...</p>
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="bg-gray-50 rounded-lg p-6 space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-gray-500">Category</p>
//                 <p className="font-medium text-gray-900">
//                   {assetCategories.find(c => c.id === selectedCategory)?.name}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Brand</p>
//                 <p className="font-medium text-gray-900">{formData.brand}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Model</p>
//                 <p className="font-medium text-gray-900">{formData.model}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Serial Number</p>
//                 <p className="font-medium text-gray-900">{formData.serialNumber}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Purchase Price</p>
//                 <p className="font-medium text-gray-900">KES {parseInt(formData.purchasePrice || '0').toLocaleString()}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Purchase Date</p>
//                 <p className="font-medium text-gray-900">{formData.purchaseDate}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Condition</p>
//                 <p className="font-medium text-gray-900">
//                   {conditions.find(c => c.value === formData.condition)?.label}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Has Receipt</p>
//                 <p className="font-medium text-gray-900">{formData.hasReceipt ? 'Yes' : 'No'}</p>
//               </div>
//             </div>
            
//             <div>
//               <p className="text-sm text-gray-500">Photos Uploaded</p>
//               <p className="font-medium text-gray-900">
//                 {Object.keys(formData.photos).filter(key => formData.photos[key] !== null).length} of {Object.keys(formData.photos).length}
//               </p>
//             </div>
            
//             <div>
//               <p className="text-sm text-gray-500">Evidence Uploaded</p>
//               <p className="font-medium text-gray-900">{formData.evidence.filter(e => e.file !== null).length} documents</p>
//             </div>
//           </div>

//           <div className="mt-8 flex justify-between items-center">
//             <button
//               onClick={() => setCurrentStep(4)}
//               className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               Back
//             </button>
//             <button
//               onClick={handleSubmit}
//               disabled={isSubmitting}
//               className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2"></div>
//                   Submitting...
//                 </>
//               ) : (
//                 'Submit Application'
//               )}
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );

//   return (
//     <AuthGuard requiredRoles={['customer']}>
//       <div className="max-w-4xl mx-auto">
//         <div className="mb-6">
//           <Link href="/customer/dashboard" className="text-gray-600 hover:text-gray-900">
//             ← Back to Dashboard
//           </Link>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
//           {renderStepIndicator()}
//           {currentStep === 1 && renderStep1()}
//           {currentStep === 2 && renderStep2()}
//           {currentStep === 3 && renderStep3()}
//           {currentStep === 4 && renderStep4()}
//           {currentStep === 5 && renderStep5()}
//         </div>
//       </div>
//     </AuthGuard>
//   );
// }
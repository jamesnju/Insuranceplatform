'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthGuard from '@/components/common/AuthGuard';
import {
  FiHelpCircle,
  FiMessageCircle,
  FiMail,
  FiPhone,
  FiClock,
  FiBookOpen,
  FiShield,
  FiFileText,
  FiDollarSign,
  FiClipboard,
  FiUserCheck,
  FiSmartphone,
  FiMonitor,
  FiCamera,
  FiCast,
  FiArrowRight,
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiX,
} from 'react-icons/fi';
import { BiLaptop } from 'react-icons/bi';

// FAQ Categories
const faqCategories = [
  { id: 'all', label: 'All Questions' },
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'assets', label: 'Assets & Verification' },
  { id: 'policies', label: 'Policies & Coverage' },
  { id: 'claims', label: 'Claims' },
  { id: 'payments', label: 'Payments' },
  { id: 'account', label: 'Account & Security' },
];

// FAQ Data
const faqs = [
  {
    id: '1',
    category: 'getting-started',
    question: 'How do I create an account?',
    answer: 'Click on the "Get Started" button on the homepage or navigate to the registration page. Fill in your details including full name, phone number, email, and password. You\'ll receive an OTP to verify your phone number.',
  },
  {
    id: '2',
    category: 'getting-started',
    question: 'What documents do I need to verify my identity?',
    answer: 'You\'ll need your National ID (front and back), a selfie, and a liveness check. The AI will extract your information and verify your identity automatically.',
  },
  {
    id: '3',
    category: 'assets',
    question: 'What devices can I insure?',
    answer: 'You can insure smartphones, laptops, tablets, televisions, cameras, and gaming consoles. More categories will be added in the future.',
  },
  {
    id: '4',
    category: 'assets',
    question: 'How does the asset verification work?',
    answer: 'Our AI analyzes your uploaded photos and documents. It reads receipts, checks serial numbers, detects duplicates, and calculates an ownership confidence score.',
  },
  {
    id: '5',
    category: 'assets',
    question: 'What if I don\'t have a receipt?',
    answer: 'You can select a reason for not having a receipt (e.g., gift, lost, second-hand) and upload alternative evidence. Your application will be sent for manual review.',
  },
  {
    id: '6',
    category: 'policies',
    question: 'How long does it take to get a policy?',
    answer: 'Most policies are issued instantly after payment confirmation. If your application requires manual review, it may take 24-48 hours.',
  },
  {
    id: '7',
    category: 'policies',
    question: 'What does my policy cover?',
    answer: 'Coverage varies by product but typically includes accidental damage, theft, liquid damage, and screen damage. Check your policy document for specific coverage details.',
  },
  {
    id: '8',
    category: 'policies',
    question: 'Can I renew my policy?',
    answer: 'Yes, you can renew your policy before it expires. You\'ll receive renewal reminders via email and SMS.',
  },
  {
    id: '9',
    category: 'claims',
    question: 'How do I submit a claim?',
    answer: 'Navigate to your policy and click "Submit Claim". Fill in the incident details, upload evidence (photos, police abstract, etc.), and submit. Our claims team will review your claim.',
  },
  {
    id: '10',
    category: 'claims',
    question: 'How long does the claims process take?',
    answer: 'Claims are typically resolved within 48-72 hours. Complex claims may take longer if additional assessment or investigation is required.',
  },
  {
    id: '11',
    category: 'claims',
    question: 'What evidence do I need for a claim?',
    answer: 'You\'ll need current asset photos, damage photos, incident description, and any supporting documents like police abstract, repair quotes, or witness statements.',
  },
  {
    id: '12',
    category: 'payments',
    question: 'How do I pay for my policy?',
    answer: 'We support M-Pesa STK Push. After accepting a quotation, enter your M-Pesa phone number and confirm the payment on your phone.',
  },
  {
    id: '13',
    category: 'payments',
    question: 'Is my payment secure?',
    answer: 'Yes, all payments are processed securely through M-Pesa\'s official integration. We don\'t store your payment details.',
  },
  {
    id: '14',
    category: 'account',
    question: 'How do I reset my password?',
    answer: 'Click "Forgot Password" on the login page. You\'ll receive an OTP or reset link to set a new password.',
  },
  {
    id: '15',
    category: 'account',
    question: 'How do I update my profile information?',
    answer: 'Go to your Profile page and click "Edit Profile". Update your information and save the changes.',
  },
];

// Support Topics
const supportTopics = [
  {
    icon: FiUserCheck,
    title: 'Account Issues',
    description: 'Login, registration, profile updates',
    link: '/help/account',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: FiFileText,
    title: 'Asset Registration',
    description: 'Adding assets, verification, photos',
    link: '/help/assets',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: FiShield,
    title: 'Policies & Coverage',
    description: 'Understanding policies, renewals',
    link: '/help/policies',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: FiClipboard,
    title: 'Claims Process',
    description: 'Submitting claims, tracking status',
    link: '/help/claims',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  {
    icon: FiDollarSign,
    title: 'Payments & Billing',
    description: 'M-Pesa payments, receipts, refunds',
    link: '/help/payments',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    icon: FiSmartphone,
    title: 'Technical Support',
    description: 'App issues, camera, upload problems',
    link: '/help/technical',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
];

// Contact Options
const contactOptions = [
  {
    icon: FiPhone,
    title: 'Call Us',
    description: 'Available Mon-Fri 8AM-6PM',
    contact: '+254 700 000 000',
    action: 'Call Now',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: FiMail,
    title: 'Email Us',
    description: 'Response within 24 hours',
    contact: 'support@insureai.co.ke',
    action: 'Send Email',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: FiMessageCircle,
    title: 'Live Chat',
    description: 'Available 24/7 for urgent issues',
    contact: 'Chat with our team',
    action: 'Start Chat',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
];

export default function CustomerHelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'normal',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setShowContactForm(false);
      setContactForm({ subject: '', message: '', priority: 'normal' });
    }, 3000);
  };

  return (
    <AuthGuard requiredRoles={['customer']}>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3">
                <FiHelpCircle className="h-8 w-8" />
                <h1 className="text-2xl md:text-3xl font-bold">Help & Support</h1>
              </div>
              <p className="text-primary-100 mt-1">Find answers to your questions or get in touch with our team</p>
            </div>
            <button
              onClick={() => setShowContactForm(true)}
              className="px-6 py-2.5 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 font-medium"
            >
              <FiMessageCircle className="h-5 w-5" />
              Contact Support
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search for help articles, FAQs, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900 placeholder-gray-500 shadow-sm"
          />
        </div>

        {/* Support Topics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {supportTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <Link
                key={topic.title}
                href={topic.link}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all group"
              >
                <div className={`w-12 h-12 ${topic.bgColor} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-6 w-6 ${topic.color}`} />
                </div>
                <h3 className="font-medium text-gray-900 text-sm">{topic.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{topic.description}</p>
              </Link>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FiBookOpen className="h-5 w-5 text-primary-600" />
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-gray-500 mt-1">Quick answers to common questions</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="text-center py-8">
              <FiAlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No FAQs found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-2 text-primary-600 hover:text-primary-700"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:border-primary-200 transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 text-sm">{faq.question}</span>
                    {expandedFaq === faq.id ? (
                      <FiChevronUp className="h-5 w-5 text-primary-600 flex-shrink-0 ml-4" />
                    ) : (
                      <FiChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-5 pb-4 pt-1">
                      <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                      {faq.category && (
                        <span className="mt-2 inline-block text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                          {faqCategoryMap[faq.category] || faq.category}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contactOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div key={option.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className={`w-14 h-14 ${option.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`h-7 w-7 ${option.color}`} />
                </div>
                <h3 className="font-semibold text-gray-900">{option.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                <p className="text-sm font-medium text-gray-700 mt-2">{option.contact}</p>
                <button className="mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center justify-center gap-1">
                  {option.action}
                  <FiArrowRight className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Contact Support</h2>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">
                      Our support team will respond within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.subject}
                        onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="Brief description of your issue"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <select
                        value={contactForm.priority}
                        onChange={(e) => setContactForm(prev => ({ ...prev, priority: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="normal">Normal</option>
                        <option value="urgent">Urgent</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Describe your issue in detail..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowContactForm(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <FiSend className="h-4 w-4" />
                        Send Message
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}

// Helper mapping for FAQ categories
const faqCategoryMap: Record<string, string> = {
  'getting-started': 'Getting Started',
  'assets': 'Assets & Verification',
  'policies': 'Policies & Coverage',
  'claims': 'Claims',
  'payments': 'Payments',
  'account': 'Account & Security',
};
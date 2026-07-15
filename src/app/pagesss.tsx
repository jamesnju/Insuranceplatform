'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { 
  FiShield, 
  FiSmartphone, 
  FiMonitor, 
  FiCamera, 
  FiCast,
  FiCheckCircle,
  FiTrendingUp,
  FiClock,
  FiDollarSign,
  FiUserCheck,
  FiFileText,
  FiCreditCard,
  FiArrowRight,
  FiStar,
  FiUsers,
  FiAward,
  FiActivity,
  FiZap,
  FiLock,
  FiCloud,
  FiBarChart2,
  FiRefreshCw,
  FiMessageCircle,
  FiHeadphones,
  FiGlobe,
  FiGrid,
} from 'react-icons/fi';
import { BiLaptop } from 'react-icons/bi';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { icon: FiUsers, value: '10,000+', label: 'Active Customers' },
    { icon: FiShield, value: '25,000+', label: 'Assets Protected' },
    { icon: FiAward, value: '98%', label: 'Customer Satisfaction' },
    { icon: FiActivity, value: 'KES 500M+', label: 'Coverage Value' },
  ];

  const features = [
    {
      icon: FiZap,
      title: 'AI-Powered Verification',
      description: 'Advanced AI reads receipts, verifies serial numbers, and detects fraud automatically in seconds.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: FiShield,
      title: 'Multi-Insurer Comparison',
      description: 'Compare quotes from Kenya\'s leading insurance companies and choose the best coverage for your needs.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: FiClock,
      title: 'Instant Claims Processing',
      description: 'Submit claims with evidence, track progress in real-time, and get fast decisions on your claims.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: FiCreditCard,
      title: 'Seamless M-Pesa Payments',
      description: 'Pay your premiums securely through M-Pesa STK Push with instant payment confirmation.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: FiFileText,
      title: 'Digital Policy Management',
      description: 'Access your policy documents anytime, anywhere. Download, view, and manage all your policies.',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      icon: FiUserCheck,
      title: 'Identity Verification',
      description: 'Secure identity verification with OCR, liveness detection, and face matching technology.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  const assets = [
    { icon: FiSmartphone, name: 'Smartphones', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { icon: BiLaptop, name: 'Laptops', color: 'text-green-600', bgColor: 'bg-green-50' },
    { icon: FiMonitor, name: 'Tablets', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { icon: FiMonitor, name: 'Televisions', color: 'text-red-600', bgColor: 'bg-red-50' },
    { icon: FiCamera, name: 'Cameras', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { icon: FiCast, name: 'Gaming Consoles', color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  ];

  const steps = [
    {
      number: '01',
      title: 'Register Account',
      description: 'Create your account and verify your identity with our secure onboarding process.',
      icon: FiUserCheck,
    },
    {
      number: '02',
      title: 'Add Your Asset',
      description: 'Register your device with guided photo capture and upload ownership evidence.',
      icon: FiGrid,
    },
    {
      number: '03',
      title: 'AI Verification',
      description: 'Our AI verifies your asset, extracts information, and calculates risk scores.',
      icon: FiActivity,
    },
    {
      number: '04',
      title: 'Get Quote & Pay',
      description: 'Receive insurance quotations, compare options, and pay via M-Pesa instantly.',
      icon: FiDollarSign,
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Kamau',
      role: 'Small Business Owner',
      image: '/avatars/avatar1.jpg',
      content: 'InsureAI made it so easy to insure my business laptops. The AI verification was fast and the whole process took less than 10 minutes!',
      rating: 5,
    },
    {
      name: 'David Ochieng',
      role: 'Freelance Photographer',
      image: '/avatars/avatar2.jpg',
      content: 'I was worried about insuring my expensive camera gear, but InsureAI made it simple. I got a great quote and my policy was activated immediately after payment.',
      rating: 5,
    },
    {
      name: 'Grace Mwangi',
      role: 'University Student',
      image: '/avatars/avatar3.jpg',
      content: 'The student-friendly rates and easy process made me insure my laptop. The claims process is straightforward and fast.',
      rating: 4,
    },
  ];

  const insurers = [
    { name: 'Jubilee Insurance', logo: '/insurers/jubilee.png' },
    { name: 'Britam', logo: '/insurers/britam.png' },
    { name: 'APA Insurance', logo: '/insurers/apa.png' },
    { name: 'UAP Insurance', logo: '/insurers/uap.png' },
    { name: 'CIC Insurance', logo: '/insurers/cic.png' },
  ];

  const faqs = [
    {
      question: 'What devices can I insure on this platform?',
      answer: 'You can insure smartphones, laptops, tablets, televisions, cameras, and gaming consoles. More device categories will be added in the future.',
    },
    {
      question: 'How does the AI verification work?',
      answer: 'Our AI analyzes your uploaded photos and documents to verify ownership. It reads receipts, checks serial numbers, detects duplicates, and calculates a confidence score.',
    },
    {
      question: 'How long does it take to get a policy?',
      answer: 'Most policies are issued instantly after payment confirmation. If your application requires manual review, it may take up to 24-48 hours.',
    },
    {
      question: 'What happens if I need to make a claim?',
      answer: 'You can submit a claim directly from your dashboard. Provide evidence, and our system will process it. Claims are typically resolved within 48-72 hours.',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-24 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
                <FiZap className="h-4 w-4" />
                <span>AI-Powered Insurance Platform</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                Protect Your Digital Assets with{' '}
                <span className="text-primary-600 bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                  AI Intelligence
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
                Register your electronic devices, verify ownership, get instant quotes, 
                and secure comprehensive coverage through Kenya's leading insurance partners.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
                >
                  Get Started Free
                  <FiArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  How It Works
                </Link>
              </div>
              <div className="mt-8 flex items-center space-x-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-200 to-primary-400 border-2 border-white flex items-center justify-center text-white font-medium text-sm">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FiStar key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Trusted by <span className="font-semibold">10,000+</span> customers
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-blue-400 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-4">
                      <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-primary-600">Phone Verified</span>
                          <FiCheckCircle className="h-5 w-5 text-primary-600" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Samsung Galaxy S24</p>
                      </div>
                      <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-600">Policy Active</span>
                          <FiShield className="h-5 w-5 text-green-600" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">KES 110,000 Covered</p>
                      </div>
                    </div>
                    <div className="col-span-1 space-y-4">
                      <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                        <div className="text-center">
                          <span className="text-2xl font-bold text-purple-600">98%</span>
                          <p className="text-xs text-gray-500">AI Confidence</p>
                        </div>
                      </div>
                      <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                        <div className="text-center">
                          <span className="text-2xl font-bold text-orange-600">KES 2,500</span>
                          <p className="text-xs text-gray-500">Annual Premium</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Next Renewal</span>
                      <span className="text-sm font-medium text-gray-900">Dec 2024</span>
                    </div>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-600 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100 animate-bounce-slow">
                  <div className="flex items-center space-x-2">
                    <FiTrendingUp className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium">+25% Growth</span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 border border-gray-100 animate-bounce-slow delay-200">
                  <div className="flex items-center space-x-2">
                    <FiClock className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">2min Setup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-primary-50 rounded-full">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-primary-600">Simple Process</h2>
            <p className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
              Get Covered in 4 Easy Steps
            </p>
            <p className="mt-4 text-lg text-gray-600">
              From registration to policy activation, our streamlined process makes insuring your devices effortless.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative group">
                  <div className="absolute -top-4 -left-4 text-5xl font-bold text-gray-100 group-hover:text-primary-100 transition-colors">
                    {step.number}
                  </div>
                  <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-100 transition-colors">
                      <Icon className="h-8 w-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <FiArrowRight className="h-6 w-6 text-gray-300" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-primary-600">Features</h2>
            <p className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose InsureAI?
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Powered by cutting-edge AI technology to provide you with the best insurance experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 bg-white rounded-2xl border border-gray-100 hover:border-primary-200 transition-all hover:shadow-lg"
                >
                  <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className={`h-7 w-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiArrowRight className="h-5 w-5 text-primary-600" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Supported Assets Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-primary-600">Coverage</h2>
            <p className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
              Supported Assets
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Comprehensive coverage for a wide range of electronic devices.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {assets.map((asset, index) => {
              const Icon = asset.icon;
              return (
                <div
                  key={index}
                  className="group text-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className={`w-16 h-16 ${asset.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-8 w-8 ${asset.color}`} />
                  </div>
                  <p className="font-medium text-gray-900">{asset.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-primary-600">Testimonials</h2>
            <p className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
              What Our Customers Say
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Real stories from real customers who have protected their assets with InsureAI.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-primary-200 transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurers Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
            Trusted by Kenya's Leading Insurers
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            {insurers.map((insurer, index) => (
              <div
                key={index}
                className="w-full max-w-[150px] h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center hover:border-primary-300 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">{insurer.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-primary-600">FAQ</h2>
            <p className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Find answers to common questions about our platform and services.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between w-full px-6 py-4 text-left font-medium text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors">
                    <span>{faq.question}</span>
                    <span className="ml-4 text-primary-600 group-open:rotate-180 transition-transform">
                      <FiArrowRight className="h-5 w-5" />
                    </span>
                  </summary>
                  <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Protect Your Assets?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Kenyans who have already secured their electronic devices with InsureAI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get Started Now
              <FiArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-400 transition-colors border border-primary-400"
            >
              Contact Sales
              <FiMessageCircle className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-primary-200">
            <span className="flex items-center">
              <FiLock className="h-4 w-4 mr-2" />
              Secure & Private
            </span>
            <span className="flex items-center">
              <FiClock className="h-4 w-4 mr-2" />
              Instant Coverage
            </span>
            <span className="flex items-center">
              <FiHeadphones className="h-4 w-4 mr-2" />
              24/7 Support
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
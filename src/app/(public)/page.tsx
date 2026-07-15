import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20 pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Protect Your Digital Assets with AI-Powered Insurance
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Register your electronic devices, verify ownership, get instant quotes, 
              and secure comprehensive coverage through Kenya's leading insurance partners.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/register"
                className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Get Started
              </Link>
              <Link href="/how-it-works" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Process Steps */}
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-5">
              {[
                { step: '1', title: 'Register', description: 'Create your account and verify your identity' },
                { step: '2', title: 'Add Asset', description: 'Register your device with guided photo capture' },
                { step: '3', title: 'Verify', description: 'AI verifies your asset and ownership evidence' },
                { step: '4', title: 'Get Quote', description: 'Receive instant insurance quotations' },
                { step: '5', title: 'Pay & Cover', description: 'Pay via M-Pesa and get your policy' },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white text-xl font-bold">
                    {item.step}
                  </div>
                  <dt className="mt-4 font-semibold text-gray-900">{item.title}</dt>
                  <dd className="mt-1 text-sm text-gray-600">{item.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Insurance Made Simple</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to protect your devices
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              From smartphones to laptops, get comprehensive coverage with AI-powered verification.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  title: 'AI-Powered Verification',
                  description: 'Advanced AI reads receipts, verifies serial numbers, and detects fraud automatically.',
                },
                {
                  title: 'Multiple Insurers',
                  description: 'Compare quotes from Kenya\'s leading insurance companies and choose the best coverage.',
                },
                {
                  title: 'Instant Claims',
                  description: 'Submit claims with evidence, track progress, and get quick decisions.',
                },
              ].map((feature) => (
                <div key={feature.title} className="flex flex-col">
                  <dt className="text-lg font-semibold leading-7 text-gray-900">{feature.title}</dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Supported Assets */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Supported Assets
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Comprehensive coverage for your valuable electronics
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-2 gap-8 sm:max-w-xl sm:grid-cols-3 lg:max-w-4xl lg:grid-cols-6">
            {[
              'Smartphones', 'Laptops', 'Tablets', 
              'Televisions', 'Cameras', 'Gaming Consoles'
            ].map((asset) => (
              <div key={asset} className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm">
                <div className="text-4xl mb-2">📱</div>
                <span className="text-sm font-medium text-gray-900">{asset}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to protect your assets?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
              Join thousands of Kenyans who have already secured their electronic devices.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/register"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get Started Now
              </Link>
              <Link href="/contact" className="text-sm font-semibold leading-6 text-white">
                Contact Us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
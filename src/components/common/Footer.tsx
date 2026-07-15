import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/how-it-works" className="text-sm text-gray-600 hover:text-gray-900">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-gray-600 hover:text-gray-900">
                  Insurance Products
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-sm text-gray-600 hover:text-gray-900">
                  Partner Insurers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/claims-info" className="text-sm text-gray-600 hover:text-gray-900">
                  Claims Information
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <span>📞</span>
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <span>✉️</span>
                <span>support@insureai.co.ke</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <span>📍</span>
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} InsureAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
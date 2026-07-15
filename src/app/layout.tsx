import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/common/Providers';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AI Digital Asset Insurance Platform',
  description: 'Protect your valuable electronic devices with AI-powered insurance',
  keywords: 'insurance, digital assets, AI, Kenya, electronics, device protection',
  authors: [{ name: 'InsureAI' }],
  openGraph: {
    title: 'AI Digital Asset Insurance Platform',
    description: 'Protect your valuable electronic devices with AI-powered insurance',
    url: 'https://insureai.co.ke',
    siteName: 'InsureAI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'InsureAI - Digital Asset Insurance',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Digital Asset Insurance Platform',
    description: 'Protect your valuable electronic devices with AI-powered insurance',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://insureai.co.ke',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} antialiased `}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
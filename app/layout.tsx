import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Footer from './components/Footer';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ai-qr-code-generator.art'),
  title: {
    default: 'AI QR Code Generator - Create Beautiful Custom QR Codes Online',
    template: '%s | AI QR Code Generator'
  },
  description: 'Create beautiful, customizable QR codes online with our AI-powered QR code generator. Free, fast, and easy to use. Generate QR codes for URLs, text, vCards, WiFi, and more.',
  keywords: ['QR code generator', 'AI QR code', 'custom QR code', 'QR code maker', 'free QR code generator', 'QR code design', 'QR code creator', 'online QR code generator'],
  authors: [{ name: 'AI QR Code Generator' }],
  creator: 'AI QR Code Generator',
  publisher: 'AI QR Code Generator',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ai-qr-code-generator.art',
    title: 'AI QR Code Generator - Create Beautiful Custom QR Codes Online',
    description: 'Create beautiful, customizable QR codes online with our AI-powered QR code generator. Free, fast, and easy to use.',
    siteName: 'AI QR Code Generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI QR Code Generator - Create Beautiful Custom QR Codes Online',
    description: 'Create beautiful, customizable QR codes online with our AI-powered QR code generator. Free, fast, and easy to use.',
    creator: '@aiqrcode',
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
    google: 'your-google-site-verification', // 需要替换为实际的 Google Search Console 验证码
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

import Link from 'next/link';
import { QrCodeIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <QrCodeIcon className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">QR Code Generator</span>
          </div>
          
        </div>
      </div>
    </header>
  );
} 
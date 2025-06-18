'use client';

import Header from './components/Header';
import Footer from './components/Footer';
import QRCodeGenerator from './components/QRCodeGenerator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-10 col-start-2">
            <QRCodeGenerator />
          </div>
        </div>
      </main>
    </div>
  );
}

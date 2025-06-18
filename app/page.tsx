'use client';

import Header from './components/Header';
import Footer from './components/Footer';
import QRCodeGenerator from './components/QRCodeGenerator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">二维码生成器</h1>
          <QRCodeGenerator />
        </div>
      </main>
      <Footer />
    </div>
  );
}

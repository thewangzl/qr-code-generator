'use client';

import Header from './components/Header';
import Footer from './components/Footer';
import QRCodeGenerator from './components/QRCodeGenerator';

export default function Home() {
  return (
    <main>
      <QRCodeGenerator />
    </main>
  );
}
